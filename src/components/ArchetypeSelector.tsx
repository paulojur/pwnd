import React from 'react';
import { ARCHETYPES } from '../data/cardsData';
import { Play } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface ArchetypeSelectorProps {
  onSelect: (archetypeId: string) => void;
}

export const ArchetypeSelector: React.FC<ArchetypeSelectorProps> = ({ onSelect }) => {
  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--terminal-green)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '8px' }}>
          Seleção de Pesquisador
        </div>
        <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', letterSpacing: '-1px' }}>
          Escolha seu Arquétipo Offensive Security
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '8px auto 0', fontSize: '14px' }}>
          Cada pesquisador possui um estilo de jogo único, modificadores de mão e poderes passivos para disputar os bounties corporativos.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px' }}>
        {ARCHETYPES.map((arch) => {
          const cardStyle: React.CSSProperties = {
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderTop: `4px solid ${arch.color}`,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'pointer'
          };

          return (
            <div
              key={arch.id}
              className="terminal-box"
              style={cardStyle}
              onClick={() => {
                soundFx.playClick();
                onSelect(arch.id);
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '32px' }}>{arch.avatarIcon}</span>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.06)', padding: '4px 8px', borderRadius: '4px', color: arch.color }}>
                    {arch.name}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>
                  {arch.title}
                </h3>
                
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.4' }}>
                  {arch.playstyle}
                </p>

                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>
                    Poderes Passivos & Regras:
                  </div>
                  <ul style={{ listStyle: 'none', fontSize: '11px', color: 'var(--text-primary)' }}>
                    {arch.specialPowers.map((power, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span style={{ color: arch.color }}>⚡</span> {power}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onSelect(arch.id);
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: arch.color,
                  color: '#000',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  fontWeight: '800',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Play size={16} fill="#000" /> Iniciar com {arch.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
