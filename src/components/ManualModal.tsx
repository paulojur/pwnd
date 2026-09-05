import React, { useState } from 'react';
import { BookOpen, Search, Printer, X, ShieldCheck, Zap, Award, AlertTriangle, ChevronRight, FileText, HelpCircle, Flame } from 'lucide-react';
import { FULL_23_EVENTS } from '../data/full23EventsData';
import { ARCHETYPES } from '../data/cardsData';
import { soundFx } from '../utils/audio';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManualModal: React.FC<ManualModalProps> = ({ isOpen, onClose }) => {
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const handlePrintManual = () => {
    soundFx.playClick();
    window.print();
  };

  const filteredEvents = FULL_23_EVENTS.filter(evt =>
    evt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    evt.simpleDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    evt.technicalReference.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="modal-overlay">
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .manual-printable-area, .manual-printable-area * {
            visibility: visible;
          }
          .manual-printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            color: #000 !important;
            background: #fff !important;
          }
          .manual-no-print {
            display: none !important;
          }
        }
      `}</style>

      <div
        className="terminal-box manual-printable-area"
        style={{
          maxWidth: '1100px',
          width: '95%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '24px',
          border: '2px solid var(--amber-glow)',
          boxShadow: '0 0 30px rgba(240, 136, 62, 0.3)',
          background: '#0a0d14'
        }}
      >
        {/* HEADER DO MANUAL */}
        <div className="manual-no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BookOpen size={28} color="var(--amber-glow)" />
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--amber-glow)', letterSpacing: '3px', textTransform: 'uppercase' }}>
                DOCUMENTAÇÃO OFICIAL DO SISTEMA V1.0 (16 SEÇÕES INTEGRIAIS)
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-mono)' }}>
                PWND! — MANUAL DE REGRAS COMPLETO (HTML)
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handlePrintManual}
              style={{
                padding: '8px 14px',
                background: 'rgba(240, 136, 62, 0.15)',
                color: 'var(--amber-glow)',
                border: '1px solid var(--amber-glow)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '11px',
                fontWeight: '800',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Printer size={15} /> IMPRIMIR MANUAL
            </button>
            <button onClick={() => { soundFx.playClick(); onClose(); }} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* BARRA DE BUSCA EM TEMPO REAL */}
        <div className="manual-no-print" style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Buscar em todas as 16 seções... (Ex: Patch Speed, Defuse, Desempate, 2D6, Red Teamer)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)'
              }}
            />
          </div>
        </div>

        {/* BARRA NAVEGADORA DE CAPÍTULOS (16 SEÇÕES) */}
        <div className="manual-no-print" style={{ display: 'flex', gap: '6px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {[
            { id: 1, title: '1. Componentes' },
            { id: 2, title: '2. Vitória' },
            { id: 3, title: '3. Setup ($N+4$)' },
            { id: 4, title: '4. Escala de Jogadores' },
            { id: 5, title: '5. Ações do Turno' },
            { id: 6, title: '6. Patch Speed (D6)' },
            { id: 7, title: '7. Patch Deployed!' },
            { id: 8, title: '8. Event Cards' },
            { id: 9, title: '9. Arquétipos (6)' },
            { id: 10, title: '10. Ferramentas' },
            { id: 11, title: '11. Empresas' },
            { id: 12, title: '12. Bounty Track' },
            { id: 13, title: '13. Desempate' },
            { id: 14, title: '14. Rodadas Finais (2D6)' },
            { id: 15, title: '15. Guia Visual & Slots' },
            { id: 16, title: '16. Glossário & FAQ' }
          ].map(cap => (
            <button
              key={cap.id}
              onClick={() => { soundFx.playClick(); setActiveChapter(cap.id); setSearchQuery(''); }}
              style={{
                padding: '6px 10px',
                background: activeChapter === cap.id ? 'var(--amber-glow)' : 'rgba(255,255,255,0.06)',
                color: activeChapter === cap.id ? '#000' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '4px',
                fontSize: '10.5px',
                fontWeight: '800',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer'
              }}
            >
              {cap.title}
            </button>
          ))}
        </div>

        {/* SE BUSCA ATIVA: MOSTRAR RESULTADOS */}
        {searchQuery.trim() !== '' ? (
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
              🔍 Resultados da busca por: "{searchQuery}"
            </h3>
            {filteredEvents.length === 0 ? (
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Nenhum evento encontrado. Consulte os capítulos acima para regras gerais.</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {filteredEvents.map(evt => (
                  <div key={evt.id} style={{ border: '1px solid var(--alert-red)', padding: '12px', borderRadius: '6px', background: 'rgba(248,81,73,0.08)' }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--alert-red)' }}>{evt.icon} #{evt.number} - {evt.name}</div>
                    <div style={{ fontSize: '10px', color: 'var(--amber-glow)', marginTop: '2px' }}>Ref: {evt.technicalReference}</div>
                    <div style={{ fontSize: '11px', color: '#ccc', marginTop: '6px', lineHeight: '1.4' }}>{evt.simpleDescription}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* CONTEÚDO INTEGRAL DAS 16 SEÇÕES DO MANUAL */
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', color: '#e2e8f0', lineHeight: '1.6' }}>

            {/* SEÇÃO 1 */}
            {activeChapter === 1 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--amber-glow)', paddingBottom: '8px', marginBottom: '16px' }}>
                  SEÇÃO 1: COMPONENTES DO JOGO
                </h3>
                <p>O jogo <strong>PWND! — Bug Bounty Chaos</strong> é composto por elementos modulares de alta precisão técnica:</p>
                <ul>
                  <li><strong>Board Central Compartilhado (30x20cm):</strong> Contém 1 Slot de Event Deck, Program Market (3 slots), Discard Pile, Round Tracker (1 a 8) e Bounty Tier Legend.</li>
                  <li><strong>Player Mats (6 unidades 25x35cm):</strong> Contém `SLOT RESEARCHER`, `ACTIVE PROGRAM`, `SLOT DEFUSE`, `TOOLS RACK` (3 slots de 155px), `ZONA DE EXPLOITS` (160px limpa) e a Bounty Track lateral.</li>
                  <li><strong>Baralhos:</strong> 80 Vulnerability Cards, 12 Tool Cards, 24 Program Cards (12 empresas x 2 cópias), 6 Researcher Archetypes, 23 Event Cards e Safeguards escalares ($N+4$).</li>
                  <li><strong>Auxiliares:</strong> 6 Bounty Tokens acrílicos, 1 Round Token verde-neon e 2 Dados D6.</li>
                </ul>
              </div>
            )}

            {/* SEÇÃO 2 */}
            {activeChapter === 2 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--amber-glow)', paddingBottom: '8px', marginBottom: '16px' }}>
                  SEÇÃO 2: OBJETIVO DO JOGO & CONDIÇÃO DE VITÓRIA
                </h3>
                <p>Cada participante assume o papel de um pesquisador independente de segurança ofensiva competindo em plataformas abertas de caça a falhas.</p>
                <div style={{ background: 'rgba(56, 189, 248, 0.1)', borderLeft: '4px solid var(--cyber-blue)', padding: '14px', borderRadius: '4px' }}>
                  <strong style={{ color: 'var(--cyber-blue)' }}>🏆 CONDIÇÃO DE VITÓRIA:</strong><br />
                  O primeiro pesquisador a atingir a meta de <strong>$40.000 na Bounty Track</strong> vence instantaneamente. Se ninguém atingir $40.000 até o final da <strong>8ª Rodada</strong>, vence quem tiver a maior quantia acumulada.
                </div>
              </div>
            )}

            {/* SEÇÃO 3 */}
            {activeChapter === 3 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--amber-glow)', paddingBottom: '8px', marginBottom: '16px' }}>
                  SEÇÃO 3: PREPARAÇÃO DA MESA (SETUP PASSO A PASSO 3.1 A 3.7)
                </h3>
                <ol style={{ paddingLeft: '20px', fontSize: '12px' }}>
                  <li><strong>3.1 Espaço Central:</strong> Posicione o Board Central no meio da mesa e os marcadores no degrau $0.</li>
                  <li><strong>3.2 Primeiro Jogador (Regra Social):</strong> Vence a prioridade quem jogou board game por último ➔ quem visitou Portugal por último ➔ quem tomou o último café!</li>
                  <li><strong>3.3 Escolha Pública de Arquétipos:</strong> No sentido horário, cada participante escolhe abertamente 1 Arquétipo.</li>
                  <li><strong>3.4 Preparação dos Baralhos:</strong> Embaralhe 80 Exploits + 12 Tools + 4 Defuses no Main Deck. Coloque os 23 Eventos no Event Deck. Revele 3 empresas no Program Market.</li>
                  <li><strong>3.5 Mão Inicial Garantida ($N+4$):</strong> Compre 5 cartas de Ação + <strong>1 Safeguard garantida (`Cofre 0-Day`)</strong> (total de 6 cartas iniciais).</li>
                  <li><strong>3.6 Seleção do Alvo Inicial:</strong> Cada jogador escolhe 1 empresa do mercado para seu `ACTIVE PROGRAM`.</li>
                  <li><strong>3.7 Marcador de Rodadas:</strong> Coloque o Round Token na casa 1 do Round Tracker.</li>
                </ol>
              </div>
            )}

            {/* SEÇÃO 4 */}
            {activeChapter === 4 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--amber-glow)', paddingBottom: '8px', marginBottom: '16px' }}>
                  SEÇÃO 4: ESTRUTURA DA PARTIDA & ESCALA DE JOGADORES
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center' }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ color: 'var(--amber-glow)', fontWeight: 'bold' }}>2 JOGADORES</div>
                    <div style={{ fontSize: '11px', marginTop: '4px' }}>10 Rodadas Oficiais (40 min)</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ color: 'var(--terminal-green)', fontWeight: 'bold' }}>3 A 4 JOGADORES</div>
                    <div style={{ fontSize: '11px', marginTop: '4px' }}>8 Rodadas Oficiais (45 min)</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ color: 'var(--cyber-blue)', fontWeight: 'bold' }}>5 A 6 JOGADORES</div>
                    <div style={{ fontSize: '11px', marginTop: '4px' }}>8 Rodadas Oficiais (60 min)</div>
                  </div>
                </div>
              </div>
            )}

            {/* SEÇÃO 5 */}
            {activeChapter === 5 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--amber-glow)', paddingBottom: '8px', marginBottom: '16px' }}>
                  SEÇÃO 5: AÇÕES DO TURNO
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ border: '1px solid var(--cyber-blue)', padding: '12px', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.05)' }}>
                    <h4 style={{ color: 'var(--cyber-blue)', fontWeight: 'bold', margin: '0 0 4px 0' }}>5.1 AÇÃO 1: RECON (OBRIGATÓRIA - ESCOLHA 1 OPÇÃO)</h4>
                    <ul style={{ fontSize: '11px', margin: 0, paddingLeft: '16px' }}>
                      <li>(A) Comprar 2 cartas de Ação (3 se tiver Nmap).</li>
                      <li>(B) Comprar 1 carta do Baralho de Eventos.</li>
                      <li>(C) Desistir da empresa ativa e escolher uma nova no mercado.</li>
                    </ul>
                  </div>

                  <div style={{ border: '1px solid var(--amber-glow)', padding: '12px', borderRadius: '6px', background: 'rgba(240, 136, 62, 0.05)' }}>
                    <h4 style={{ color: 'var(--amber-glow)', fontWeight: 'bold', margin: '0 0 4px 0' }}>5.2 AÇÃO 2: EXPLOIT (ARMAGEM)</h4>
                    <p style={{ fontSize: '11px', margin: 0 }}>
                      Baixe vulnerabilidades e ferramentas pagando os custos requeridos ou aplicados por ferramentas de redução (SQLMap zera Injection, Postman reduz BAC em 1, OWASP ZAP zera Low/Medium, Burp Suite Pro é coringa universal).
                    </p>
                  </div>

                  <div style={{ border: '1px solid var(--terminal-green)', padding: '12px', borderRadius: '6px', background: 'rgba(57, 211, 83, 0.05)' }}>
                    <h4 style={{ color: 'var(--terminal-green)', fontWeight: 'bold', margin: '0 0 4px 0' }}>5.3 AÇÃO 3: REPORT (SUBMISSÃO FORMAL)</h4>
                    <p style={{ fontSize: '11px', margin: 0 }}>
                      Verifique duplicatas (Duplicate Check) ➔ Some os pontos CVSS ➔ Aplique o multiplicador da empresa (×1, ×2, ×5, ×10) ➔ Avance na Bounty Track ➔ Descarte as falhas e escolha novo alvo.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SEÇÃO 6 */}
            {activeChapter === 6 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--amber-glow)', paddingBottom: '8px', marginBottom: '16px' }}>
                  SEÇÃO 6: PATCH SPEED: O RELÓGIO DO PATCH (TESTE D6)
                </h3>
                <p style={{ fontSize: '11.5px' }}>
                  No final do turno do jogador, jogadores com vulnerabilidades expostas na Zona de Exploits rolam 1 dado D6:
                </p>
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '11px' }}>• <strong>Lenta:</strong> Apenas resultado <strong>6</strong> aciona o patch (16,6%).</div>
                  <div style={{ fontSize: '11px', marginTop: '4px' }}>• <strong>Moderada:</strong> Resultados <strong>5 ou 6</strong> acionam o patch (33,3%).</div>
                  <div style={{ fontSize: '11px', marginTop: '4px' }}>• <strong>Rápida:</strong> Resultados <strong>4, 5 ou 6</strong> acionam o patch (50,0%).</div>
                  <div style={{ fontSize: '11px', marginTop: '4px' }}>• <strong>Extrema:</strong> Resultados <strong>3, 4, 5 ou 6</strong> acionam o patch (66,6%).</div>
                </div>
              </div>
            )}

            {/* SEÇÃO 7 */}
            {activeChapter === 7 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--amber-glow)', paddingBottom: '8px', marginBottom: '16px' }}>
                  SEÇÃO 7: PATCH DEPLOYED! (PENALIDADES & SafeguardS)
                </h3>
                <div style={{ background: 'rgba(248, 81, 73, 0.1)', borderLeft: '4px solid var(--alert-red)', padding: '14px', borderRadius: '4px' }}>
                  <strong style={{ color: 'var(--alert-red)' }}>🚨 PENALIDADES DO PATCH DEPLOYED:</strong><br />
                  1. Descarte imediato de todas as vulnerabilidades na mesa.<br />
                  2. Prejuízo financeiro progressivo na Bounty Track conforme a zona do saldo atual ($1.5K, $3K, $4.5K ou $6K) (piso mínimo em $0).<br />
                  3. Encerramento e descarte compulsório da empresa ativa.<br />
                  <em>Proteção:</em> A carta `Cofre 0-Day` (Defuse) anula 100% dos efeitos danosos.
                </div>
              </div>
            )}

            {/* SEÇÃO 8 */}
            {activeChapter === 8 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--amber-glow)', paddingBottom: '8px', marginBottom: '16px' }}>
                  SEÇÃO 8: EVENT CARDS & MECÂNICA DE CAOS
                </h3>
                <p style={{ fontSize: '11.5px' }}>
                  Eventos introduzem reviravoltas. Na Rodada 7, o Event Deck é misturado ao Main Deck. O <em>Social Engineer</em> pode escolher nominalmente o alvo dos eventos disparados.
                </p>
              </div>
            )}

            {/* SEÇÃO 9 */}
            {activeChapter === 9 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--amber-glow)', paddingBottom: '8px', marginBottom: '16px' }}>
                  SEÇÃO 9: RESEARCHER ARCHETYPES (AS 6 CLASSES ASSIMÉTRICAS)
                </h3>
                <ul style={{ fontSize: '11.5px' }}>
                  <li><strong>n00b:</strong> Evolui sua árvore de habilidades passivas a cada Report efetuado.</li>
                  <li><strong>The Old Guard:</strong> Mão expandida de até 9 cartas. Reporta no máximo 1 vez por rodada.</li>
                  <li><strong>Bug Hunter:</strong> Processa 2 Reports na mesma ação (limitado a CVSS ≤ 6.0). Bônus de +50% com 5+ cartas.</li>
                  <li><strong>Social Engineer:</strong> Controla o alvo de eventos e pode comprar do Event Deck em Recon.</li>
                  <li><strong>Red Teamer:</strong> Ignora escopo de empresas com taxa operacional de -30% nos bounties.</li>
                  <li><strong>The Pentester:</strong> Imune a *Duplicate Report!* e *Triage Delay!*. Só sofre Patch no resultado 6 do D6.</li>
                </ul>
              </div>
            )}

            {/* SEÇÃO 10 */}
            {activeChapter === 10 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--amber-glow)', paddingBottom: '8px', marginBottom: '16px' }}>
                  SEÇÃO 10: TOOL CARDS (TABELA DE FERRAMENTAS)
                </h3>
                <div style={{ fontSize: '11px' }}>
                  • <strong>Burp Suite Pro:</strong> Coringa universal.<br />
                  • <strong>Nmap + ffuf:</strong> +1 carta em Recon (compra 3).<br />
                  • <strong>OWASP ZAP:</strong> Zera custo de Low/Medium.<br />
                  • <strong>Postman:</strong> Reduz 1 unidade de Broken Access Control.<br />
                  • <strong>Browser DevTools:</strong> +50% em vulnerabilidades XSS.<br />
                  • <strong>SQLMap:</strong> Zera custo de vulnerabilidades Injection.
                </div>
              </div>
            )}

            {/* SEÇÃO 11 */}
            {activeChapter === 11 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--amber-glow)', paddingBottom: '8px', marginBottom: '16px' }}>
                  SEÇÃO 11: PROGRAM CARDS (TABELA DE EMPRESAS CORPORATIVAS)
                </h3>
                <div style={{ fontSize: '11px' }}>
                  • <strong>ShopAll Global:</strong> Medium Tier (×2) - Patch Moderada (5+)<br />
                  • <strong>BankSafe Financial:</strong> High Tier (×5) - Patch Rápida (4+)<br />
                  • <strong>GovPortal Nacional:</strong> Low Tier (×1) - Patch Lenta (6)<br />
                  • <strong>HealthLock Medical:</strong> High Tier (×5) - Patch Rápida (4+)<br />
                  • <strong>CloudNine Systems:</strong> Critical Tier (×10) - Patch Extrema (3+)
                </div>
              </div>
            )}

            {/* SEÇÃO 12 */}
            {activeChapter === 12 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--amber-glow)', paddingBottom: '8px', marginBottom: '16px' }}>
                  SEÇÃO 12: BOUNTY TRACK PROGRESSIVA (28 DEGRAUS $0 A $40.000)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
                  <div style={{ background: 'rgba(57, 211, 83, 0.1)', border: '1px solid var(--terminal-green)', padding: '8px', borderRadius: '4px' }}>
                    <div style={{ color: 'var(--terminal-green)', fontWeight: 'bold', fontSize: '10.5px' }}>🟩 BAIXA</div>
                    <div style={{ fontSize: '9.5px', color: '#ccc' }}>$0 a $11.000 (9 degraus)</div>
                  </div>
                  <div style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid #eab308', padding: '8px', borderRadius: '4px' }}>
                    <div style={{ color: '#eab308', fontWeight: 'bold', fontSize: '10.5px' }}>🟨 MÉDIA</div>
                    <div style={{ fontSize: '9.5px', color: '#ccc' }}>$1.500 a $10.000</div>
                  </div>
                  <div style={{ background: 'rgba(249, 115, 22, 0.1)', border: '1px solid #f97316', padding: '8px', borderRadius: '4px' }}>
                    <div style={{ color: '#f97316', fontWeight: 'bold', fontSize: '10.5px' }}>🟧 ALTA</div>
                    <div style={{ fontSize: '9.5px', color: '#ccc' }}>$12.500 a $25.000</div>
                  </div>
                  <div style={{ background: 'rgba(248, 81, 73, 0.1)', border: '1px solid var(--alert-red)', padding: '8px', borderRadius: '4px' }}>
                    <div style={{ color: 'var(--alert-red)', fontWeight: 'bold', fontSize: '10.5px' }}>🟥 CRÍTICA</div>
                    <div style={{ fontSize: '9.5px', color: '#ccc' }}>$34.000 a $40.000</div>
                  </div>
                </div>
              </div>
            )}

            {/* SEÇÃO 13 */}
            {activeChapter === 13 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--amber-glow)', paddingBottom: '8px', marginBottom: '16px' }}>
                  SEÇÃO 13: FIM DA PARTIDA & CRITÉRIOS OFICIAIS DE DESEMPATE
                </h3>
                <div style={{ background: 'rgba(56, 189, 248, 0.1)', borderLeft: '4px solid var(--cyber-blue)', padding: '12px', borderRadius: '4px', fontSize: '11.5px' }}>
                  <strong>⚖️ CRITÉRIOS DE DESEMPATE:</strong><br />
                  1º Critério: Maior número total de Reports concluídos com sucesso.<br />
                  2º Critério: Maior número de falhas Critical submetidas (CVSS ≥ 9.0).<br />
                  3º Critério: Rolagem de morte súbita no dado D6 (maior resultado).
                </div>
              </div>
            )}

            {/* SEÇÃO 14 */}
            {activeChapter === 14 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--amber-glow)', paddingBottom: '8px', marginBottom: '16px' }}>
                  SEÇÃO 14: RODADAS FINAIS (7 E 8): O CAOS TOTAL
                </h3>
                <p style={{ fontSize: '11.5px' }}>
                  <strong>Rodada 7:</strong> O Event Deck é integrado ao Main Deck e o mercado expande para 5 programas.<br />
                  <strong>Rodada 8:</strong> O teste de Patch Speed exige a rolagem obrigatória de <strong>2 dados (2D6)</strong> (sucesso em ambos para escapar do descarte).
                </p>
              </div>
            )}

            {/* SEÇÃO 15 */}
            {activeChapter === 15 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--amber-glow)', paddingBottom: '8px', marginBottom: '16px' }}>
                  SEÇÃO 15: GUIA VISUAL: MOLDURAS, SELOS E ENCAIXE NOS SLOTS
                </h3>
                <p style={{ fontSize: '11.5px' }}>
                  • Moldura Laranja (#f0883e) ➔ Exploits na Zona de Exploits.<br />
                  • Moldura Azul (#38bdf8) ➔ Tools no Tools Rack.<br />
                  • Moldura Verde (#39d353) ➔ Defuse no Slot Defuse.<br />
                  • Moldura Vermelha (#f85149) ➔ Eventos no Event Deck.
                </p>
              </div>
            )}

            {/* SEÇÃO 16 */}
            {activeChapter === 16 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--amber-glow)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--amber-glow)', paddingBottom: '8px', marginBottom: '16px' }}>
                  SEÇÃO 16: GUIA DE REFERÊNCIA RÁPIDA & GLOSSÁRIO GERAL
                </h3>
                <p style={{ fontSize: '11.5px' }}>
                  <strong>CVSS:</strong> Índice numérico de 1.0 a 10.0 que define o valor em dólares da recompensa no jogo.
                </p>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
