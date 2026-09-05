import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { CardView, ProgramCardView } from './CardView';
import { PROGRAM_CARDS, ProgramCard } from '../data/cardsData';
import { Search, Zap, Send, ShieldAlert, Cpu, Wrench, ChevronRight, Layers } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const GameBoard: React.FC = () => {
  const {
    currentProgram,
    playerActiveVulns,
    playerActiveTools,
    bots,
    activeTurnPlayerId,
    legalThreatTurns,
    chooseProgram,
    actionRecon,
    actionReport
  } = useGame();

  const [showProgramSelector, setShowProgramSelector] = useState<boolean>(false);

  // Calcular CVSS Total acumulado
  const totalCVSS = playerActiveVulns.reduce((sum, v) => sum + (v.cvss || 5.0), 0);
  const vulnValue = playerActiveVulns.reduce((sum, v) => {
    let base = 1500;
    const cvss = v.cvss || 5.0;
    if (cvss >= 10.0) base = 6000;
    else if (cvss >= 9.0) base = 5000;
    else if (cvss >= 7.0) base = 4000;
    else if (cvss >= 4.0) base = 2500;
    return sum + base;
  }, 0);
  const estimatedBounty = vulnValue + (currentProgram.flatBountyBonus || 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
      
      {/* 1. OPONENTES (BOTS) BAR */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
        {bots.map((bot) => (
          <div
            key={bot.id}
            className="terminal-box"
            style={{
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(19, 23, 38, 0.6)',
              borderLeft: `3px solid ${bot.archetype.color}`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>{bot.archetype.avatarIcon}</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff', fontFamily: 'var(--font-mono)' }}>
                  {bot.name}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                  {bot.archetype.title} · {bot.currentProgram.name}
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--terminal-green)', fontFamily: 'var(--font-mono)' }}>
                ${bot.bountyTotal.toLocaleString('pt-BR')}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {bot.handCount} cartas | {bot.activeVulns.length} vulns
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2. MESA PRINCIPAL DE OPERAÇÕES */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 220px', gap: '20px', alignItems: 'start' }}>
        
        {/* LADO ESQUERDO: PROGRAMA ALVO ATIVO */}
        <div className="terminal-box" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--amber-glow)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Programa Corporativo
            </span>
            <button
              onClick={() => setShowProgramSelector(!showProgramSelector)}
              style={{ fontSize: '10px', background: 'rgba(255,255,255,0.06)', color: 'var(--cyber-blue)', border: '1px solid var(--surface-border)', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
            >
              Trocar Alvo
            </button>
          </div>

          <ProgramCardView
            program={currentProgram}
            isSelected={true}
            onSelect={() => {}}
          />

          {/* Modal / Selector de troca de programa */}
          {showProgramSelector && (
            <div style={{ background: 'rgba(7, 9, 19, 0.95)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Selecione novo Alvo:</div>
              {PROGRAM_CARDS.map(prog => (
                <div
                  key={prog.id}
                  onClick={() => {
                    chooseProgram(prog.id);
                    setShowProgramSelector(false);
                  }}
                  style={{
                    padding: '6px 8px',
                    borderRadius: '4px',
                    background: prog.id === currentProgram.id ? 'rgba(240, 136, 62, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    cursor: 'pointer',
                    fontSize: '11px',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{prog.name}</span>
                  <span style={{ color: 'var(--terminal-green)', fontFamily: 'var(--font-mono)' }}>{prog.bountyRange}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CENTRO: ÁREA DE VULNERABILIDADES ALOCADAS (WORKFLOW DE REPORT) */}
        <div className="terminal-box" style={{ padding: '16px', minHeight: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={16} color="var(--electric-purple-light)" />
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#fff', fontFamily: 'var(--font-mono)' }}>
                Vulnerabilidades Encadeadas no Programa ({playerActiveVulns.length})
              </span>
            </div>

            {playerActiveVulns.length > 0 && (
              <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--amber-glow)' }}>CVSS Total: {totalCVSS.toFixed(1)}</span>
                <span style={{ color: 'var(--terminal-green)', fontWeight: '700' }}>Est. Bounty: ${estimatedBounty.toLocaleString('pt-BR')}</span>
              </div>
            )}
          </div>

          {/* Cards alocados */}
          {playerActiveVulns.length === 0 ? (
            <div style={{ border: '2px dashed var(--surface-border)', borderRadius: 'var(--radius-md)', padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              Nenhuma vulnerabilidade explorada neste programa ainda.
              <br />
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Selecione uma carta de Vulnerabilidade na sua mão abaixo e clique em <strong>[EXPLOIT]</strong>.
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
              {playerActiveVulns.map((card, idx) => (
                <CardView key={`${card.id}-${idx}`} card={card} />
              ))}
            </div>
          )}

          {/* Rack de Ferramentas Ativas do Jogador */}
          <div style={{ marginTop: '16px', borderTop: '1px solid var(--surface-border)', paddingTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
              <Wrench size={12} color="var(--cyber-blue)" /> Rack de Ferramentas Ativas ({playerActiveTools.length}):
            </div>
            
            {playerActiveTools.length === 0 ? (
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Nenhuma ferramenta ativa no rack. Ative Tool Cards para suprir requisitos de Exploits!
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {playerActiveTools.map((tool, idx) => (
                  <span
                    key={`${tool.id}-${idx}`}
                    style={{
                      fontSize: '10px',
                      background: 'rgba(88, 166, 255, 0.12)',
                      color: 'var(--cyber-blue)',
                      border: '1px solid rgba(88, 166, 255, 0.3)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    🛠️ {tool.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* LADO DIREITO: AÇÕES DE TURNO (RECON / REPORT) */}
        <div className="terminal-box" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Ações Principais de Turno
          </div>

          {/* Botão RECON */}
          <button
            onClick={() => {
              soundFx.playClick();
              actionRecon();
            }}
            disabled={activeTurnPlayerId !== 'player'}
            style={{
              padding: '14px',
              background: 'linear-gradient(135deg, var(--cyber-blue), #2b6cb0)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: '800',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              textAlign: 'left',
              boxShadow: '0 4px 12px rgba(88, 166, 255, 0.25)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Search size={16} /> 1. RECON (Comprar)
            </div>
            <span style={{ fontSize: '10px', fontWeight: 'normal', opacity: 0.85 }}>
              Compre 2 cartas do deck. (Risco de PATCH DEPLOYED!)
            </span>
          </button>

          {/* Botão REPORT */}
          <button
            onClick={() => {
              soundFx.playClick();
              actionReport();
            }}
            disabled={activeTurnPlayerId !== 'player' || playerActiveVulns.length === 0 || legalThreatTurns > 0}
            style={{
              padding: '14px',
              background: playerActiveVulns.length > 0 ? 'linear-gradient(135deg, var(--terminal-green), #279e3e)' : 'rgba(255, 255, 255, 0.05)',
              color: playerActiveVulns.length > 0 ? '#000' : 'var(--text-muted)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: '800',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              cursor: playerActiveVulns.length > 0 ? 'pointer' : 'not-allowed',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              textAlign: 'left',
              boxShadow: playerActiveVulns.length > 0 ? 'var(--glow-green)' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Send size={16} /> 3. REPORT (Submeter)
            </div>
            <span style={{ fontSize: '10px', fontWeight: 'normal', opacity: 0.9 }}>
              Liquida o relatório acumulado e recebe ${estimatedBounty.toLocaleString('pt-BR')}!
            </span>
          </button>

          {legalThreatTurns > 0 && (
            <div style={{ fontSize: '10px', color: 'var(--alert-red)', background: 'rgba(248, 81, 73, 0.1)', padding: '6px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
              ⚠️ Ameaça Jurídica ativa: REPORT bloqueado por mais {legalThreatTurns} rodadas.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
