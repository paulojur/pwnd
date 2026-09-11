const fs = require('fs');
const path = require('path');

const manualPath = path.join(__dirname, '..', 'public', 'pwnd-manual.html');
const html = fs.readFileSync(manualPath, 'utf8');

const match44 = html.match(/<section id="setup">[\s\S]*?4\.4[\s\S]*?<\/p>/);
if (match44) {
    console.log('Exact 4.4 text:');
    console.log(JSON.stringify(match44[0]));
} else {
    console.log('4.4 not found');
}
