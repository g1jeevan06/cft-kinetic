# CFT Kinetic — virtual museum

Craftech360's kinetic installation museum, playable in the browser (desktop, iPhone, iPad and Android).

- Open `index.html` from a web server (for example GitHub Pages), or double-click it to play offline.
- `models/` installation models, `videos/` screen videos, `showreel/showreel.mp4` the showreel, `vendor/` three.js.

## 27-project environment rebuild

The building is now 164 × 132 m, with 27 numbered halls across three wings, a larger ocean platform, a planted central promenade, and searchable map navigation. Hall order follows the supplied project list. Progress counts only available activities; every hall can be visited.

12 existing model exports are connected. 15 halls display an explicit “Model coming soon” sign. These are not finished models: TRI BLOCK V2, THE ORBIT (GYRO), NOVA WITH HOLO FAN, SLIDING DNA WITH NOVA BOT, TRI HELIX, AURORA, NEBULA, L HMRS, TELESCOPIC LED DISPLAY, ZEN-HELIX, WHICHEX, TRILIFT, AERORING, ARC REVOLVE, and NOVA SPIN.

Engineering sheets were added for both TRI BLOCK variants, NOVA WITH HOLO FAN, SLIDING DNA WITH NOVA BOT, TRI HELIX, AURORA, NEBULA, and L HMRS. Multi-page drawings can be opened individually. The historical `tri-helix` model export remains assigned to HELIX (single column); TRI HELIX is a separate hall.

Source files for Aurora, Nebula and the telescopic display were located but need preparation or configuration selection before export. Aurora has missing linked assets and geometry-node/driver issues; Nebula and the telescopic source contain several configurations. Remaining models need matching source files, textures, dimensions and motion references.

`catalog.js` owns the project list, source aliases and room layout. `catalog-builders.js` selects model builders or reservations. `drawing-catalog.js` lists imported drawing pages. `navigation.js` routes through the promenade around obstacles.

Run `node check-collection.cjs` to check scripts, catalogue, hall layout, drawing assets and obstacle routing. Preview with `python -m http.server 8765 --bind 127.0.0.1` from this directory.
