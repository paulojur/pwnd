const fs = require('fs');
const path = require('path');

const manualPath = path.join(__dirname, '..', 'public', 'pwnd-manual.html');
const manualContent = fs.readFileSync(manualPath, 'utf8');

const lines = manualContent.split('\n');

console.log('--- FINDING ITEM 4 (Bug Hunter Note in Sec 06) ---');
lines.forEach((line, idx) => {
    if (line.includes('Bug Hunter') && line.includes('mínimo')) {
        console.log(`Line ${idx+1}: ${line}`);
    }
});

console.log('\n--- FINDING ITEM 5 (Event Deck via Recon) ---');
lines.forEach((line, idx) => {
    if (line.includes('Event Deck via Recon')) {
        console.log(`Line ${idx+1}: ${line}`);
    }
});
