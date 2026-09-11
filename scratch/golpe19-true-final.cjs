const fs = require('fs');
const mPath = 'public/pwnd-manual.html';
let m = fs.readFileSync(mPath, 'utf8');

const r8_old = `                    <li><strong>2. Patch Implacável: todos os testes de Patch Speed usam 2D8 (falha se QUALQUER dado acionar o limiar). No Stealth Mode, o limiar do programa conta 1 ponto menor: Lenta 8→7, Moderada 7→6, Rápida 6→5, Extrema 5→4. Red Teamer e Pentester continuam tomando patch apenas no resultado natural 8.:</strong> todos os testes de Patch Speed passam a\n                        exigir\n                        a rolagem obrigatória de <strong>2 dados (2D8)</strong>. O pesquisador deve atingir sucesso em\n                        <strong>ambos os dados individualmente</strong> (cada dado é comparado ao limiar do programa\n                        separadamente) para escapar da anulação de vulnerabilidades.\n                    </li>`;
const r8_new = `                    <li><strong>2. Patch Implacável:</strong> todos os testes de Patch Speed usam 2D8 (falha se QUALQUER dado acionar o limiar). No Stealth Mode, o limiar do programa conta 1 ponto menor: Lenta 8→7, Moderada 7→6, Rápida 6→5, Extrema 5→4. Red Teamer e Pentester continuam tomando patch apenas no resultado natural 8.\n                    </li>`;
m = m.replace(r8_old, r8_new);

const burp_old = `                                <td><strong>Burp Suite Pro</strong> — Ignore a régua de cores do programa ao baixar 1 vulnerabilidade.</td>\n                                <td>Coringa universal — substitui qualquer exigência de ferramenta ao baixar\n                                    vulnerabilidades.</td>`;
const burp_new = `                                <td><strong>Burp Suite Pro</strong></td>\n                                <td>Ignore a régua de cores do programa ao baixar 1 vulnerabilidade.</td>`;
m = m.replace(burp_old, burp_new);

const postman_old = `                                <td><strong>Postman</strong></td>\n                                <td>Reduz em 1 unidade o custo de ferramentas para vulnerabilidades da classe Broken\n                                    Access Control.</td>`;
const postman_new = `                                <td><strong>Postman</strong></td>\n                                <td>Baixe 1 vulnerabilidade da classe BAC ignorando a régua de cores do programa.</td>`;
m = m.replace(postman_old, postman_new);

const sqlmap_old = `                                <td><strong>SQLMap</strong></td>\n                                <td>Vulnerabilidades da classe Injection têm custo de ferramentas zerado. Inclui SQLi,\n                                    NoSQLi e Command Injection.</td>`;
const sqlmap_new = `                                <td><strong>SQLMap</strong></td>\n                                <td>Baixe 1 vulnerabilidade da classe Injection ignorando a régua de cores do programa.</td>`;
m = m.replace(sqlmap_old, sqlmap_new);

const mao_old = `                    <p>Cada jogador recebe <strong>5 cartas aleatórias do Main Deck + 1 carta Bypass\n                            garantida</strong> = <strong>6 cartas no total</strong>. <em>Todos iniciam com o mesmo`;
const mao_new = `                    <p>Cada jogador recebe <strong>5 cartas aleatórias do Main Deck na mão</strong>, e o Bypass inicial já está posicionado no <strong>Slot Safeguard do seu Player Mat</strong>. <em>Todos iniciam com o mesmo`;
m = m.replace(mao_old, mao_new);

const reacao_old = `                <p>Cartas de Defesa (<em>Bypass</em>) podem ser compradas no Main Deck e jogadas <strong>fora do seu\n                        turno</strong>, como resposta imediata ao <em>PATCH DEPLOYED!</em> forçado pelos dados ou a\n                    ataques de adversários. Elas são a sua salvação final.</p>`;
const reacao_new = `                <p>Um Bypass recém-comprado fica na mão e NÃO protege até ser colocado no Slot Safeguard (ação livre quando o slot estiver vazio). Ele é descartado ao ser usado, anulando o PATCH DEPLOYED!.</p>`;
m = m.replace(reacao_old, reacao_new);

const form_old = `<strong>126 = 120 no deck de compra + N na mão (1 Bypass por\n                            jogador) + (6 − N) na caixa</strong>`;
const form_new = `<strong>126 = 120 no deck de compra + N no Slot Safeguard (1 Bypass por\n                            jogador) + (6 − N) na caixa</strong>`;
m = m.replace(form_old, form_new);

fs.writeFileSync(mPath, m, 'utf8');
console.log('Golpe 19 EXACT replace done!');
