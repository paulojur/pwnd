const fs = require('fs');
const mPath = 'public/pwnd-manual.html';
let m = fs.readFileSync(mPath, 'utf8');

// 1. Rodada 8
m = m.replace(/2\. Patch Implacável:[^<]*?natural 8\.:<\/strong>[\s\S]*?individualmente\.<\/li>/,
    "2. Patch Implacável: todos os testes de Patch Speed usam 2D8 (falha se QUALQUER dado acionar o limiar). No Stealth Mode, o limiar do programa conta 1 ponto menor: Lenta 8→7, Moderada 7→6, Rápida 6→5, Extrema 5→4. Red Teamer e Pentester continuam tomando patch apenas no resultado natural 8.</li>");

// 2. Burp
m = m.replace(/<td><strong>Burp Suite Pro<\/strong> — Ignore a régua de cores do programa ao baixar 1 vulnerabilidade\.<\/td>[\s\S]*?ferramenta ao baixar vulnerabilidades\.<\/td>/,
    "<td><strong>Burp Suite Pro</strong></td>\n                                <td>Ignore a régua de cores do programa ao baixar 1 vulnerabilidade.</td>");

// 6. Cartas de Reação
m = m.replace(/Cartas de Defesa \(Bypass\)Um Bypass recém-comprado fica na mão e NÃO protege até ser colocado no Slot Safeguard \(ação livre quando o slot estiver vazio\)\. Ele é descartado ao ser usado, anulando o PATCH DEPLOYED!\.salvação final\./,
    "Um Bypass recém-comprado fica na mão e NÃO protege até ser colocado no Slot Safeguard (ação livre quando o slot estiver vazio). Ele é descartado ao ser usado, anulando o PATCH DEPLOYED!.");

// Find Mao Inicial dynamically
const idx = m.indexOf('Cada jogador recebe 5');
console.log('Mao Inicial idx:', idx);
if (idx === -1) {
    // maybe it has tags or newlines?
    const match = m.match(/Cada jogador recebe 5 cartas aleatórias do Main Deck[\s\S]*?6 cartas no total\./);
    if (match) {
        m = m.replace(match[0], "Cada jogador recebe 5 cartas aleatórias do Main Deck na mão, e o Bypass inicial já está posicionado no Slot Safeguard do seu Player Mat.");
        console.log('Mao inicial replaced via regex match');
    } else {
        console.log('Mao Inicial completely missing. Trying fallback.');
        const match2 = m.match(/Cada jogador recebe 5 cartas[\s\S]*?total\./);
        if (match2) {
             m = m.replace(match2[0], "Cada jogador recebe 5 cartas aleatórias do Main Deck na mão, e o Bypass inicial já está posicionado no Slot Safeguard do seu Player Mat.");
        }
    }
}

fs.writeFileSync(mPath, m, 'utf8');
console.log('Final Golpe 19 strict replacement applied.');
