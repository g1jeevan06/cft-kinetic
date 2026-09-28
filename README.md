# CFT Kinetic — virtual museum

Craftech360's kinetic installation museum, playable in the browser (desktop, iPhone, iPad and Android).

- Open `index.html` from a web server (for example GitHub Pages), or double-click it to play offline.
- `models/` installation models, `videos/` screen videos, `showreel/showreel.mp4` the showreel, `vendor/` three.js.

## 27-project environment rebuild

The central lobby now follows the supplied futuristic atrium reference: twin illuminated staircases, a walkable U-shaped upper gallery, glass railings, an octagonal skylight, warm wall lighting, a low directory island and a blue-lit glass elevator display. The elevator is decorative. Use Map → Lobby to visit; the stairs lead to the gallery. `atrium.js` contains the architecture and height rules. The collection check also verifies stair ascent, the upper landing, walking under the balcony and railing boundaries.

All 27 numbered project spaces now sit around the atrium itself: 01–14 on the ground gallery and 15–27 on the upper gallery. The atrium was widened to 42 m to fit the displays. Models are scaled to the bays; information panels retain full-size dimensions. The map has a floor selector, floor-aware jumps and a Lobby shortcut. Guided routes use the stairs between floors. Project order follows the supplied list, and progress counts only available activities.

12 existing model exports are connected. 15 halls display an explicit “Model coming soon” sign. These are not finished models: TRI BLOCK V2, THE ORBIT (GYRO), NOVA WITH HOLO FAN, SLIDING DNA WITH NOVA BOT, TRI HELIX, AURORA, NEBULA, L HMRS, TELESCOPIC LED DISPLAY, ZEN-HELIX, WHICHEX, TRILIFT, AERORING, ARC REVOLVE, and NOVA SPIN.

Engineering sheets were added for both TRI BLOCK variants, NOVA WITH HOLO FAN, SLIDING DNA WITH NOVA BOT, TRI HELIX, AURORA, NEBULA, and L HMRS. Multi-page drawings can be opened individually. The historical `tri-helix` model export remains assigned to HELIX (single column); TRI HELIX is a separate hall.

Source files for Aurora, Nebula and the telescopic display were located but need preparation or configuration selection before export. Aurora has missing linked assets and geometry-node/driver issues; Nebula and the telescopic source contain several configurations. Remaining models need matching source files, textures, dimensions and motion references.

`catalog.js` owns the project list and source aliases. `gallery-layout.js` sets the final two-floor display layout and stair routes. `catalog-builders.js` selects model builders or reservations. `drawing-catalog.js` lists imported drawing pages. `navigation.js` finds routes around obstacles. Tests include routes to and from every upstairs display.

Run `node check-collection.cjs` to check scripts, catalogue, hall layout, drawing assets and obstacle routing. Preview with `python -m http.server 8765 --bind 127.0.0.1` from this directory.
