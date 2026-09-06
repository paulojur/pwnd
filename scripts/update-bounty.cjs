const fs = require('fs');

// --- pwnd-manual.html ---
let html = fs.readFileSync('f:/PWNDgame/public/pwnd-manual.html', 'utf8');

// Victory Cond 50.000 -> 40.000
html = html.replace(/atingir \$50\.000 vence a partida/g, 'atingir $40.000 vence a partida');
html = html.replace(/atingir \$50\.000 até o encerramento/g, 'atingir $40.000 até o encerramento');
html = html.replace(/<span class="val">\$50\.000<\/span><span>🏆 VITÓRIA INSTANTÂNEA<\/span>/g, '<span class="val">$40.000</span><span>🏆 VITÓRIA INSTANTÂNEA</span>');
// Note: $40.000 was already patched in the track HTML in previous steps.

// Section 8.1 Patch Penalty
html = html.replace(/<strong>Recuo na Bounty Track:<\/strong> mova o seu Bounty Token <strong>1 degrau para\s*trás<\/strong> na Bounty Track\. Se já estiver no início, o marcador é fixado no\s*piso de \$0\./g,
    `<strong>Recuo por Patch:</strong> o jogador sofre um prejuízo financeiro fixo conforme sua zona de riqueza (Verde $1.500, Amarela $3.000, Laranja $4.500, Vermelha $6.000). Deduza o valor do saldo acumulado atual; o marcador recua na Bounty Track até refletir o novo saldo, travando no mínimo de $0.`);

// Event Cards
html = html.replace(/sobem 1 degrau ou recebem \$500/g, 'recebem $1.500');
html = html.replace(/recua 3 degraus na Bounty Track/g, 'sofre um prejuízo financeiro conforme sua zona (Verde $1.500, Amarela $3.000, Laranja $4.500, Vermelha $6.000) e recua na Bounty Track');

// Section 13 Mechanics
html = html.replace(/Avance o Bounty Token para o <strong>degrau mais próximo acima do valor\s*obtido<\/strong>\./g,
    `O Bounty Track é um acumulador de patrimônio. Ao concluir um Report, some o valor pago ao seu saldo atual. Avance o seu token para o degrau que corresponda ao seu novo saldo total (ou o degrau imediatamente abaixo dele, caso o valor quebrado não tenha um degrau exato). O jogo termina imediatamente quando um jogador alcança ou ultrapassa $40.000. O primeiro jogador a fazê-lo vence a partida.`);

// Redesign of the 28 Steps in HTML
const newTrackHtml = `<p><strong style="color:#39D353">🟩 Zona Baixa — "Entry Level"</strong> (9 degraus)</p>
                <div class="track-wrap">
                    <div class="track-step green"><span class="val">$0</span><span>Ponto de partida</span></div>
                    <div class="track-step green"><span class="val">$1.500</span></div>
                    <div class="track-step green"><span class="val">$3.000</span></div>
                    <div class="track-step green"><span class="val">$4.500</span></div>
                    <div class="track-step green"><span class="val">$6.000</span></div>
                    <div class="track-step green"><span class="val">$7.500</span></div>
                    <div class="track-step green"><span class="val">$9.000</span></div>
                    <div class="track-step green"><span class="val">$10.500</span></div>
                    <div class="track-step green"><span class="val">$11.000</span><span>Limite da zona</span></div>
                </div>

                <p><strong style="color:#FFD700">🟨 Zona Média — "Junior Bug Hunter"</strong> (5 degraus)</p>
                <div class="track-wrap">
                    <div class="track-step yellow"><span class="val">$12.000</span></div>
                    <div class="track-step yellow"><span class="val">$14.000</span></div>
                    <div class="track-step yellow"><span class="val">$16.000</span></div>
                    <div class="track-step yellow"><span class="val">$18.000</span></div>
                    <div class="track-step yellow"><span class="val">$20.000</span><span>Limite da zona</span></div>
                </div>

                <p><strong style="color:#FF8C00">🟧 Zona Alta — "Senior Researcher"</strong> (7 degraus)</p>
                <div class="track-wrap">
                    <div class="track-step orange"><span class="val">$22.000</span></div>
                    <div class="track-step orange"><span class="val">$24.000</span></div>
                    <div class="track-step orange"><span class="val">$26.000</span></div>
                    <div class="track-step orange"><span class="val">$28.000</span></div>
                    <div class="track-step orange"><span class="val">$30.000</span></div>
                    <div class="track-step orange"><span class="val">$32.000</span></div>
                    <div class="track-step orange"><span class="val">$33.000</span><span>Limite da zona</span></div>
                </div>

                <p><strong style="color:#FF4D4D">🟥 Zona Crítica — "Elite Hacker"</strong> (7 degraus)</p>
                <div class="track-wrap">
                    <div class="track-step red"><span class="val">$34.000</span></div>
                    <div class="track-step red"><span class="val">$35.000</span></div>
                    <div class="track-step red"><span class="val">$36.000</span></div>
                    <div class="track-step red"><span class="val">$37.000</span></div>
                    <div class="track-step red"><span class="val">$38.000</span></div>
                    <div class="track-step red"><span class="val">$39.000</span></div>
                    <div class="track-step red"><span class="val">$40.000</span><span>🏆 VITÓRIA INSTANTÂNEA</span></div>
                </div>`;

html = html.replace(/<p><strong style="color:#39D353">🟩 Zona Baixa[\s\S]*?VITÓRIA INSTANTÂNEA\s*<\/span><\/div>\s*<\/div>/, newTrackHtml);
fs.writeFileSync('f:/PWNDgame/public/pwnd-manual.html', html);

