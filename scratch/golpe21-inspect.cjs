const fs = require('fs');
const path = require('path');

const manualPath = path.join(__dirname, '..', 'public', 'pwnd-manual.html');
const indexHtmlPath = path.join(__dirname, '..', 'index.html');
const manualContent = fs.readFileSync(manualPath, 'utf8');
const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

console.log('--- FINDING ITEM 1 (Section 10 Archetypes) ---');
const section10Match = manualContent.match(/<div class="archetype-grid">[\s\S]*?<\/div>\s*<\/div>/);
if (section10Match) console.log(section10Match[0]);

console.log('\n--- FINDING ITEM 2 (Card 06 index.html) ---');
const card06Match = indexContent.match(/LIMIARES DE vulnerabilidade/);
if (card06Match) {
    const lines = indexContent.split('\n');
    lines.forEach((line, i) => {
        if (line.includes('LIMIARES DE vulnerabilidade')) console.log(`index.html Line ${i+1}: ${line}`);
    });
}

console.log('\n--- FINDING ITEM 3 (Section 14) ---');
const sec14Match = manualContent.match(/2º Critério: maior número de vulnerabilidades de severidade Critical submetidas \(CVSS ≥ 9\.0\)\./);
if (sec14Match) console.log(sec14Match[0]);

console.log('\n--- FINDING ITEM 4 (Glossary Exploit) ---');
const sec17ExploitMatch = manualContent.match(/<dt>Exploit<\/dt>\s*<dd>Exploit: [\s\S]*?<\/dd>/);
if (sec17ExploitMatch) console.log(sec17ExploitMatch[0]);

console.log('\n--- FINDING ITEM 5 (Section 15) ---');
const sec15Match = manualContent.match(/<section id="rodadasfinais">[\s\S]*?<\/section>/);
if (sec15Match) {
    const lines = sec15Match[0].split('\n');
    lines.forEach((line, i) => {
        if (line.includes('Patch Implacável') || line.includes('Estratégia Final') || line.includes('Desvantagem Extrema do D8')) {
            console.log(`Sec 15 Line ${i+1}: ${line}`);
        }
    });
}
