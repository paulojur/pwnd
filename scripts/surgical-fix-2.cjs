const fs = require('fs');

// ─────────────────────────────────────────────────────────────
//  PHASE 0: CANONICALIZE — kill manual.html in public and dist
// ─────────────────────────────────────────────────────────────
const OLD_PUBLIC   = 'f:/PWNDgame/public/manual.html';
const OLD_DIST_MAN = 'f:/PWNDgame/dist/pwnd-manual.html';

if (fs.existsSync(OLD_PUBLIC)) {
  fs.renameSync(OLD_PUBLIC, 'f:/PWNDgame/_archive/manual-OLD.html');
  console.log('[Phase 0] Moved public/manual.html → _archive/manual-OLD.html');
}
if (fs.existsSync(OLD_DIST_MAN)) {
  fs.renameSync(OLD_DIST_MAN, 'f:/PWNDgame/_archive/dist-pwnd-manual-OLD.html');
  console.log('[Phase 0] Moved dist/pwnd-manual.html → _archive/dist-pwnd-manual-OLD.html');
}

// ─────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────
const PATCH_PENALTY_TEXT =
  '<strong>Recuo por Patch:</strong> o jogador sofre um prejuízo financeiro fixo conforme sua zona de riqueza ' +
  '(Verde $1.500, Amarela $3.000, Laranja $4.500, Vermelha $6.000). ' +
  'Deduza o valor do saldo acumulado atual; o marcador recua na Bounty Track até refletir o novo saldo, ' +
  'travando no mínimo de $0. A zona é determinada pelo saldo antes da dedução.';

// ─────────────────────────────────────────────────────────────
//  FIX MANUAL
// ─────────────────────────────────────────────────────────────
let manual = fs.readFileSync('f:/PWNDgame/public/pwnd-manual.html', 'utf8');

// ── FIX 1: Section 8.1 — "1 degrau para trás" → penalty text
manual = manual.replace(
  /<li><strong>Recuo na Bounty Track:<\/strong> mova o seu Bounty Token <strong>1 degrau para\s+trás<\/strong> na Bounty Track\. Se já estiver no início, o marcador é fixado no\s+piso mínimo de <strong>\$0<\/strong> — a pontuação nunca fica negativa\.<\/li>/,
  `<li>${PATCH_PENALTY_TEXT}</li>`
);
console.log('[Fix 1] Section 8.1 patch penalty updated');

// ── FIX 1b: Section 8.2 — broken sentence
manual = manual.replace(
  'Pontuação já consolidada acima do a penalidade do patch permanece garantida.',
  'Pontuação já consolidada antes da penalidade do patch permanece garantida.'
);
console.log('[Fix 1b] Section 8.2 broken sentence fixed');

// ── FIX 1c: Section 13 — "(3 degraus) ." residue
manual = manual.replace(
  /só regride com o\s*<em>PATCH\s*DEPLOYED!<\/em> \(3 degraus\) \.<\/p>/,
  `— só regride com o <em>PATCH DEPLOYED!</em>, deduzindo valor fixo conforme a zona de riqueza (ver Seção 08).</p>`
);
console.log('[Fix 1c] Section 13 "(3 degraus)" removed');

// ── FIX 2: Section 12 — replace table with Mult column removed, correct Patch Speed, add flatBountyBonus
// Decision: Keep 8 companies in table, update text to say "8 empresas (2 cópias cada = 16 Program Cards)"
// flatBountyBonus mapping (safe, no single report can exceed $40k):
// Low:     +$0  (GovPortal, EduConnect)
// Medium:  +$1.000  (ShopAll, SocialBee, GameVerse)
// High:    +$2.500  (BankSafe, HealthLock)
// Critical:+$4.000  (CloudNine)

manual = manual.replace(
  /As empresas corporativas determinam os limites operacionais, multiplicadores de remuneração e a/,
  'As empresas corporativas determinam os limites operacionais, bônus fixos de remuneração (Soma Direta) e a'
);
console.log('[Fix 2a] Section 12 "multiplicadores de remuneração" replaced');

