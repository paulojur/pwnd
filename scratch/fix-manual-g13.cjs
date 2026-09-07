const fs = require('fs');

let html = fs.readFileSync('public/pwnd-manual.html', 'utf-8');

// Fix B1: Section 06 Payout formula and Charges Note
// Remove: <span class="label">Nota sobre Ferramentas e Cargas</span> ... </p>\n
html = html.replace(/<span class="label">Nota sobre Ferramentas e Cargas<\/span>[\s\S]*?<\/p>\s*<\/div>/, '');
// Formula
html = html.replace(/Valor da vulnerabilidade \+ Bônus do Programa \+ Bônus de Tools/, 'Falhas + Bônus do Programa');
// Example Math
html = html.replace(/(\$4\.000 \+ \$2\.500 \+ \$2\.500) \+ \$1\.000 = \\mathbf\{\$10\.000\\text\{ Payout Total\}\}/, '$1 = \\mathbf{\\$9.000\\text{ Payout Total}}');
html = html.replace(/Payout \(Soma Direta\).*?Valor da vulnerabilidade \+ Bônus do Prog\. \+ Tools/, 'Payout (Soma Direta) - Falhas + Bônus do Prog.');
html = html.replace(/O peão avança e assenta no degrau <strong>\$11\.000<\/strong>/, 'O peão avança e assenta no degrau <strong>$10.000</strong>');
html = html.replace(/2ª carga \+\$500\)/, '');
html = html.replace(/1ª carga \+\$1\.000\)/, '');

// Fix B3: Section 13
html = html.replace(/Valor base da vulnerabilidade do Programa \+ Bônus de Tools/g, 'Falhas + Bônus do Programa');

// Fix A4: Section 16 BAC & LEGENDARY colors
html = html.replace(/<td>Broken Access Control \(IDOR, BOLA, Priv Esc\)<\/td>\s*<td>Roxo<\/td>/, '<td>Broken Access Control (IDOR, BOLA, Priv Esc)</td>\n                                <td>Índigo</td>');
html = html.replace(/<td>Zero-Day \/ RCE de impacto global \(CVSS 9\.5–10\.0\)<\/td>\s*<td>Violeta<\/td>/, '<td>Zero-Day / RCE de impacto global (CVSS 9.5–10.0)</td>\n                                <td>Violeta Claro</td>');

// Fix A2: Section 12 Table
const badgeMapping = {
    'Injection': '<span style="background:#f0883e;color:#fff;padding:2px 6px;border-radius:4px;font-size:10px;text-shadow:0 0 2px rgba(0,0,0,0.8)">🔴 INJ</span>',
    'Cross-Site Scripting': '<span style="background:#ff69b4;color:#fff;padding:2px 6px;border-radius:4px;font-size:10px;text-shadow:0 0 2px rgba(0,0,0,0.8)">🟡 XSS</span>',
    'Business Logic': '<span style="background:#008080;color:#fff;padding:2px 6px;border-radius:4px;font-size:10px;text-shadow:0 0 2px rgba(0,0,0,0.8)">🟤 BL</span>',
    'Broken Access Control': '<span style="background:#4b0082;color:#fff;padding:2px 6px;border-radius:4px;font-size:10px;text-shadow:0 0 2px rgba(0,0,0,0.8)">🟣 BAC</span>',
    'Authentication': '<span style="background:#ffd700;color:#fff;padding:2px 6px;border-radius:4px;font-size:10px;text-shadow:0 0 2px rgba(0,0,0,0.8)">🟠 AUTH</span>',
    'SSRF': '<span style="background:#00ffff;color:#fff;padding:2px 6px;border-radius:4px;font-size:10px;text-shadow:0 0 2px rgba(0,0,0,0.8)">🔵 SSRF</span>',
    'Cryptographic': '<span style="background:#39d353;color:#fff;padding:2px 6px;border-radius:4px;font-size:10px;text-shadow:0 0 2px rgba(0,0,0,0.8)">⚪ CRYPTO</span>',
    'Legendary': '<span style="background:#ee82ee;color:#fff;padding:2px 6px;border-radius:4px;font-size:10px;text-shadow:0 0 2px rgba(0,0,0,0.8)">🌟 LEGENDARY</span>'
};

// Insert '<th>Cores de Escopo</th>' after '<th>Escopo Autorizado</th>'
html = html.replace(/<th>Escopo Autorizado<\/th>/, '<th>Escopo Autorizado</th>\n                                <th>Cores de Escopo</th>');

// Process table rows in Section 12
let s12Start = html.indexOf('<th>Empresa</th>');
let tbodyStart = html.indexOf('<tbody>', s12Start);
let tbodyEnd = html.indexOf('</tbody>', tbodyStart);

let tbodyHtml = html.substring(tbodyStart, tbodyEnd);

let newTbody = tbodyHtml.replace(/<tr>[\s\S]*?<\/tr>/g, (match) => {
    // Find the 3rd <td> which is Escopo Autorizado
    let tdMatch = match.match(/<td>(.*?)<\/td>/g);
    if(tdMatch && tdMatch.length >= 3) {
        let escopoText = tdMatch[2].replace(/<\/?td>/g, '');
        let badgesHtml = '';
        if(escopoText.includes('Escopo Amplo')) {
            badgesHtml = '<span style="background:#333;color:#fff;padding:2px 6px;border-radius:4px;font-size:10px;">✓ [Todas as classes]</span>';
        } else {
            let badges = [];
            Object.keys(badgeMapping).forEach(key => {
                if(escopoText.includes(key)) badges.push(badgeMapping[key]);
            });
            badgesHtml = `<div style="display:flex;gap:4px;flex-wrap:wrap;">${badges.join('')}</div>`;
        }
        
        let newTd = `\n                                <td>${badgesHtml}</td>`;
        // Insert after the 3rd td
        let parts = match.split(tdMatch[2]);
        return parts[0] + tdMatch[2].replace('</td>', '</td>' + newTd) + parts[1];
    }
    return match;
});

html = html.substring(0, tbodyStart) + newTbody + html.substring(tbodyEnd);

// Fix Glossary - check if 'Report' term mentions bônus de tools
html = html.replace(/Valor base da vulnerabilidade do Programa \+ Bônus de Tools/g, 'Falhas + Bônus do Programa'); // double check

fs.writeFileSync('public/pwnd-manual.html', html);
console.log('Manual updated successfully.');
