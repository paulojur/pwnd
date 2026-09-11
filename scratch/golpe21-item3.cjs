const fs = require('fs');
const path = require('path');

const manualPath = path.join(__dirname, '..', 'public', 'pwnd-manual.html');
const manualContent = fs.readFileSync(manualPath, 'utf8');

const lines = manualContent.split('\n');
lines.forEach((line, i) => {
    if (line.includes('2º Critério:')) {
        console.log(`Sec 14 Line ${i+1}: ${line}`);
    }
});
