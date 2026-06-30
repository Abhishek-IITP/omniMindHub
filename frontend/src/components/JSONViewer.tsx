import React from 'react';
import { Copy, Check } from 'lucide-react';

interface JSONViewerProps {
  content: any;
  copied: boolean;
  onCopy: () => void;
}

export default function JSONViewer({ content, copied, onCopy }: JSONViewerProps) {
  const jsonStr = JSON.stringify(content, null, 2);
  
  return (
    <div className="code-wrapper">
      <div className="code-toolbar">
        <button className="code-copy-btn" onClick={onCopy}>
          {copied ? <Check size={13} style={{ color: 'var(--success-color)' }} /> : <Copy size={13} />}
          <span>{copied ? 'Copied JSON!' : 'Copy Code'}</span>
        </button>
      </div>
      <pre className="code-pre">
        <code>{jsonStr}</code>
      </pre>
    </div>
  );
}
