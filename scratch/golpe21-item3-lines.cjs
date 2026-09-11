const fs = require('fs');
const path = require('path');

const manualPath = path.join(__dirname, '..', 'public', 'pwnd-manual.html');
const lines = fs.readFileSync(manualPath, 'utf8').split('\n');

for (let i = 2205; i < 2210; i++) {
    console.log(`Line ${i+1}: ${lines[i]}`);
}
