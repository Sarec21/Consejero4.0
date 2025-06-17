import fs from 'fs';
import path from 'path';

function readJSON(p) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), p), 'utf8'));
}

const rumors = readJSON('src/data/rumors.json');

function validateRumor(rumor) {
  const errors = [];
  if (typeof rumor.id !== 'string') errors.push('id missing or not string');
  if (typeof rumor.texto !== 'string') errors.push('texto missing or not string');
  if (typeof rumor.peso !== 'number' || rumor.peso < 1) errors.push('peso missing or < 1');
  if (!['crisis', 'prosperidad', 'neutro'].includes(rumor.tipo)) errors.push('tipo invalid');
  if (rumor.condiciones !== undefined) {
    if (typeof rumor.condiciones !== 'object' || Array.isArray(rumor.condiciones) || rumor.condiciones === null) {
      errors.push('condiciones should be object');
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
