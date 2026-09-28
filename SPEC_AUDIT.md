# CFT Kinetic Museum — implementation audit

Compared with the supplied project brief:

## Already working

- Playable Three.js/WebGL first-person museum with WASD, mouse, sprint, E interaction, M map, Tab journal and Esc pause.
- Five-level atrium with basement and rooftop decks, stairs, bridges, elevator display, reception, floor map, railings, exhibit bays and animated installations.
- Central DNA kinetic display with helix motion, suspended points, lighting and a raised podium.
- GLTF/GLB model loading, lazy model pass, animated screen content, model reservations and source-size metadata.
- Exhibit panels with overview, technology, diagrams, gallery, video and specifications tabs.
- Gallery thumbnails/lightbox, live demonstration video canvas, chapters and media controls.
- Five-level map with markers, current position, routing, floor selection and jump-to-hall.
- HUD compass, objective, current zone, interaction prompt, progress and minimap.
- Pause menu, settings for volume/voice/invert-Y/quality/sky/third-person/guide, journal, achievements, summary, credits and exit.
- Responsive touch controls and a reference-style welcome screen with Start Tour and Explore Freely.
- 27-project catalogue with 12 source model exports and 15 clearly marked pending model reservations.

## Still missing or partial

- Basement and Rooftop are now true walkable levels. The map exposes Basement, Floor 1, Floor 2, Upper and Rooftop, with service and visitor deck geometry plus side stair connections.
- CTRL crouch is not implemented yet; C currently toggles first/third-person view.
- Gamepad input and WebXR/VR input are not implemented.
- AR view, share action, playlist/video-quality controls, captions and presentation mode are not implemented.
- Achievement XP/levels/progress bars and reward tiers are only a basic unlocked/locked journal state.
- Settings still need theme, text size, high contrast, language, subtitles, haptics, notifications, privacy and clear-cache controls.
- Reflection probes, compressed textures, Draco/Meshopt LOD assets and occlusion culling need a production asset pass.
- The brief's ten named sample exhibits are represented by the existing CFT 27-project catalogue; matching replacement GLB exports can be swapped through `catalog-builders.js` without changing the interaction system.

## Priority order

1. Add crouch and gamepad input.
2. Expand the map model to Basement/Rooftop if those levels are required.
3. Add achievement XP/levels and the remaining settings fields.
4. Add WebXR/AR and richer video/share controls.
5. Replace pending reservations with optimized GLB exports and compressed PBR/HDR assets.
