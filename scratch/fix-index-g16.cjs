const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Card 1
content = content.replace(
    'O primeiro jogador a alcançar $40.000 vence!',
    'O primeiro pesquisador a alcançar $40.000 na Bounty Track vence a partida.'
);
content = content.replace('SETUP (6 PASSOS)', 'SETUP (4 PASSOS)');
content = content.replace('<li>Distribua 1 Arquétipo e <strong>6 cartas</strong> de Mão Inicial (5 do Deck principal + 1\r\n                        Bypass) para cada jogador.</li>\r\n                    <li>Monte o Tabuleiro Central (Event Deck, Round Track 1 a 8).</li>\r\n                    <li>Abra 3 cartas de Programa no Market.</li>\r\n                    <li>Cada um escolhe um Active Program e põe no Player Mat.</li>\r\n                    <li>Coloque os marcadores na Bounty Track no piso $0.</li>\r\n                    <li>Posicione o Bypass inicial no Slot Safeguard.</li>', 
    '<li>Distribua 1 Arquétipo e <strong>6 cartas</strong> de Mão Inicial (5 do Deck principal + 1 Bypass) para cada jogador.</li>\r\n                    <li>Abra 3 cartas de Programa no Market.</li>\r\n                    <li>Cada um escolhe um Active Program e põe no Player Mat.</li>\r\n                    <li>Posicione o Bypass inicial no Slot Safeguard.</li>'
);

// Card 2
content = content.replace('<li><strong>Início:</strong> O seu turno começa.</li>\r\n                    <li><strong>Ação Principal:</strong> Escolha EXATAMENTE UMA (Recon, Exploit OU Report).</li>\r\n                    <li><strong>Custo do Sucesso:</strong> Só se fez Report: compre evento!</li>\r\n                    <li><strong>Janela de Caos (Opcional):</strong> Jogue eventos guardados do seu mat.</li>\r\n                    <li><strong>Patch Speed Check:</strong> Role D8 (2 no Stealth, 1 no Report) no fim do turno, só se\r\n                        tiver vulnerabilidades na mesa.</li>\r\n                    <li><strong>Fim:</strong> Fim do turno.</li>',
    '<li><strong>Ação Principal:</strong> escolha exatamente uma. <strong>Recon</strong> (comprar cartas ou trocar de programa), <strong>Exploit</strong> (alocar 1 vulnerabilidade) ou <strong>Report</strong> (submeter vulnerabilidades).</li>\r\n                    <li><strong>Patch Speed Check:</strong> se você tiver vulnerabilidades na mesa ao fim da ação, role os dados (detalhes no Card 06). Se o patch disparar, você sofre o Patch Deployed!</li>\r\n                    <li><strong>Custo do Sucesso:</strong> só se o seu Report foi aprovado, compre 1 evento (obrigatório).</li>\r\n                    <li><strong>Janela de Caos (Opcional):</strong> Jogue eventos guardados do seu mat.</li>\r\n                    <li><strong>Fim:</strong> passa a vez.</li>'
);

// Card 3
content = content.replace('descarte alvo atual/vulnerabilidades e pegue novo do Market', 'descarte o alvo atual e as vulnerabilidades da sua Zona de Exploits e pegue um novo programa do Market');
content = content.replace('Instale Tools descartando 1 carta da mão.', 'Instale Tools descartando 1 carta qualquer da mão (não precisa ser uma vulnerabilidade).');

// Card 5
content = content.replace('Sempre que fizer um Report bem-sucedido, você <strong>deve</strong> comprar 1 Evento antes do seu\r\n                    turno acabar.', 'Sempre que um Report for aprovado, você deve comprar 1 evento antes de terminar o turno. Os eventos podem ser de dois tipos:');

// Card 6
content = content.replace('<p><strong>Stealth Mode:</strong> Fim do turno, se tiver vulnerabilidades na mesa sem reportar. Role 2\r\n                    D8, escolha\r\n                    o menor.</p>\r\n                <p><strong>Noisy Report (Exceção):</strong> Rola 1 D8 no exato momento do Report (antes de esvaziar a\r\n                    Zona). <span class="alert-red">Se falhar no D8, o Report falha (não pontua) e\r\n                        você sofre o Patch\r\n                        Deployed!</span></p>\r\n\r\n                <h4>LIMIARES DE vulnerabilidade</h4>',
    '<p>O patch é o relógio do programa: ele só dispara se você deixar vulnerabilidades na mesa sem reportar ao fim do turno.</p>\r\n                <p><strong>Stealth Mode:</strong> no fim do turno, se houver vulnerabilidades na mesa não reportadas, role 2 D8 e fique com o menor resultado. Se ele acionar o limiar do programa, sofre o Patch Deployed!</p>\r\n                <p><strong>Noisy Report (exceção):</strong> role 1 D8 no momento do Report, antes de esvaziar a Zona. <span class="alert-red">Se falhar, o Report não pontua e você sofre o Patch Deployed!</span></p>\r\n                <p><strong>Escapando do patch:</strong> o Bypass anula o Patch Deployed 100%. Alguns arquétipos (Red Teamer e Pentester) só tomam patch tirando 8.</p>\r\n\r\n                <h4>LIMIARES DE vulnerabilidade</h4>'
);

