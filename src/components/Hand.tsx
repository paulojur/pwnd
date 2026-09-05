import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { CardView } from './CardView';
import { Card } from '../data/cardsData';
import { Zap, Wrench, Shield, Filter } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const Hand: React.FC = () => {
  const { playerHand, activeTurnPlayerId, actionExploit, playToolCard } = useGame();
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'vulnerability' | 'tool' | 'defuse' | 'event'>('all');

  const filteredHand = playerHand.filter(card => {
    if (filterType === 'all') return true;
    return card.type === filterType;
  });

  const selectedCard = playerHand.find(c => c.id === selectedCardId);

  return (
    <div className="terminal-box" style={{ padding: '16px', background: 'rgba(13, 15, 26, 0.95)' }}>
      
      {/* Hand Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-mono)' }}>
            Mão do Pesquisador ({playerHand.length} cartas)
          </h3>

          {/* Quick Filters */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {(['all', 'vulnerability', 'tool', 'event', 'defuse'] as const).map(type => (
              <button
                key={type}
                onClick={() => { soundFx.playClick(); setFilterType(type); }}
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: '1px solid var(--surface-border)',
                  background: filterType === type ? 'var(--electric-purple)' : 'rgba(255, 255, 255, 0.04)',
                  color: filterType === type ? '#fff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                {type === 'all' ? 'Todas' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button for Selected Card */}
        {selectedCard && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '11px', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)' }}>
              Selecionada: <strong>{selectedCard.name}</strong>
            </span>

            {selectedCard.type === 'vulnerability' && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  actionExploit(selectedCard.id);
                  setSelectedCardId(null);
                }}
                disabled={activeTurnPlayerId !== 'player'}
                style={{
                  padding: '6px 14px',
                  background: 'var(--electric-purple)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  fontWeight: '800',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Zap size={14} /> EXPLOIT (Alocar)
              </button>
            )}

            {selectedCard.type === 'tool' && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  playToolCard(selectedCard.id);
                  setSelectedCardId(null);
                }}
                style={{
                  padding: '6px 14px',
                  background: 'var(--cyber-blue)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  fontWeight: '800',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Wrench size={14} /> Activar no Rack
              </button>
            )}
          </div>
        )}
      </div>

      {/* Cards Deck Horizontal Bar */}
      {filteredHand.length === 0 ? (
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
          Sua mão está vazia. Execute a ação <strong>[RECON]</strong> para comprar cartas!
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '10px' }}>
          {filteredHand.map(card => (
            <CardView
              key={card.id}
              card={card}
              selected={selectedCardId === card.id}
              onClick={() => {
                soundFx.playClick();
                setSelectedCardId(selectedCardId === card.id ? null : card.id);
              }}
              actionText={
                card.type === 'vulnerability' ? 'EXPLOIT' :
                card.type === 'tool' ? 'ATIVAR' : undefined
              }
              onAction={() => {
                soundFx.playClick();
                if (card.type === 'vulnerability') {
                  actionExploit(card.id);
                } else if (card.type === 'tool') {
                  playToolCard(card.id);
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
