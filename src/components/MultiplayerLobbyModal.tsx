import React, { useState } from 'react';
import { mpSync } from '../utils/multiplayerSync';
import { Users, Globe, Bot, Shield, Key, Copy, Check, ArrowRight, X } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface MultiplayerLobbyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: (mode: 'solo' | 'hotseat' | 'lan', roomCode?: string, role?: 'player-1' | 'player-2') => void;
}

export const MultiplayerLobbyModal: React.FC<MultiplayerLobbyModalProps> = ({ isOpen, onClose, onStartGame }) => {
  const [activeTab, setActiveTab] = useState<'mode' | 'create' | 'join'>('mode');
  const [inputCode, setInputCode] = useState<string>('');
  const [createdCode, setCreatedCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCreateRoom = () => {
    soundFx.playClick();
    const code = 'PWND-' + Math.floor(1000 + Math.random() * 9000);
    mpSync.initRoom(code, 'player-1');
    setCreatedCode(code);
    setActiveTab('create');
  };

  const handleJoinRoom = () => {
    if (!inputCode.trim()) return;
    soundFx.playClick();
    const code = inputCode.trim().toUpperCase();
    mpSync.initRoom(code, 'player-2');
    onStartGame('lan', code, 'player-2');
    onClose();
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(createdCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay">
      <div
        className="terminal-box"
        style={{
          maxWidth: '580px',
          width: '92%',
          padding: '24px',
          border: '2px solid var(--cyber-blue)',
          boxShadow: '0 0 30px rgba(56, 189, 248, 0.3)',
          background: 'linear-gradient(180deg, #101929 0%, #0d0f1a 100%)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={24} color="var(--cyber-blue)" />
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--cyber-blue)', letterSpacing: '3px', textTransform: 'uppercase' }}>
                LOBBY DE PARTIDA MULTIPLAYER
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-mono)' }}>
                Configurar Mesa para 2 Jogadores
              </h2>
            </div>
          </div>
          <button onClick={() => { soundFx.playClick(); onClose(); }} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Tab 1: Escolha do Modo */}
        {activeTab === 'mode' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              Escolha como deseja montar a mesa para a sua partida de PWND! Board Game:
            </p>

            {/* Modo Solo vs Bots */}
            <div
              onClick={() => {
                soundFx.playClick();
                onStartGame('solo');
                onClose();
              }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '10px',
                padding: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ background: 'rgba(192, 132, 252, 0.2)', padding: '10px', borderRadius: '8px' }}>
                <Bot size={24} color="var(--electric-purple-light)" />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-mono)' }}>
                  Modo Solo (1 Jogador vs Bots IA)
                </h4>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  Treine suas habilidades contra 2 oponentes virtuais automatizados.
                </div>
              </div>
            </div>

            {/* Modo 2 Jogadores na Mesma Tela (Hotseat) */}
            <div
              onClick={() => {
                soundFx.playClick();
                onStartGame('hotseat');
                onClose();
              }}
              style={{
                background: 'rgba(57, 211, 83, 0.06)',
                border: '1px solid var(--terminal-green)',
                borderRadius: '10px',
                padding: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ background: 'rgba(57, 211, 83, 0.2)', padding: '10px', borderRadius: '8px' }}>
                <Users size={24} color="var(--terminal-green)" />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--terminal-green)', fontFamily: 'var(--font-mono)' }}>
                  2 Jogadores na Mesma Tela (Hotseat)
                </h4>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  Jogue no mesmo computador/dispositivo alternando os turnos nos 2 tapetes.
                </div>
              </div>
            </div>

            {/* Modo 2 Jogadores em Rede Local / IP */}
            <div
              style={{
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid var(--cyber-blue)',
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ background: 'rgba(56, 189, 248, 0.2)', padding: '10px', borderRadius: '8px' }}>
                  <Globe size={24} color="var(--cyber-blue)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--cyber-blue)', fontFamily: 'var(--font-mono)' }}>
                    2 Jogadores em Rede Local / IP (2 PCs / Celular)
                  </h4>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    Conecte dois computadores ou dispositivos diferentes na mesma rede Wi-Fi via código de sala.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button
                  onClick={handleCreateRoom}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: 'var(--cyber-blue)',
                    color: '#000',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: '800',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer'
                  }}
                >
                  ➕ Criar Sala
                </button>

                <button
                  onClick={() => { soundFx.playClick(); setActiveTab('join'); }}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: '800',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer'
                  }}
                >
                  🔗 Entrar com Código
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Criar Sala */}
        {activeTab === 'create' && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Sua Sala Foi Criada com Sucesso! Compartilhe o código abaixo com o Jogador 2:
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', margin: '16px 0' }}>
              <div style={{ fontSize: '26px', fontWeight: '900', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)', letterSpacing: '4px', background: 'rgba(0,0,0,0.5)', padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--amber-glow)' }}>
                {createdCode}
              </div>

              <button
                onClick={copyRoomCode}
                style={{
                  padding: '12px',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                {copied ? <Check size={20} color="var(--terminal-green)" /> : <Copy size={20} />}
              </button>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', fontSize: '11px', color: 'var(--cyber-blue)', fontFamily: 'var(--font-mono)', textAlign: 'left', marginBottom: '20px' }}>
              💡 <strong>Dica de Conexão em Outro PC:</strong>
              <br />
              No outro computador ou celular na mesma Wi-Fi, acesse o endereço de IP da sua máquina no navegador (ex: <code>http://192.168.x.x:5173</code>) e digite o código <strong>{createdCode}</strong>!
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setActiveTab('mode')}
                style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '12px' }}
              >
                ← Voltar
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onStartGame('lan', createdCode, 'player-1');
                  onClose();
                }}
                style={{ flex: 2, padding: '10px', background: 'var(--terminal-green)', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontFamily: 'var(--font-mono)', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                Iniciar Partida como Jogador 1 (Verde) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Entrar em Sala */}
        {activeTab === 'join' && (
          <div style={{ padding: '10px 0' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Digite o Código da Sala gerado pelo Jogador 1 para se conectar:
            </div>

            <input
              type="text"
              placeholder="Ex: PWND-8492"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '18px',
                fontWeight: '800',
                fontFamily: 'var(--font-mono)',
                color: 'var(--cyber-blue)',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--cyber-blue)',
                borderRadius: '8px',
                textAlign: 'center',
                letterSpacing: '2px',
                marginBottom: '20px'
              }}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setActiveTab('mode')}
                style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '12px' }}
              >
                ← Voltar
              </button>

              <button
                onClick={handleJoinRoom}
                disabled={!inputCode.trim()}
                style={{ flex: 2, padding: '10px', background: inputCode.trim() ? 'var(--cyber-blue)' : 'rgba(255,255,255,0.1)', color: inputCode.trim() ? '#000' : 'var(--text-muted)', border: 'none', borderRadius: '4px', cursor: inputCode.trim() ? 'pointer' : 'not-allowed', fontWeight: '800', fontFamily: 'var(--font-mono)', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                Entrar na Sala como Jogador 2 (Azul) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
