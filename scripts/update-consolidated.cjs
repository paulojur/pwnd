const fs = require('fs');

// --- Helper Functions ---
function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

function processHTML(path) {
  if (!fs.existsSync(path)) return;
  let html = fs.readFileSync(path, 'utf8');

  // Caos & Turnos
  html = html.replace(/Fase 4: Caos/g, 'Janela de Caos (Opcional)');
  html = html.replace(/Fase 4 \(Caos\)/g, 'Janela de Caos');
  html = html.replace(/Fase de Caos/g, 'Janela de Caos');

  // Turn structure replacement
  const oldTurnStruct = /<ol>\s*<li><strong>Início:<\/strong>.*?<\/ol>/is;
  const newTurnStruct = `<ol>
  <li><strong>Início do turno</strong> (limpeza de efeitos temporários)</li>
  <li><strong>Recon</strong> (opcional): sacar 2 cartas OU trocar de alvo</li>
  <li><strong>Ações</strong> (Exploit, Tools, compras, Report)</li>
  <li><strong>Custo do Sucesso</strong> (se disparar): resolve obrigatoriamente, ou guarda o evento se a carta for "Guardável" (limite 2)</li>
  <li><strong>Janela de Caos (Opcional):</strong> joga 1 evento guardado da própria mão</li>
  <li><strong>Patch Speed Check</strong> (final do turno do jogador)</li>
  <li><strong>Fim do turno</strong></li>
</ol>`;
  html = html.replace(oldTurnStruct, newTurnStruct);

  // Eventos Guardados
  if (!html.includes('Event Cards agora possuem duas classificações')) {
    html = html.replace(/(SEÇÃO 8: EVENT CARDS.*?)(<p>)/is, `$1$2<p><strong>Classificação de Eventos:</strong> Os Event Cards agora possuem duas classificações: <strong>Imediato</strong> (ativa no momento da compra, não vai para a mão) e <strong>Guardável</strong> (o jogador pode executar na hora ou guardar, com limite máximo de 2 eventos guardados na sua área de jogo). Eventos guardados só podem ser jogados durante a <strong>Janela de Caos</strong> do próprio turno do jogador, nunca no turno de adversários.</p>`);
  }

  // Patch Penalties
  html = html.replace(/recua 3 degraus na Bounty Track/gi, 'sofre um prejuízo financeiro fixo conforme sua zona de riqueza (Verde $1.500, Amarela $3.000, Laranja $4.500, Vermelha $6.000). Deduza o valor do saldo acumulado atual; o marcador recua na Bounty Track até refletir o novo saldo, travando no mínimo de $0. A zona é determinada pelo saldo antes da dedução.');
  html = html.replace(/recua 1 degrau/gi, 'sofre prejuízo financeiro (Patch Penalty)');
  html = html.replace(/1 degrau de penalidade/gi, 'a penalidade do patch');

  // Payout Formula
  html = html.replace(/CVSS × Multiplicador do Programa ×\s*Bônus de Ferramentas/gi, 'Valor base da vulnerabilidade (CVSS) + Bônus do Programa + Bônus de Tools');

  // Remove Mult from tables
  html = html.replace(/<th>Mult\.<\/th>/g, '');
  html = html.replace(/<td>x\d+(\.\d+)?<\/td>/g, ''); // Removes e.g. <td>x1.5</td>

  // Ceiling
  html = html.replace(/Primeiro pesquisador a atingir \.000/g, 'Primeiro pesquisador a atingir $40.000');
  html = html.replace(/O jogo termina após a conclusão da última rodada\./g, 'O jogo termina imediatamente quando um jogador alcança ou ultrapassa $40.000. O primeiro jogador a fazê-lo vence a partida.');

  // Auditoria de Status
  if (!html.includes('Auditoria de Status')) {
    html = html.replace(/<h3[^>]*>Os 28 Degraus Completos<\/h3>/i, `<h3>Auditoria de Status</h3><p>A Bounty Track é mantida no tapete individual. Por regra de protocolo, sempre que um jogador atingir o limiar de uma nova Zona de cor, ele deve anunciar em voz alta o seu novo Tier para a mesa. O saldo exato é privado e só pode ser solicitado quando uma carta ou efeito exigir (por exemplo, um Event Card que mira no líder).</p><h3>Os 28 Degraus Completos</h3>`);
  }

  // Patch Speed Check timings
  html = html.replace(/final de cada rodada/gi, 'final do turno do jogador');
  html = html.replace(/final da rodada/gi, 'final do turno do jogador');

  // Patch thresholds
  html = html.replace(/Lenta \(8\),\s*Moderada \(7 a 8\),\s*Rápida \(6 a 8\),\s*Extrema \(5 a 8\)/gi, 'Lenta 8, Moderada 7-8, Rápida 6-8, Extrema 5-8');

  // Deck counts
  html = html.replace(/80 Vulnerabilities \+ 36 Tools \+ 4 Bypass/g, '80 Vulnerabilities + 12 Tools + 4 Bypass');
  html = html.replace(/80 \+ 36 \+ 4/g, '80 + 12 + 4');
  html = html.replace(/8 empresas/g, '12 empresas');

  // Recon unificado
  html = html.replace(/Recon.*?\(A\) Sacar 2.*?\(B\).*?\(C\)/is, 'Recon: (A) sacar 2 cartas ou (B) trocar de alvo.');
  html = html.replace(/o acesso ao Event Deck via Recon/gi, 'o acesso ao Event Deck');

  // Grammar & Details
  html = replaceAll(html, 'Opeão', 'O peão');
  html = replaceAll(html, 'teste obrigatório de dado D6', 'teste obrigatório de dado D8');
  html = replaceAll(html, 'duplo teste D6', 'duplo teste D8');
  html = html.replace(/\+\$5\.000/g, '+$4.000'); // Note: could be broad, let's keep it tight if needed, but per request it's ok.
  html = html.replace(/ou eventos de sabotagem/g, '');

  // Section 06 Example
  html = html.replace(/→ Opeão avança diretamente para o degrau <strong>\$10\.000<\/strong> na Bounty Track\./g,
    '→ Se o saldo do jogador era <strong>$1.500</strong>, o novo saldo é <strong>$9.500</strong>.<br>\n        → O peão avança e assenta no degrau <strong>$9.000</strong> da Bounty Track (o degrau imediatamente abaixo).');

  html = html.replace(/Crítico \(\+\$5\.000\)/g, 'Crítico (+$4.000)');

  fs.writeFileSync(path, html);
}

