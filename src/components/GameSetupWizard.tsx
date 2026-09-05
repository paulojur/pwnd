import React, { useState } from 'react';
import { ARCHETYPES, Archetype, PROGRAM_CARDS, ProgramCard } from '../data/cardsData';
import { ShieldCheck, Layers, Sparkles, ArrowRight, UserCheck } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface GameSetupWizardProps {
  isOpen: boolean;
  onCompleteSetup: (selectedArchetype: Archetype, selectedProgram: ProgramCard) => void;
}

export const GameSetupWizard: React.FC<GameSetupWizardProps> = ({ isOpen, onCompleteSetup }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<ProgramCard | null>(null);

  if (!isOpen) return null;

  const handleArchetypeSelect = (arch: Archetype) => {
    soundFx.playClick();
    setSelectedArchetype(arch);
  };

  const handleProgramSelect = (prog: ProgramCard) => {
    soundFx.playClick();
    setSelectedProgram(prog);
  };

  const handleFinishSetup = () => {
    if (!selectedArchetype || !selectedProgram) return;
    soundFx.playBountyPayout();
    onCompleteSetup(selectedArchetype, selectedProgram);
  };

  return (
    <div className="modal-overlay">
      <div
        className="terminal-box"
        style={{
          maxWidth: '720px',
          width: '92%',
          padding: '24px',
          border: '2px solid var(--amber-glow)',
          boxShadow: 'var(--glow-amber)',
          background: 'linear-gradient(180deg, #182033 0%, #0d0f1a 100%)'
        }}
      >
        {/* Step Indicator */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--amber-glow)', letterSpacing: '3px', textTransform: 'uppercase' }}>
            MANUAL V1.0 — SEÇÃO 3: PREPARAÇÃO DA MESA
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
            {step === 1 ? '1. Escolha seu Arquétipo de Pesquisador' : step === 2 ? '2. Escolha seu Alvo Corporativo Inicial' : '3. Distribuição da Mão Inicial'}
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
            {[1, 2, 3].map(s => (
              <div
                key={s}
                style={{
                  width: '32px',
                  height: '6px',
                  borderRadius: '3px',
                  background: s <= step ? 'var(--amber-glow)' : 'rgba(255,255,255,0.1)'
                }}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: ESCOLHA PÚBLICA DE ARQUÉTIPOS */}
        {step === 1 && (
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px', textAlign: 'center' }}>
              Selecione o arquétipo que definirá seus poderes operacionais e estilo de jogabilidade na partida:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
              {ARCHETYPES.map(arch => {
                const isSelected = selectedArchetype?.id === arch.id;

                return (
                  <div
                    key={arch.id}
                    onClick={() => handleArchetypeSelect(arch)}
                    style={{
                      background: isSelected ? 'rgba(240, 136, 62, 0.15)' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? '2px solid var(--amber-glow)' : '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '10px',
                      padding: '12px',
                      cursor: 'pointer',
                      boxShadow: isSelected ? 'var(--glow-amber)' : 'none',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '22px' }}>{arch.avatarIcon}</span>
                        <div>
                          <h4 style={{ fontSize: '14px', fontWeight: '800', color: arch.color, fontFamily: 'var(--font-mono)' }}>
                            {arch.name}
                          </h4>
                          <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Mão limite: {arch.maxHandSize} cartas</span>
                        </div>
                      </div>

                      <div style={{ fontSize: '10px', color: 'var(--text-primary)', lineHeight: '1.35', marginBottom: '6px' }}>
                        <strong>Poder:</strong> {arch.playstyle}
                      </div>
                    </div>

                    <div style={{ fontSize: '9px', fontStyle: 'italic', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '4px' }}>
                      "{arch.title}"
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!selectedArchetype}
              style={{
                width: '100%',
                padding: '12px',
                background: selectedArchetype ? 'var(--amber-glow)' : 'rgba(255,255,255,0.1)',
                color: selectedArchetype ? '#000' : 'var(--text-muted)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: '800',
                fontFamily: 'var(--font-mono)',
                cursor: selectedArchetype ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              Avançar para Escolha de Alvo Inicial <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: SELEÇÃO DO ALVO CORPORATIVO INICIAL */}
        {step === 2 && (
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px', textAlign: 'center' }}>
              Selecione qual empresa do <strong>Program Market</strong> você deseja auditá primeiro no seu tapete:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '20px' }}>
              {PROGRAM_CARDS.slice(0, 3).map(prog => {
                const isSelected = selectedProgram?.id === prog.id;

                return (
                  <div
                    key={prog.id}
                    onClick={() => handleProgramSelect(prog)}
                    style={{
                      background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? '2px solid var(--cyber-blue)' : '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '10px',
                      padding: '14px',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 0 20px rgba(56, 189, 248, 0.3)' : 'none',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {prog.companyType}
                      </div>
                      <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                        {prog.name}
                      </h4>
                      <p style={{ fontSize: '10px', color: 'var(--text-secondary)', lineHeight: '1.3', marginBottom: '8px' }}>
                        {prog.description}
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', color: 'var(--terminal-green)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                        {prog.bountyRange}
                      </span>
                      <span style={{ fontSize: '9px', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)' }}>
                        Patch: {prog.patchSpeed}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setStep(1)}
                style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '12px' }}
              >
                ← Voltar
              </button>

              <button
                onClick={() => setStep(3)}
                disabled={!selectedProgram}
                style={{
                  flex: 2,
                  padding: '12px',
                  background: selectedProgram ? 'var(--cyber-blue)' : 'rgba(255,255,255,0.1)',
                  color: selectedProgram ? '#000' : 'var(--text-muted)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  fontWeight: '800',
                  fontFamily: 'var(--font-mono)',
                  cursor: selectedProgram ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                Avançar para Comprar Mão Inicial <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DISTRIBUIÇÃO DA MÃO INICIAL */}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ margin: '0 auto 12px', width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(57, 211, 83, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--terminal-green)' }}>
              <Sparkles size={32} color="var(--terminal-green)" />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--terminal-green)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
              Tudo Pronto para o Início da Partida!
            </h3>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.4' }}>
              Você selecionou o arquétipo <strong>{selectedArchetype?.name}</strong> e o alvo corporativo inicial <strong>{selectedProgram?.name}</strong>.
              <br />
              Clique no botão abaixo para receber sua mão inicial de {selectedArchetype?.maxHandSize || 6} cartas e iniciar a Rodada 1!
            </p>

            <button
              onClick={handleFinishSetup}
              style={{
                width: '100%',
                padding: '14px',
                background: 'var(--terminal-green)',
                color: '#000',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                fontWeight: '900',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: 'var(--glow-green)'
              }}
            >
              <UserCheck size={20} /> COMPRAR MÃO INICIAL E INICIAR O JOGO
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
