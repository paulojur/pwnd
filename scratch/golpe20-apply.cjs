const fs = require('fs');
const path = require('path');

const manualPath = path.join(__dirname, '..', 'public', 'pwnd-manual.html');
let html = fs.readFileSync(manualPath, 'utf8');

const hasCRLF = html.includes('\r\n');
if (hasCRLF) {
    html = html.replace(/\r\n/g, '\n');
}

const changelog = [];

function recordChange(itemNum, itemName, oldText, newText) {
    changelog.push({ itemNum, itemName, oldText, newText });
}

// ================= ITEM 1 =================
const oldArchetypesMatch = html.match(/<div class="archetype-grid">[\s\S]*?<\/div>\s*<\/div>/);
if (!oldArchetypesMatch) throw new Error('Item 1 match failed!');
const oldArchetypes = oldArchetypesMatch[0];
const newArchetypes = `<div class="archetype-grid">
                    <div class="archetype-card">
                        <h4>n00b</h4>
                        <div class="role">O Iniciante Dedicado</div>
                        <p><strong>Playstyle:</strong> Garimpeiro de Ferramentas: após cada Report bem-sucedido, olha as 3 primeiras cartas do Main Deck e escolhe 1 Tool Card. Passiva instala na hora (rack cheio: descarta 1 Tool instalada para abrir vaga); ativa usa na hora, descartando após o uso. Não pode guardar para depois. Se não houver Tool, embaralha as 3 de volta.</p>
                        <p style="margin-top:.6rem"><strong>Limite de Mão:</strong> 6 cartas</p>
                        <ul style="margin-top:.6rem; padding-left:1.2rem;">
                            <li>Limite de Mão: 6 cartas</li>
                            <li>Garimpa 1 Tool por Report</li>
                        </ul>
                    </div>
                    <div class="archetype-card">
                        <h4>The Old Guard</h4>
                        <div class="role">O Veterano de C/ASM</div>
                        <p><strong>Playstyle:</strong> Mão Expandida</p>
                        <p style="margin-top:.6rem"><strong>Limite de Mão:</strong> 9 cartas</p>
                        <ul style="margin-top:.6rem; padding-left:1.2rem;">
                            <li>Limite de Mão: 9 cartas</li>
                        </ul>
                    </div>
                    <div class="archetype-card">
                        <h4>Bug Hunter</h4>
                        <div class="role">O Caçador em Escala</div>
                        <p><strong>Playstyle:</strong> Caçador em Escala: só reporta vulnerabilidades Comum e Incomum (nunca Rara ou acima). Cada carta além da primeira no mesmo Report soma +$500 ao payout.</p>
                        <p style="margin-top:.6rem"><strong>Limite de Mão:</strong> 6 cartas</p>
                        <ul style="margin-top:.6rem; padding-left:1.2rem;">
                            <li>Limite de Mão: 6 cartas</li>
                            <li>Restrito a Comum e Incomum</li>
                        </ul>
                    </div>
                    <div class="archetype-card">
                        <h4>Social Engineer</h4>
                        <div class="role">O Manipulador Social</div>
                        <p><strong>Playstyle:</strong> Caos Redirecionado: na Recon, pode comprar 1 carta de Evento no lugar das 2 cartas. Qualquer evento que o mire pode ser redirecionado a outro jogador, exceto eventos de ajuda ao último colocado. A partir da Rodada 7, não compra mais eventos, mas segue redirecionando os que o miram.</p>
                        <p style="margin-top:.6rem"><strong>Limite de Mão:</strong> 6 cartas</p>
                        <ul style="margin-top:.6rem; padding-left:1.2rem;">
                            <li>Limite de Mão: 6 cartas</li>
                            <li>Redireciona cartas de evento</li>
                            <li>Alta interação PvP</li>
                        </ul>
                    </div>
                    <div class="archetype-card">
                        <h4>Red Teamer</h4>
                        <div class="role">O Operador Ofensivo</div>
                        <p><strong>Playstyle:</strong> Sem Limites: Ignora todas as restrições de escopo dos programas, incluindo o evento Out of Scope! (paga -30% nos bounties obtidos). Só toma Patch tirando 8.</p>
                        <p style="margin-top:.6rem"><strong>Limite de Mão:</strong> 6 cartas</p>
                        <ul style="margin-top:.6rem; padding-left:1.2rem;">
                            <li>Ignora escopo de programas</li>
                            <li>Explora qualquer vulnerabilidade em qualquer alvo</li>
                            <li>Flexibilidade total</li>
                        </ul>
                    </div>
                    <div class="archetype-card">
                        <h4>The Pentester</h4>
                        <div class="role">O Auditor Metódico</div>
                        <p><strong>Playstyle:</strong> Imunidade Profissional: Imune a cartas de disrupção como Duplicate Report! e Triage Delay!. Só toma Patch tirando 8.</p>
                        <p style="margin-top:.6rem"><strong>Limite de Mão:</strong> 6 cartas</p>
                        <ul style="margin-top:.6rem; padding-left:1.2rem;">
                            <li>Imunidade a Duplicate Report!</li>
                            <li>Imunidade a Triage Delay!</li>
                            <li>Fluxo estável de caixa</li>
                        </ul>
                    </div>
                </div>`;

