# GestureKart starter modules (untested)
Drop these into a Vite + React + TS repo (`npm i @mediapipe/tasks-vision jspdf @supabase/supabase-js three @react-three/fiber; npm i -D vitest`).
- `src/lib/scoring.ts` + `scoring.test.ts`: central scoring config, rules, ratings (`npx vitest`)
- `src/lib/gestureEngine.ts`: calibration, smoothing, dead zone, lost-tracking fallback
- `src/lib/poseLoop.ts`: MediaPipe PoseLandmarker loop (put `pose_landmarker_lite.task` in `public/models/`)
- `src/lib/pdf.ts`: jsPDF score card
- `supabase/schema.sql`: tables, RLS, profile trigger (run in the Supabase SQL editor)
Keep a keyboard fallback so the game can be tested without a camera. Wire `onCtl` output to the same input object the game reads.
