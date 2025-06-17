import fs from 'fs';
import path from 'path';

function readJSON(p) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), p), 'utf8'));
}

const plots = readJSON('src/data/plots.json');
const events = readJSON('src/data/events.json');
const twists = readJSON('src/data/twists.json');
const characters = readJSON('src/data/characters.json');
const kings = readJSON('src/data/kings.json');
const phases = readJSON('src/data/plot_phases.json');

const validLevels = [
  'village',
  'governor',
  'royal_court',
  'mythical_kingdom',
  'legendary_oracle',
];

const validTags = new Set([
  ...plots.flatMap(p => p.tags || []),
  ...events.flatMap(e => e.tags || []),
  ...kings.flatMap(k => k.tags || []),
  ...phases.flatMap(ph => ph.tags || []),
  ...characters.flatMap(c => c.tags || []),
  ...characters.flatMap(c => c.appearance_conditions?.plot_tags || []),
]);

const validFactions = new Set([
  ...plots.flatMap(p => (p.recommended_characters?.factions || [])),
  ...characters.map(c => c.faction),
]);

const validArchetypes = new Set([
  ...plots.flatMap(p => (p.recommended_characters?.archetypes || [])),
  ...characters.map(c => c.archetype),
]);

function findMatchingKing(plot) {
  let bestMatch = null;
  let maxMatches = 0;
  for (const king of kings) {
    const matches = (king.tags || []).filter(tag => (plot.tags || []).includes(tag)).length;
    if (matches > maxMatches) {
      bestMatch = king;
      maxMatches = matches;
    }
  }
  return maxMatches > 0 ? bestMatch : null;
}

function hasTagIA(obj) {
  return obj && obj.visual && obj.visual.tag_ia && obj.visual.tag_ia.trim() !== '';
}

function validatePlot(plot) {
  const errors = [];
  const requiredBase = ['id','inspirationalPhrase','tone','difficulty','level','tags','startingState'];
  for (const f of requiredBase) {
    if (!plot[f]) errors.push(`missing ${f}`);
  }
  const requiredExtra = ['requiredEvents','optionalTwists','revealTiming','recommended_characters'];
  for (const f of requiredExtra) {
    if (plot[f] === undefined) errors.push(`missing ${f}`);
  }
  const missingEvents = (plot.requiredEvents || []).filter(eid => !events.some(e => e.id === eid));
  if (missingEvents.length) errors.push(`unknown events: ${missingEvents.join(', ')}`);
  const missingTwists = (plot.optionalTwists || []).filter(tid => !twists.some(t => t.id === tid));
  if (missingTwists.length) errors.push(`unknown twists: ${missingTwists.join(', ')}`);
  const rec = plot.recommended_characters;
  if (rec) {
    const match = characters.some(ch =>
      (rec.factions && rec.factions.includes(ch.faction)) ||
      (rec.archetypes && rec.archetypes.includes(ch.archetype)) ||
      (rec.tags && (ch.tags || []).some(t => rec.tags.includes(t)))
    );
    if (!match) errors.push('no recommended character matches');
  }
  const kingOverlap = kings.some(k => (k.tags || []).some(t => (plot.tags || []).includes(t)));
  if (!kingOverlap) errors.push('no king shares plot tags');
  const kmatch = findMatchingKing(plot);
  if (!kmatch) errors.push('findMatchingKing returned null');
  if (!hasTagIA(plot)) errors.push('visual.tag_ia missing');
  return errors;
}

function validateCharacter(ch) {
  const errors = [];
  if (!hasTagIA(ch)) errors.push('visual.tag_ia missing');
  if (!validFactions.has(ch.faction)) errors.push(`invalid faction ${ch.faction}`);
  if (!validArchetypes.has(ch.archetype)) errors.push(`invalid archetype ${ch.archetype}`);

  if (!Array.isArray(ch.active_in_levels)) {
    errors.push('active_in_levels missing or not array');
  } else {
    const invalid = ch.active_in_levels.filter(l => !validLevels.includes(l));
    if (invalid.length) errors.push(`invalid active_in_levels: ${invalid.join(', ')}`);
  }

  const cond = ch.appearance_conditions;
  if (!cond) {
    errors.push('appearance_conditions missing');
  } else {
    if (!Array.isArray(cond.plot_tags)) errors.push('plot_tags missing');
    else {
      const bad = cond.plot_tags.filter(t => !validTags.has(t));
      if (bad.length) errors.push(`invalid plot_tags: ${bad.join(', ')}`);
    }
    if (cond.current_emotion && !Array.isArray(cond.current_emotion)) {
      errors.push('current_emotion invalid');
    }
    const lvlList = cond.advisor_level || cond.advisor_levels;
    if (!Array.isArray(lvlList)) errors.push('advisor_level missing');
    else {
      const badL = lvlList.filter(l => !validLevels.includes(l));
      if (badL.length) errors.push(`invalid advisor_level: ${badL.join(', ')}`);
    }
  }

  if (Array.isArray(ch.tags)) {
    const bad = ch.tags.filter(t => !validTags.has(t));
    if (bad.length) errors.push(`invalid tags: ${bad.join(', ')}`);
  }

  return errors;
}

const results = [];
for (const plot of plots) {
  const errors = validatePlot(plot);
  results.push({id: plot.id, errors});
}

function validateCollection(name, arr) {
  return arr.every(item => hasTagIA(item));
}

const eventsValid = validateCollection('events', events);
const twistsValid = validateCollection('twists', twists);
const charsValid = validateCollection('characters', characters);
const kingsValid = validateCollection('kings', kings);

const charResults = [];
for (const ch of characters) {
  charResults.push({ id: ch.id, errors: validateCharacter(ch) });
}

for (const res of results) {
  const status = res.errors.length ? '❌' : '✅';
  console.log(`${status} ${res.id}`);
  if (res.errors.length) console.log('  ' + res.errors.join('; '));
}

for (const res of charResults) {
  const status = res.errors.length ? '❌' : '✅';
  console.log(`${status} ${res.id}`);
  if (res.errors.length) console.log('  ' + res.errors.join('; '));
}
console.log('\nOther Checks:');
console.log(`Events visuals: ${eventsValid ? 'OK' : 'Missing tag_ia'}`);
console.log(`Twists visuals: ${twistsValid ? 'OK' : 'Missing tag_ia'}`);
console.log(`Characters visuals: ${charsValid ? 'OK' : 'Missing tag_ia'}`);
console.log(`Kings visuals: ${kingsValid ? 'OK' : 'Missing tag_ia'}`);
