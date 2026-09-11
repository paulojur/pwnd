const fs = require('fs');
let m = fs.readFileSync('public/pwnd-manual.html', 'utf8');

m = m.replace(/<li><strong>2\. Patch Implacável:[\s\S]*?anulação de vulnerabilidades\.\s*<\/li>/,
    "<li><strong>2. Patch Implacável:</strong> todos os testes de Patch Speed usam 2D8 (falha se QUALQUER dado acionar o limiar). No Stealth Mode, o limiar do programa conta 1 ponto menor: Lenta 8→7, Moderada 7→6, Rápida 6→5, Extrema 5→4. Red Teamer e Pentester continuam tomando patch apenas no resultado natural 8.\n                    </li>");

fs.writeFileSync('public/pwnd-manual.html', m, 'utf8');
console.log('Rodada 8 fixed!');
