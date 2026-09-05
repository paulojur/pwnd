import React from 'react';
import { ProgramCard, PROGRAM_CARDS } from '../data/cardsData';
import { Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface ProgramSelectorModalProps {
  isOpen: boolean;
  onSelectProgram: (program: ProgramCard) => void;
}

export const ProgramSelectorModal: React.FC<ProgramSelectorModalProps> = ({ isOpen, onSelectProgram }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        className="terminal-box"
        style={{
          maxWidth: '650px',
          width: '90%',
          padding: '24px',
          textAlign: 'center',
          border: '2px solid var(--amber-glow)',
          boxShadow: 'var(--glow-amber)',
          background: 'linear-gradient(180deg, #182033 0%, #0d0f1a 100%)'
        }}
      >
        <div style={{ margin: '0 auto 12px', width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(240, 136, 62, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--amber-glow)' }}>
          <Layers size={32} color="var(--amber-glow)" />
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--amber-glow)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px' }}>
          RELATÓRIO CONCLUÍDO! ESCOLHA NOVO ALVO CORPORATIVO
        </div>

        <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
          Selecione seu Próximo Programa Empresarial
        </h3>

        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.4' }}>
          O relatório do seu programa anterior foi finalizado e os Bounties foram creditados! Selecione agora uma das empresas disponíveis no <strong>Program Market</strong> para auditá-la no seu tapete.
        </p>

        {/* List of Available Programs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '16px' }}>
          {PROGRAM_CARDS.map((prog) => (
            <div
              key={prog.id}
              onClick={() => {
                soundFx.playClick();
                onSelectProgram(prog);
              }}
              style={{
                background: 'linear-gradient(145deg, #0d1e2e 0%, #15273b 100%)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                padding: '12px',
                cursor: 'pointer',
                textAlign: 'left',
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
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                  {prog.name}
                </h4>
                <div style={{ fontSize: '9px', color: 'var(--terminal-green)', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
                  Range: {prog.bountyRange}
                </div>
              </div>

              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '6px' }}>
                <span style={{ fontSize: '9px', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)' }}>
                  Patch: {prog.patchSpeed}
                </span>
                <span style={{ fontSize: '10px', color: 'var(--cyber-blue)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  Escolher <ArrowRight size={10} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
