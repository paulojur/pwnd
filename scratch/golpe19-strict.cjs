const fs = require('fs');
const mPath = 'public/pwnd-manual.html';
let m = fs.readFileSync(mPath, 'utf8');

// Helper to replace text robustly by cutting between anchors
function replaceBetween(str, startAnchor, endAnchor, replacement) {
    const startIdx = str.indexOf(startAnchor);
    if (startIdx === -1) return str;
    const startIndex = startIdx + startAnchor.length;
    
    const endIdx = str.indexOf(endAnchor, startIndex);
    if (endIdx === -1) return str;
    
    return str.substring(0, startIndex) + replacement + str.substring(endIdx);
}

// 1. Rodada 8
// Target: "2. Patch Implacável: todos os testes de Patch Speed usam 2D8 (falha se QUALQUER dado acionar o limiar). No Stealth Mode, o limiar do programa conta 1 ponto menor: Lenta 8→7, Moderada 7→6, Rápida 6→5, Extrema 5→4. Red Teamer e Pentester continuam tomando patch apenas no resultado natural 8.:</strong> todos os testes de Patch Speed passam a exigir a rolagem de 2 dados (2D8). Para o Report não sofrer o patch, o jogador precisa de sucesso em ambos os dados individualmente.</li>"
// We want to replace from "2. Patch Implacável:" to "individualmente." with the new text.
m = replaceBetween(m, '<li><strong>', 'individualmente.', "2. Patch Implacável: todos os testes de Patch Speed usam 2D8 (falha se QUALQUER dado acionar o limiar). No Stealth Mode, o limiar do programa conta 1 ponto menor: Lenta 8→7, Moderada 7→6, Rápida 6→5, Extrema 5→4. Red Teamer e Pentester continuam tomando patch apenas no resultado natural 8.");

// 2. Burp
m = replaceBetween(m, '<td><strong>Burp Suite Pro</strong></td>', '</td>', '\n                                <td>Ignore a régua de cores do programa ao baixar 1 vulnerabilidade.');

// 3. Postman
m = replaceBetween(m, '<td><strong>Postman</strong></td>', '</td>', '\n                                <td>Baixe 1 vulnerabilidade da classe BAC ignorando a régua de cores do programa.');

// 4. SQLMap
m = replaceBetween(m, '<td><strong>SQLMap</strong></td>', '</td>', '\n                                <td>Baixe 1 vulnerabilidade da classe Injection ignorando a régua de cores do programa.');

// 5. Mão Inicial (Section 4.4)
// Replace "Cada jogador recebe 5 cartas aleatórias do Main Deck + 1 carta Bypass garantida = 6 cartas no total."
m = replaceBetween(m, 'Cada jogador recebe 5 cartas aleatórias do Main Deck ', '6 cartas no total.', 'na mão, e o Bypass inicial já está posicionado no Slot Safeguard do seu Player Mat.');
// Wait, the text is actually: "Cada jogador recebe 5 cartas aleatórias do Main Deck + 1 carta Bypass garantida = 6 cartas no total."
// Let's replace the whole string.
m = m.replace(/Cada jogador recebe 5 cartas aleatórias do Main Deck \+ 1 carta Bypass garantida = 6 cartas no total\./, 'Cada jogador recebe 5 cartas aleatórias do Main Deck na mão, e o Bypass inicial já está posicionado no Slot Safeguard do seu Player Mat.');

// 6. Cartas de Reação
// Replace "Cartas de Defesa (Bypass) podem ser compradas no Main Deck e jogadas fora do seu turno, como resposta imediata ao PATCH DEPLOYED! forçado pelos dados ou a ataques de adversários. Elas são a sua salvação final."
m = replaceBetween(m, 'Cartas de Defesa (Bypass)', 'salvação final.', 'Um Bypass recém-comprado fica na mão e NÃO protege até ser colocado no Slot Safeguard (ação livre quando o slot estiver vazio). Ele é descartado ao ser usado, anulando o PATCH DEPLOYED!.');

// 7. Fórmula do deck
// Actually this one returned true in my previous test! So it was replaced successfully.

fs.writeFileSync(mPath, m, 'utf8');
console.log('Manual Golpe 19 strict extraction applied.');
