/**
 * Lightweight orbit + sun geometry for the hero globe.
 *
 * The satellite is SIMULATED: a circular sun-synchronous orbit with
 * Sentinel-2-like parameters (786 km, 98.62°, ~100.6 min period, 10:30
 * descending node). The sun position and Earth rotation are real (standard
 * low-precision almanac formulas, accurate to a fraction of a degree), so
 * the day/night boundary and pass timing behave like the real thing.
 */

const DEG = Math.PI / 180;
const EARTH_RADIUS_KM = 6371;

export const ORBIT = {
  altitudeKm: 786,
  inclinationDeg: 98.62,
  periodMin: 100.6,
  /** Local time of the ascending node, in hours (10:30 descending → 22:30 ascending) */
  ltanHours: 22.5,
  epochMs: Date.UTC(2026, 0, 1),
} as const;

export const GROUND_STATION = {
  name: "Bengaluru",
  lat: 12.97,
  lon: 77.59,
} as const;

/** Minimum elevation (degrees) for the satellite to count as "in view". */
export const MIN_ELEVATION_DEG = 10;

export interface LatLon {
  lat: number; // degrees
  lon: number; // degrees, -180..180 (east positive)
}

const wrap180 = (deg: number) => ((((deg + 180) % 360) + 360) % 360) - 180;
const wrap360 = (deg: number) => ((deg % 360) + 360) % 360;

function daysSinceJ2000(ms: number) {
  return ms / 86_400_000 + 2440587.5 - 2451545.0;
}

/** Greenwich mean sidereal time, degrees */
export function gmstDeg(ms: number) {
  return wrap360(280.46061837 + 360.98564736629 * daysSinceJ2000(ms));
}

/** Sun right ascension and declination, degrees */
export function sunRaDec(ms: number) {
  const d = daysSinceJ2000(ms);
  const L = wrap360(280.46 + 0.9856474 * d);
  const g = wrap360(357.528 + 0.9856003 * d) * DEG;
  const lambda = (L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * DEG;
  const eps = (23.439 - 0.0000004 * d) * DEG;
  const ra = Math.atan2(Math.cos(eps) * Math.sin(lambda), Math.cos(lambda)) / DEG;
  const dec = Math.asin(Math.sin(eps) * Math.sin(lambda)) / DEG;
  return { ra: wrap360(ra), dec };
}

/** Point on Earth where the sun is directly overhead */
export function subsolarPoint(ms: number): LatLon {
  const { ra, dec } = sunRaDec(ms);
  return { lat: dec, lon: wrap180(ra - gmstDeg(ms)) };
}

/** Satellite position in Earth-fixed coordinates at time `ms` */
export function satellitePosition(ms: number): LatLon {
  const i = ORBIT.inclinationDeg * DEG;
  // Sun-synchronous: the node stays at a fixed local time, so tie it to the sun's RA
  const raan = (sunRaDec(ms).ra + (ORBIT.ltanHours - 12) * 15) * DEG;
  const periodMs = ORBIT.periodMin * 60_000;
  const u = (((ms - ORBIT.epochMs) / periodMs) % 1) * 2 * Math.PI;

  const x = Math.cos(raan) * Math.cos(u) - Math.sin(raan) * Math.sin(u) * Math.cos(i);
  const y = Math.sin(raan) * Math.cos(u) + Math.cos(raan) * Math.sin(u) * Math.cos(i);
  const z = Math.sin(u) * Math.sin(i);

  const lat = Math.asin(z) / DEG;
  const lonInertial = Math.atan2(y, x) / DEG;
  return { lat, lon: wrap180(lonInertial - gmstDeg(ms)) };
}

/** Great-circle angle between two points, degrees */
export function centralAngleDeg(a: LatLon, b: LatLon) {
  const p1 = a.lat * DEG;
  const p2 = b.lat * DEG;
  const dl = (b.lon - a.lon) * DEG;
  const c = Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(dl);
  return Math.acos(Math.min(1, Math.max(-1, c))) / DEG;
}

/** Largest ground angle at which the satellite is above MIN_ELEVATION_DEG */
const VISIBILITY_ANGLE_DEG = (() => {
  const ratio = EARTH_RADIUS_KM / (EARTH_RADIUS_KM + ORBIT.altitudeKm);
  const el = MIN_ELEVATION_DEG * DEG;
  return (Math.acos(ratio * Math.cos(el)) - el) / DEG;
})();

export function isInView(ms: number, station: LatLon = GROUND_STATION) {
  return centralAngleDeg(satellitePosition(ms), station) <= VISIBILITY_ANGLE_DEG;
}

/**
 * Next time the satellite rises over the station (searches up to 48 h ahead
 * in 20 s steps). Returns null if it is in view right now.
 */
export function nextPassStart(ms: number, station: LatLon = GROUND_STATION): number | null {
  if (isInView(ms, station)) return null;
  const step = 20_000;
  for (let t = ms + step; t < ms + 48 * 3_600_000; t += step) {
    if (isInView(t, station)) return t;
  }
  return null;
}

/**
 * The next visibility window over the station (or the current one, if the
 * satellite is in view now). Start/end in ms; null if none within 48 h.
 */
export function passWindow(ms: number, station: LatLon = GROUND_STATION): { start: number; end: number } | null {
  const step = 20_000;
  let start: number | null = null;
  if (isInView(ms, station)) {
    // walk back to the rise
    start = ms;
    while (isInView(start - step, station) && ms - start < 30 * 60_000) start -= step;
  } else {
    start = nextPassStart(ms, station);
  }
  if (start === null) return null;
  let end = start;
  while (isInView(end + step, station) && end - start < 30 * 60_000) end += step;
  return { start, end: end + step };
}

/** Ground track samples from `fromMin` to `toMin` minutes around `ms` */
export function groundTrack(ms: number, fromMin: number, toMin: number, stepMin = 0.5): LatLon[] {
  const points: LatLon[] = [];
  for (let m = fromMin; m <= toMin; m += stepMin) {
    points.push(satellitePosition(ms + m * 60_000));
  }
  return points;
}

/** lat/lon → three.js coordinates on a sphere of radius r (y up, lon 0 facing +x) */
export function toVector(lat: number, lon: number, r = 1): [number, number, number] {
  const p = lat * DEG;
  const l = lon * DEG;
  return [r * Math.cos(p) * Math.cos(l), r * Math.sin(p), -r * Math.cos(p) * Math.sin(l)];
}

export const SATELLITE_RADIUS = 1 + ORBIT.altitudeKm / EARTH_RADIUS_KM;

export function formatLatLon({ lat, lon }: LatLon) {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lon >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}° ${ns}, ${Math.abs(lon).toFixed(2)}° ${ew}`;
}
