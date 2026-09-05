import React, { useState } from 'react';
import { Card, ProgramCard } from '../data/cardsData';
import { RotateCw, HelpCircle, Shield, Info } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface CardViewProps {
  card: Card;
  selected?: boolean;
  onClick?: () => void;
  actionText?: string;
  onAction?: () => void;
  disabled?: boolean;
}

export const CardView: React.FC<CardViewProps> = ({ card, selected, onClick, actionText, onAction, disabled }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const getBadgeClass = (severity?: string) => {
    switch (severity) {
      case 'Critical': return 'badge-critical';
      case 'High': return 'badge-high';
      case 'Medium': return 'badge-medium';
      case 'Low': return 'badge-low';
      default: return 'badge-tool';
    }
  };

  const getCardTypeClass = (type: string) => {
    switch (type) {
      case 'vulnerability': return 'game-card-vulnerability';
      case 'tool': return 'game-card-tool';
      case 'event': return 'game-card-event';
      case 'defuse': return 'game-card-defuse';
      default: return '';
    }
  };

  const containerStyle: React.CSSProperties = {
    opacity: disabled ? 0.6 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    perspective: '1000px'
  };

  return (
    <div
      onClick={onClick}
      className={`game-card ${getCardTypeClass(card.type)} ${selected ? 'selected' : ''}`}
      style={containerStyle}
    >
      {/* 3D Flip Toggle Icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          soundFx.playClick();
          setIsFlipped(!isFlipped);
        }}
        title="Girar Carta / Ler Regras"
        style={{
          position: 'absolute',
          top: '6px',
          right: '6px',
          background: 'rgba(0,0,0,0.5)',
          border: 'none',
          color: 'var(--text-secondary)',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 5
        }}
      >
        <RotateCw size={11} />
      </button>

      {!isFlipped ? (
        /* FACE FRONTAL DA CARTA */
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', paddingRight: '20px' }}>
            <span className={`badge ${getBadgeClass(card.severity)}`}>
              {card.type === 'vulnerability' ? card.severity : card.type.toUpperCase()}
            </span>
            {card.cvss && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: '700', color: 'var(--amber-glow)' }}>
                CVSS {card.cvss.toFixed(1)}
              </span>
            )}
          </div>

          <div style={{ marginBottom: '8px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#fff', lineHeight: '1.2', fontFamily: 'var(--font-mono)' }}>
              {card.name}
            </h4>
            {card.vulnClass && (
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                {card.vulnClass}
              </div>
            )}
          </div>

          {card.toolRequirements && card.toolRequirements.length > 0 && (
            <div style={{ background: 'rgba(0, 0, 0, 0.4)', borderRadius: '4px', padding: '4px 6px', marginBottom: '8px', borderLeft: '2px solid var(--cyber-blue)' }}>
              <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Requisitos:</div>
              <div style={{ fontSize: '10px', color: 'var(--cyber-blue)', fontWeight: '600', fontFamily: 'var(--font-mono)' }}>
                {card.toolRequirements.join(' + ')}
              </div>
            </div>
          )}

          <div style={{ flex: 1, fontSize: '10px', color: 'var(--text-primary)', lineHeight: '1.35', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '6px', fontFamily: 'var(--font-sans)' }}>
            {card.effectDescription}
          </div>

          {card.flavorText && (
            <div style={{ fontSize: '9px', fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: '1.2' }}>
              {card.flavorText}
            </div>
          )}

          {actionText && onAction && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAction();
              }}
              style={{
                width: '100%',
                padding: '5px',
                background: card.type === 'vulnerability' ? 'var(--electric-purple)' : card.type === 'tool' ? 'var(--cyber-blue)' : 'var(--terminal-green)',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '700',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                marginTop: 'auto'
              }}
            >
              {actionText}
            </button>
          )}
        </>
      ) : (
        /* VERSO DA CARTA (REGRAS E DICAS TÁTICAS DO MANUAL V1.0) */
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
          <div style={{ color: 'var(--amber-glow)', fontWeight: '700', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '4px' }}>
            📜 REGRAS & DETALHES TÁTICOS
          </div>

          <div style={{ flex: 1, margin: '8px 0', overflowY: 'auto', lineHeight: '1.4' }}>
            <div style={{ color: '#fff', fontWeight: '700', marginBottom: '4px' }}>{card.name}</div>
            <p style={{ marginBottom: '6px', color: 'var(--text-primary)' }}>
              {card.type === 'vulnerability' ? 'Vulnerabilidade ofensiva para alocar no programa ativo durante a ação EXPLOIT.' : 'Ferramenta operacional de apoio para zerar ou reduzir custos de exploração.'}
            </p>
            {card.artConcept && (
              <div style={{ fontSize: '9px', fontStyle: 'italic', color: 'var(--text-muted)' }}>
                Ilustração: {card.artConcept}
              </div>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playClick();
              setIsFlipped(false);
            }}
            style={{
              width: '100%',
              padding: '4px',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '10px',
              cursor: 'pointer'
            }}
          >
            ← Voltar para Frente
          </button>
        </div>
      )}
    </div>
  );
};

