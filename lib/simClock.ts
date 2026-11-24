/**
 * Shared simulation clock for the hero globe and telemetry panel.
 * At speed 1 it is real time; at higher speeds it runs ahead so visitors
 * can watch orbits and the day/night line move. `live()` snaps back.
 */

type Listener = () => void;

let speed = 1;
let simBase = 0;
let realBase = 0;
const listeners = new Set<Listener>();

function ensureInit() {
  if (realBase === 0) {
    realBase = Date.now();
    simBase = realBase;
  }
}

export function simNow() {
  ensureInit();
  return simBase + (Date.now() - realBase) * speed;
}

export function getSpeed() {
  return speed;
}

export function setSpeed(next: number) {
  const t = simNow();
  simBase = t;
  realBase = Date.now();
  speed = next;
  listeners.forEach((l) => l());
}

/** Back to real time at 1× */
export function live() {
  realBase = Date.now();
  simBase = realBase;
  speed = 1;
  listeners.forEach((l) => l());
}

export function subscribe(l: Listener) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}