// Replace entire table in Section 12 (remove Mult. column, fix Patch Speed, add Bônus Fixo)
const OLD_TABLE_12 = `                        <thead>
                            <tr>
                                <th>Empresa</th>
                                <th>Tier</th>
                                <th>Escopo Autorizado</th>
                                <th>Patch Speed</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>ShopAll Global</strong></td>
                                <td>Medium</td>
                                <td>Escopo Amplo (todas as classes)</td>
                                <td>Moderada (5+)</td>
                                <td>×2</td>
                            </tr>
                            <tr>
                                <td><strong>BankSafe Financial</strong></td>
                                <td>High</td>
                                <td>APIs, Autenticação e Criptografia</td>
                                <td>Rápida (4+)</td>
                                <td>×5</td>
                            </tr>
                            <tr>
                                <td><strong>GovPortal Nacional</strong></td>
                                <td>Low</td>
                                <td>Broken Access Control</td>
                                <td>Lenta (6)</td>
                                <td>×1</td>
                            </tr>
                            <tr>
                                <td><strong>HealthLock Medical</strong></td>
                                <td>High</td>
                                <td>Criptografia e Autenticação</td>
                                <td>Rápida (4+)</td>
                                <td>×5</td>
                            </tr>
                            <tr>
                                <td><strong>SocialBee Network</strong></td>
                                <td>Medium</td>
                                <td>Escopo Amplo (todas as classes)</td>
                                <td>Moderada (5+)</td>
                                <td>×2</td>
                            </tr>
                            <tr>
                                <td><strong>CloudNine Systems</strong></td>
                                <td>Critical</td>
                                <td>Infraestrutura, RCE e SSRF</td>
                                <td>Extrema (3+)</td>
                                <td>×10</td>
                            </tr>
                            <tr>
                                <td><strong>GameVerse Studios</strong></td>
                                <td>Medium</td>
                                <td>WebSockets e Lógica de Negócios</td>
                                <td>Moderada (5+)</td>
                                <td>×2</td>
                            </tr>
                            <tr>
                                <td><strong>EduConnect Tech</strong></td>
                                <td>Low</td>
                                <td>Escopo Amplo (todas as classes)</td>
                                <td>Lenta (6)</td>
                                <td>×1</td>
                            </tr>
                        </tbody>`;

const NEW_TABLE_12 = `                        <thead>
                            <tr>
                                <th>Empresa</th>
                                <th>Tier</th>
                                <th>Escopo Autorizado</th>
                                <th>Patch Speed</th>
                                <th>Bônus Fixo (Programa)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>ShopAll Global</strong></td>
                                <td>Medium</td>
                                <td>Escopo Amplo (todas as classes)</td>
                                <td>Moderada (7-8)</td>
                                <td>+$1.000</td>
                            </tr>
                            <tr>
                                <td><strong>BankSafe Financial</strong></td>
                                <td>High</td>
                                <td>APIs, Autenticação e Criptografia</td>
                                <td>Rápida (6-8)</td>
                                <td>+$2.500</td>
                            </tr>
                            <tr>
                                <td><strong>GovPortal Nacional</strong></td>
                                <td>Low</td>
                                <td>Broken Access Control</td>
                                <td>Lenta (8)</td>
                                <td>+$0</td>
                            </tr>
                            <tr>
                                <td><strong>HealthLock Medical</strong></td>
                                <td>High</td>
                                <td>Criptografia e Autenticação</td>
                                <td>Rápida (6-8)</td>
                                <td>+$2.500</td>
                            </tr>
                            <tr>
                                <td><strong>SocialBee Network</strong></td>
                                <td>Medium</td>
                                <td>Escopo Amplo (todas as classes)</td>
                                <td>Moderada (7-8)</td>
                                <td>+$1.000</td>
                            </tr>
                            <tr>
                                <td><strong>CloudNine Systems</strong></td>
                                <td>Critical</td>
                                <td>Infraestrutura, RCE e SSRF</td>
                                <td>Extrema (5-8)</td>
                                <td>+$4.000</td>
                            </tr>
                            <tr>
                                <td><strong>GameVerse Studios</strong></td>
                                <td>Medium</td>
                                <td>WebSockets e Lógica de Negócios</td>
                                <td>Moderada (7-8)</td>
                                <td>+$1.000</td>
                            </tr>
                            <tr>
                                <td><strong>EduConnect Tech</strong></td>
                                <td>Low</td>
                                <td>Escopo Amplo (todas as classes)</td>
                                <td>Lenta (8)</td>
                                <td>+$0</td>
                            </tr>
                        </tbody>`;

if (manual.includes(OLD_TABLE_12)) {
  manual = manual.replace(OLD_TABLE_12, NEW_TABLE_12);
  console.log('[Fix 2b] Section 12 table — Mult. column removed, Patch Speed aligned, Bônus Fixo added');
} else {
  console.log('[Fix 2b] WARNING: Section 12 table not matched exactly — check manually');
}

