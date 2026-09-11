const fs = require('fs');
let m = fs.readFileSync('public/pwnd-manual.html', 'utf8');

const oldGuardOld = `                        <p style="margin-top:.6rem"><strong>Limite de Mão:</strong> 9 cartas</p>
                        <ul style="margin-top:.6rem; padding-left:1.2rem;">
                            <li>Limite de mão: 9 cartas</li>
                            <li>Bônus de +20% em vulnerabilidades Críticas</li>
                            <li>Submissão única por rodada</li>
                        </ul>
                    </div>`;

const oldGuardNew = `                        <p style="margin-top:.6rem"><strong>Limite de Mão:</strong> 9 cartas</p>
                    </div>`;

m = m.replace(oldGuardOld, oldGuardNew);

fs.writeFileSync('public/pwnd-manual.html', m, 'utf8');
console.log('Old Guard cleaned up');
