const fs = require('fs');
const deckFiles = ['src/data/full80DeckData.ts', 'src/data/cardsData.ts'];
for (const file of deckFiles) {
    if (fs.existsSync(file)) {
        let d = fs.readFileSync(file, 'utf8');
        d = d.replace(/simpleDescription: 'FERRAMENTA CORINGA UNIVERSAL: Atua como substituto de qualquer ferramenta específica.'/g, "simpleDescription: 'Ignore a régua de cores do programa ao baixar 1 vulnerabilidade.'");
        fs.writeFileSync(file, d, 'utf8');
    }
}
console.log('Burp done!');
