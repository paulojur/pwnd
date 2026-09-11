const fs = require('fs');
const path = require('path');

const manualPath = path.join(__dirname, '..', 'public', 'pwnd-manual.html');
const indexHtmlPath = path.join(__dirname, '..', 'index.html');

let manualContent = fs.readFileSync(manualPath, 'utf8');
let indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

const hasCRLF = manualContent.includes('\r\n');
if (hasCRLF) manualContent = manualContent.replace(/\r\n/g, '\n');

const indexHasCRLF = indexContent.includes('\r\n');
if (indexHasCRLF) indexContent = indexContent.replace(/\r\n/g, '\n');

const changelog = [];
function recordChange(itemNum, itemName, oldText, newText) {
    changelog.push({ itemNum, itemName, oldText, newText });
}

// === ITEM 1 ===
const oldArchetypesMatch = manualContent.match(/<div class="archetype-grid">[\s\S]*?<\/div>\s*<\/div>/);
if (!oldArchetypesMatch) throw new Error('Item 1 match failed');
const oldArchetypes = oldArchetypesMatch[0];
let newArchetypes = oldArchetypes;

// n00b
newArchetypes = newArchetypes.replace(
    /<p style="margin-top:\.6rem"><strong>Limite de Mão:<\/strong> 6 cartas<\/p>\s*<ul style="margin-top:\.6rem; padding-left:1\.2rem;">\s*<li>Limite de Mão: 6 cartas<\/li>\s*<li>Garimpa 1 Tool por Report<\/li>\s*<\/ul>/,
    `<p style="margin-top:.6rem"><strong>Limite de Mão:</strong> 6 cartas</p>
                        <ul style="margin-top:.6rem; padding-left:1.2rem;">
                            <li>Garimpa 1 Tool por Report</li>
                        </ul>`
);

// The Old Guard
newArchetypes = newArchetypes.replace(
    /<p style="margin-top:\.6rem"><strong>Limite de Mão:<\/strong> 9 cartas<\/p>\s*<ul style="margin-top:\.6rem; padding-left:1\.2rem;">\s*<li>Limite de Mão: 9 cartas<\/li>\s*<\/ul>/,
    `<p style="margin-top:.6rem"><strong>Limite de Mão:</strong> 9 cartas</p>
                        <ul style="margin-top:.6rem; padding-left:1.2rem;">
                            <li>+3 cartas de capacidade sobre os demais jogadores</li>
                        </ul>`
);

// Bug Hunter
newArchetypes = newArchetypes.replace(
    /<p style="margin-top:\.6rem"><strong>Limite de Mão:<\/strong> 6 cartas<\/p>\s*<ul style="margin-top:\.6rem; padding-left:1\.2rem;">\s*<li>Limite de Mão: 6 cartas<\/li>\s*<li>Restrito a Comum e Incomum<\/li>\s*<\/ul>/,
    `<p style="margin-top:.6rem"><strong>Limite de Mão:</strong> 6 cartas</p>
                        <ul style="margin-top:.6rem; padding-left:1.2rem;">
                            <li>Restrito a Comum e Incomum</li>
                        </ul>`
);

// Social Engineer
newArchetypes = newArchetypes.replace(
    /<p style="margin-top:\.6rem"><strong>Limite de Mão:<\/strong> 6 cartas<\/p>\s*<ul style="margin-top:\.6rem; padding-left:1\.2rem;">\s*<li>Limite de Mão: 6 cartas<\/li>\s*<li>Redireciona cartas de evento<\/li>\s*<li>Alta interação PvP<\/li>\s*<\/ul>/,
    `<p style="margin-top:.6rem"><strong>Limite de Mão:</strong> 6 cartas</p>
                        <ul style="margin-top:.6rem; padding-left:1.2rem;">
                            <li>Redireciona cartas de evento</li>
                            <li>Alta interação PvP</li>
                        </ul>`
);

if (oldArchetypes === newArchetypes) throw new Error('Item 1 replacement did nothing');
manualContent = manualContent.replace(oldArchetypes, newArchetypes);
recordChange(1, 'Seção 10 — remover bullet duplicado', oldArchetypes, newArchetypes);

// === ITEM 2 ===
const oldIndexText = 'LIMIARES DE vulnerabilidade';
const newIndexText = 'LIMIARES DE PATCH';
if (!indexContent.includes(oldIndexText)) throw new Error('Item 2 match failed');
indexContent = indexContent.replace(oldIndexText, newIndexText);
recordChange(2, 'index.html Card 06', oldIndexText, newIndexText);

// === ITEM 3 ===
const sec14Match = manualContent.match(/<li><strong>2º Critério:<\/strong>\s*maior\s*número\s*de\s*vulnerabilidades\s*de\s*severidade\s*Critical\s*submetidas\s*\(CVSS\s*≥\s*9\.0\)\.<\/li>/);
if (!sec14Match) throw new Error('Item 3 match failed');
const oldSec14 = sec14Match[0];
const newSec14 = `<li><strong>2º Critério:</strong> maior número de vulnerabilidades de raridade Lendária submetidas (CVSS ≥ 9.0).</li>`;
manualContent = manualContent.replace(oldSec14, newSec14);
recordChange(3, 'Seção 14 (Critérios de Desempate)', oldSec14, newSec14);

