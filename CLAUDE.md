# CLAUDE.md

## Commands

npm install --legacy-peer-deps
npm run dev
npm run build

## Routing

/ — Nuclear Arsenal Tracker
/middle-east — Middle East Ballistic Missile Tracker

## Key Files

### Nuclear Tracker
- App.tsx — root state, wires scene + UI
- threeScene.ts — Three.js globe, markers, range domes, arcs, submarine animations
- data.ts — 70+ facilities, historical warhead counts, cities, submarine patrols, utility functions

### Middle East Tracker
- MiddleEastPage.tsx — full page: globe, side panel, strike history (inline), StrikeVolumeChart, filters, date grouping
- iranStrikes.ts — 80+ strike entries + DAILY_STRIKE_DATA for bar chart
- middleEastMissiles.ts — missile sites, US/allied bases, weapons systems, country profiles

### Shared
- public/earth-night.jpg — globe texture
- public/ne_110m_admin_0_countries.geojson — country borders

## Rendering

Three.js is used imperatively — NOT react-three-fiber (causes blank screen from SES/lockdown conflict). Scene files expose API objects that React calls.

## Technical Notes

- earcut library for polygon triangulation (fixes Iran/Saudi Arabia gaps)
- Raycasting + point-in-polygon for Iran/Saudi click detection (mesh-based fails)
- Strike arcs must overlay the globe, not replace it — layering order matters
- Globe auto-rotation disabled in threat assessment and strike history modes
- npm install --legacy-peer-deps required due to React 18 peer dep conflict