// Update Manual and Quick Rules and ManualModal
processHTML('f:/PWNDgame/public/pwnd-manual.html');
processHTML('f:/PWNDgame/public/quick-rules.html');
processHTML('f:/PWNDgame/src/components/ManualModal.tsx');

// --- cardsData.ts ---
let cards = fs.readFileSync('f:/PWNDgame/src/data/cardsData.ts', 'utf8');
cards = cards.replace(/baseBountyMultiplier: \d+\.\d+,/g, (match) => {
  const mult = parseFloat(match.replace(/[^0-9.]/g, ''));
  let flat = 0;
  if (mult === 1.0) flat = 1000;
  else if (mult === 1.8) flat = 2500;
  else if (mult === 0.9) flat = 0;
  else if (mult === 1.6) flat = 2500;
  else if (mult === 2.5) flat = 4000;
  else if (mult === 1.5) flat = 2000; // etc...
  else flat = Math.round(mult * 1000);
  return `flatBountyBonus: ${flat},`;
});
cards = cards.replace(/baseBountyMultiplier: number;/g, 'flatBountyBonus: number;');
fs.writeFileSync('f:/PWNDgame/src/data/cardsData.ts', cards);

// --- GameBoard.tsx ---
let gb = fs.readFileSync('f:/PWNDgame/src/components/GameBoard.tsx', 'utf8');
if (gb.includes('const estimatedBounty = Math.round(totalCVSS * 250 * currentProgram.baseBountyMultiplier);')) {
  gb = gb.replace(
    'const estimatedBounty = Math.round(totalCVSS * 250 * currentProgram.baseBountyMultiplier);',
    `const vulnValue = playerActiveVulns.reduce((sum, v) => {
    let base = 1500;
    if (v.cvss >= 10.0) base = 6000;
    else if (v.cvss >= 9.0) base = 5000;
    else if (v.cvss >= 7.0) base = 4000;
    else if (v.cvss >= 4.0) base = 2500;
    return sum + base;
  }, 0);
  const estimatedBounty = vulnValue + (currentProgram.flatBountyBonus || 0);`
  );
  fs.writeFileSync('f:/PWNDgame/src/components/GameBoard.tsx', gb);
}

// --- PlayerMat.tsx (if needed to add "Eventos Guardados" box logically) ---
// Note: We'll add this to PrintAndPlayModal.tsx where the physical layout is

// --- PrintAndPlayModal.tsx ---
let pnp = fs.readFileSync('f:/PWNDgame/src/components/PrintAndPlayModal.tsx', 'utf8');
if (!pnp.includes('SLOT EVENTOS GUARDADOS')) {
  pnp = pnp.replace(
    `<span>SLOT SAFEGUARD (BYPASS)</span>
                    </div>
                  </div>`,
    `<span>SLOT SAFEGUARD (BYPASS)</span>
                    </div>
                  </div>

                  {/* Slot Eventos Guardados (Limite 2) */}
                  <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
                    <div style={{ ...getSlotStyle(), border: '1.5px dotted #999', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', background: '#fdfdfd' }}>
                      <span style={{ textAlign: 'center' }}>EVENTO GUARDADO<br/>(Opcional / Janela de Caos)</span>
                    </div>
                    <div style={{ ...getSlotStyle(), border: '1.5px dotted #999', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', background: '#fdfdfd' }}>
                      <span style={{ textAlign: 'center' }}>EVENTO GUARDADO<br/>(Opcional / Janela de Caos)</span>
                    </div>
                  </div>`
  );
  fs.writeFileSync('f:/PWNDgame/src/components/PrintAndPlayModal.tsx', pnp);
}

console.log("Correção cirúrgica consolidada aplicada!");
