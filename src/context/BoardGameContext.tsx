import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CardV2, CARDS_V2 } from '../data/cardsDataV2';
import { ServerRegion, SERVERS_DATA, ALL_BOARD_NODES } from '../data/boardData';
import { getZoneByBalance } from '../utils/gameRules';
import { ProgramCard, PROGRAM_CARDS, Archetype, ARCHETYPES } from '../data/cardsData';
import { EVENT_CARDS_LIST, EventCardData } from '../components/EventCardModal';
import { mpSync } from '../utils/multiplayerSync';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

export interface DeployedExploit {
  id: string;
  nodeId: string;
  card: CardV2;
  playerId: string;
}

export interface BoardGameBot {
  id: string;
  name: string;
  icon: string;
  currentNodeId: string;
  score: number;
}

interface BoardGameContextType {
  playerNodeId: string;
  playerHand: CardV2[];
  playerActiveTools: CardV2[];
  playerActiveProgram: ProgramCard | null;
  playerArchetype: Archetype;
  programMarket: ProgramCard[];
  playerScore: number;
  bountyTotalCash: number;
  gameWinner: string | null;
  servers: ServerRegion[];
  deployedExploits: DeployedExploit[];
  bots: BoardGameBot[];
  currentTurn: number;

  // Controle de Turnos e Papéis no Multiplayer
  activePlayerRole: 'player-1' | 'player-2';
  myRole: 'player-1' | 'player-2';
  isMyTurn: boolean;
  gameMode: 'solo' | 'hotseat' | 'lan';

  // Setup Wizard & Event Deck
  isSetupWizardOpen: boolean;
  activeEventCard: EventCardData | null;

  patchAlertModal: boolean;
  alertServerName: string | null;
  isDiceModalOpen: boolean;
  diceRollReason: 'report' | 'endTurn' | 'manualTest';
  logs: string[];

  // Ações do Board Game
  setMyRole: (role: 'player-1' | 'player-2') => void;
  setGameMode: (mode: 'solo' | 'hotseat' | 'lan') => void;
  completeSetup: (archetype: Archetype, program: ProgramCard) => void;
  drawEventCard: () => void;
  closeEventModal: () => void;
  setGameWinner: (winner: string | null) => void;
  movePawn: (targetNodeId: string) => void;
  actionVarrer: () => void;
  actionInfiltrar: (cardId: string) => void;
  discardCardFromHand: (cardId: string) => void;
  recycleHandCards: (cardId1: string, cardId2: string) => void;
  abandonActiveProgram: () => void;
  moveCardToToolsRack: (cardId: string) => void;
  moveCardToDefuseSlot: (cardId: string) => void;
  actionReportar: () => void;
  triggerManualDiceRoll: () => void;
  selectNewProgram: (program: ProgramCard) => void;
  handleDiceRollResult: (result: { diceValue: number; diceValue2?: number; passed: boolean }) => void;
  defusePatch: () => void;
  acceptPatch: () => void;
  endTurn: () => void;
  resetBoardGame: () => void;
}

const BoardGameContext = createContext<BoardGameContextType | undefined>(undefined);

