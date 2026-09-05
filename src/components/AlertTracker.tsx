import React from 'react';
import { useBoardGame } from '../context/BoardGameContext';
import { ShieldAlert, Flame } from 'lucide-react';

export const AlertTracker: React.FC = () => {
  const { servers } = useBoardGame();

  return (
    <div className="terminal-box" style={{ padding: '12px 16px', marginBottom: '16px', background: 'rgba(9, 12, 21, 0.9)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={16} color="var(--alert-red)" />
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Nível de Alerta dos Servidores (Firewall Tracker)
          </span>
        </div>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Alerta 6/6 = PATCH DEPLOYED!
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
        {servers.map(server => (
          <div
            key={server.id}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 12px',
              borderLeft: `3px solid ${server.color}`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#fff', fontFamily: 'var(--font-mono)' }}>
                {server.icon} {server.name}
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', color: server.alertLevel >= 4 ? 'var(--alert-red)' : 'var(--amber-glow)', fontFamily: 'var(--font-mono)' }}>
                {server.alertLevel} / 6
              </span>
            </div>

            {/* Progress bar dots */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {[1, 2, 3, 4, 5, 6].map(dot => (
                <div
                  key={dot}
                  style={{
                    flex: 1,
                    height: '6px',
                    borderRadius: '3px',
                    background: dot <= server.alertLevel
                      ? (server.alertLevel >= 5 ? 'var(--alert-red)' : 'var(--amber-glow)')
                      : 'rgba(255, 255, 255, 0.1)'
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