// === ITEM 4 ===
const sec17ExploitMatch = manualContent.match(/<dt>Exploit<\/dt>\s*<dd>Exploit: ação de alocar uma vulnerabilidade na Zona de Exploits do Player Mat, respeitando o escopo do programa ativo\. Não há custo de ferramentas para baixar vulnerabilidades\.<\/dd>/);
if (!sec17ExploitMatch) throw new Error('Item 4 match failed');
const oldExploit = sec17ExploitMatch[0];
const newExploit = `<dt>Exploit</dt>
                    <dd>Ação de alocar uma vulnerabilidade na Zona de Exploits do Player Mat, respeitando o escopo do programa ativo. Não há custo de ferramentas para baixar vulnerabilidades.</dd>`;
manualContent = manualContent.replace(oldExploit, newExploit);
recordChange(4, 'Glossário (Exploit)', oldExploit, newExploit);

// === ITEM 5 ===
const oldPatchImplacavelMatch = manualContent.match(/<li><strong>2\. Patch Implacável:<\/strong>/);
if (!oldPatchImplacavelMatch) throw new Error('Item 5a match failed');
manualContent = manualContent.replace(/<li><strong>2\. Patch Implacável:<\/strong>/, '<li><strong>1. Patch Implacável:</strong>');

const oldEstrategiaMatch = manualContent.match(/<li><strong>3\. Estratégia Final:<\/strong>/);
if (!oldEstrategiaMatch) throw new Error('Item 5b match failed');
manualContent = manualContent.replace(/<li><strong>3\. Estratégia Final:<\/strong>/, '<li><strong>2. Estratégia Final:</strong>');

const oldDesvantagemMatch = manualContent.match(/Desvantagem Extrema do D8/);
if (!oldDesvantagemMatch) throw new Error('Item 5c match failed');
manualContent = manualContent.replace(/Desvantagem Extrema do D8/, 'teste duplo de Patch Speed');
recordChange(5, 'Seção 15 (Renumerar e renomear)', '2. Patch Implacável / 3. Estratégia Final / Desvantagem Extrema do D8', '1. Patch Implacável / 2. Estratégia Final / teste duplo de Patch Speed');

// SAVE
if (hasCRLF) manualContent = manualContent.replace(/\n/g, '\r\n');
if (indexHasCRLF) indexContent = indexContent.replace(/\n/g, '\r\n');

fs.writeFileSync(manualPath, manualContent, 'utf8');
fs.writeFileSync(indexHtmlPath, indexContent, 'utf8');
fs.writeFileSync(path.join(__dirname, 'golpe21-changelog.json'), JSON.stringify(changelog, null, 2), 'utf8');

console.log('Files successfully updated!');

// VALIDATION
let manualForValidation = hasCRLF ? manualContent.replace(/\r\n/g, '\n') : manualContent;
let indexForValidation = indexHasCRLF ? indexContent.replace(/\r\n/g, '\n') : indexContent;

const n00bDupe = manualForValidation.match(/<h4>n00b<\/h4>[\s\S]*?<li>Limite de Mão: 6 cartas<\/li>/);
const bugHunterDupe = manualForValidation.match(/<h4>Bug Hunter<\/h4>[\s\S]*?<li>Limite de Mão: 6 cartas<\/li>/);
const socialEngDupe = manualForValidation.match(/<h4>Social Engineer<\/h4>[\s\S]*?<li>Limite de Mão: 6 cartas<\/li>/);
const oldGuardDupe = manualForValidation.match(/<h4>The Old Guard<\/h4>[\s\S]*?<li>Limite de Mão: 9 cartas<\/li>/);

let failed = false;
if (n00bDupe) { console.log('❌ n00b duplicate bullet found'); failed = true; }
if (bugHunterDupe) { console.log('❌ Bug Hunter duplicate bullet found'); failed = true; }
if (socialEngDupe) { console.log('❌ Social Engineer duplicate bullet found'); failed = true; }
if (oldGuardDupe) { console.log('❌ The Old Guard duplicate bullet found'); failed = true; }

if (manualForValidation.includes('severidade Critical submetidas')) {
    console.log('❌ "severidade Critical submetidas" found');
    failed = true;
}
if (manualForValidation.includes('<dd>Exploit: ')) {
    console.log('❌ "<dd>Exploit: " found');
    failed = true;
}
if (indexForValidation.includes('LIMIARES DE vulnerabilidade')) {
    console.log('❌ "LIMIARES DE vulnerabilidade" found in index.html');
    failed = true;
}

if (!failed) {
    console.log('✅ All validations passed successfully.');
} else {
    process.exit(1);
}
