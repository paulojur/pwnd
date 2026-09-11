const fs = require('fs');
const mPath = 'public/pwnd-manual.html';
let m = fs.readFileSync(mPath, 'utf8');

// 2. Data Breach (event 21)
m = m.replace(/Auditoria de dados! Todos revelam a mão\.\s*Quem tiver mais vulnerabilidades de\s*severidade Critical descart.*?(\s*)<\/td>/, 'Auditoria de dados! Todos revelam a mão. O jogador com mais vulnerabilidades de CVSS ≥ 8.0 descarta metade delas (arredondado para cima). Em caso de empate, todos os empatados descartam.$1</td>');

// 5. Bypass passages
m = m.replace(/separe 1 Bypass para a mão de\s*cada jogador/g, 'separe 1 Bypass para o Slot Safeguard de cada jogador');

fs.writeFileSync(mPath, m, 'utf8');
console.log('Fixed bypass and data breach!');
