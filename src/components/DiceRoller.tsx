import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Dices } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface DiceRollerProps {
  programName: string;
  patchSpeed: string;
  requiredRollText: string;
  onRollComplete: (result: { diceValue: number; diceValue2?: number; passed: boolean }) => void;
  isRound8?: boolean;
  stealthMode?: boolean;
}

export const DiceRoller: React.FC<DiceRollerProps> = ({
  programName,
  patchSpeed,
  requiredRollText,
  onRollComplete,
  isRound8 = false,
  stealthMode = false
}) => {
  const [rolling, setRolling] = useState<boolean>(false);
  const [dice1, setDice1] = useState<number | null>(null);
  const [dice2, setDice2] = useState<number | null>(null);
  const [rolled, setRolled] = useState<boolean>(false);
  const [passed, setPassed] = useState<boolean | null>(null);

  const rollDice = () => {
    soundFx.playClick();
    setRolling(true);
    setRolled(false);

    let count = 0;
    const interval = setInterval(() => {
      setDice1(Math.floor(Math.random() * 8) + 1);
        if (isRound8 || stealthMode) {
          setDice2(Math.floor(Math.random() * 8) + 1);
        }
        count++;

        if (count > 10) {
          clearInterval(interval);
          const finalD1 = Math.floor(Math.random() * 8) + 1;
          const finalD2 = (isRound8 || stealthMode) ? Math.floor(Math.random() * 8) + 1 : undefined;

          setDice1(finalD1);
          if (finalD2) setDice2(finalD2);

          let evaluatedDice = finalD1;
          
          if (isRound8 && finalD2) {
             evaluatedDice = Math.max(finalD1, finalD2); // Pior cenário
          } else if (stealthMode && finalD2) {
             evaluatedDice = Math.min(finalD1, finalD2); // Melhor cenário (Vantagem)
          }

          let isPatchTriggered = false;
          // Novas lógicas D8: Lenta(8), Moderada(7-8), Rápida(6-8), Extrema(5-8)
          if (patchSpeed.includes('Lenta') || patchSpeed.includes('8')) {
            isPatchTriggered = evaluatedDice >= 8;
          } else if (patchSpeed.includes('Moderada') || patchSpeed.includes('7')) {
            isPatchTriggered = evaluatedDice >= 7;
          } else if (patchSpeed.includes('Rápida') || patchSpeed.includes('6')) {
            isPatchTriggered = evaluatedDice >= 6;
          } else if (patchSpeed.includes('Extrema') || patchSpeed.includes('5')) {
            isPatchTriggered = evaluatedDice >= 5;
          }

        const isSafe = !isPatchTriggered;
        setPassed(isSafe);
        setRolling(false);
        setRolled(true);

        if (!isSafe) {
          soundFx.playPatchDeployedAlarm();
        }

        setTimeout(() => {
          onRollComplete({ diceValue: finalD1, diceValue2: finalD2, passed: isSafe });
        }, 1200);
      }
    }, 80);
  };

  const getDiceFaceIcon = (val: number) => {
    switch (val) {
      case 1: return '1️⃣';
      case 2: return '2️⃣';
      case 3: return '3️⃣';
      case 4: return '4️⃣';
      case 5: return '5️⃣';
      case 6: return '6️⃣';
      case 7: return '7️⃣';
      case 8: return '8️⃣';
      default: return '💎';
    }
  };

  return (
    <div className="modal-overlay">
      <div
        className="terminal-box"
        style={{
          maxWidth: '460px',
          width: '90%',
          padding: '24px',
          textAlign: 'center',
          border: '2px solid var(--amber-glow)',
          boxShadow: 'var(--glow-amber)'
        }}
      >
        <div style={{ margin: '0 auto 12px', width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(240, 136, 62, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--amber-glow)' }}>
          <Dices size={32} color="var(--amber-glow)" />
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--amber-glow)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px' }}>
          VERIFICAÇÃO DE FINAL DE RODADA (MANUAL V1.0)
        </div>

        <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
          Patch Speed Check (D8)
        </h3>

        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.4' }}>
          Programa Ativo: <strong style={{ color: '#fff' }}>{programName}</strong> (Velocidade: <span style={{ color: 'var(--amber-glow)' }}>{patchSpeed}</span>).
          <br />
          Risco de Patch se tirar: <strong style={{ color: 'var(--alert-red)' }}>{requiredRollText}</strong>
          {isRound8 && <span style={{ color: 'var(--alert-red)', display: 'block', marginTop: '4px' }}>⚠️ RODADA 8: DESVANTAGEM EXTREMA (Pior de 2D8)!</span>}
          {stealthMode && <span style={{ color: 'var(--terminal-green)', display: 'block', marginTop: '4px' }}>🥷 STEALTH MODE ATIVO: VANTAGEM (Melhor de 2D8)!</span>}
        </p>

        {/* Dice Animation Display */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', margin: '20px 0' }}>
          <div
            style={{
              fontSize: '64px',
              lineHeight: '1',
              transition: 'transform 0.1s ease',
              transform: rolling ? 'rotate(180deg) scale(1.1)' : 'scale(1)',
              color: rolled ? (passed ? 'var(--terminal-green)' : 'var(--alert-red)') : '#fff'
            }}
          >
            {dice1 ? getDiceFaceIcon(dice1) : '🎲'}
          </div>

          {(isRound8 || stealthMode) && (
            <div
              style={{
                fontSize: '64px',
                lineHeight: '1',
                transition: 'transform 0.1s ease',
                transform: rolling ? 'rotate(-180deg) scale(1.1)' : 'scale(1)',
                color: rolled ? (passed ? 'var(--terminal-green)' : 'var(--alert-red)') : '#fff'
              }}
            >
              {dice2 ? getDiceFaceIcon(dice2) : '🎲'}
            </div>
          )}
        </div>

        {/* Result Text */}
        {rolled && (
          <div style={{ margin: '12px 0', fontSize: '14px', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
            {passed ? (
              <span style={{ color: 'var(--terminal-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <ShieldCheck size={20} /> SISTEMA PERMANECE VULNERÁVEL! (Resultado Seguro)
              </span>
            ) : (
              <span style={{ color: 'var(--alert-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <ShieldAlert size={20} /> PATCH DEPLOYED! (Correção Ativada)
              </span>
            )}
          </div>
        )}

        {/* Roll Action Button */}
        {!rolled && (
          <button
            onClick={rollDice}
            disabled={rolling}
            style={{
              width: '100%',
              padding: '12px',
              background: 'var(--amber-glow)',
              color: '#000',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: '14px',
              fontWeight: '800',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Dices size={18} /> {rolling ? 'Rolando Dado D8...' : 'Rolar Dado de Patch (D8)'}
          </button>
        )}
      </div>
    </div>
  );
};
