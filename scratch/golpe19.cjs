const fs = require('fs');
const mPath = 'public/pwnd-manual.html';
let m = fs.readFileSync(mPath, 'utf8');

// 1. Rodada 8
m = m.replace(/2\. Patch Implacável:[^<]*?natural 8\.:<\/strong>[\s\S]*?individualmente\./,
    "2. Patch Implacável: todos os testes de Patch Speed usam 2D8 (falha se QUALQUER dado acionar o limiar). No Stealth Mode, o limiar do programa conta 1 ponto menor: Lenta 8→7, Moderada 7→6, Rápida 6→5, Extrema 5→4. Red Teamer e Pentester continuam tomando patch apenas no resultado natural 8.");

// 2, 3, 4. Tools in Section 11
m = m.replace(/<td><strong>Burp Suite Pro<\/strong><\/td>\s*<td>.*?<\/td>/, 
    '<td><strong>Burp Suite Pro</strong></td>\n                                <td>Ignore a régua de cores do programa ao baixar 1 vulnerabilidade.</td>');

m = m.replace(/<td><strong>Postman<\/strong><\/td>\s*<td>.*?<\/td>/, 
    '<td><strong>Postman</strong></td>\n                                <td>Baixe 1 vulnerabilidade da classe BAC ignorando a régua de cores do programa.</td>');

m = m.replace(/<td><strong>SQLMap<\/strong><\/td>\s*<td>.*?<\/td>/, 
    '<td><strong>SQLMap</strong></td>\n                                <td>Baixe 1 vulnerabilidade da classe Injection ignorando a régua de cores do programa.</td>');

// 5. Mão Inicial (Section 4.4)
m = m.replace(/Cada jogador recebe 5 cartas aleatórias do Main Deck \+ 1 carta Bypass garantida = 6 cartas no total\./, 
    "Cada jogador recebe 5 cartas aleatórias do Main Deck na mão, e o Bypass inicial já está posicionado no Slot Safeguard do seu Player Mat.");

// 6. Cartas de Reação (Section 09)
m = m.replace(/Cartas de Defesa \(Bypass\) podem ser compradas no Main Deck e jogadas fora do seu turno, como resposta imediata ao PATCH DEPLOYED! forçado pelos dados ou a ataques de adversários\. Elas são a sua salvação final\./, 
    "Um Bypass recém-comprado fica na mão e NÃO protege até ser colocado no Slot Safeguard (ação livre quando o slot estiver vazio). Ele é descartado ao ser usado, anulando o PATCH DEPLOYED!.");

// 7. Fórmula do deck (Section 4.2)
m = m.replace(/126 = 120 no deck de compra \+ N na mão \(1 Bypass por\s*jogador\) \+ \(6 − N\) na caixa/, 
    "126 = 120 no deck de compra + N no Slot Safeguard (1 Bypass por jogador) + (6 − N) na caixa");

fs.writeFileSync(mPath, m, 'utf8');
console.log('Manual Golpe 19 applied.');
