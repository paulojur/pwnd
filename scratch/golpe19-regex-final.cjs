const fs = require('fs');
let m = fs.readFileSync('public/pwnd-manual.html', 'utf8');

// 1. Rodada 8
m = m.replace(/2\. Patch Implacável:[^<]*?natural 8\.:<\/strong>[\s\S]*?individualmente\./,
    "2. Patch Implacável: todos os testes de Patch Speed usam 2D8 (falha se QUALQUER dado acionar o limiar). No Stealth Mode, o limiar do programa conta 1 ponto menor: Lenta 8→7, Moderada 7→6, Rápida 6→5, Extrema 5→4. Red Teamer e Pentester continuam tomando patch apenas no resultado natural 8.");

// 2. Burp Suite Pro
m = m.replace(/<td><strong>Burp Suite Pro<\/strong> — Ignore a régua de cores do programa ao baixar 1 vulnerabilidade\.<\/td>[\s\S]*?<td>Coringa universal — substitui qualquer exigência de ferramenta ao baixar[\s\S]*?vulnerabilidades\.<\/td>/,
    "<td><strong>Burp Suite Pro</strong></td>\n                                <td>Ignore a régua de cores do programa ao baixar 1 vulnerabilidade.</td>");

// 3. Postman
m = m.replace(/<td><strong>Postman<\/strong><\/td>[\s\S]*?<td>Reduz em 1 unidade o custo de ferramentas para vulnerabilidades da classe Broken[\s\S]*?Access Control\.<\/td>/,
    "<td><strong>Postman</strong></td>\n                                <td>Baixe 1 vulnerabilidade da classe BAC ignorando a régua de cores do programa.</td>");

// 4. SQLMap
m = m.replace(/<td><strong>SQLMap<\/strong><\/td>[\s\S]*?<td>Vulnerabilidades da classe Injection têm custo de ferramentas zerado\. Inclui SQLi,[\s\S]*?NoSQLi e Command Injection\.<\/td>/,
    "<td><strong>SQLMap</strong></td>\n                                <td>Baixe 1 vulnerabilidade da classe Injection ignorando a régua de cores do programa.</td>");

// 5. Mão Inicial (Section 4.4)
m = m.replace(/Cada jogador recebe <strong>5 cartas aleatórias do Main Deck \+ 1 carta Bypass[\s\S]*?garantida<\/strong> = <strong>6 cartas no total<\/strong>\./,
    "Cada jogador recebe <strong>5 cartas aleatórias do Main Deck na mão</strong>, e o Bypass inicial já está posicionado no <strong>Slot Safeguard do seu Player Mat</strong>.");

// 6. Cartas de Reação
m = m.replace(/Cartas de Defesa \(<em>Bypass<\/em>\) podem ser compradas no Main Deck e jogadas <strong>fora do seu[\s\S]*?turno<\/strong>, como resposta imediata ao <em>PATCH DEPLOYED!<\/em> forçado pelos dados ou a[\s\S]*?ataques de adversários\. Elas são a sua salvação final\./,
    "Um Bypass recém-comprado fica na mão e NÃO protege até ser colocado no Slot Safeguard (ação livre quando o slot estiver vazio). Ele é descartado ao ser usado, anulando o PATCH DEPLOYED!.");

// 7. Fórmula do deck (Section 4.2)
m = m.replace(/126 = 120 no deck de compra \+ N na mão \(1 Bypass por[\s\S]*?jogador\) \+ \(6 − N\) na caixa/,
    "126 = 120 no deck de compra + N no Slot Safeguard (1 Bypass por jogador) + (6 − N) na caixa");

fs.writeFileSync('public/pwnd-manual.html', m, 'utf8');
console.log('Regex replace complete!');