export const BoardGameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [playerNodeId, setPlayerNodeId] = useState<string>('node-bank-login');
  const [playerHand, setPlayerHand] = useState<CardV2[]>([]);
  const [playerActiveTools, setPlayerActiveTools] = useState<CardV2[]>([]);
  const [playerActiveProgram, setPlayerActiveProgram] = useState<ProgramCard | null>(null);
  const [playerArchetype, setPlayerArchetype] = useState<Archetype>(ARCHETYPES[0]);

  const [programMarket, setProgramMarket] = useState<ProgramCard[]>(PROGRAM_CARDS.slice(0, 3));
  const [programDeck, setProgramDeck] = useState<ProgramCard[]>(PROGRAM_CARDS.slice(3));

  const [playerScore, setPlayerScore] = useState<number>(0);
  const [servers, setServers] = useState<ServerRegion[]>(SERVERS_DATA);
  const [deployedExploits, setDeployedExploits] = useState<DeployedExploit[]>([]);
  const [currentTurn, setCurrentTurn] = useState<number>(1);

  // CONTROLE DE MODO DE JOGO & PAPÉIS
  const [gameMode, setGameModeState] = useState<'solo' | 'hotseat' | 'lan'>('solo');
  const [activePlayerRole, setActivePlayerRole] = useState<'player-1' | 'player-2'>('player-1');
  const [myRole, setMyRoleState] = useState<'player-1' | 'player-2'>('player-1');

  const isMyTurn = myRole === activePlayerRole;

  // SETUP WIZARD & EVENT CARDS
  const [isSetupWizardOpen, setIsSetupWizardOpen] = useState<boolean>(true);
  const [activeEventCard, setActiveEventCard] = useState<EventCardData | null>(null);

  const [patchAlertModal, setPatchAlertModal] = useState<boolean>(false);
  const [alertServerName, setAlertServerName] = useState<string | null>(null);
  const [isDiceModalOpen, setIsDiceModalOpen] = useState<boolean>(false);
  const [diceRollReason, setDiceRollReason] = useState<'report' | 'endTurn' | 'manualTest'>('report');

  const [logs, setLogs] = useState<string[]>(['PWND! Board Game — Inicie a Fase de Preparação da Mesa.']);

  const [bots, setBots] = useState<BoardGameBot[]>([
    { id: 'bot-1', name: 'Ninja_Cyber', icon: '🤖', currentNodeId: 'node-ecom-catalog', score: 0 },
    { id: 'bot-2', name: 'Ghost_Hacker', icon: '👾', currentNodeId: 'node-social-feed', score: 0 }
  ]);
  const [gameWinner, setGameWinner] = useState<string | null>(null);

  // REBALANCEAMENTO DA BOUNTY TRACK (VALOR 1:1 CANONICO)
  const bountyTotalCash = playerScore;

  const addLog = (text: string) => {
    const time = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    setLogs(prev => [`[${time}] ${text}`, ...prev.slice(0, 30)]);
  };

  const setMyRole = (role: 'player-1' | 'player-2') => {
    setMyRoleState(role);
    addLog(`Papel fixado no dispositivo: ${role === 'player-1' ? 'Jogador 1 (Verde)' : 'Jogador 2 (Azul)'}`);
  };

  const setGameMode = (mode: 'solo' | 'hotseat' | 'lan') => {
    setGameModeState(mode);
    addLog(`Modo de Jogo alterado para: ${mode.toUpperCase()}`);
  };

  const completeSetup = (archetype: Archetype, program: ProgramCard) => {
    setPlayerArchetype(archetype);
    setPlayerActiveProgram(program);

    const initialHandSize = archetype.id === 'old-guard' ? 8 : 5;
    const initialCards = CARDS_V2.slice(0, initialHandSize);

    // GARANTIA DE 1 Safeguard SUPREMA (0-Day Reserve) NA MÃO INICIAL
    const starterDefuse: CardV2 = {
      id: `defuse-starter-${Date.now()}`,
      name: 'Cofre 0-Day',
      technicalReference: '0-Day Reserve (Defuse)',
      type: 'defuse',
      points: 0,
      rarity: 'Rare',
      icon: '🛡️',
      simpleDescription: 'Safeguard SUPREMA: Salva todas as suas falhas na mesa quando o alarme de Patch Deployed for disparado!'
    };

    setPlayerHand([...initialCards, starterDefuse]);

    setIsSetupWizardOpen(false);
    addLog(`FASE DE PREPARAÇÃO CONCLUÍDA! Arquétipo [${archetype.name}] e Alvo [${program.name}] alocados. Mão inicial contendo 1 Safeguard 0-Day Reserve garantida.`);
  };

  const drawEventCard = () => {
    soundFx.playPatchDeployedAlarm();
    const randEvent = EVENT_CARDS_LIST[Math.floor(Math.random() * EVENT_CARDS_LIST.length)];
    setActiveEventCard(randEvent);
    addLog(`🚨 EVENT CARD DESENHADA DO TABULEIRO: [${randEvent.name}]`);

    if (randEvent.id === 'evt-swag-drop') {
      const toolCards = CARDS_V2.filter(c => c.type === 'tool');
      const randTool = toolCards[Math.floor(Math.random() * toolCards.length)];
      setPlayerHand(prev => [...prev, randTool]);
      addLog(`🎁 BRINDE SWAG DROP: Você recebeu a ferramenta "${randTool.name}" na sua mão!`);
    }
  };

  const closeEventModal = () => {
    setActiveEventCard(null);
  };

  useEffect(() => {
    const unsubscribe = mpSync.subscribe((msg) => {
      if (msg.actionType === 'END_TURN') {
        const nextRole = msg.payload.activePlayerRole;
        const nextTurn = msg.payload.currentTurn;
        setActivePlayerRole(nextRole);
        if (nextTurn) setCurrentTurn(nextTurn);

        soundFx.playClick();
        if (nextRole === myRole) {
          addLog(`🟢 O oponente passou a vez! É A SUA VEZ DE JOGAR!`);
        } else {
          addLog(`⏳ Turno passado. Aguardando a jogada do ${nextRole === 'player-1' ? 'Jogador 1 (Verde)' : 'Jogador 2 (Azul)'}...`);
        }
      }
    });

    return () => unsubscribe();
  }, [myRole]);

  const movePawn = (targetNodeId: string) => {
    if (!isMyTurn) {
      alert('Aguarde a sua vez! É o turno do outro participante.');
      return;
    }

    const currentNode = ALL_BOARD_NODES.find(n => n.id === playerNodeId);
    if (currentNode && currentNode.connectedNodeIds.includes(targetNodeId)) {
      soundFx.playClick();
      setPlayerNodeId(targetNodeId);
      const targetNode = ALL_BOARD_NODES.find(n => n.id === targetNodeId);
      addLog(`Você moveu seu peão para: [${targetNode?.name}] no ${targetNode?.serverName}.`);
    } else {
      addLog('Rota inválida! Escolha um nó conectado ao seu nó atual.');
    }
  };

  const actionVarrer = () => {
    if (!isMyTurn) {
      alert('Aguarde a sua vez! É a jogada do outro participante.');
      return;
    }

    soundFx.playScan();
    const randCard1 = CARDS_V2[Math.floor(Math.random() * CARDS_V2.length)];
    const randCard2 = CARDS_V2[Math.floor(Math.random() * CARDS_V2.length)];

    setPlayerHand(prev => [...prev, randCard1, randCard2].slice(0, playerArchetype.maxHandSize || 7));
    addLog(`AÇÃO DE RECON REALIZADA: Você comprou +2 cartas para sua mão!`);

    finalizeTurnAdvance();
  };

  const actionInfiltrar = (cardId: string) => {
    if (!isMyTurn) {
      alert('Aguarde a sua vez! É a jogada do outro participante.');
      return;
    }

    const card = playerHand.find(c => c.id === cardId);
    if (!card || card.type !== 'exploit') return;

    if (!playerActiveProgram) {
      alert('Você precisa selecionar um programa ativo no Program Market do Tabuleiro Central!');
      return;
    }

    const allowed = playerActiveProgram.allowedClasses;
    if (allowed !== 'ALL' && playerArchetype.id !== 'red-teamer') {
      const cardCategory = card.technicalReference || card.name;
      const isAllowedCategory = Array.isArray(allowed) && allowed.some(cat =>
        cardCategory.toLowerCase().includes(cat.toLowerCase()) ||
        cat.toLowerCase().includes(cardCategory.toLowerCase())
      );

      if (!isAllowedCategory) {
        soundFx.playPatchDeployedAlarm();
        alert(`❌ FALHA FORA DE ESCOPO (Out of Scope)!\n\nO programa [${playerActiveProgram.name}] aceita apenas: ${Array.isArray(allowed) ? allowed.join(', ') : allowed}.\nA carta [${card.name}] não é permitida!`);
        addLog(`❌ REJEITADO: Carta "${card.name}" está fora de escopo no ${playerActiveProgram.name}!`);
        return;
      }
    }

    soundFx.playClick();
    const currentNode = ALL_BOARD_NODES.find(n => n.id === playerNodeId);
    if (!currentNode) return;

    setPlayerHand(prev => prev.filter(c => c.id !== cardId));
    setDeployedExploits(prev => [...prev, { id: Math.random().toString(), nodeId: playerNodeId, card, playerId: myRole }]);
    addLog(`AÇÃO DE EXPLOIT REALIZADA: Carta "${card.name}" armada no nó ${currentNode.name}!`);

    finalizeTurnAdvance();
  };

  const discardCardFromHand = (cardId: string) => {
    const card = playerHand.find(c => c.id === cardId);
    if (!card) return;

    soundFx.playClick();
    setPlayerHand(prev => prev.filter(c => c.id !== cardId));
    addLog(`CARTA DESCARTADA: "${card.name}" foi movida para a pilha de descarte.`);
  };

  const recycleHandCards = (cardId1: string, cardId2: string) => {
    soundFx.playScan();
    const newCard = CARDS_V2[Math.floor(Math.random() * CARDS_V2.length)];

    setPlayerHand(prev => {
      const filtered = prev.filter(c => c.id !== cardId1 && c.id !== cardId2);
      return [...filtered, newCard];
    });

    addLog(`♻️ RECICLAGEM 2:1 REALIZADA: Você descartou 2 cartas e comprou 1 nova carta [${newCard.name}]!`);
  };

  const abandonActiveProgram = () => {
    if (!playerActiveProgram) return;

    soundFx.playClick();
    const prevName = playerActiveProgram.name;
    setPlayerActiveProgram(null);
    addLog(`ALVO DESGARTADO: Você desistiu de [${prevName}]. Escolha um novo alvo no PROGRAM MARKET!`);
  };

  const moveCardToToolsRack = (cardId: string) => {
    if (!isMyTurn) {
      alert('Aguarde a sua vez!');
      return;
    }
    const card = playerHand.find(c => c.id === cardId);
    if (!card || card.type !== 'tool') return;

    if (playerHand.length <= 1) {
      alert('CUSTO INSUFICIENTE: Você precisa descartar 1 carta da mão para descer uma Tool. Mão vazia = não pode instalar!');
      addLog(`❌ Falha ao instalar Tool "${card.name}": Sem cartas para pagar o custo de descarte.`);
      return;
    }

    const confirmDiscard = window.confirm('Instalar uma Tool custa 1 descarte. Clique em OK para instalar e LEMBRE-SE de descartar uma carta manualmente na interface em seguida.');
    if (!confirmDiscard) return;

    soundFx.playClick();
    const initialCharges = card.maxCharges || (card.rarity === 'Epic' || card.rarity === 'Rare' ? 1 : 2);
    const toolWithCharges: CardV2 = { ...card, maxCharges: initialCharges, charges: initialCharges };

    setPlayerHand(prev => prev.filter(c => c.id !== cardId));
    setPlayerActiveTools(prev => [...prev, toolWithCharges].slice(0, 3));
    addLog(`FERRAMENTA ATIVADA: "${card.name}" (${initialCharges} Carga${initialCharges > 1 ? 's' : ''}) colocada no seu Tools Rack! O jogador deve descartar 1 carta da mão como custo.`);
  };

  const moveCardToDefuseSlot = (cardId: string) => {
    if (!isMyTurn) {
      alert('Aguarde a sua vez!');
      return;
    }
    const card = playerHand.find(c => c.id === cardId);
    if (!card || card.type !== 'defuse') return;

    soundFx.playClick();
    setPlayerHand(prev => prev.filter(c => c.id !== cardId));
    addLog(`Safeguard ATIVADA: "Cofre 0-Day" alocado no Slot de Defuse do seu tapete!`);
  };

  const actionReportar = () => {
    if (!isMyTurn) {
      alert('Aguarde a sua vez! É a jogada do outro participante.');
      return;
    }

    const myExploitsInTable = deployedExploits.filter(e => e.playerId === myRole);
    if (myExploitsInTable.length === 0) {
      alert('Você não possui nenhuma falha armada na mesa para reportar!');
      addLog('Nenhuma falha sua implantada na mesa para reportar!');
      return;
    }

    if (currentTurn >= 5 || (playerActiveProgram && playerActiveProgram.flatBountyBonus >= 2000)) {
      if (myExploitsInTable.length < 2) {
        alert('MÍNIMO DE ESCOPO: A partir da Rodada 5 (Alerta Global) OU em programas de Tier Alto/Crítico, é exigido um combo de no mínimo 2 falhas na mesa para submeter o Report!');
        addLog(`Report em ${playerActiveProgram?.name} bloqueado: Faltou complexidade (Min. 2 cartas válidas exigidas).`);
        return;
      }
    }

    setDiceRollReason('report');
    setIsDiceModalOpen(true);
    addLog('AÇÃO DE REPORT INICIADA: Rolando o Dado D8 de Patch e Triagem...');
  };

  const triggerManualDiceRoll = () => {
    setDiceRollReason('manualTest');
    setIsDiceModalOpen(true);
    addLog('TESTE MANUAL: Lançando Dado D8 3D...');
  };

  const getVulnFlatValue = (card: CardV2) => {
    switch (card.rarity) {
      case 'Common': return 1500;
      case 'Uncommon': return 2500;
      case 'Rare': return 4000;
      case 'Epic': return 5000;
      case 'Legendary': return 6000;
      default: return 1500;
    }
  };

  const getProgramFlatBonus = (progName: string = '') => {
    const name = progName.toLowerCase();
    if (name.includes('cloudnine') || name.includes('cryptox') || name.includes('aicore')) return 4000;
    if (name.includes('banksafe') || name.includes('healthlock') || name.includes('paygateway')) return 2500;
    if (name.includes('shopall') || name.includes('socialbee') || name.includes('gameverse') || name.includes('deliverydash')) return 1000;
    return 0; // EduConnect / GovPortal
  };

  const getToolFlatBonus = (tool: CardV2) => {
    const ch = tool.charges ?? (tool.rarity === 'Epic' || tool.rarity === 'Rare' ? 1 : 2);
    if (tool.rarity === 'Epic') return 2000;
    if (tool.rarity === 'Rare') return 1500;
    return ch >= 2 ? 1000 : 500;
  };

  const handleDiceRollResult = (result: { diceValue: number; diceValue2?: number; passed: boolean }) => {
    setIsDiceModalOpen(false);

    if (diceRollReason === 'report') {
      if (result.passed) {
        const myExploitsInTable = deployedExploits.filter(e => e.playerId === myRole);

        // Modelo A: Soma Direta Sem Multiplicação (Zero Calculadora)
        const vulnTotal = myExploitsInTable.reduce((sum, e) => sum + getVulnFlatValue(e.card), 0);
        const programBonus = getProgramFlatBonus(playerActiveProgram?.name);
        const toolTotalBonus = playerActiveTools.reduce((sum, t) => sum + getToolFlatBonus(t), 0);

        let earnedCash = vulnTotal + programBonus + toolTotalBonus;

        if (playerArchetype.id === 'red-teamer') {
          earnedCash = Math.round(earnedCash * 0.8);
        }

        if (earnedCash >= 10000) {
          confetti({ particleCount: 80, spread: 60 });
        }

        const newScore = playerScore + earnedCash;
        setPlayerScore(newScore);
        if (newScore >= 40000) {
          setGameWinner(myRole);
          soundFx.playVictory();
        } else {
          soundFx.playBountyPayout();
        }

        // Consome 1 carga de cada ferramenta no Rack e descarta se chegar a 0
        setPlayerActiveTools(prevTools => {
          return prevTools
            .map(t => {
              const ch = t.charges ?? (t.rarity === 'Epic' || t.rarity === 'Rare' ? 1 : 2);
              return { ...t, charges: ch - 1 };
            })
            .filter(t => t.charges > 0);
        });

        setDeployedExploits(prev => prev.filter(e => e.playerId !== myRole));

        if (playerActiveProgram) {
          setProgramMarket(prevMarket => {
            return prevMarket.map(slotProg => {
              if (slotProg.id === playerActiveProgram.id && programDeck.length > 0) {
                const nextProg = programDeck[0];
                setProgramDeck(prevDeck => prevDeck.slice(1));
                addLog(`REPOSIÇÃO DE MERCADO: Nova carta [${nextProg.name}] entrou no Program Market!`);
                return nextProg;
              }
              return slotProg;
            });
          });
        }

        setPlayerActiveProgram(null);
        addLog(`✅ RELATÓRIO APROVADO NO DADO D8! Você faturou +$${earnedCash.toLocaleString('pt-BR')}!`);
        addLog(`📌 O PREÇO DO SUCESSO: Sacando Carta de Evento obrigatória...`);

        // Mandatory event draw after successful report
        drawEventCard();
        
        // Wait, drawEventCard already calls soundFx and setActiveEventCard which opens the modal.
        // We will call finalizeTurnAdvance from the event modal closing? No, the modal just overlays. 
        // finalizeTurnAdvance() is safe to call, it advances the turn.
        finalizeTurnAdvance();
      } else {
        setPatchAlertModal(true);
        soundFx.playPatchDeployedAlarm();
        addLog(`🚨 PATCH DEPLOYED NO REPORT! O dado D8 tirou ${result.diceValue} e a empresa corrigiu a falha!`);
      }
    } else if (diceRollReason === 'endTurn') {
      if (!result.passed) {
        setPatchAlertModal(true);
        soundFx.playPatchDeployedAlarm();
        addLog(`🚨 PATCH DEPLOYED NO FIM DE RODADA! O dado D8 tirou ${result.diceValue}!`);
      } else {
        addLog(`✓ Dado D8 tirou ${result.diceValue}. Sistema permaneceu vulnerável!`);
        finalizeTurnAdvance();
      }
    } else {
      addLog(`🎲 Teste de Dado D8 concluído. Resultado: ${result.diceValue}`);
    }
  };

  const selectNewProgram = (chosenProgram: ProgramCard) => {
    setPlayerActiveProgram(chosenProgram);
    soundFx.playClick();
    addLog(`NOVO ALVO CORPORATIVO COLETADO: ${chosenProgram.name} alocado no seu tapete!`);
  };

  const endTurn = () => {
    if (!isMyTurn) {
      alert('Aguarde a sua vez para passar o turno!');
      return;
    }

    const myExploitsInTable = deployedExploits.filter(e => e.playerId === myRole);

    if (myExploitsInTable.length > 0) {
      setDiceRollReason('endTurn');
      setIsDiceModalOpen(true);
      addLog('Passando turno com vulnerabilidades na mesa... Rolando Dado D8 3D de Patch Speed!');
    } else {
      finalizeTurnAdvance();
    }
  };

  const defusePatch = () => {
    setPatchAlertModal(false);
    addLog('Safeguard 0-DAY: Seu cofre salvou as falhas contra a correção de emergência!');
    finalizeTurnAdvance();
  };

  const acceptPatch = () => {
    setPatchAlertModal(false);
    setDeployedExploits(prev => prev.filter(e => e.playerId !== myRole));
    const zone = getZoneByBalance(playerScore);
    const penalty = zone.patchPenalty;
    
    setPlayerScore(prev => Math.max(0, prev - penalty));
    addLog(`COLAPSO: PATCH DEPLOYED! limpou suas falhas e deduziu ${penalty} (Zona ${zone.name}) do seu saldo na Bounty Track!`);
    finalizeTurnAdvance();
  };

  // PASSAGEM E AVANÇO DE RODADA (RODADAS 1 A 8)
  const finalizeTurnAdvance = () => {
    const nextRole = activePlayerRole === 'player-1' ? 'player-2' : 'player-1';

    // Se a vez estiver voltando para o Jogador 1, a rodada inteira da mesa concluiu! Incrementa +1 rodada
    const nextRound = nextRole === 'player-1' ? Math.min(8, currentTurn + 1) : currentTurn;

    setActivePlayerRole(nextRole);
    if (nextRole === 'player-1') {
      setCurrentTurn(nextRound);
    }

    mpSync.sendAction('END_TURN', { activePlayerRole: nextRole, currentTurn: nextRound });
    addLog(`Turno finalizado. Próxima vez: ${nextRole === 'player-1' ? 'Jogador 1 (Verde)' : 'Jogador 2 (Azul)'} (Rodada ${nextRound}/8)`);

    // MODO SOLO: EXECUÇÃO AUTOMÁTICA DA JOGADA DOS BOTS IA EM 1.5 SECONDS
    if (gameMode === 'solo' && nextRole === 'player-2') {
      setTimeout(() => {
        setBots(prevBots => {
          return prevBots.map(bot => {
            const randScore = Math.floor(Math.random() * 25) + 10;
            return { ...bot, score: bot.score + randScore };
          });
        });
        addLog(`🤖 IA OPONENTE: Ninja_Cyber concluiu a jogada e coletou bounties!`);

        // Retornar o turno para o Humano e AVANÇAR A RODADA +1
        setTimeout(() => {
          setActivePlayerRole('player-1');
          setCurrentTurn(prevTurn => Math.min(8, prevTurn + 1));
          mpSync.sendAction('END_TURN', { activePlayerRole: 'player-1', currentTurn: currentTurn + 1 });
          addLog(`🟢 RODADA AVANÇOU! É a sua vez na Rodada ${Math.min(8, currentTurn + 1)}/8!`);
        }, 1000);
      }, 1500);
    }
  };

  const resetBoardGame = () => {
    setPlayerNodeId('node-bank-login');
    setPlayerHand([]);
    setPlayerActiveTools([]);
    setPlayerActiveProgram(null);
    setPlayerArchetype(ARCHETYPES[0]);
    setProgramMarket(PROGRAM_CARDS.slice(0, 3));
    setProgramDeck(PROGRAM_CARDS.slice(3));
    setPlayerScore(0);
    setServers(SERVERS_DATA);
    setDeployedExploits([]);
    setCurrentTurn(1);
    setActivePlayerRole('player-1');
    setIsSetupWizardOpen(true);
    setPatchAlertModal(false);
    setIsDiceModalOpen(false);
    setLogs(['Board Game reiniciado!']);
  };

  return (
    <BoardGameContext.Provider
      value={{
        playerNodeId,
        playerHand,
        playerActiveTools,
        playerActiveProgram,
        playerArchetype,
        programMarket,
        playerScore,
        bountyTotalCash,
        gameWinner,
        servers,
        deployedExploits,
        bots,
        currentTurn,

        activePlayerRole,
        myRole,
        isMyTurn,
        gameMode,

        isSetupWizardOpen,
        activeEventCard,

        patchAlertModal,
        alertServerName,
        isDiceModalOpen,
        diceRollReason,
        logs,

        setMyRole,
        setGameMode,
        completeSetup,
        drawEventCard,
        closeEventModal,
        setGameWinner,
        movePawn,
        actionVarrer,
        actionInfiltrar,
        discardCardFromHand,
        recycleHandCards,
        abandonActiveProgram,
        moveCardToToolsRack,
        moveCardToDefuseSlot,
        actionReportar,
        triggerManualDiceRoll,
        selectNewProgram,
        handleDiceRollResult,
        defusePatch,
        acceptPatch,
        endTurn,
        resetBoardGame
      }}
    >
      {children}
    </BoardGameContext.Provider>
  );
};

export const useBoardGame = () => {
  const context = useContext(BoardGameContext);
  if (!context) {
    throw new Error('useBoardGame deve ser usado dentro de um BoardGameProvider');
  }
  return context;
};
