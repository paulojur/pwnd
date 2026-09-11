const fs = require('fs');
const path = require('path');

const manualPath = path.join(__dirname, '..', 'public', 'pwnd-manual.html');
const manualContent = fs.readFileSync(manualPath, 'utf8');

console.log('Manual length:', manualContent.length);

// Item 1: Archetypes
const section10Match = manualContent.match(/<div class="archetype-grid">[\s\S]*?<\/div>\s*<\/div>/);
console.log('\n--- ITEM 1 (ARCHETYPES) MATCH ---');
if (section10Match) {
    console.log('Found Section 10 match, length:', section10Match[0].length);
    console.log(section10Match[0]);
} else {
    console.log('Section 10 NOT FOUND!');
}

// Item 2: Section 4.4 opening
const sec44Match = manualContent.match(/<p>A distribuição de Safeguards segue a <strong>Fórmula N\+5<\/strong>:[\s\S]*?<\/p>/);
console.log('\n--- ITEM 2 MATCH ---');
if (sec44Match) console.log(sec44Match[0]);

// Item 3: Section 8.3
const sec83Match = manualContent.match(/<section id="patchdeployed">[\s\S]*?<h3>8\.3 · Mecanismo de Defesa — Bypass<\/h3>\s*<p>[\s\S]*?<\/p>/);
console.log('\n--- ITEM 3 MATCH ---');
if (sec83Match) console.log(sec83Match[0]);

// Item 4: Section 06 Bug Hunter Note
const sec06Match = manualContent.match(/<em>Nota \(Bug Hunter\):[\s\S]*?<\/em>/);
console.log('\n--- ITEM 4 MATCH ---');
if (sec06Match) console.log(sec06Match[0]);

// Item 5: Event Deck via Recon
const item5Matches = [...manualContent.matchAll(/.*Acesso.*Event Deck via Recon.*/g)];
console.log('\n--- ITEM 5 MATCHES ---');
item5Matches.forEach(m => console.log(m[0]));

// Item 6: Glossary Bypass
const item6Match = manualContent.match(/<dt>Bypass<\/dt>\s*<dd>[\s\S]*?<\/dd>/);
console.log('\n--- ITEM 6 MATCH ---');
if (item6Match) console.log(item6Match[0]);

// Item 7: Glossary Exploit
const item7Match = manualContent.match(/<dt>Exploit<\/dt>\s*<dd>[\s\S]*?<\/dd>/);
console.log('\n--- ITEM 7 MATCH ---');
if (item7Match) console.log(item7Match[0]);

// Item 8: Glossary PATCH DEPLOYED!
const item8Match = manualContent.match(/<dt>PATCH DEPLOYED!<\/dt>\s*<dd>[\s\S]*?<\/dd>/);
console.log('\n--- ITEM 8 MATCH ---');
if (item8Match) console.log(item8Match[0]);

// Item 9: Section 02 CVSS list
const item9Match = manualContent.match(/<ul style="margin-top:0\.5rem; padding-left:1\.2rem; font-size:0\.9rem; margin-bottom:0\.8rem; color:#d1d5db;">[\s\S]*?<\/ul>/);
console.log('\n--- ITEM 9 MATCH ---');
if (item9Match) console.log(item9Match[0]);
