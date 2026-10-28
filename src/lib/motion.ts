// Motion on the site (docs/DESIGN.md, "Beweging"). The CSS holds every
// transition and animation, inside `@media (prefers-reduced-motion:
// no-preference)`; these helpers only decide when something may move: right
// after something the student did. Nothing moves at page load, or when an
// island shows a state it restored from storage.

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