// ── FIX 3: Section 03 — ".000" truncated (2 occurrences)
manual = manual.replace(
  /O primeiro pesquisador a\s+atingir \.000 vence a partida instantaneamente\. Se nenhum jogador atingir \.000 até o encerramento\s+da última rodada \(8ª ou 10ª\), quem tiver o maior saldo é declarado vencedor\./,
  'O primeiro pesquisador a atingir <strong>$40.000</strong> vence a partida instantaneamente. Se nenhum jogador atingir $40.000 até o encerramento da última rodada (8ª ou 10ª), quem tiver o maior saldo é declarado vencedor.'
);
console.log('[Fix 3] Section 03 victory condition ".000" fixed');

// ── FIX 4: Section 09 — reconcile Diretrizes de Resolução with Guardável rule
const OLD_DIRETRIZ = `                    <li>Cartas de Evento sacadas como "Custo do Sucesso" devem ser resolvidas imediatamente antes do
                        próximo jogador assumir o turno.</li>
                    <li>Cartas que afetam "Escolha 1 Oponente" permitem ao jogador ativo selecionar qualquer adversário
                        como alvo.</li>
                    <li>Eventos globais aplicam seus efeitos a todos os participantes simultaneamente.</li>`;

const NEW_DIRETRIZ = `                    <li><strong>Cartas IMEDIATAS</strong> são resolvidas no momento em que são sacadas, antes do próximo jogador assumir o turno.</li>
                    <li><strong>Cartas GUARDÁVEIS</strong> podem ser resolvidas imediatamente ou guardadas na área <em>Eventos Guardados</em> (limite de 2 por jogador), para serem jogadas apenas na <strong>Janela de Caos (Opcional)</strong> do próprio turno do jogador.</li>
                    <li>Cartas que afetam "Escolha 1 Oponente" permitem ao jogador ativo selecionar qualquer adversário como alvo.</li>
                    <li>Eventos globais aplicam seus efeitos a todos os participantes simultaneamente.</li>`;

if (manual.includes(OLD_DIRETRIZ)) {
  manual = manual.replace(OLD_DIRETRIZ, NEW_DIRETRIZ);
  console.log('[Fix 4] Section 09 Diretrizes de Resolução reconciled with Guardável rule');
} else {
  console.log('[Fix 4] WARNING: Diretrizes block not matched — check manually');
}

// ── FIX 5: Section 04.2 — align deck counts (80 Vuln + 12 Tool types × 3 copies = 36 + 4 Bypass)
manual = manual.replace(
  /<li><strong>Main Deck \(Baralho de Ação\):<\/strong> embaralhe juntos as <strong>80 Vulnerability\s+Cards<\/strong>, <strong>36 Tool Cards<\/strong> e <strong>4 cartas de Defesa\s+\(Bypass\)<\/strong>\. Forme o deck central e posicione-o na mesa\.<\/li>/,
  '<li><strong>Main Deck (Baralho de Ação):</strong> embaralhe juntos as <strong>80 Vulnerability Cards</strong>, <strong>36 Tool Cards</strong> (12 tipos × 3 cópias) e <strong>4 cartas de Defesa (Bypass)</strong> — total de <strong>120 cartas</strong>. Forme o deck central e posicione-o na mesa.</li>'
);
console.log('[Fix 5a] Section 04.2 deck count clarified');

// Section 02 — "12 empresas × 2 cópias" keep but clarify
// Already says "12 empresas × 2 cópias" in the card type count — but the table has 8. 
// Decision: Table has 8 companies. Update Section 02 count from 12 to 8 companies.
manual = manual.replace(
  '<span class="count">24 cartas · 12 empresas × 2 cópias</span>',
  '<span class="count">16 cartas · 8 empresas × 2 cópias cada</span>'
);
console.log('[Fix 5b] Section 02 Program Cards count aligned to 8 companies');

// ── FIX 6: Restore Épica to +$5.000 (the +$4.000 change was NOT approved for vulnerabilities)
// The approved change was ONLY for Critical PROGRAM bonus (+$4.000). Vuln Épica stays +$5.000.
manual = manual.replace(
  '| Épica\n                                (+$4.000) | Lendária',
  '| Épica (+$5.000) | Lendária'
);
// More specific replacement for the payout table
manual = manual.replace(
  '<strong>• Falhas:</strong> Comum (+$500) | Incomum (+$1.500) | Rara (+$3.000) | Épica\n                                (+$4.000) | Lendária (+$7.500)<br>',
  '<strong>• Falhas:</strong> Comum (+$500) | Incomum (+$1.500) | Rara (+$3.000) | Épica (+$5.000) | Lendária (+$7.500)<br>'
);
console.log('[Fix 6] Vuln Épica restored to +$5.000');

