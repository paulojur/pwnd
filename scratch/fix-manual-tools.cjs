const fs = require('fs');

// 1. Manual updates
const manualPath = 'public/pwnd-manual.html';
let m = fs.readFileSync(manualPath, 'utf8');

// Red Teamer
m = m.replace('Sem Limites: Ignora todas as restrições de escopo dos programas\n                            (paga -30% nos bounties obtidos) - só toma Patch tirando 8.', 'Sem Limites: Ignora todas as restrições de escopo dos programas, incluindo o evento Out of Scope! (paga -30% nos bounties obtidos). Só toma Patch tirando 8.');

// Bypass setup
m = m.replace('1 carta Bypass garantida na mão', '1 carta Bypass já posicionada no Slot Safeguard do seu Player Mat');

// Bypass 8.3
m = m.replace('Se o jogador possuir a carta <em>Bypass</em> na mão no momento do patch, ele pode descartá-la para\n                    <strong>anular 100% dos efeitos danosos</strong>.\n                </p>', 'A proteção do Bypass só está ativa enquanto a carta estiver no Slot Safeguard do seu Player Mat. Bypass na mão não protege. Ao comprar um Bypass com o slot ocupado, mantenha-o na mão; quando o slot esvaziar (o Bypass é descartado ao ser usado), coloque-o no slot como ação livre. A CVE Protection não tem slot: fica na mão e é descartada ao ser usada.</p>');

// Bypass Glossário
m = m.replace('Safeguard de <strong>proteção financeira</strong>: anula 100% os efeitos do PATCH DEPLOYED!,\n                        impedindo o descarte de exploits e o recuo na Bounty Track. Jogada como reação fora do turno.\n                        Não protege contra eventos de escopo (Duplicate, Out of Scope, DNS Hijack).', 'A proteção do Bypass só está ativa enquanto a carta estiver no Slot Safeguard do seu Player Mat. Bypass na mão não protege. Ao comprar um Bypass com o slot ocupado, mantenha-o na mão; quando o slot esvaziar (o Bypass é descartado ao ser usado), coloque-o no slot como ação livre. A CVE Protection não tem slot: fica na mão e é descartada ao ser usada.');

fs.writeFileSync(manualPath, m, 'utf8');

// 2. Deck updates
const deckFiles = ['src/data/full80DeckData.ts', 'src/data/cardsData.ts'];
for (const file of deckFiles) {
    if (fs.existsSync(file)) {
        let d = fs.readFileSync(file, 'utf8');
        d = d.replace(/simpleDescription: 'FERRAMENTA CORINGA:[^']*'/g, "simpleDescription: 'Ignore a régua de cores do programa ao baixar 1 vulnerabilidade.'");
        d = d.replace(/simpleDescription: 'ATIVA: Zera o custo de ferramentas para vulnerabilidades de severidade Low e Medium.'/g, "simpleDescription: 'Baixe 2 vulnerabilidades na mesma ação de Exploit.'");
        d = d.replace(/simpleDescription: 'ATIVA: Zera o custo de ferramentas para qualquer vulnerabilidade da classe Injection.'/g, "simpleDescription: 'Baixe 1 vulnerabilidade da classe Injection ignorando a régua de cores do programa.'");
        d = d.replace(/simpleDescription: 'ATIVA: Reduz o custo de ativação de vulnerabilidades da classe Broken Access Control em 1 recurso.'/g, "simpleDescription: 'Baixe 1 vulnerabilidade da classe BAC ignorando a régua de cores do programa.'");
        fs.writeFileSync(file, d, 'utf8');
    }
}
console.log('Done!');
