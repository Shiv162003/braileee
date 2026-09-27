# Braille Vision — Progress

Mobile-first PWA that reads Braille aloud from a phone camera feed. Vanilla JS + Vite, OpenCV.js, MediaPipe Hands, Web Speech API.

## Status: Step 1 in progress

## Done
- [x] Step 1 — Camera + basic UI shell
  - Vite vanilla JS project scaffolded (`package.json`, `vite.config.js`, `index.html`, `src/main.js`, `src/style.css`).
  - Full-screen rear-camera feed via `getUserMedia` (`facingMode: environment`).
  - Large "Start" button (required for iOS/Safari autoplay + permission gesture).
  - Status text region (`aria-live="polite"`) for debug/error visibility.
  - Handles: insecure context (non-HTTPS), unsupported browser, permission denied, no camera found.

## Flaky / risks (watch these)
- Nothing tested on a real device yet — camera access, `object-fit: cover` framing, and iOS Safari's autoplay/gesture quirks need verification on an actual phone before Step 2.
- No hosting/deploy set up yet, so real-device testing requires either a Vercel import of this repo (recommended, zero-config for a static Vite app) or serving the built `dist/` over HTTPS some other way. `localhost` alone won't reach a phone.
- Steps 2–4 (sheet contour detection, adaptive grid, dot/shadow detection) are the highest-risk part of the whole project per the plan — flag honestly if unreliable once we get there.

## Next
- Verify Step 1 on a real phone (needs a live HTTPS URL — see note above).
- Step 2: OpenCV.js sheet boundary detection (contours + perspective correction) with a debug overlay.

## How to run locally
```
npm install
npm run dev       # dev server, camera needs HTTPS or localhost
npm run build     # production build to dist/
npm run preview   # serve the production build
```
Camera access requires a secure context: `localhost` works for local dev, but testing on a phone needs a real HTTPS URL (e.g. a Vercel deployment of this repo).
