const fs = require('fs');

const mPath = 'public/pwnd-manual.html';
let m = fs.readFileSync(mPath, 'utf8');

// 1. Table events 10-15
const tStart = m.indexOf('<td>10</td>');
const tEnd = m.indexOf('<td>16</td>', tStart);
if (tStart !== -1 && tEnd !== -1) {
    const original = m.substring(tStart, tEnd);
    const replacement = `<td>10</td>
                                <td><strong>Bounty Increase!</strong> 💰</td>
                                <td><span class="alert-green">Você (Autor)</span></td>
                                <td>Verba de emergência liberada! O seu próximo Report aprovado terá +50% sobre o valor das vulnerabilidades (o bônus do programa e os bônus de tools não são multiplicados).</td>
                            </tr>
                            <tr>
                                <td>11</td>
                                <td><strong>WAF Deployed!</strong> 🛡️</td>
                                <td><span class="highlight">Todos os Jogadores</span></td>
                                <td>Filtro de WAF ativado! Vulnerabilidades da classe Injection não podem ser baixadas na mesa por 1 rodada completa.</td>
                            </tr>
                            <tr>
                                <td>12</td>
                                <td><strong>DNS Hijack!</strong> 🌐</td>
                                <td><span class="alert-red">Escolha 1 Oponente</span></td>
                                <td>Sequestro de tráfego! Escolha 1 oponente: o programa ativo dele é descartado e substituído por uma carta do topo do mercado.</td>
                            </tr>
                            <tr>
                                <td>13</td>
                                <td><strong>Responsible Disclosure!</strong> 📄</td>
                                <td><span class="highlight">Todos os Jogadores</span></td>
                                <td>Janela de divulgação responsável! Todos os jogadores com vulnerabilidades válidas na mesa fazem 1 Report imediato SEM rolar o D8 (sem risco de Patch Deployed!). O Custo do Sucesso (comprar 1 evento) continua valendo.</td>
                            </tr>
                            <tr>
                                <td>14</td>
                                <td><strong>Honeypot Triggered!</strong> 🍯</td>
                                <td><span class="alert-red">Escolha 1 Oponente</span></td>
                                <td>Armadilha de servidor honeypot! Escolha 1 oponente: ele é forçado a descartar 2 cartas aleatórias da própria mão.</td>
                            </tr>
                            <tr>
                                <td>15</td>
                                <td><strong>CVE Assignment Delayed!</strong> ⏳</td>
                                <td><span class="highlight">Todos os Jogadores</span></td>
                                <td>Burocracia na atribuição de CVE! Cartas de Safeguard (Bypass e CVE Assignment Protection) ficam bloqueadas de serem jogadas por 1 rodada completa.</td>
                            </tr>
                            <tr>
                                `;
    m = m.replace(original, replacement);
}

// 2. Data Breach (event 21)
const ev21Idx = m.indexOf('<td>21</td>');
if (ev21Idx !== -1) {
    m = m.replace(
        /Auditoria de dados! Todos revelam a mão\. O jogador com mais vulnerabilidades de CVSS ≥ 8\.0 descarta metade delas \(arredondado para cima\)\. Em caso de empate, todos os empatados descartam\./,
        'Auditoria de dados! Todos revelam a mão. O jogador com mais vulnerabilidades de CVSS ≥ 8.0 descarta metade delas (arredondado para cima). Em caso de empate, todos os empatados descartam.'
    );
    // In case the current text is different
    m = m.replace(
        /Auditoria de dados! Todos revelam a mão\. O jogador com mais vulnerabilidades.*?empatados descartam\./,
        'Auditoria de dados! Todos revelam a mão. O jogador com mais vulnerabilidades de CVSS ≥ 8.0 descarta metade delas (arredondado para cima). Em caso de empate, todos os empatados descartam.'
    );
}

// 3. Rodada 8
m = m.replace(
        /2\. Duplo Dado no Patch Speed Check/,
        '2. Patch Implacável: todos os testes de Patch Speed usam 2D8 (falha se QUALQUER dado acionar o limiar). No Stealth Mode, o limiar do programa conta 1 ponto menor: Lenta 8→7, Moderada 7→6, Rápida 6→5, Extrema 5→4. Red Teamer e Pentester continuam tomando patch apenas no resultado natural 8.'
    );

// 4. Tools Section 11 (if exists in manual)
// Wait, is there a Tool Cards section in the manual? "Seção 11 (Tool Cards)"
// The prompt says "Substituir os efeitos técnicos das 4 ferramentas pelos textos finais"
// Let's replace the texts in the manual.
m = m.replace(/Burp Suite Pro<\/strong>.*?<\/td>/s, 'Burp Suite Pro</strong> — Ignore a régua de cores do programa ao baixar 1 vulnerabilidade.</td>');
// Using safer regex for the table row.
m = m.replace(/<td><strong>Burp Suite Pro<\/strong>.*?<\/td>\s*<td>.*?<\/td>/, '<td><strong>Burp Suite Pro</strong></td>\n                                <td>Ignore a régua de cores do programa ao baixar 1 vulnerabilidade.</td>');
m = m.replace(/<td><strong>OWASP ZAP<\/strong>.*?<\/td>\s*<td>.*?<\/td>/, '<td><strong>OWASP ZAP</strong></td>\n                                <td>Baixe 2 vulnerabilidades na mesma ação de Exploit.</td>');
m = m.replace(/<td><strong>SQLMap<\/strong>.*?<\/td>\s*<td>.*?<\/td>/, '<td><strong>SQLMap</strong></td>\n                                <td>Baixe 1 vulnerabilidade da classe Injection ignorando a régua de cores do programa.</td>');
m = m.replace(/<td><strong>Postman<\/strong>.*?<\/td>\s*<td>.*?<\/td>/, '<td><strong>Postman</strong></td>\n                                <td>Baixe 1 vulnerabilidade da classe BAC ignorando a régua de cores do programa.</td>');

// 5. Bypass in 4 passages
m = m.replace('separe 1 Bypass para a mão de cada jogador', 'separe 1 Bypass para o Slot Safeguard de cada jogador');
m = m.replace('Cada jogador recebe 5 cartas aleatórias do Main Deck + 1 carta Bypass garantida = 6 cartas no total.', 'Cada jogador recebe 5 cartas aleatórias do Main Deck na mão, e o Bypass inicial já está posicionado no Slot Safeguard do seu Player Mat.');
m = m.replace('>Bypass na Mão<', '>Bypass no Slot Safeguard<');
m = m.replace('cada jogador (N) começa com 1 Bypass na mão', 'cada jogador (N) começa com 1 Bypass no Slot Safeguard');

fs.writeFileSync(mPath, m, 'utf8');
console.log('Manual operations completed.');

