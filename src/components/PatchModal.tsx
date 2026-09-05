import React from 'react';
import { useGame } from '../context/GameContext';
import { ShieldAlert, ShieldCheck, AlertOctagon, Flame } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const PatchModal: React.FC = () => {
  const { patchModalOpen, playerHand, playerActiveTools, defuseWith0Day, acceptPatchDamage } = useGame();

  if (!patchModalOpen) return null;

  const has0DayInHand = playerHand.some(c => c.name === '0-Day Reserve') || playerActiveTools.some(t => t.name === '0-Day Reserve');

  return (
    <div className="modal-overlay animate-glitch">
      <div
        className="terminal-box"
        style={{
          maxWidth: '520px',
          width: '90%',
          padding: '24px',
          border: '2px solid var(--alert-red)',
          boxShadow: 'var(--glow-red)',
          background: 'linear-gradient(180deg, #260909 0%, #0d0f1a 100%)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Top Warning Icon */}
        <div style={{ margin: '0 auto 16px', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(248, 81, 73, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--alert-red)' }}>
          <ShieldAlert size={36} color="var(--alert-red)" />
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--alert-red)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '4px' }}>
          EMERGENCY HOTFIX DEPLOYED
        </div>

        <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#fff', letterSpacing: '-1px', marginBottom: '12px' }}>
          PATCH DEPLOYED!
        </h2>

        <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.5', marginBottom: '20px' }}>
          A equipe de DevSecOps lançou uma correção em produção! Todas as vulnerabilidades encadeadas no seu programa ativo que <strong>NÃO foram reportadas</strong> serão limpas e descartadas.
        </p>

        {has0DayInHand ? (
          <div style={{ background: 'rgba(57, 211, 83, 0.12)', border: '1px solid var(--terminal-green)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '20px', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--terminal-green)', fontWeight: '700', fontSize: '13px', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
              <ShieldCheck size={18} /> Safeguard DISPONÍVEL!
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Você possui a carta <strong>0-Day Reserve</strong>! Ative-a agora para anular o efeito do Patch e reembaralhar a carta de volta ao deck.
            </div>
          </div>
        ) : (
          <div style={{ background: 'rgba(248, 81, 73, 0.1)', border: '1px solid rgba(248, 81, 73, 0.3)', borderRadius: 'var(--radius-md)', padding: '12px', marginBottom: '20px', fontSize: '11px', color: 'var(--text-secondary)' }}>
            ⚠️ Nenhuma carta <em>0-Day Reserve</em> encontrada na mão ou no rack de ferramentas.
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          {has0DayInHand && (
            <button
              onClick={() => {
                soundFx.playClick();
                defuseWith0Day();
              }}
              style={{
                flex: 1,
                padding: '12px',
                background: 'var(--terminal-green)',
                color: '#000',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontWeight: '800',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <ShieldCheck size={16} /> Ativar 0-Day Reserve
            </button>
          )}

          <button
            onClick={() => {
              soundFx.playClick();
              acceptPatchDamage();
            }}
            style={{
              flex: 1,
              padding: '12px',
              background: has0DayInHand ? 'rgba(255, 255, 255, 0.08)' : 'var(--alert-red)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '700',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Flame size={16} /> {has0DayInHand ? 'Aceitar Perda' : 'Aceitar Colapso das Vulns'}
          </button>
        </div>
      </div>
    </div>
  );
};