// ── FIX 7: Section 10 — Social Engineer "Fase 4 Caos" → "Janela de Caos (Opcional)"
manual = manual.replace(
  'ao acionar qualquer Event Card (opção B do Recon ou Fase 4\n                            Caos), decide livremente qual participante é afetado, ignorando os alvos automáticos\n                            impressos na carta.',
  'ao acionar qualquer Event Card (seja como Custo do Sucesso ou durante a <strong>Janela de Caos (Opcional)</strong>), decide livremente qual participante é afetado, ignorando os alvos automáticos impressos na carta.'
);
console.log('[Fix 7] Section 10 Social Engineer Fase 4 → Janela de Caos');

// ── FIX 8: Glossary Recon — remove "(B) Event Deck" as general option
// Check Section 02 description of Recon for Event Deck mention
// The quick-rules already correctly shows only (A) Main Deck and (B) Pivot.
// The manual Recon section (Section 06) should not list Event Deck as general option.
// Check current Recon text:
const reconIdx = manual.indexOf('<h3>Ação 1 — Recon (Reconhecimento)</h3>');
const reconSnippet = manual.substring(reconIdx, reconIdx + 600);
console.log('[Fix 8] Recon section snippet:', reconSnippet.substring(0, 200));
// Social Engineer already gets privileged access mentioned separately. 
// If "(B) Event Deck" appears in general Recon section, remove it.
manual = manual.replace(
  /\(B\)[^<]*Event Deck[^<]*<\/li>/gi,
  ''
);
// Also ensure Recon description in Section 06 doesn't mention Event Deck as universal option
// (Social Engineer's special power is in Section 10 only)
console.log('[Fix 8] Recon Event Deck general option removed (if existed)');

// ── FIX 9: Glossary PATCH DEPLOYED — fix broken subject
manual = manual.replace(
  '<dd>Evento destrutivo acionado quando o Patch Speed Check falha. Descarta todas as vulnerabilidades\n                        da Zona de Exploits, sofre um prejuízo financeiro conforme sua zona (Verde $1.500, Amarela\n                        $3.000, Laranja $4.500, Vermelha $6.000) e recua na Bounty Track e encerra o programa ativo.\n                    </dd>',
  '<dd>Evento destrutivo acionado quando o Patch Speed Check falha. O jogador que sofre o PATCH DEPLOYED! perde todas as vulnerabilidades da Zona de Exploits, sofre prejuízo financeiro fixo conforme sua zona de riqueza (Verde $1.500, Amarela $3.000, Laranja $4.500, Vermelha $6.000), recua na Bounty Track até refletir o novo saldo (piso $0) e encerra o programa ativo.</dd>'
);
console.log('[Fix 9] Glossary PATCH DEPLOYED sentence fixed');

// ── FIX 10: Section 02 — Player Mat description includes Área de Eventos Guardados
manual = manual.replace(
  '<li><strong>6 Player Mats (25×35cm):</strong> cada tapete individual possui Slot de Researcher, Slot\n                        de Active Program, Slot de Bypass, Tools Rack (3 slots), Zona de Exploits (área limpa) e Bounty\n                        Track lateral.</li>',
  '<li><strong>6 Player Mats (25×35cm):</strong> cada tapete individual possui Slot de Researcher, Slot de Active Program, Slot de Bypass, Tools Rack (3 slots), Zona de Exploits (área limpa), <strong>Área de Eventos Guardados (limite de 2 cartas)</strong> e Bounty Track lateral.</li>'
);
console.log('[Fix 10] Section 02 Player Mat description includes Eventos Guardados');

fs.writeFileSync('f:/PWNDgame/public/pwnd-manual.html', manual);
console.log('\n✅ pwnd-manual.html saved.');

// ─────────────────────────────────────────────────────────────
//  FIX QUICK RULES
// ─────────────────────────────────────────────────────────────
let qr = fs.readFileSync('f:/PWNDgame/public/quick-rules.html', 'utf8');

