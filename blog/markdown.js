/**
 * Lightweight, zero-dependency Markdown parser and HTML sanitizer.
 * Designed for minimalist blog post rendering.
 */

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeUrl(url) {
  if (!url) return '#';
  url = url.trim();
  if (/^(https?:\/\/|\/|#|mailto:)/i.test(url)) {
    return encodeURI(decodeURI(url));
  }
  return '#';
}

export function renderMarkdown(markdown) {
  if (!markdown) return '';

  // Standardize line endings
  let text = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Protect code blocks first
  const codeBlocks = [];
  text = text.replace(/```([a-zA-Z0-9_+-]*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const placeholder = `@@CODEBLOCK${codeBlocks.length}@@`;
    codeBlocks.push({
      lang: lang ? escapeHtml(lang) : '',
      code: escapeHtml(code.trimEnd())
    });
    return placeholder;
  });

  // Protect inline code
  const inlineCodes = [];
  text = text.replace(/`([^`\n]+)`/g, (_, code) => {
    const placeholder = `@@INLINECODE${inlineCodes.length}@@`;
    inlineCodes.push(escapeHtml(code));
    return placeholder;
  });

  // Escape HTML in the remaining text
  text = escapeHtml(text);

  // Horizontal rules
  text = text.replace(/^(?:---|\*\*\*|___)\s*$/gm, '<hr />');

  // Headings
  text = text.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');
  text = text.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  text = text.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  text = text.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

  // Blockquotes (multiline support)
  text = text.replace(/^(?:&gt;|>)[ ]?(.*)$/gm, '<blockquote>$1</blockquote>');
  text = text.replace(/<\/blockquote>\n<blockquote>/g, '\n');

  // Bold and Italic
  text = text.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  text = text.replace(/___(.*?)___/g, '<strong><em>$1</em></strong>');
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');
  text = text.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
  text = text.replace(/_([^_\n]+)_/g, '<em>$1</em>');
  text = text.replace(/~~(.*?)~~/g, '<del>$1</del>');

  // Links: [text](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, linkText, url) => {
    const safeHref = sanitizeUrl(url);
    const isExternal = /^https?:\/\//i.test(safeHref);
    return `<a href="${safeHref}"${isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''}>${linkText}</a>`;
  });

  // Lists: Unordered and Ordered
  const lines = text.split('\n');
  const processed = [];
  let inUl = false;
  let inOl = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const ulMatch = line.match(/^[\*\-]\s+(.*)$/);
    const olMatch = line.match(/^\d+\.\s+(.*)$/);

    if (ulMatch) {
      if (!inUl) {
        if (inOl) { processed.push('</ol>'); inOl = false; }
        processed.push('<ul>');
        inUl = true;
      }
      processed.push(`<li>${ulMatch[1]}</li>`);
    } else if (olMatch) {
      if (!inOl) {
        if (inUl) { processed.push('</ul>'); inUl = false; }
        processed.push('<ol>');
        inOl = true;
      }
      processed.push(`<li>${olMatch[1]}</li>`);
    } else {
      if (inUl) { processed.push('</ul>'); inUl = false; }
      if (inOl) { processed.push('</ol>'); inOl = false; }
      processed.push(line);
    }
  }
  if (inUl) processed.push('</ul>');
  if (inOl) processed.push('</ol>');

  text = processed.join('\n');

  // Paragraphs: separate non-block elements separated by double newlines
  const blocks = text.split(/\n\s*\n/);
  text = blocks.map(block => {
    block = block.trim();
    if (!block) return '';
    if (/^<(h[1-6]|ul|ol|blockquote|hr|p|pre|div)/i.test(block)) {
      return block;
    }
    if (block.startsWith('@@CODEBLOCK')) {
      return block;
    }
    return `<p>${block.replace(/\n/g, '<br />')}</p>`;
  }).filter(Boolean).join('\n\n');

  // Restore inline code
  text = text.replace(/@@INLINECODE(\d+)@@/g, (_, idx) => {
    return `<code>${inlineCodes[idx]}</code>`;
  });

  // Restore code blocks
  text = text.replace(/@@CODEBLOCK(\d+)@@/g, (_, idx) => {
    const item = codeBlocks[idx];
    const langAttr = item.lang ? ` class="language-${item.lang}"` : '';
    return `<pre><code${langAttr}>${item.code}</code></pre>`;
  });

  return text;
}
