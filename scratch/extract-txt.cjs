const fs = require('fs');

function stripHtml(html) {
    let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    
    text = text.replace(/<\/?(?:div|p|h[1-6]|ul|ol|li|table|tr|td|th|br|section|header|footer|nav|article|aside|main|blockquote|pre)[^>]*>/gi, '\n');
    
    text = text.replace(/<[^>]+>/g, '');
    
    text = text.replace(/&nbsp;/g, ' ')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&amp;/g, '&')
               .replace(/&quot;/g, '"')
               .replace(/&#39;/g, "'")
               .replace(/&le;/g, '<=')
               .replace(/&ge;/g, '>=')
               .replace(/&times;/g, 'x');

    text = text.replace(/[ \t]+/g, ' '); 
    text = text.replace(/\n\s*\n+/g, '\n\n');
    return text.trim();
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
fs.writeFileSync('index.txt', stripHtml(indexHtml), 'utf8');

const manualHtml = fs.readFileSync('public/pwnd-manual.html', 'utf8');
fs.writeFileSync('pwnd-manual.txt', stripHtml(manualHtml), 'utf8');

console.log('TXT copies generated!');