// Fix 1 QR: Patch penalty — "Recue 1 degrau" → proper penalty text
qr = qr.replace(
  '<li>Recue <span class="alert-red">1 degrau</span> na Bounty Track (nunca abaixo de $0).</li>',
  '<li><strong>Recuo por Patch:</strong> prejuízo fixo por zona de riqueza — Verde $1.500 · Amarela $3.000 · Laranja $4.500 · Vermelha $6.000. Deduza do saldo; marcador recua para refletir novo saldo (piso $0).</li>'
);
console.log('[QR Fix 1] Quick Rules patch penalty updated');

// Fix 3 QR: Bounty Track card — "Avance o peão diretamente para o valor" → acumulador
qr = qr.replace(
  '<li><strong>Bounty Track:</strong> Avance o peão diretamente para o valor.</li>',
  '<li><strong>Bounty Track (Acumulador):</strong> Some o payout ao saldo atual. Avance o marcador ao degrau correspondente (ou abaixo).</li>'
);
console.log('[QR Fix 3] Quick Rules bounty track description updated to acumulador');

// Fix 4 QR: Events card — "Não há fase opcional de Eventos" → reconcile Guardável
qr = qr.replace(
  '<p>Ocorrem obrigatoriamente como "preço" de um Report bem-sucedido. Não há fase opcional de Eventos, você só atrai caos quando faz barulho e ganha dinheiro!</p>',
  '<p>Cartas <strong>IMEDIATAS</strong> saem após o Report (Custo do Sucesso) e resolvem na hora. Cartas <strong>GUARDÁVEIS</strong> podem ser guardadas (limite 2) e jogadas apenas na <strong>Janela de Caos (Opcional)</strong> do seu turno.</p>'
);
console.log('[QR Fix 4] Quick Rules Events section reconciled with Guardável rule');

// Fix 5 QR: Bônus Progs — "$0-$5k" → "$0-$4k" (Critical program capped at $4.000)
qr = qr.replace(
  '<li><strong>Bônus Fixos:</strong> Vulns ($500-$7.5k) | Progs ($0-$5k) | Tools ($500-$2k).</li>',
  '<li><strong>Bônus Fixos:</strong> Vulns ($500-$7.5k) | Progs ($0-$4k) | Tools ($500-$2k).</li>'
);
console.log('[QR Fix 5] Quick Rules Progs bonus cap updated to $4k');

fs.writeFileSync('f:/PWNDgame/public/quick-rules.html', qr);
console.log('✅ quick-rules.html saved.');

// ─────────────────────────────────────────────────────────────
//  VALIDATION PASS
// ─────────────────────────────────────────────────────────────
console.log('\n──── VALIDATION ────');
const manFinal = fs.readFileSync('f:/PWNDgame/public/pwnd-manual.html', 'utf8');
const qrFinal  = fs.readFileSync('f:/PWNDgame/public/quick-rules.html', 'utf8');

const forbidden = [
  { pattern: /1 degrau para trás/, label: '"1 degrau para trás"' },
  { pattern: /\(3 degraus\)/, label: '"(3 degraus)"' },
  { pattern: /Recue.*degrau/i, label: '"Recue X degrau"' },
  { pattern: /Fase 4/, label: '"Fase 4"' },
  { pattern: /Mult\./g, label: '"Mult."' },
  { pattern: /×[0-9]/, label: '"×N multiplier"' },
  { pattern: /multiplicadores de remuneração/i, label: '"multiplicadores de remuneração"' },
  { pattern: /atingir \.000/i, label: 'truncated ".000"' },
  { pattern: /degrau de penalidade/i, label: '"degrau de penalidade"' },
];

let passed = true;
for (const { pattern, label } of forbidden) {
  if (pattern.test(manFinal)) {
    console.log(`  ❌ MANUAL still has: ${label}`);
    passed = false;
  }
  if (pattern.test(qrFinal)) {
    console.log(`  ❌ QUICK-RULES still has: ${label}`);
    passed = false;
  }
}
if (passed) {
  console.log('  ✅ All forbidden patterns eliminated.');
}

// Check Épica is $5.000 not $4.000 in vuln table
if (manFinal.includes('Épica (+$5.000)')) {
  console.log('  ✅ Vuln Épica = +$5.000 confirmed');
} else {
  console.log('  ❌ Vuln Épica value missing or wrong');
}

// Check Crítico program is $4.000
if (manFinal.includes('Crítico\n                                (+$4.000)') || manFinal.includes('Crítico (+$4.000)')) {
  console.log('  ✅ Programa Crítico = +$4.000 confirmed');
} else {
  console.log('  ⚠️  Programa Crítico check — verify manually');
}
