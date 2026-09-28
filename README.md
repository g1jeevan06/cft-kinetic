# CFT Kinetic — virtual museum

Craftech360's kinetic installation museum, playable in the browser (desktop, iPhone, iPad and Android).

- Open `index.html` from a web server (for example GitHub Pages), or double-click it to play offline.
- `models/` installation models, `videos/` screen videos, `showreel/showreel.mp4` the showreel, `vendor/` three.js.
- `asset-pipeline.js` prepares loaded models with frustum culling, distance LOD and PBR texture filtering. `assets/asset-manifest.json` and [ASSET_PIPELINE.md](ASSET_PIPELINE.md) define the GLB/Draco/Meshopt, KTX2/Basis and HDR/EXR handoff paths.

## 27-project environment rebuild

The central lobby follows the latest CFT museum reference: a true basement, three gallery tiers, and a walkable rooftop, with twin gallery stairs plus side service stairs, dark numbered exhibit bays with gold trim, glass railings, a central raised DNA display, reception below it, suspended light rings, palms and a blue floor map. The elevator remains decorative. Use Map → Lobby to visit, or select Basement, Floor 1, Floor 2, Upper, or Rooftop from the map. The floor map is also interactive with E.

All 27 projects retain their original numbers, with positions following the reference: ground 02–05 and 23–27; middle 15–22 and central DNA 01; upper 06–14. The atrium is 42 m across. Models are scaled to the bays while information panels retain full-size dimensions. Guided routes use both stair flights and the bridges to the DNA podium. Progress counts only available activities.

12 existing model exports are connected. 15 halls display an explicit “Model coming soon” sign. These are not finished models: TRI BLOCK V2, THE ORBIT (GYRO), NOVA WITH HOLO FAN, SLIDING DNA WITH NOVA BOT, TRI HELIX, AURORA, NEBULA, L HMRS, TELESCOPIC LED DISPLAY, ZEN-HELIX, WHICHEX, TRILIFT, AERORING, ARC REVOLVE, and NOVA SPIN.

Engineering sheets were added for both TRI BLOCK variants, NOVA WITH HOLO FAN, SLIDING DNA WITH NOVA BOT, TRI HELIX, AURORA, NEBULA, and L HMRS. Multi-page drawings can be opened individually. The historical `tri-helix` model export remains assigned to HELIX (single column); TRI HELIX is a separate hall.

Source files for Aurora, Nebula and the telescopic display were located but need preparation or configuration selection before export. Aurora has missing linked assets and geometry-node/driver issues; Nebula and the telescopic source contain several configurations. Remaining models need matching source files, textures, dimensions and motion references.

`catalog.js` owns the project list and source aliases. `gallery-layout.js` sets the three-tier display layout and stair routes. `atrium.js` builds the architecture and defines floor heights. `catalog-builders.js` selects model builders or reservations. `drawing-catalog.js` lists imported drawing pages. `navigation.js` finds routes around obstacles. Tests cover both stair flights, tier assignments, the podium bridges and routes to and from every elevated display.

Run `node check-collection.cjs` to check scripts, catalogue, hall layout, drawing assets and obstacle routing. Preview with `python -m http.server 8765 --bind 127.0.0.1` from this directory.

The complete screen-to-screen experience is documented in [GAME_FLOW.md](GAME_FLOW.md), including the reference screen names, controls, and return paths.

The supplied product brief is checked against the current implementation in [SPEC_AUDIT.md](SPEC_AUDIT.md), with the remaining production gaps and recommended order.
