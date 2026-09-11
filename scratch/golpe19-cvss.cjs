const fs = require('fs');
let m = fs.readFileSync('public/pwnd-manual.html', 'utf8');

m = m.replace(/<p>As vulnerabilidades que você explora e reporta[\s\S]*?reportadas\.<\/p>\s*<span class="count">80 cartas · 8 classes técnicas · 5 raridades<\/span>/,
`<p>As vulnerabilidades que você explora e reporta. Cada uma exibe classe técnica, pontuação CVSS (severidade), raridade e habilidade operacional. Geram recompensa na Bounty Track ao serem reportadas.</p>
                        <ul style="margin-top:0.5rem; padding-left:1.2rem; font-size:0.9rem; margin-bottom:0.8rem; color:#d1d5db;">
                            <li>Comum (Cinza): CVSS 4.0 a 5.9</li>
                            <li>Incomum (Verde): CVSS 6.0 a 7.9</li>
                            <li>Rara (Azul): CVSS 8.0 a 8.9</li>
                            <li>Épica (Roxa): CVSS 9.0 a 9.9</li>
                            <li>Lendária (Laranja): CVSS 10.0</li>
                        </ul>
                        <span class="count">80 cartas · 8 classes técnicas · 5 raridades</span>`);

fs.writeFileSync('public/pwnd-manual.html', m, 'utf8');
console.log('CVSS added!');
