const fs = require('fs');
const path = require('path');

const manualPath = path.join(__dirname, '..', 'public', 'pwnd-manual.html');
const manualContent = fs.readFileSync(manualPath, 'utf8');

const lines = manualContent.split('\n');

for (let i = 1350; i < 1375; i++) {
    console.log(`Line ${i+1}: ${lines[i]}`);
}
