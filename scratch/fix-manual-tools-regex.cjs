const fs = require('fs');

const manualPath = 'public/pwnd-manual.html';
let m = fs.readFileSync(manualPath, 'utf8');

// Red Teamer
m = m.replace(/Sem Limites: Ignora todas as restrições de escopo dos programas\s*\(paga -30% nos bounties obtidos\) - só toma Patch tirando 8\./, 'Sem Limites: Ignora todas as restrições de escopo dos programas, incluindo o evento Out of Scope! (paga -30% nos bounties obtidos). Só toma Patch tirando 8.');

// Bypass 8.3
m = m.replace(/Se o jogador possuir a carta <em>Bypass<\/em> na mão no momento do patch, ele pode descartá-la para\s*<strong>anular 100% dos efeitos danosos<\/strong>\.\s*<\/p>/, 'A proteção do Bypass só está ativa enquanto a carta estiver no Slot Safeguard do seu Player Mat. Bypass na mão não protege. Ao comprar um Bypass com o slot ocupado, mantenha-o na mão; quando o slot esvaziar (o Bypass é descartado ao ser usado), coloque-o no slot como ação livre. A CVE Protection não tem slot: fica na mão e é descartada ao ser usada.</p>');

// Bypass Glossário
m = m.replace(/Safeguard de <strong>proteção financeira<\/strong>: anula 100% os efeitos do PATCH DEPLOYED!,\s*impedindo o descarte de exploits e o recuo na Bounty Track\. Jogada como reação fora do turno\.\s*Não protege contra eventos de escopo \(Duplicate, Out of Scope, DNS Hijack\)\./, 'A proteção do Bypass só está ativa enquanto a carta estiver no Slot Safeguard do seu Player Mat. Bypass na mão não protege. Ao comprar um Bypass com o slot ocupado, mantenha-o na mão; quando o slot esvaziar (o Bypass é descartado ao ser usado), coloque-o no slot como ação livre. A CVE Protection não tem slot: fica na mão e é descartada ao ser usada.');

fs.writeFileSync(manualPath, m, 'utf8');
console.log('Done!');
