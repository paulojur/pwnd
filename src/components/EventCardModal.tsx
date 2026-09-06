import React from 'react';
import { ShieldAlert, Zap, X, AlertTriangle, Gift, Layers } from 'lucide-react';
import { soundFx } from '../utils/audio';

export interface EventCardData {
  id: string;
  name: string;
  effectDescription: string;
  icon: string;
  type: 'global' | 'targeted';
}

export const EVENT_CARDS_LIST: EventCardData[] = [
  {
    id: 'evt-patch-tuesday',
    name: 'Patch Tuesday!',
    effectDescription: 'Todos os participantes com vulnerabilidades expostas na mesa realizam imediatamente um Patch Speed Check de surpresa!',
    icon: '⚡',
    type: 'global'
  },
  {
    id: 'evt-duplicate-report',
    name: 'Duplicate Report!',
    effectDescription: 'O pesquisador deve escolher e descartar imediatamente a sua vulnerabilidade de maior valor CVSS presente na mesa.',
    icon: '📄',
    type: 'targeted'
  },
  {
    id: 'evt-data-breach',
    name: 'Data Breach!',
    effectDescription: 'Vazamento de dados massivo! Todos os participantes mostram suas mãos. O participante com mais vulnerabilidades descarta metade da mão.',
    icon: '💥',
    type: 'global'
  },
  {
    id: 'evt-scope-expansion',
    name: 'Scope Expansion!',
    effectDescription: 'O escopo de todos os programas ativos na mesa torna-se irrestrito por 2 rodadas completas, aceitando qualquer classe técnica!',
    icon: '🌐',
    type: 'global'
  },
  {
    id: 'evt-swag-drop',
    name: 'Swag Drop!',
    effectDescription: 'Brinde de segurança! Cada pesquisador presente na mesa compra 1 carta de ferramenta imediatamente do deck principal.',
    icon: '🎁',
    type: 'global'
  }
];

interface EventCardModalProps {
  isOpen: boolean;
  eventCard: EventCardData | null;
  onClose: () => void;
}

export const EventCardModal: React.FC<EventCardModalProps> = ({ isOpen, eventCard, onClose }) => {
  if (!isOpen || !eventCard) return null;

  return (
    <div className="modal-overlay animate-glitch">
      <div
        className="terminal-box"
        style={{
          maxWidth: '480px',
          width: '90%',
          padding: '24px',
          textAlign: 'center',
          border: '2px solid var(--alert-red)',
          boxShadow: 'var(--glow-red)',
          background: 'linear-gradient(180deg, #2b0909 0%, #0d0f1a 100%)'
        }}
      >
        <div style={{ margin: '0 auto 12px', width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(248, 81, 73, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--alert-red)' }}>
          <ShieldAlert size={32} color="var(--alert-red)" />
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--alert-red)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px' }}>
          EVENT CARD ATIVADA (MANUAL V1.0 SEÇÃO 8)
        </div>

        <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#fff', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
          {eventCard.icon} {eventCard.name}
        </h3>

        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '8px', border: '1px dashed var(--alert-red)', margin: '16px 0', fontSize: '12px', color: 'var(--text-primary)', lineHeight: '1.4' }}>
          {eventCard.effectDescription}
        </div>

        <button
          onClick={() => { soundFx.playClick(); onClose(); }}
          style={{
            width: '100%',
            padding: '10px',
            background: 'var(--alert-red)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            fontWeight: '800',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          RESOLVER EVENTO E CONTINUAR
        </button>
      </div>
    </div>
  );
};
