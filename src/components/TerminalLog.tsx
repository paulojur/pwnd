import React from 'react';
import { useGame } from '../context/GameContext';
import { Terminal as TerminalIcon, X } from 'lucide-react';

interface TerminalLogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalLog: React.FC<TerminalLogProps> = ({ isOpen, onClose }) => {
  const { terminalLogs } = useGame();

  if (!isOpen) return null;

  return (
    <div
      className="terminal-box"
      style={{
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        width: '380px',
        maxHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 900,
        border: '1px solid var(--electric-purple)',
        boxShadow: 'var(--glow-purple)'
      }}
    >
      {/* Terminal Title Bar */}
      <div style={{ background: '#161b2c', padding: '8px 12px', borderBottom: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
          <TerminalIcon size={14} /> pwnd_triage_log.sh --tail
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <X size={14} />
        </button>
      </div>

      {/* Log Feed */}
      <div style={{ padding: '12px', overflowY: 'auto', flex: 1, fontFamily: 'var(--font-mono)', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {terminalLogs.length === 0 ? (
          <div style={{ color: 'var(--text-muted)' }}>Nenhum log registrado ainda.</div>
        ) : (
          terminalLogs.map(log => (
            <div key={log.id} style={{ lineHeight: '1.4' }}>
              <span style={{ color: 'var(--text-muted)', marginRight: '6px' }}>[{log.time}]</span>
              <span
                style={{
                  color:
                    log.type === 'success' ? 'var(--terminal-green)' :
                    log.type === 'danger' ? 'var(--alert-red)' :
                    log.type === 'warning' ? 'var(--amber-glow)' : 'var(--text-primary)'
                }}
              >
                {log.text}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
