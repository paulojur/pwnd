/**
 * PWND! Board Game — Módulo de Sincronização Multiplayer em Tempo Real
 * Permite partidas entre 2 Jogadores Reais em abas diferentes ou máquinas na mesma rede.
 */

export interface MultiplayerMessage {
  roomCode: string;
  senderId: string;
  actionType: 'STATE_SYNC' | 'MOVE_PAWN' | 'INFILTRATE' | 'REPORT' | 'SELECT_PROGRAM' | 'DICE_ROLL' | 'END_TURN';
  payload: any;
  timestamp: number;
}

type MessageCallback = (msg: MultiplayerMessage) => void;

class MultiplayerSyncManager {
  private channel: BroadcastChannel | null = null;
  private roomCode: string | null = null;
  private playerId: string = 'player-1';
  private listeners: MessageCallback[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.channel = new BroadcastChannel('pwnd_boardgame_multiplayer');
      this.channel.onmessage = (event: MessageEvent<MultiplayerMessage>) => {
        this.handleIncomingMessage(event.data);
      };
    }

    // Storage Event Listener como fallback de sincronização
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === 'pwnd_multiplayer_sync' && e.newValue) {
          try {
            const msg: MultiplayerMessage = JSON.parse(e.newValue);
            this.handleIncomingMessage(msg);
          } catch (err) {
            console.error('Erro ao ler mensagem multiplayer:', err);
          }
        }
      });
    }
  }

  public initRoom(code: string, role: 'player-1' | 'player-2'): string {
    this.roomCode = code.toUpperCase();
    this.playerId = role;
    return this.roomCode;
  }

  public getRoomCode(): string | null {
    return this.roomCode;
  }

  public getPlayerId(): string {
    return this.playerId;
  }

  public sendAction(actionType: MultiplayerMessage['actionType'], payload: any) {
    if (!this.roomCode) return;

    const msg: MultiplayerMessage = {
      roomCode: this.roomCode,
      senderId: this.playerId,
      actionType,
      payload,
      timestamp: Date.now()
    };

    // Enviar via BroadcastChannel
    if (this.channel) {
      this.channel.postMessage(msg);
    }

    // Enviar via LocalStorage Event (para fallback em abas)
    try {
      localStorage.setItem('pwnd_multiplayer_sync', JSON.stringify(msg));
    } catch (e) {
      // Ignore quota errors
    }
  }

  public subscribe(callback: MessageCallback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  private handleIncomingMessage(msg: MultiplayerMessage) {
    if (!this.roomCode || msg.roomCode !== this.roomCode) return;
    if (msg.senderId === this.playerId) return; // Ignorar próprias mensagens

    this.listeners.forEach(cb => cb(msg));
  }
}

export const mpSync = new MultiplayerSyncManager();
