const fs = require('fs');
const m = fs.readFileSync('public/pwnd-manual.html', 'utf8');

let out = '';
out += '--- RODADA 8 ---\n';
out += m.substring(m.indexOf('2. Patch Implacável:'), m.indexOf('2. Patch Implacável:') + 400) + '\n\n';

out += '--- BURP ---\n';
const burpIdx = m.indexOf('<td><strong>Burp Suite Pro</strong>');
out += m.substring(burpIdx, burpIdx + 200) + '\n\n';

out += '--- POSTMAN ---\n';
const postIdx = m.indexOf('<td><strong>Postman</strong>');
out += m.substring(postIdx, postIdx + 200) + '\n\n';

out += '--- SQLMAP ---\n';
const sqlIdx = m.indexOf('<td><strong>SQLMap</strong>');
out += m.substring(sqlIdx, sqlIdx + 200) + '\n\n';

out += '--- MAO INICIAL ---\n';
const maoIdx = m.indexOf('Cada jogador recebe 5 cartas');
out += (maoIdx !== -1 ? m.substring(maoIdx, maoIdx + 200) : 'NOT FOUND') + '\n\n';

out += '--- REACAO ---\n';
const reacaoIdx = m.indexOf('Cartas de Defesa');
out += (reacaoIdx !== -1 ? m.substring(reacaoIdx, reacaoIdx + 400) : 'NOT FOUND') + '\n\n';

fs.writeFileSync('scratch/status.txt', out, 'utf8');
console.log('Status file written');