// Card 7
const card7Original = `<h4>PATCH DEPLOYED! (Penalidade)</h4>\r
                <p>Perde as vulnerabilidades da Zona, perde o Programa e toma recuo (piso $0):</p>\r
                <ul>\r
                    <li><span class="alert-green">Verde:</span> recua $1.500 | <span class="highlight">Amarela:</span>\r
                        recua $3.000</li>\r
                    <li><span class="highlight" style="color: #c2410c;">Laranja:</span> recua $4.500 | <span\r
                            class="alert-red">Vermelha:</span> recua $6.000</li>\r
                </ul>\r
                <h4>SAFEGUARDS (Reação)</h4>\r
                <ul>\r
                    <li><strong>Bypass:</strong> Anula o Patch Deployed 100%.</li>\r
                    <li><strong>CVE Protection:</strong> Anula Duplicate Report/DNS Hijack/Out of Scope.</li>\r
                </ul>`;

const card7New = `<h4>SAFEGUARDS (Reação)</h4>\r
                <ul>\r
                    <li><strong>Bypass:</strong> Anula o Patch Deployed 100%.</li>\r
                    <li><strong>CVE Protection:</strong> Anula Duplicate Report/DNS Hijack/Out of Scope.</li>\r
                </ul>\r
                <h4>PATCH DEPLOYED! (Penalidade)</h4>\r
                <p>Perde as vulnerabilidades da Zona, perde o Programa e toma recuo (piso $0):</p>\r
                <ul>\r
                    <li><span class="alert-green">Verde:</span> recua $1.500 | <span class="highlight">Amarela:</span>\r
                        recua $3.000</li>\r
                    <li><span class="highlight" style="color: #c2410c;">Laranja:</span> recua $4.500 | <span\r
                            class="alert-red">Vermelha:</span> recua $6.000</li>\r
                </ul>`;
content = content.replace(card7Original, card7New);

// Card 8
const card8Original = `<ul>\r
                    <li><strong>n00b (Mão 6):</strong> Escolhe passiva bônus após Reports.</li>\r
                    <li><strong>Old Guard (Mão 9):</strong> Mão 9. 1 Report por rodada.</li>\r
                    <li><strong>Bug Hunter (Mão 6):</strong> Submete 2 lotes em um Report. Só reporta bugs com CVSS ≤\r
                        6.0.</li>\r
                    <li><strong>Social Engineer (Mão 6):</strong> Acessa Event Deck via Recon; redireciona caos.</li>\r
                    <li><strong>Red Teamer (Mão 6):</strong> Imune a escopo. Payout -30%. Só toma Patch tirando 8.</li>\r
                    <li><strong>Pentester (Mão 6):</strong> Imune a Duplicate Report e Triage Delay. Só toma Patch\r
                        tirando 8.</li>\r
                </ul>`;

const card8New = `<ul>\r
                    <li><strong>n00b:</strong> após cada Report, olhe as 3 primeiras cartas do deck. Se houver uma Tool, pegue-a: passiva instala de graça num slot livre, ativa pode ser usada na hora sem custo. Se não houver Tool, embaralhe as 3 de volta.</li>\r
                    <li><strong>Old Guard:</strong> limite de mão de 9 cartas (os demais jogadores, 6).</li>\r
                    <li><strong>Bug Hunter:</strong> só reporta vulnerabilidades Comum e Incomum (nunca Rara ou acima). Cada carta além da primeira no mesmo Report soma +$500 ao payout.</li>\r
                    <li><strong>Social Engineer:</strong> na Recon, pode comprar 1 carta de Evento no lugar das 2 cartas. Qualquer evento que o mire pode ser redirecionado a outro jogador (exceto ajuda ao último colocado). A partir da Rodada 7, não compra mais eventos, mas segue redirecionando os que o miram.</li>\r
                    <li><strong>Red Teamer:</strong> imune a escopo, payout -30%, só toma Patch tirando 8.</li>\r
                    <li><strong>Pentester:</strong> imune a Duplicate Report e Triage Delay, só toma Patch tirando 8.</li>\r
                </ul>`;
content = content.replace(card8Original, card8New);

// Fallback replacements if line endings are different
if(content.includes('O primeiro jogador a alcançar $40.000 vence!')) {
  console.log("Card 1 Objective NOT replaced");
}
if(content.includes('SETUP (6 PASSOS)')) {
  console.log("Card 1 Setup NOT replaced");
}

fs.writeFileSync('index.html', content, 'utf8');
console.log('index.html atualizado.');
