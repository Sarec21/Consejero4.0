import fs from 'fs';
import path from 'path';

function readJSON(p) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), p), 'utf8'));
}

const rumors = readJSON('src/data/rumors.json');

function validateRumor(rumor) {
  const errors = [];
  if (typeof rumor.id !== 'string') errors.push('id missing or not string');
  if (typeof rumor.text !== 'string') errors.push('text missing or not string');
  if (typeof rumor.weight !== 'number' || rumor.weight < 1) errors.push('weight missing or < 1');
  if (!['crisis', 'prosperity', 'neutral'].includes(rumor.type)) errors.push('type invalid');
  if (rumor.conditions !== undefined) {
    if (typeof rumor.conditions !== 'object' || Array.isArray(rumor.conditions) || rumor.conditions === null) {
      errors.push('conditions should be object');
    }
  }
  return errors;
}

for (const rumor of rumors) {
  const errors = validateRumor(rumor);
  const status = errors.length ? '❌' : '✅';
  console.log(`${status} ${rumor.id}`);
  if (errors.length) {
    console.log('  ' + errors.join('; '));
  }
}
