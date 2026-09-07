import React from 'react';
import { useBoardGame } from '../context/BoardGameContext';
import { Search, Send, SkipForward, Award, Dices, UserCheck, Clock } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const ActionPointsBar: React.FC = () => {
  const {
    playerScore,
    isMyTurn,
    activePlayerRole,
    myRole,
    actionVarrer,
    actionReportar,
    triggerManualDiceRoll,
    endTurn
  } = useBoardGame();

  return (
    <div style={{ marginBottom: '20px' }}>

      {/* TURN STATUS BANNER (Sua Vez vs Aguardando Oponente) */}
      <div
        style={{
          padding: '10px 20px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: isMyTurn ? 'linear-gradient(90deg, rgba(57, 211, 83, 0.15) 0%, rgba(57, 211, 83, 0.05) 100%)' : 'linear-gradient(90deg, rgba(56, 189, 248, 0.15) 0%, rgba(56, 189, 248, 0.05) 100%)',
          border: isMyTurn ? '1px solid var(--terminal-green)' : '1px solid var(--cyber-blue)',
          boxShadow: isMyTurn ? 'var(--glow-green)' : 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isMyTurn ? (
            <UserCheck size={22} color="var(--terminal-green)" />
          ) : (
            <Clock size={22} color="var(--cyber-blue)" className="animate-spin-slow" />
          )}
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              REGRA OFICIAL (MANUAL V1.0): 1 AÇÃO POR TURNO
            </div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: isMyTurn ? 'var(--terminal-green)' : 'var(--cyber-blue)', fontFamily: 'var(--font-mono)' }}>
              {isMyTurn ? '🟢 SUA VEZ! (Escolha 1 Ação e o Turno Passará Automático)' : `⏳ AGUARDANDO A JOGADA DO ${activePlayerRole === 'player-1' ? 'JOGADOR 1 (VERDE)' : 'JOGADOR 2 (AZUL)'}...`}
            </div>
          </div>
        </div>

        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          Você é: <strong style={{ color: myRole === 'player-1' ? 'var(--terminal-green)' : 'var(--cyber-blue)' }}>{myRole === 'player-1' ? 'Jogador 1 (Verde)' : 'Jogador 2 (Azul)'}</strong>
        </div>
      </div>

      {/* Main Controls Box */}
      <div className="terminal-box" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', opacity: isMyTurn ? 1 : 0.65 }}>

        {/* Total Score & Rule Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(57, 211, 83, 0.1)', border: '1px solid var(--terminal-green)', borderRadius: 'var(--radius-md)', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={20} color="var(--terminal-green)" />
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Pontuação Total
              </div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--terminal-green)', fontFamily: 'var(--font-mono)' }}>
                {playerScore} pts
              </div>
            </div>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '12px' }}>
            Ações no Turno: <strong style={{ color: 'var(--amber-glow)' }}>[ RECON ]</strong> ou <strong style={{ color: 'var(--amber-glow)' }}>[ EXPLOIT ]</strong> ou <strong style={{ color: 'var(--amber-glow)' }}>[ REPORT ]</strong>
          </div>
        </div>

        {/* Action Buttons (1 Ação Única Por Turno) */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {/* Varrer / Recon (1 Ação) */}
          <button
            onClick={() => { soundFx.playClick(); actionVarrer(); }}
            disabled={!isMyTurn}
            style={{
              padding: '10px 18px',
              background: isMyTurn ? 'var(--cyber-blue)' : 'rgba(255,255,255,0.06)',
              color: isMyTurn ? '#000' : 'var(--text-muted)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '800',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              cursor: isMyTurn ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Search size={16} /> Varrer / Recon (1 Ação)
          </button>

          {/* Reportar vulnerabilidades (1 Ação) */}
          <button
            onClick={() => { soundFx.playClick(); actionReportar(); }}
            disabled={!isMyTurn}
            style={{
              padding: '10px 18px',
              background: isMyTurn ? 'var(--terminal-green)' : 'rgba(255,255,255,0.06)',
              color: isMyTurn ? '#000' : 'var(--text-muted)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '800',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              cursor: isMyTurn ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Send size={16} /> Reportar vulnerabilidades (1 Ação)
          </button>

          {/* Botão de Teste do Dado D6 3D */}
          <button
            onClick={() => { soundFx.playClick(); triggerManualDiceRoll(); }}
            style={{
              padding: '10px 18px',
              background: 'var(--electric-purple)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '800',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: 'var(--glow-purple)'
            }}
          >
            <Dices size={16} /> Testar Dado D8
          </button>

          {/* Passar Turno (Manual) */}
          <button
            onClick={() => { soundFx.playClick(); endTurn(); }}
            disabled={!isMyTurn}
            style={{
              padding: '10px 18px',
              background: isMyTurn ? 'rgba(192, 132, 252, 0.2)' : 'rgba(255,255,255,0.06)',
              color: isMyTurn ? 'var(--electric-purple-light)' : 'var(--text-muted)',
              border: isMyTurn ? '1px solid var(--electric-purple-light)' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '800',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              cursor: isMyTurn ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <SkipForward size={16} /> Passar Turno
          </button>
        </div>
      </div>
    </div>
  );
};
