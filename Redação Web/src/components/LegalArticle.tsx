import fs from 'node:fs';
import path from 'node:path';

function render(markdown: string) {
  const blocks = markdown.replace(/\r\n/g, '\n').trim().split(/\n{2,}/);
  return blocks.map((block, index) => {
    const lines = block.split('\n');
    if (lines[0].startsWith('# ')) return <h1 key={index}>{lines[0].slice(2)}</h1>;
    if (lines[0].startsWith('## ')) return <h2 key={index}>{lines[0].slice(3)}</h2>;
    if (lines.every((line) => line.startsWith('- '))) {
      return (
        <ul key={index}>
          {lines.map((line) => (
            <li key={line}>{line.slice(2)}</li>
          ))}
        </ul>
      );
    }
    return <p key={index}>{lines.join(' ')}</p>;
  });
}

export function LegalArticle({ file }: { file: string }) {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content', 'juridico', file), 'utf8');
  return <article className="legal">{render(raw)}</article>;
}
