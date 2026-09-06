# MZZ World

An interactive portfolio for Muhammad Zuhair Zeb. React, TypeScript, Vite, React Three Fiber and Three.js. The main experience is a continuous world with eight destinations, automatic waypoint travel, an articulated animated character, and a following camera. WASD and arrow keys also move the character. Portfolio information is available in accompanying semantic HTML and destination interfaces.

## Run and verify

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 5175
npm run typecheck
npm run build
npm run test:browser
npm run test:mobile
```

Browser tests use installed Microsoft Edge through Playwright. Set `PORTFOLIO_URL` to test another development or preview address. Test reports and visual captures are written to `artifacts/`. Contact submission is intercepted in tests; no email is sent. The original Web3Forms integration remains in use; delivery depends on that service and its existing account configuration.

## Architecture

- `src/world/store.ts`: central application state and mutable frame state.
- `src/world/WaypointSystem.ts`: graph routing through zone entrances.
- `src/world/zones.ts`: destinations and camera compositions.
- `src/components/world/NavigationSystem.tsx`: eased travel, manual movement, arrival and animation state.
- `src/components/world/CameraRig.tsx`: camera tracking and destination framing.
- `src/components/world/Character.tsx`: temporary articulated avatar and AnimationMixer clips.
- `src/components/world/*Zone.tsx`: eight physical environments.
- `src/components/ui/`: destination navigation, map, project viewer, contact terminal and accessible fallback.
- `src/data/portfolio.json` and `src/data/site.ts`: preserved project, career, testimonial, skill and contact data.

The world bundle is lazy loaded. Mobile uses lower pixel density, fewer decorative objects and no shadow map. Reduced motion and unavailable WebGL use the lightweight SVG world with the same content. Sound starts off. Animation can be paused. Movement is bounded to the world floor; this is an exploration interface, without physics or obstacle collisions.

## Replace the avatar

The current avatar is a procedural stand-in inspired by the existing illustrated avatar asset. It is not a reconstruction of a verified photograph.

1. Add `public/models/zuhair.glb`.
2. Set `modelUrl: '/models/zuhair.glb'` in `src/world/avatarConfig.ts`.
3. Export feet at Y=0, facing +Z, approximately 1.9 units tall. Adjust `scale` and `rotationOffset` if needed.
4. Include animation clips named `Idle`, `Walk`, `Interact` and `Typing`. Optional `Celebrate` is used after successful contact submission. Missing clips fall back to Idle.

The loader retains the procedural character while loading or if the model fails. Use an optimized GLB with small textures. Draco-compressed files require adding the appropriate decoder configuration; the current procedural world needs no model downloads or decoder.

## Content integrity

All nine original projects, four testimonials, career entries, certifications, FAQ and contact information are retained. Existing real screenshots are reused; the chatbot has a typographic display because it has no real screenshot. No event photographs, chapter counts, reviews or project outcomes were invented. Community numbers use the repository's existing 340+ participants and 50+ members. Original media remain alongside optimized WebP copies. Previously unavailable HomeItems and Ospherics case-study destinations are retained in data but their broken outbound actions are suppressed.

The production canonical URL, social metadata, robots file and sitemap are preserved. Previous page components remain in the repository for reference; the application entry point renders the world.
