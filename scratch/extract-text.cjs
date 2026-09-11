const fs = require('fs');
function htmlToText(html) {
    let text = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    text = text.replace(/<\/(p|div|li|h[1-6]|tr|ul|ol)>/gi, '\n');
    text = text.replace(/<(br|hr)[^>]*>/gi, '\n');
    text = text.replace(/<[^>]+>/g, '');
    text = text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&le;/g, '<=');
    text = text.split('\n').map(line => line.trim()).filter(line => line.length > 0).join('\n\n');
    return text;
}
fs.writeFileSync('index.txt', htmlToText(fs.readFileSync('index.html', 'utf8')), 'utf8');
fs.writeFileSync('pwnd-manual.txt', htmlToText(fs.readFileSync('public/pwnd-manual.html', 'utf8')), 'utf8');
console.log('TXT gerados com sucesso!');
