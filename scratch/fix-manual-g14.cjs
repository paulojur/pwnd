const fs = require('fs');

let html = fs.readFileSync('public/pwnd-manual.html', 'utf-8');

html = html.replace(/🔴 INJ/g, 'INJ');
html = html.replace(/🟣 BAC/g, 'BAC');
html = html.replace(/🟡 XSS/g, 'XSS');
html = html.replace(/🟠 AUTH/g, 'AUTH');
html = html.replace(/🔵 SSRF/g, 'SSRF');
html = html.replace(/🟤 BL/g, 'LOGIC');
html = html.replace(/⚪ CRYPTO/g, 'CRYPTO');
html = html.replace(/🌟 LEGENDARY/g, '⚡ LEGENDARY');

// Change hex colors to user requests just to be sure:
html = html.replace(/background:#f0883e/g, 'background:#E67E22'); // INJ
html = html.replace(/background:#4b0082/g, 'background:#4B0082'); // BAC
html = html.replace(/background:#ff69b4/g, 'background:#E91E63'); // XSS
html = html.replace(/background:#ffd700/g, 'background:#F1C40F'); // AUTH
html = html.replace(/background:#00ffff/g, 'background:#2196F3'); // SSRF
html = html.replace(/background:#008080/g, 'background:#008080'); // LOGIC
html = html.replace(/background:#39d353/g, 'background:#27AE60'); // CRYPTO
html = html.replace(/background:#ee82ee/g, 'background:#B39DDB'); // LEGENDARY

fs.writeFileSync('public/pwnd-manual.html', html);
console.log('Manual updated successfully.');
