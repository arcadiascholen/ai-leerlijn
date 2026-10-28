// Motion on the site (docs/DESIGN.md, "Beweging"). The CSS holds every
// transition and animation, inside `@media (prefers-reduced-motion:
// no-preference)`; these helpers only decide when something may move: right
// after something the student did. At page load only the first step builds
// itself up (`buildUp`); nothing moves when an island shows a state it
// restored from storage.

const NO_PREFERENCE = '(prefers-reduced-motion: no-preference)';

// False when the student asked for less motion: then nothing moves at all.
// The CSS checks it with the media query; a script that draws motion of its
// own, such as the confetti (src/components/stappen/confetti.ts), calls this.
export function mayMove(): boolean {
  return window.matchMedia(NO_PREFERENCE).matches;
}

// Plays the CSS animation that `[data-<name>="<value>"]` selects, once. The
// attribute goes again when the animation ends, or when it is cancelled
// because the element or its step was hidden: otherwise the animation would
// play again every time the step is shown. With reduced motion there is no
// animation to end, so the attribute is not set at all.
export function playOnce(element: HTMLElement, name: string, value = ''): void {
  if (!mayMove()) return;
  const attribute = `data-${name}`;
  if (element.getAttribute(attribute) === value) return;
  const done = (event: AnimationEvent): void => {
    // An animation of something inside it, such as feedback in a step.
    if (event.target !== element) return;
    element.removeAttribute(attribute);
    element.removeEventListener('animationend', done);
    element.removeEventListener('animationcancel', done);
  };
  element.setAttribute(attribute, value);
  element.addEventListener('animationend', done);
  element.addEventListener('animationcancel', done);
}

// Something that appears because of what the student did fades in
// (`[data-appear]` in src/styles/global.css). Also for an element that is
// still hidden: the fade plays when it is shown.
export function appear(element: HTMLElement): void {
  playOnce(element, 'appear');
}

// For the `ref` of a React element that only mounts after an action of the
// student. A module-level function, so the ref stays the same between
// renders and React calls it only when the element mounts.
export function appearOnMount(element: HTMLElement | null): void {
  if (element !== null) appear(element);
}

// Turns on the transitions of an element (`[data-motion]` in the CSS) once it
// shows its first state, such as a choice restored from storage. Computing
// the style first makes that state the starting point, so that the restore
// itself does not move: only what changes after this does.
export function settle(element: HTMLElement): void {
  element.getBoundingClientRect();
  element.setAttribute('data-motion', '');
}

// The build-up of a step (`.build-*` in src/styles/global.css): its parts
// appear one after the other, as if a machine puts the step together. A part
// is a direct child of the step that shows: the heading, a paragraph, a
// list, a prompt, a question, the visible <Tool> block. One that is hidden
// (`display: none`, such as the <Tool> block of another tool) does not
// count; an island (`display: contents`) is one part, the box around what it
// renders, so nothing inside it moves on its own.
//
// The parts themselves never move. A layer next to the step, in its parent,
// covers each part with a panel in the colour of the card, and the CSS moves
// the panels away in steps: the heading's from left to right behind a block
// cursor, a block's from top to bottom behind a line. The layer takes no
// pointer events, so clicking and typing reach a part before it shows. A
// panel only covers while its animation runs: when an animation does not
// start or is cut short, the part simply shows.

// The build-up going on in a step: the function that ends it.
const builds = new WeakMap<HTMLElement, () => void>();

interface Box {
  readonly left: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
}

// Where `element` lies in `container`, in px from its padding edge, or null
// if it draws nothing; for an island (`display: contents`), the box around
// what it renders. Layout values, which a turning container does not change.
function boxIn(element: Element, container: Element): Box | null {
  const display = getComputedStyle(element).display;
  if (display === 'none') return null;
  if (display === 'contents') {
    let union: Box | null = null;
    for (const child of Array.from(element.children)) {
      const box = boxIn(child, container);
      if (box === null) continue;
      union =
        union === null
          ? box
          : {
              left: Math.min(union.left, box.left),
              top: Math.min(union.top, box.top),
              right: Math.max(union.right, box.right),
              bottom: Math.max(union.bottom, box.bottom),
            };
    }
    return union;
  }
  if (!(element instanceof HTMLElement) || element.offsetWidth === 0 || element.offsetHeight === 0) return null;
  let left = 0;
  let top = 0;
  for (let node: Element | null = element; node instanceof HTMLElement && node !== container; node = node.offsetParent) {
    left += node.offsetLeft;
    top += node.offsetTop;
  }
  return { left, top, right: left + element.offsetWidth, bottom: top + element.offsetHeight };
}