html = html.replace(oldArchetypes, newArchetypes);
recordChange(1, 'Seção 10 — Substituir os 6 blocos de arquétipo', oldArchetypes, newArchetypes);

// ================= ITEM 2 =================
const oldSec44Match = html.match(/<p>A distribuição de Safeguards segue a <strong>Fórmula N\+5<\/strong>: cada jogador começa com\s*<strong>1 carta Bypass garantida na mão<\/strong>\. No Main Deck ficam embaralhadas <strong>2 Bypass \+\s*2 CVE Assignment Protection<\/strong>\.\s*<\/p>/);
if (!oldSec44Match) throw new Error('Item 2 match failed!');
const oldSec44 = oldSec44Match[0];
const newSec44 = `<p>A distribuição de Safeguards segue a <strong>Fórmula N+5</strong>: cada jogador começa com <strong>1 carta Bypass já posicionada no Slot Safeguard do seu Player Mat</strong>. No Main Deck ficam embaralhadas <strong>2 Bypass + 2 CVE Assignment Protection</strong>.</p>`;
html = html.replace(oldSec44, newSec44);
recordChange(2, 'Seção 4.4 — Frase de abertura da mão inicial', oldSec44, newSec44);

// ================= ITEM 3 =================
const oldSec83Match = html.match(/<h3>8\.3 · Mecanismo de Defesa — Bypass<\/h3>\s*<p>Se o jogador possuir a carta <em>Bypass<\/em> na mão no momento do patch[\s\S]*?<\/p>/);
if (!oldSec83Match) throw new Error('Item 3 match failed!');
const oldSec83 = oldSec83Match[0];
const newSec83 = `<h3>8.3 · Mecanismo de Defesa — Bypass</h3>
                <p>A proteção do Bypass só está ativa enquanto a carta estiver no Slot Safeguard do seu Player Mat. Bypass na mão não protege. Ao comprar um Bypass com o slot ocupado, mantenha-o na mão; quando o slot esvaziar (o Bypass é descartado ao ser usado), coloque-o no slot como ação livre. A CVE Protection não tem slot: fica na mão e é descartada ao ser usada.</p>`;
html = html.replace(oldSec83, newSec83);
recordChange(3, 'Seção 8.3 — Mecanismo de Defesa — Bypass', oldSec83, newSec83);

// ================= ITEM 4 =================
const oldSec06Match = html.match(/<em>Nota\s*\(Bug Hunter\):\s*o mínimo de 2 vulnerabilidades em programas Alto\/Crítico se aplica ao TOTAL do Report, e\s*nunca por\s*lote\.<\/em>/);
if (!oldSec06Match) throw new Error('Item 4 match failed!');
const oldSec06 = oldSec06Match[0];
const newSec06 = `<em>Nota (Bug Hunter): o mínimo de 2 vulnerabilidades em programas Alto/Crítico se aplica ao TOTAL do Report.</em>`;
html = html.replace(oldSec06, newSec06);
recordChange(4, 'Seção 06 — Nota do Bug Hunter', oldSec06, newSec06);

