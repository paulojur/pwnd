const fs = require('fs');
const path = require('path');

const manualPath = path.join(__dirname, '..', 'public', 'pwnd-manual.html');
const html = fs.readFileSync(manualPath, 'utf8');

const checks = [
    'Blue Team Hunt!',
    'Swag Drop!',
    'Burp Suite Pro',
    'OWASP ZAP',
    'Postman',
    'SQLMap',
    'Fórmula N+5',
    'Slot Safeguard'
];

console.log('--- GOLPE 19 INTEGRITY CHECKS ---');
checks.forEach(c => {
    const found = html.includes(c);
    console.log(`${found ? '✅' : '❌'} ${c}`);
});