function setBox(element: HTMLElement, box: Box): void {
  element.style.left = `${box.left}px`;
  element.style.top = `${box.top}px`;
  element.style.width = `${box.right - box.left}px`;
  element.style.height = `${box.bottom - box.top}px`;
}

// How far the text of the heading reaches from its left edge, in px. Only
// while nothing turns: the screen measures what it shows.
function textWidth(heading: Element, container: Element): number | null {
  if (getComputedStyle(container).transform !== 'none') return null;
  const range = document.createRange();
  range.selectNodeContents(heading);
  return range.getBoundingClientRect().right - heading.getBoundingClientRect().left;
}

// Builds `step` up, part by part. After a flip the first part starts at the
// middle of the flip, when the new step turns in; at page load at once. The
// CSS spreads the parts so that the last one stands within --motion-build.
// The layer goes in the step's parent, which must be positioned, so that
// the step keeps its own children and its height.
export function buildUp(step: HTMLElement, afterFlip: boolean): void {
  stopBuild(step);
  const container = step.parentElement;
  if (!mayMove() || container === null) return;
  const parts = Array.from(step.children).filter((child) => boxIn(child, container) !== null);
  if (parts.length === 0) return;
  const typed = parts.map((part) => part.matches('[data-step-title]'));

  const layer = document.createElement('div');
  layer.className = 'build-layer';
  layer.setAttribute('aria-hidden', 'true');
  if (afterFlip) layer.dataset.build = 'flip';
  layer.style.setProperty('--build-count', String(parts.length));
  const masks = parts.map((part, index) => {
    const mask = document.createElement('div');
    mask.className = 'build-mask';
    mask.style.setProperty('--build-index', String(index));
    const panel = document.createElement('div');
    if (typed[index] === true) {
      // The heading types itself: the panel uncovers it one character at a
      // time, as far as the text goes, with the cursor at its edge.
      const characters = Array.from(part.textContent?.trim() ?? '').length;
      mask.style.setProperty('--build-chars', String(Math.max(1, characters)));
      panel.className = 'build-panel build-type';
      const cursor = document.createElement('div');
      cursor.className = 'build-cursor';
      mask.append(panel, cursor);
    } else {
      panel.className = 'build-panel build-scan';
      mask.append(panel);
    }
    layer.append(mask);
    return mask;
  });

  // Lays the layer over the step, and each mask over its part, one px larger
  // on every side, so that no border or anti-aliased edge shows before its
  // turn. Again whenever something changes size during the build, such as a
  // font that loads or an island that hydrates.
  const place = (): void => {
    const origin = boxIn(step, container);
    if (origin === null) return;
    setBox(layer, origin);
    parts.forEach((part, index) => {
      const box = boxIn(part, container);
      const mask = masks[index];
      if (box === null || mask === undefined) return;
      setBox(mask, {
        left: box.left - origin.left - 1,
        top: box.top - origin.top - 1,
        right: box.right - origin.left + 1,
        bottom: box.bottom - origin.top + 1,
      });
      // From the left edge of the mask, one px to the left of the heading.
      const width = typed[index] === true ? textWidth(part, container) : null;
      if (width !== null) mask.style.setProperty('--build-width', `${width + 1}px`);
    });
  };
  place();
  container.append(layer);

  const observer = new ResizeObserver(place);
  observer.observe(step);
  parts.forEach((part) => {
    // An island has no box of its own: watch what it renders.
    const boxes = getComputedStyle(part).display === 'contents' ? Array.from(part.children) : [part];
    boxes.forEach((box) => observer.observe(box));
  });
  const end = (): void => {
    if (builds.get(step) !== end) return;
    builds.delete(step);
    observer.disconnect();
    layer.remove();
  };
  builds.set(step, end);
  // A font that loads can make the heading longer without changing its box.
  if (document.fonts.status !== 'loaded') {
    void document.fonts.ready.then(() => {
      if (builds.get(step) === end) place();
    });
  }

  // Gone once every panel has played, or as soon as one is cancelled. Not
  // the layer's own animations: the flip fades the whole layer in, and that
  // may be cut short.
  const animations = masks.flatMap((mask) => mask.getAnimations({ subtree: true }));
  if (animations.length === 0) end();
  else Promise.all(animations.map((animation) => animation.finished)).then(end, end);
}

// Ends the build-up of `step` at once: every part stands.
export function stopBuild(step: HTMLElement): void {
  builds.get(step)?.();
}