// ================= ITEM 5 =================
const oldSec02EventMatch = html.match(/Acesso\s+direto\s+ao\s+Event\s+Deck\s+via\s+Recon\s+é\s+poder\s+exclusivo\s+do\s+Social\s+Engineer\./);
const oldGlossaryReconMatch = html.match(/Acesso\s+ao\s+Event\s+Deck\s+via\s+Recon\s+é\s+poder\s+exclusivo\s+do\s+Social\s+Engineer\./);

if (!oldSec02EventMatch) throw new Error('Item 5 (Sec 02) match failed!');
if (!oldGlossaryReconMatch) throw new Error('Item 5 (Glossary) match failed!');

const oldSec02Event = oldSec02EventMatch[0];
const oldGlossaryRecon = oldGlossaryReconMatch[0];
const newReconText = `Comprar carta de Evento via Recon (no lugar das 2 cartas do Main Deck) é poder exclusivo do Social Engineer.`;

html = html.replace(oldSec02EventMatch[0], newReconText);
html = html.replace(oldGlossaryReconMatch[0], newReconText);
recordChange(5, 'Seção 02 & Glossário — Recon do Social Engineer', `${oldSec02Event} | ${oldGlossaryRecon}`, newReconText);

// ================= ITEM 6 =================
const oldGlossaryBypassMatch = html.match(/<dt>Bypass<\/dt>\s*<dd>Safeguard de <strong>proteção financeira<\/strong>:[\s\S]*?<\/dd>/);
if (!oldGlossaryBypassMatch) throw new Error('Item 6 match failed!');
const oldGlossaryBypass = oldGlossaryBypassMatch[0];
const newGlossaryBypass = `<dt>Bypass</dt>
                    <dd>A proteção do Bypass só está ativa enquanto a carta estiver no Slot Safeguard do seu Player Mat. Bypass na mão não protege. Ao comprar um Bypass com o slot ocupado, mantenha-o na mão; quando o slot esvaziar (o Bypass é descartado ao ser usado), coloque-o no slot como ação livre. A CVE Protection não tem slot: fica na mão e é descartada ao ser usada.</dd>`;
html = html.replace(oldGlossaryBypass, newGlossaryBypass);
recordChange(6, 'Glossário — Bypass', oldGlossaryBypass, newGlossaryBypass);

// ================= ITEM 7 =================
const oldGlossaryExploitMatch = html.match(/<dt>Exploit<\/dt>\s*<dd>Ação de alocar uma vulnerabilidade na Zona de Exploits do Player Mat, pagando os custos de\s*ferramentas requeridos e respeitando o escopo do programa ativo\.<\/dd>/);
if (!oldGlossaryExploitMatch) throw new Error('Item 7 match failed!');
const oldGlossaryExploit = oldGlossaryExploitMatch[0];
const newGlossaryExploit = `<dt>Exploit</dt>
                    <dd>Exploit: ação de alocar uma vulnerabilidade na Zona de Exploits do Player Mat, respeitando o escopo do programa ativo. Não há custo de ferramentas para baixar vulnerabilidades.</dd>`;
html = html.replace(oldGlossaryExploit, newGlossaryExploit);
recordChange(7, 'Glossário — Exploit', oldGlossaryExploit, newGlossaryExploit);

