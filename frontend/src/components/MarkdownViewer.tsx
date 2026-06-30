import { Copy, Check } from 'lucide-react';

interface MarkdownViewerProps {
  content: string;
  copied: boolean;
  onCopy: () => void;
}

export default function MarkdownViewer({ content, copied, onCopy }: MarkdownViewerProps) {
  return (
    <div className="code-wrapper">
      <div className="code-toolbar">
        <button className="code-copy-btn" onClick={onCopy}>
          {copied ? <Check size={13} style={{ color: 'var(--success-color)' }} /> : <Copy size={13} />}
          <span>{copied ? 'Copied Markdown!' : 'Copy Document'}</span>
        </button>
      </div>
      <pre className="code-pre">
        <code>{content}</code>
      </pre>
    </div>
  );
}
