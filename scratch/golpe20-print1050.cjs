const fs = require('fs');
const path = require('path');

const manualPath = path.join(__dirname, '..', 'public', 'pwnd-manual.html');
const html = fs.readFileSync(manualPath, 'utf8');

const lines = html.split(/\r?\n/);
for (let i = 1050; i < 1065; i++) {
    console.log(`Line ${i+1}: ${lines[i]}`);
}