// ================= ITEM 8 =================
const oldGlossaryPatchMatch = html.match(/<dt>PATCH DEPLOYED!<\/dt>\s*<dd>Evento destrutivo acionado quando o Patch Speed Check vulnerabilidade[\s\S]*?<\/dd>/);
if (!oldGlossaryPatchMatch) throw new Error('Item 8 match failed!');
const oldGlossaryPatch = oldGlossaryPatchMatch[0];
const newGlossaryPatch = `<dt>PATCH DEPLOYED!</dt>
                    <dd>Evento destrutivo acionado quando o Patch Speed Check aciona o patch do programa ativo. O jogador que sofre o PATCH DEPLOYED! perde o valor fixo conforme sua zona de riqueza (Verde $1.500, Amarela $3.000, Laranja $4.500, Vermelha $6.000), recua na Bounty Track até refletir o novo saldo (mínimo $0) e encerra o programa ativo.</dd>`;
html = html.replace(oldGlossaryPatch, newGlossaryPatch);
recordChange(8, 'Glossário — PATCH DEPLOYED!', oldGlossaryPatch, newGlossaryPatch);

// ================= ITEM 9 =================
const oldSec02CVSSMatch = html.match(/<ul style="margin-top:0\.5rem; padding-left:1\.2rem; font-size:0\.9rem; margin-bottom:0\.8rem; color:#d1d5db;">[\s\S]*?Lendária \(Laranja\)[\s\S]*?<\/ul>/);
if (!oldSec02CVSSMatch) throw new Error('Item 9 match failed!');
const oldSec02CVSS = oldSec02CVSSMatch[0];
const newSec02CVSS = `<ul style="margin-top:0.5rem; padding-left:1.2rem; font-size:0.9rem; margin-bottom:0.8rem; color:#d1d5db;">
                            <li>Comum (Cinza): CVSS 4.0 a 5.9</li>
                            <li>Incomum (Verde): CVSS 6.0 a 6.9</li>
                            <li>Rara (Azul): CVSS 7.0 a 7.9</li>
                            <li>Épica (Roxa): CVSS 8.0 a 8.9</li>
                            <li>Lendária (Dourada): CVSS 9.0 a 10.0</li>
                        </ul>`;
html = html.replace(oldSec02CVSS, newSec02CVSS);
recordChange(9, 'Seção 02 — Lista CVSS por raridade', oldSec02CVSS, newSec02CVSS);

// WRITE RESTORED MANUAL
if (hasCRLF) {
    html = html.replace(/\n/g, '\r\n');
}
fs.writeFileSync(manualPath, html, 'utf8');
console.log('Manual successfully updated!');

// VALIDATION FORBIDDEN EXPRESSIONS
const forbiddenExpressions = [
    'Engine Builder',
    'Inicia simples',
    '+1 compra de carta por report',
    'Bônus de +20%',
    'Submissão única por rodada',
    'Submissão em Dois Lotes',
    '2 Lotes em 1 Report',
    '+50% de bônus se submeter',
    'CVSS ≤ 6.0',
    'Restrito a CVSS',
    'Força descartes de oponentes',
    'nunca por lote',
    'Acesso direto ao Event Deck',
    'Acesso ao Event Deck',
    'pagando os custos de ferramentas requeridos',
    'Patch Speed Check vulnerabilidade',
    'Bypass na mão no momento do patch',
    'Bypass garantida na mão',
    'Lendária (Laranja)'
];

console.log('\n================ VALIDATION OF FORBIDDEN EXPRESSIONS ================');
let validationFailed = false;
forbiddenExpressions.forEach(expr => {
    const count = (html.match(new RegExp(expr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    if (count > 0) {
        console.log(`❌ FORBIDDEN EXPRESSION FOUND: "${expr}" (count: ${count})`);
        validationFailed = true;
    } else {
        console.log(`✅ ELIMINATED / CLEAN: "${expr}"`);
    }
});

if (validationFailed) {
    console.error('Validation FAILED! Forbidden expressions still remain.');
    process.exit(1);
} else {
    console.log('🎉 ALL FORBIDDEN EXPRESSIONS CONFIRMED ABSENT / ELIMINATED!');
}

// SAVE CHANGELOG TO FILE FOR OUTPUT
fs.writeFileSync(path.join(__dirname, 'golpe20-changelog.json'), JSON.stringify(changelog, null, 2), 'utf8');
