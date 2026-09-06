import React from 'react';
import { useBoardGame } from '../context/BoardGameContext';
import { SERVERS_DATA, ALL_BOARD_NODES, BoardNode } from '../data/boardData';
import { MapPin, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const BoardMap: React.FC = () => {
  const { playerNodeId, deployedExploits, bots, movePawn } = useBoardGame();

  const currentNode = ALL_BOARD_NODES.find(n => n.id === playerNodeId);

  return (
    <div className="terminal-box" style={{ padding: '20px', marginBottom: '20px', background: 'radial-gradient(circle at 50% 50%, #151a2e 0%, #0b0e19 100%)' }}>

      {/* Map Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--terminal-green)', letterSpacing: '3px', textTransform: 'uppercase' }}>
            Tabuleiro de Operações Físicas
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-mono)' }}>
            Mapa da Rede Corporativa
          </h2>
        </div>

        <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: 'var(--radius-sm)' }}>
          Seu Peão está em: <strong style={{ color: 'var(--amber-glow)' }}>{currentNode?.name}</strong> ({currentNode?.serverName})
        </div>
      </div>

      {/* Grid of Servers and Nodes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        {SERVERS_DATA.map(server => (
          <div
            key={server.id}
            style={{
              background: 'rgba(13, 17, 28, 0.8)',
              border: `1px solid ${server.color}40`,
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {/* Server Region Label */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `2px solid ${server.color}`, paddingBottom: '6px' }}>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-mono)' }}>
                {server.icon} {server.name}
              </span>
              <span style={{ fontSize: '10px', background: `${server.color}20`, color: server.color, padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                Alerta {server.alertLevel}/6
              </span>
            </div>

            {/* Nodes inside this server */}
            {server.nodes.map(node => {
              const isPlayerHere = playerNodeId === node.id;
              const botsHere = bots.filter(b => b.currentNodeId === node.id);
              const nodeExploits = deployedExploits.filter(e => e.nodeId === node.id);
              const isConnected = currentNode?.connectedNodeIds.includes(node.id);

              return (
                <div
                  key={node.id}
                  onClick={() => isConnected && movePawn(node.id)}
                  style={{
                    background: isPlayerHere ? 'rgba(57, 211, 83, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: isPlayerHere ? '2px solid var(--terminal-green)' : isConnected ? '1px dashed var(--cyber-blue)' : '1px solid var(--surface-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px',
                    cursor: isConnected ? 'pointer' : 'default',
                    transition: 'all 0.2s ease',
                    boxShadow: isPlayerHere ? 'var(--glow-green)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#fff', fontFamily: 'var(--font-mono)' }}>
                      {node.name}
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)' }}>
                      Mult: {node.bountyMultiplier}x
                    </span>
                  </div>

                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    {node.description}
                  </div>

                  {/* Pawns and Exploits Status on this Node */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px' }}>
                    {/* Pawns */}
                    <div style={{ display: 'flex', gap: '6px', fontSize: '13px' }}>
                      {isPlayerHere && <span title="Seu Peão">♟️ <strong style={{ fontSize: '10px', color: 'var(--terminal-green)' }}>Você</strong></span>}
                      {botsHere.map(b => (
                        <span key={b.id} title={b.name}>{b.icon}</span>
                      ))}
                    </div>

                    {/* Exploits Count */}
                    <div style={{ fontSize: '10px', color: 'var(--electric-purple-light)', fontFamily: 'var(--font-mono)' }}>
                      {nodeExploits.length > 0 ? `💥 ${nodeExploits.length} vulnerabilidades` : 'Nenhuma vulnerabilidade'}
                    </div>

                    {/* Move Button prompt if connected */}
                    {isConnected && !isPlayerHere && (
                      <button
                        style={{
                          fontSize: '9px',
                          background: 'var(--cyber-blue)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '3px',
                          padding: '2px 6px',
                          fontFamily: 'var(--font-mono)',
                          cursor: 'pointer'
                        }}
                      >
                        Mover aqui (-1 AP)
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
