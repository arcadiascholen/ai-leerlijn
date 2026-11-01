// Confetti over the step card, once per module (docs/BRIEFING.md § 12,
// "Confetti"). <Confetti /> puts an empty marker in a step; the first time
// that step is shown, confetti falls over the card for 1.5 s, on a <canvas>
// that is removed again afterwards.
//
// - Once per module: playing stores `ai-leerlijn:<module-id>:confetti`, so a
//   student who comes back to the step sees nothing. "Opnieuw beginnen"
//   clears it with the rest of the module. With storage blocked it plays at
//   most once per page load: the observer stops after playing.
// - Never in the way: the canvas is `aria-hidden`, takes no pointer events
//   and no focus, and is fixed over the card, outside the layout, so the step
//   keeps its height and nothing scrolls. The student can type and click at
//   once.
// - With reduced motion nothing is drawn (mayMove in src/lib/motion.ts).
// - Only brand colours, read from the tokens at runtime. Never red, orange or
//   yellow: those are the levels of the AI barometer (docs/DESIGN.md, "Kleur").

import { mayMove } from '../../lib/motion';
import { moduleIdOf, readStored, writeStored } from './storage';

// localStorage key: `ai-leerlijn:<module-id>:confetti`.
const PLAYED_KEY = 'confetti';
// `--ai-soft` is a brand colour too, but it does not show on the white card.
const COLOURS = ['--brand', '--brand-text', '--forest', '--ai'] as const;
const PIECES = 80;
// In seconds: the whole animation, and the fade-out at its end.
const DURATION = 1.5;
const FADE = 0.4;
// Air drag (per second) and gravity (px/s²): a piece slows down to
// GRAVITY / DRAG px/s and flutters down at that speed.
const DRAG = 2.5;
const GRAVITY = 700;

interface Piece {
  // Start, in px from the top left of the card: just above it.
  readonly x: number;
  readonly y: number;
  // Speed at the start, in px/s.
  readonly vx: number;
  readonly vy: number;
  // Seconds before it starts to fall.
  readonly delay: number;
  readonly width: number;
  readonly height: number;
  // Rotation in rad, and its speed in rad/s.
  readonly angle: number;
  readonly spin: number;
  // How fast it turns over (rad/s), and how far it sways from side to side
  // (px) while it does.
  readonly flip: number;
  readonly sway: number;
  readonly phase: number;
  readonly colour: string;
}

function between(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function palette(): string[] {
  const style = getComputedStyle(document.documentElement);
  return COLOURS.map((name) => style.getPropertyValue(name).trim()).filter((value) => value !== '');
}

function piecesFor(width: number, colours: readonly string[]): Piece[] {
  return Array.from({ length: PIECES }, (_, index) => ({
    x: between(0, width),
    y: between(-40, -8),
    vx: between(-150, 150),
    vy: between(0, 800),
    delay: between(0, 0.35),
    width: between(6, 10),
    height: between(10, 16),
    angle: between(0, Math.PI),
    spin: between(-6, 6),
    flip: between(6, 14),
    sway: between(4, 16),
    phase: between(0, 2 * Math.PI),
    colour: colours[index % colours.length] ?? '',
  }));
}

// One piece at `time` seconds. The position is the closed form of falling
// with drag, so the motion is the same at every frame rate.
function draw(context: CanvasRenderingContext2D, piece: Piece, time: number, ratio: number): void {
  const t = time - piece.delay;
  if (t <= 0) return;
  const slowed = (1 - Math.exp(-DRAG * t)) / DRAG;
  const terminal = GRAVITY / DRAG;
  const x = piece.x + piece.vx * slowed + piece.sway * Math.sin(piece.phase + (piece.flip * t) / 2);
  const y = piece.y + terminal * t + (piece.vy - terminal) * slowed;
  const angle = piece.angle + piece.spin * t;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  // Turning over: the piece gets narrower as it tilts away.
  const turn = Math.cos(piece.phase + piece.flip * t);
  context.setTransform(ratio * cos, ratio * sin, -ratio * sin * turn, ratio * cos * turn, ratio * x, ratio * y);
  context.fillStyle = piece.colour;
  context.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
}

function play(step: HTMLElement, card: HTMLElement): void {
  const colours = palette();
  const rect = card.getBoundingClientRect();
  if (colours.length === 0 || rect.width === 0 || rect.height === 0) return;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (context === null) return;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round(rect.height * ratio);
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed',
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    // Clips the pieces to the rounded corners of the card.
    borderRadius: getComputedStyle(card).borderRadius,
    pointerEvents: 'none',
  });
  document.body.append(canvas);

  const pieces = piecesFor(rect.width, colours);
  let start: number | undefined;
  let frame = 0;
  const finish = (): void => {
    cancelAnimationFrame(frame);
    clearTimeout(fallback);
    canvas.remove();
  };
  // If no frames come, as in a background tab, the canvas still goes.
  const fallback = setTimeout(finish, DURATION * 1000 + 500);
  const tick = (now: number): void => {
    start ??= now;
    const time = (now - start) / 1000;
    // Also when the student leaves the step: what disappears, disappears at
    // once (docs/DESIGN.md, "Beweging").
    if (time >= DURATION || step.hidden) {
      finish();
      return;
    }
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = Math.min(1, (DURATION - time) / FADE);
    for (const piece of pieces) draw(context, piece, time, ratio);
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
}

// Plays the first time the step of `marker` is shown. The player hides the
// other steps with `hidden`, so the step enters the viewport exactly when it
// is shown, as for the summary. Call it once the player has hidden them.
export function initConfetti(marker: HTMLElement): void {
  const moduleId = moduleIdOf(marker);
  const step = marker.closest<HTMLElement>('[data-step]');
  const card = marker.closest('[data-player]')?.querySelector<HTMLElement>('[data-card]');
  if (moduleId === null || step === null || card == null) return;
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    if (readStored(moduleId, PLAYED_KEY) !== null) {
      observer.disconnect();
      return;
    }
    if (!mayMove()) return;
    observer.disconnect();
    writeStored(moduleId, PLAYED_KEY, '1');
    play(step, card);
  });
  observer.observe(step);
}
