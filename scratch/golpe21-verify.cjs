const fs = require('fs');
const path = require('path');

const manualPath = path.join(__dirname, '..', 'public', 'pwnd-manual.html');
const content = fs.readFileSync(manualPath, 'utf8');

const forbidden = [
    'Engine Builder',
    'Set Collection',
    'Take That',
    'Resgate de Recompensa',
    'Ação de Desativar',
    'Resgate Imediato',
    'Risco do D8',
    'Custo Extra do Reroll',
    'Eventos Fixos',
    'Ação Extra de Tools',
    'Raridade Alta',
    'Impacto Maior',
    'Ferramentas Leves',
    'Triage Dupla',
    'Alvos Críticos',
    'Mão Dupla',
    'Vulnerabilidade Menor',
    'Falha Grave',
    'Lendária (Laranja)'
];

const required = [
    'Slot Safeguard',
    'Fórmula N+5',
    'Regra do N+5',
    'O valor nominal de uma vulnerabilidade',
    'Lendária Dourada'
];

let failed = false;
console.log('--- FORBIDDEN CHECK ---');
forbidden.forEach(term => {
    if (content.includes(term)) {
        console.log(`❌ Forbidden term found: ${term}`);
        failed = true;
    }
});
if (!failed) console.log('✅ No forbidden terms found.');

console.log('--- REQUIRED CHECK ---');
required.forEach(term => {
    if (!content.includes(term)) {
        console.log(`❌ Required term missing: ${term}`);
        failed = true;
    }
});
if (!failed) console.log('✅ All required terms present.');
