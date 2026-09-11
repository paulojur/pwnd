const fs = require('fs');

let content = fs.readFileSync('public/pwnd-manual.html', 'utf8');

// Section 10 - n00b
const noobRegex = /<div class="role">O Estagiário Curioso<\/div>[\s\S]*?<ul>[\s\S]*?<li>Comprou uma Tool\? Instale-a de graça num slot livre \(ferramenta passiva\) ou guarde na sua área pra usar na hora certa \(ativa\).<\/li>[\s\S]*?<\/ul>/;
const noobNew = `<div class="role">O Estagiário Curioso</div>
                        <p><strong>Playstyle:</strong> Garimpeiro de Ferramentas: após cada Report bem-sucedido, olha as 3 primeiras cartas do Main Deck. Se houver uma Tool Card, instala de graça (passiva) ou usa na hora sem custo (ativa); se não houver, embaralha as 3 de volta.</p>
                        <p style="margin-top:.6rem"><strong>Limite de Mão:</strong> 6 cartas</p>
                        <ul style="margin-top:.6rem; padding-left:1.2rem;">
                            <li>Garimpa 1 Tool por Report</li>
                        </ul>`;
content = content.replace(noobRegex, noobNew);

// Section 10 - Old Guard
const oldGuardRegex = /<p><strong>Playstyle:<\/strong> Abordagem Metódica: O jogador foca em campanhas longas e precisas.<\/p>[\s\S]*?<li><strong>Submissão Única:<\/strong> Pode realizar apenas <strong>1 Ação de Report por rodada<\/strong>.<\/li>/;
const oldGuardNew = `<p><strong>Playstyle:</strong> Mão Expandida</p>
                        <p style="margin-top:.6rem"><strong>Limite de Mão:</strong> 9 cartas</p>
                        <ul style="margin-top:.6rem; padding-left:1.2rem;">`;
content = content.replace(oldGuardRegex, oldGuardNew);

// Section 10 - Bug Hunter
const bugHunterRegex = /<p><strong>Playstyle:<\/strong> Submissão em Dois Lotes: Ao realizar Report, divide a Zona de\s*Exploits em 2 lotes independentes no mesmo Active Program.<\/p>[\s\S]*?<li><strong>Restrito a CVSS \u2264 6.0:<\/strong> S pode alocar vulnerabilidades na Zona de\s*Exploits com CVSS 6.0 ou menor \(geralmente cartas de raridade Comum e Incomum\).<\/li>/;
const bugHunterNew = `<p><strong>Playstyle:</strong> Caçador em Escala: só reporta vulnerabilidades Comum e Incomum (nunca Rara ou acima). Cada carta além da primeira no mesmo Report soma +$500 ao payout.</p>
                        <p style="margin-top:.6rem"><strong>Limite de Mão:</strong> 6 cartas</p>
                        <ul style="margin-top:.6rem; padding-left:1.2rem;">
                            <li>Restrito a Comum e Incomum</li>`;
content = content.replace(bugHunterRegex, bugHunterNew);

// Section 10 - Social Engineer
const socialEngRegex = /<p><strong>Playstyle:<\/strong> Caos Redirecionado: Pode escolher nominalmente qual adversrio\s*sofrer o impacto de cartas de Evento jogadas.<\/p>/;
const socialEngNew = `<p><strong>Playstyle:</strong> Caos Redirecionado: na Recon, pode comprar 1 carta de Evento no lugar das 2 cartas. Qualquer evento que o mire pode ser redirecionado a outro jogador, exceto eventos de ajuda ao último colocado. A partir da Rodada 7, não compra mais eventos, mas segue redirecionando os que o miram.</p>`;
content = content.replace(socialEngRegex, socialEngNew);

// Section 06 - Report Nota
content = content.replace('o mínimo de 2 vulnerabilidades em programas Alto/Crítico se aplica ao TOTAL do Report, e\r\n                                nunca por\r\n                                lote.', 'o mínimo de 2 vulnerabilidades em programas Alto/Crítico se aplica ao TOTAL do Report.');
content = content.replace('o mínimo de 2 vulnerabilidades em programas Alto/Crítico se aplica ao TOTAL do Report, e\n                                nunca por\n                                lote.', 'o mínimo de 2 vulnerabilidades em programas Alto/Crítico se aplica ao TOTAL do Report.');
content = content.replace('o mínimo de 2 vulnerabilidades em programas Alto/Crítico se aplica ao TOTAL do Report, e nunca por lote.', 'o mínimo de 2 vulnerabilidades em programas Alto/Crítico se aplica ao TOTAL do Report.');

// Section 02 / Glossario - Eventos/Recon
content = content.replace(/Acesso direto\s*ao Event Deck via Recon  poder exclusivo do Social Engineer\./g, 'Comprar carta de Evento via Recon (no lugar das 2 cartas do Main Deck) é poder exclusivo do Social Engineer.');
content = content.replace(/Acesso direto ao Event Deck via Recon  poder exclusivo do Social Engineer\./g, 'Comprar carta de Evento via Recon (no lugar das 2 cartas do Main Deck) é poder exclusivo do Social Engineer.');
content = content.replace(/Acesso ao Event Deck via Recon  poder exclusivo do Social Engineer\./g, 'Comprar carta de Evento via Recon (no lugar das 2 cartas do Main Deck) é poder exclusivo do Social Engineer.');


fs.writeFileSync('public/pwnd-manual.html', content, 'utf8');
console.log('pwnd-manual.html atualizado.');