// --- PrintAndPlayModal.tsx ---
let pnp = fs.readFileSync('f:/PWNDgame/src/components/PrintAndPlayModal.tsx', 'utf8');

const oldPnpArray = `[
                    '$40.000', '$38.000', '$35.000', '$32.000', '$30.000', '$28.000',
                    '$25.000', '$22.500', '$20.000', '$17.500', '$15.000', '$12.500',
                    '$10.000', '$8.500', '$7.500', '$6.000', '$5.000', '$4.000',
                    '$3.000', '$2.500', '$2.000', '$1.500', '$1.000', '$800', '$600', '$400', '$200', '$100', '$0'
                  ].map((val, idx) => {
                    const isGreen = idx >= 18;
                    const isYellow = idx >= 12 && idx < 18;
                    const isOrange = idx >= 6 && idx < 12;`;
const newPnpArray = `[
                    '$40.000', '$39.000', '$38.000', '$37.000', '$36.000', '$35.000', '$34.000',
                    '$33.000', '$32.000', '$30.000', '$28.000', '$26.000', '$24.000', '$22.000',
                    '$20.000', '$18.000', '$16.000', '$14.000', '$12.000',
                    '$11.000', '$10.500', '$9.000', '$7.500', '$6.000', '$4.500', '$3.000', '$1.500', '$0'
                  ].map((val, idx) => {
                    const isGreen = idx >= 19;
                    const isYellow = idx >= 14 && idx < 19;
                    const isOrange = idx >= 7 && idx < 14;`;
if (pnp.includes(oldPnpArray.slice(0, 100))) {
    pnp = pnp.replace(/\[\s*'\$40\.000'[\s\S]*?const isOrange = idx >= 6 && idx < 12;/, newPnpArray);
    pnp = pnp.replace(/\(28 Degraus Monotônicos \$0 a \$50\.000\)/g, '(28 Degraus Monotônicos $0 a $40.000)');
    fs.writeFileSync('f:/PWNDgame/src/components/PrintAndPlayModal.tsx', pnp);
} else {
    console.log("Could not find PnP array block!");
}

// --- PlayerMat.tsx ---
let mat = fs.readFileSync('f:/PWNDgame/src/components/PlayerMat.tsx', 'utf8');
const oldBounty = /const BOUNTY_STEPS = \[\s*0, 100[\s\S]*?\];/;
const newBounty = `const BOUNTY_STEPS = [
  0, 1500, 3000, 4500, 6000, 7500, 9000, 10500, 11000,
  12000, 14000, 16000, 18000, 20000,
  22000, 24000, 26000, 28000, 30000, 32000, 33000,
  34000, 35000, 36000, 37000, 38000, 39000, 40000
];`;
mat = mat.replace(oldBounty, newBounty);
mat = mat.replace(/Se ultrapassar 50\.000/g, 'Se ultrapassar 40.000');
fs.writeFileSync('f:/PWNDgame/src/components/PlayerMat.tsx', mat);

// --- GameContext.tsx ---
let gCtx = fs.readFileSync('f:/PWNDgame/src/context/GameContext.tsx', 'utf8');
gCtx = gCtx.replace(/50000/g, '40000');
fs.writeFileSync('f:/PWNDgame/src/context/GameContext.tsx', gCtx);

// --- BoardGameContext.tsx ---
let bgCtx = fs.readFileSync('f:/PWNDgame/src/context/BoardGameContext.tsx', 'utf8');
bgCtx = bgCtx.replace(/setPlayerScore\(prev => Math\.max\(0, prev - 1000\)\);[\s\S]*?1 casa na Bounty Track!'\);/,
    `let penalty = 1500;
    if (playerScore >= 34000) penalty = 6000;
    else if (playerScore >= 22000) penalty = 4500;
    else if (playerScore >= 12000) penalty = 3000;
    
    setPlayerScore(prev => Math.max(0, prev - penalty));
    addLog(\`COLAPSO: PATCH DEPLOYED! limpou suas vulnerabilidades e deduziu $\${penalty} do seu saldo na Bounty Track!\`);`);
fs.writeFileSync('f:/PWNDgame/src/context/BoardGameContext.tsx', bgCtx);

// --- full23EventsData.ts ---
let evt = fs.readFileSync('f:/PWNDgame/src/data/full23EventsData.ts', 'utf8');
evt = evt.replace(/sobem 1 degrau ou recebem \$500/g, 'recebem $1.500');
fs.writeFileSync('f:/PWNDgame/src/data/full23EventsData.ts', evt);

// --- ManualModal.tsx ---
let manMod = fs.readFileSync('f:/PWNDgame/src/components/ManualModal.tsx', 'utf8');
manMod = manMod.replace(/\$50\.000 na Bounty Track/g, '$40.000 na Bounty Track');
manMod = manMod.replace(/ninguém atingir \$50\.000/g, 'ninguém atingir $40.000');
manMod = manMod.replace(/Recuo de <strong>3 degraus<\/strong> na Bounty Track/g, 'Prejuízo financeiro progressivo na Bounty Track conforme a zona do saldo atual ($1.5K, $3K, $4.5K ou $6K)');
manMod = manMod.replace(/\$0 A \$50\.000/g, '$0 A $40.000');
manMod = manMod.replace(/\$0 a \$1\.000 \(10 degraus\)/g, '$0 a $11.000 (9 degraus)');
manMod = manMod.replace(/\$30\.000 a \$50\.000/g, '$34.000 a $40.000');
fs.writeFileSync('f:/PWNDgame/src/components/ManualModal.tsx', manMod);

console.log('All files updated successfully!');
