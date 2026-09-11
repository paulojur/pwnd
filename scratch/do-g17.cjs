const fs = require('fs');

const manualPath = 'public/pwnd-manual.html';
let html = fs.readFileSync(manualPath, 'utf8');

// 4. n00b
html = html.replace(/Garimpeiro de Ferramentas:[\s\S]*?embaralha as 3 de volta\./,
    `Garimpeiro de Ferramentas: após cada Report bem-sucedido, olha as 3 primeiras cartas do Main Deck e escolhe 1 Tool Card. Passiva instala na hora (rack cheio: descarta 1 Tool instalada para abrir vaga); ativa usa na hora, descartando após o uso. Não pode guardar para depois. Se não houver Tool, embaralha as 3 de volta.`);

// 5. Red Teamer
html = html.replace(/Sem Limites: Ignora todas as restrições de escopo dos programas \(paga -30% nos bounties obtidos\) - só toma Patch tirando 8\./g,
    `Sem Limites: Ignora todas as restrições de escopo dos programas, incluindo o evento Out of Scope! (paga -30% nos bounties obtidos). Só toma Patch tirando 8.`);

// 6. Eventos
html = html.replace(/Verba de emergência liberada![\s\S]*?\)/,
    `Verba de emergência liberada! O seu próximo Report aprovado terá +50% sobre o valor das vulnerabilidades (o bônus do programa e os bônus de tools não são multiplicados).`);

html = html.replace(/Janela de divulgação responsável![\s\S]*?Custo do Sucesso \(comprar 1 evento\) continua valendo\./,
    `Janela de divulgação responsável! Todos os jogadores com vulnerabilidades válidas na mesa fazem 1 Report imediato SEM rolar o D8 (sem risco de Patch Deployed!). O Custo do Sucesso (comprar 1 evento) continua valendo.`);

html = html.replace(/Auditoria de dados![\s\S]*?empatados descartam\./,
    `Auditoria de dados! Todos revelam a mão. O jogador com mais vulnerabilidades de CVSS ≥ 8.0 descarta metade delas (arredondado para cima). Em caso de empate, todos os empatados descartam.`);

// 7. Rodada 8
html = html.replace(/Patch Implacável: todos os testes de Patch Speed usam 2D8[\s\S]*?Extrema 5→4\.(?! Red Teamer e Pentester continuam)/,
    `Patch Implacável: todos os testes de Patch Speed usam 2D8 (falha se QUALQUER dado acionar o limiar). No Stealth Mode, o limiar do programa conta 1 ponto menor: Lenta 8→7, Moderada 7→6, Rápida 6→5, Extrema 5→4. Red Teamer e Pentester continuam tomando patch apenas no resultado natural 8.`);

// 8. Bypass
html = html.replace(/A proteção do Bypass só está ativa enquanto a carta estiver no Slot Safeguard[\s\S]*?descartada ao ser usada\./,
    `A proteção do Bypass só está ativa enquanto a carta estiver no Slot Safeguard do seu Player Mat. Bypass na mão não protege. Ao comprar um Bypass com o slot ocupado, mantenha-o na mão; quando o slot esvaziar (o Bypass é descartado ao ser usado), coloque-o no slot como ação livre. A CVE Protection não tem slot: fica na mão e é descartada ao ser usada.`);

// 9. Setup
html = html.replace(/cada jogador começa com 1 carta Bypass garantida na mão/g,
    `cada jogador começa com 1 carta Bypass já posicionada no Slot Safeguard do seu Player Mat`);

// 10. Glossário (Exploit)
html = html.replace(/<dt>Exploit<\/dt>\s*<dd>[\s\S]*?<\/dd>/,
    `<dt>Exploit</dt>\n                <dd>Exploit: ação de alocar uma vulnerabilidade na Zona de Exploits do Player Mat, respeitando o escopo do programa ativo. Não há custo de ferramentas para baixar vulnerabilidades.</dd>`);

fs.writeFileSync(manualPath, html, 'utf8');
console.log("Manual updated.");

const deckPath = 'src/data/full80DeckData.ts';
if (fs.existsSync(deckPath)) {
    let deck = fs.readFileSync(deckPath, 'utf8');

    // 11. Tools
    deck = deck.replace(/name:\s*'Burp Suite Pro'[\s\S]*?text:\s*'[^']*'/, match => match.replace(/text:\s*'[^']*'/, `text: 'Ignore a régua de cores do programa ao baixar 1 vulnerabilidade.'`));
    deck = deck.replace(/name:\s*'OWASP ZAP'[\s\S]*?text:\s*'[^']*'/, match => match.replace(/text:\s*'[^']*'/, `text: 'Baixe 2 vulnerabilidades na mesma ação de Exploit.'`));
    deck = deck.replace(/name:\s*'SQLMap'[\s\S]*?text:\s*'[^']*'/, match => match.replace(/text:\s*'[^']*'/, `text: 'Baixe 1 vulnerabilidade da classe Injection ignorando a régua de cores do programa.'`));
    deck = deck.replace(/name:\s*'Postman'[\s\S]*?text:\s*'[^']*'/, match => match.replace(/text:\s*'[^']*'/, `text: 'Baixe 1 vulnerabilidade da classe BAC ignorando a régua de cores do programa.'`));

    fs.writeFileSync(deckPath, deck, 'utf8');
    console.log("Deck updated.");
}

const cardsPath = 'src/data/cardsData.ts';
if (fs.existsSync(cardsPath)) {
    let cards = fs.readFileSync(cardsPath, 'utf8');
    cards = cards.replace(/name:\s*'Burp Suite Pro'[\s\S]*?text:\s*'[^']*'/, match => match.replace(/text:\s*'[^']*'/, `text: 'Ignore a régua de cores do programa ao baixar 1 vulnerabilidade.'`));
    cards = cards.replace(/name:\s*'OWASP ZAP'[\s\S]*?text:\s*'[^']*'/, match => match.replace(/text:\s*'[^']*'/, `text: 'Baixe 2 vulnerabilidades na mesma ação de Exploit.'`));
    cards = cards.replace(/name:\s*'SQLMap'[\s\S]*?text:\s*'[^']*'/, match => match.replace(/text:\s*'[^']*'/, `text: 'Baixe 1 vulnerabilidade da classe Injection ignorando a régua de cores do programa.'`));
    cards = cards.replace(/name:\s*'Postman'[\s\S]*?text:\s*'[^']*'/, match => match.replace(/text:\s*'[^']*'/, `text: 'Baixe 1 vulnerabilidade da classe BAC ignorando a régua de cores do programa.'`));
    fs.writeFileSync(cardsPath, cards, 'utf8');
    console.log("Cards Data updated.");
}

