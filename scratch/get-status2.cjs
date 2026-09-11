const fs = require('fs');
const m = fs.readFileSync('public/pwnd-manual.html', 'utf8');

let out = '';
out += '--- POSTMAN ---\n';
out += m.substring(m.indexOf('<td><strong>Postman'), m.indexOf('<td><strong>Postman') + 250) + '\n\n';

out += '--- SQLMAP ---\n';
out += m.substring(m.indexOf('<td><strong>SQLMap'), m.indexOf('<td><strong>SQLMap') + 250) + '\n\n';

out += '--- MAO INICIAL ---\n';
out += m.substring(m.indexOf('<span class="label">Mão Inicial'), m.indexOf('<span class="label">Mão Inicial') + 400) + '\n\n';

out += '--- REACAO ---\n';
out += m.substring(m.indexOf('<h3>09 · Cartas de Reação e Eventos'), m.indexOf('<h3>09 · Cartas de Reação e Eventos') + 500) + '\n\n';

fs.writeFileSync('scratch/status2.txt', out, 'utf8');