// Program Card View Component com 3D Flip para o Verso de Escopo & Regras
interface ProgramCardViewProps {
  program: ProgramCard;
  isSelected: boolean;
  onSelect: () => void;
}

export const ProgramCardView: React.FC<ProgramCardViewProps> = ({ program, isSelected, onSelect }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const programStyle: React.CSSProperties = {
    borderRadius: 'var(--radius-md)',
    padding: '12px',
    cursor: 'pointer',
    border: isSelected ? '2px solid var(--amber-glow)' : '1px solid #303a58',
    boxShadow: isSelected ? 'var(--glow-amber)' : 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'all 0.2s ease',
    position: 'relative'
  };

  return (
    <div
      onClick={onSelect}
      className="game-card-program"
      style={programStyle}
    >
      {/* 3D Flip Icon for Program Card */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          soundFx.playClick();
          setIsFlipped(!isFlipped);
        }}
        title="Girar Carta / Ver Escopo e Regras do Programa"
        style={{
          position: 'absolute',
          top: '6px',
          right: '6px',
          background: 'rgba(0,0,0,0.5)',
          border: 'none',
          color: 'var(--amber-glow)',
          borderRadius: '50%',
          width: '22px',
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 5
        }}
      >
        <RotateCw size={12} />
      </button>

      {!isFlipped ? (
        /* FRENTE DO PROGRAMA */
        <>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', paddingRight: '22px' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {program.companyType}
              </span>
              <span style={{ fontSize: '10px', background: 'rgba(240, 136, 62, 0.2)', color: 'var(--amber-glow)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                Patch: {program.patchSpeed}
              </span>
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-mono)' }}>
              {program.name}
            </h3>
          </div>

          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', margin: '6px 0' }}>
            {program.description}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--terminal-green)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
              {program.bountyRange}
            </span>
            <div style={{ marginTop: '4px', fontSize: '11px', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)' }}>
              Bounty Multiplier: +{(program as ProgramCard).flatBountyBonus?.toLocaleString('pt-BR') || '0'}
            </div>
          </div>
        </>
      ) : (
        /* VERSO DO PROGRAMA (ESCOPO E REGRAS DO MANUAL V1.0) */
        <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          <div>
            <div style={{ color: 'var(--amber-glow)', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '4px', marginBottom: '6px' }}>
              📋 REGRAS DE ESCOPO & DEDUZIBILIDADE
            </div>
            <div style={{ color: '#fff', fontWeight: '700', marginBottom: '4px' }}>Classes Permitidas (Scope):</div>
            <div style={{ color: 'var(--terminal-green)', marginBottom: '8px' }}>
              {program.allowedClasses === 'ALL' ? '✓ Escopo Amplo (Aceita TODAS as classes!)' : (program.allowedClasses as string[]).join(', ')}
            </div>
            <div style={{ color: 'var(--alert-red)' }}>
              🎲 Teste D6 Patch: {program.patchSpeed}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playClick();
              setIsFlipped(false);
            }}
            style={{
              width: '100%',
              padding: '4px',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '10px',
              cursor: 'pointer'
            }}
          >
            ← Voltar para Frente
          </button>
        </div>
      )}
    </div>
  );
};
