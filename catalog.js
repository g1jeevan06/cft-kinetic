// The 27-project collection. Hall numbers always follow the team's supplied order.
(function () {
  const previous = Object.fromEntries(CFT.EXHIBITS.map(e => [e.id, e]));
  const entries = [
    ['dna', 'DNA', 'dna'], ['hmrs', 'HMRS', 'hmrs'], ['matrix', 'MATRIX', 'matrix'],
    ['tri-block-v1', 'TRI BLOCK V1', 'triblock'], ['tri-block-v2', 'TRI BLOCK V2'],
    ['the-orbit-gyro', 'THE ORBIT (GYRO)'], ['sliding-dna', 'SLIDING DNA', 'sliding-dna'],
    ['nova-bot', 'NOVA BOT', 'nova-bot'], ['kuka-bot', 'KUKA BOT', 'kuka-bot'],
    ['nova-with-holo-fan', 'NOVA WITH HOLO FAN'], ['sliding-dna-with-nova-bot', 'SLIDING DNA WITH NOVA BOT'],
    ['helix', 'HELIX', 'tri-helix'], ['tri-helix', 'TRI HELIX'], ['hexora', 'HEXORA', 'hexora'],
    ['curve-hmrs', 'CURVE HMRS', 'c-hmrs'], ['aurora', 'AURORA'], ['nebula', 'NEBULA'], ['l-hmrs', 'L HMRS'],
    ['telescopic-led-display', 'TELESCOPIC LED DISPLAY'], ['zen-helix', 'ZEN-HELIX'], ['whichex', 'WHICHEX'],
    ['trilift', 'TRILIFT'], ['kinetic-mobile-podium', 'KINETIC MOBILE (PODIUM)', 'kinetic-mobile'],
    ['aeroring', 'AERORING'], ['flying-screen', 'FLYING SCREEN', 'flying-screen'],
    ['arc-revolve', 'ARC REVOLVE'], ['nova-spin', 'NOVA SPIN']
  ];
  const colors = ['#E9B44C', '#6E8BFF', '#29E0C2'];
  CFT.EXHIBITS = entries.map(([id, name, sourceId], index) => {
    const old = sourceId && previous[sourceId];
    const pending = {
      year: 2026, accent: colors[Math.floor(index / 9)], materials: 'Awaiting the source specification',
      tagline: 'A dedicated space in the Craftech360 collection. Model coming soon.',
      overview: [`${name} has its own numbered hall in the 27-project collection.`, 'The installation model and its motion will appear here once the source files have been prepared.'],
      technology: {text: 'The technical description will be added from the approved source files.', points: ['Dedicated exhibition hall', 'Engineering and motion details coming soon']},
      engineering: {text: 'The engineering drawing and dimensions are awaiting verification.', callouts: []},
      specs: [['Project', name], ['Source model', 'Coming soon']], video: ['Model coming soon', 'Model coming soon', 'Model coming soon', 'Model coming soon']
    };
    return Object.assign({}, old || pending, { id, name, sourceId: sourceId || null, bonus: false,
      hallNumber: index + 1, wing: ['West', 'North', 'East'][Math.floor(index / 9)], pendingModel: !sourceId });
  });
  // Copy known drawings to their new catalogue IDs before clearing ambiguous old mappings.
  const drawings = Object.assign({}, CFT.DRAWINGS), footprints = Object.assign({}, CFT.FOOTPRINT);
  CFT.EXHIBITS.forEach(e => {
    if (e.sourceId && drawings[e.sourceId]) CFT.DRAWINGS[e.id] = drawings[e.sourceId];
    if (e.sourceId && footprints[e.sourceId]) CFT.FOOTPRINT[e.id] = footprints[e.sourceId];
  });
  delete CFT.DRAWINGS['tri-helix']; // The existing sheet is for the single Helix, not the separate Tri Helix.
  delete CFT.DRAWINGS['nova-bot']; // Existing embedded sheet depicts the Holo Fan variant.
  if (drawings['nova-bot']) CFT.DRAWINGS['nova-with-holo-fan'] = drawings['nova-bot'];
  CFT.ROUTE = CFT.EXHIBITS.map(e => e.id);
  CFT.CREDITS = CFT.CREDITS.filter(row => !['Installations','Expansion halls'].includes(row[0]));
  CFT.CREDITS.push(['Collection', '27 project halls across West, North and East wings']);
  CFT.ACHIEVEMENTS = CFT.ACHIEVEMENTS.filter(a => a.id !== 'expansion');
  CFT.ACHIEVEMENTS.find(a => a.id === 'first').text = 'Explore your first project hall.';
  CFT.activityAvailable = (e, activity) => activity === 'visited' ||
    (activity === 'diagram' ? !!CFT.DRAWINGS[e.id] || !e.pendingModel : !e.pendingModel);
  CFT.NARRATION.welcome = 'Welcome to CFT Kinetic. Explore twenty-seven project halls across three wings. Follow the numbered route, or open the map to choose your next stop.';
  CFT.NARRATION.complete = 'You have explored all twenty-seven project halls. Return to the central lobby to see your tour summary.';
  CFT.ACHIEVEMENTS.forEach(a => { a.text = a.text.replace('all nine tour installations', 'all available installations'); });
  CFT.MUSEUM_INFO.layout = 'Twenty-seven numbered halls form three wings around a central exhibition promenade. The West Wing contains halls 01–09, the North Wing 10–18, and the East Wing 19–27.';
  CFT.MUSEUM_INFO.dimensions = [['Main building', '164 × 132 m'], ['Main ceiling', '7 m'], ['Project halls', '27 across three wings'], ['Central lobby', '26 m square atrium with upper gallery'], ['Hall entries', '3.2 m wide'], ['Entrance pavilion', '20 × 11 m']];
  CFT.COLLECTION = { total: 27, version: 3, wings: [
    { name: 'West', label: '01—09', color: '#E9B44C' },
    { name: 'North', label: '10—18', color: '#6E8BFF' },
    { name: 'East', label: '19—27', color: '#29E0C2' }
  ] };
  // Rooms are generated from the catalogue so IDs, hall numbers, map and tour cannot drift apart.
  CFT.LAYOUT = { building: {x0:-82,x1:82,z0:-102,z1:30}, promenade: {x0:-66,x1:66,z0:-86,z1:29.5} };
  CFT.LAYOUT.rooms = CFT.EXHIBITS.map((e, i) => {
    if (i < 9) return { id:e.id, x0:-81.7, x1:-66, z0:18-(i+1)*12, z1:18-i*12, face:'+x' };
    if (i < 18) return { id:e.id, x0:-66+(i-9)*(132/9), x1:-66+(i-8)*(132/9), z0:-101.7, z1:-86, face:'+z' };
    return { id:e.id, x0:66, x1:81.7, z0:-90+(i-18)*12, z1:-78+(i-18)*12, face:'-x' };
  });
})();
