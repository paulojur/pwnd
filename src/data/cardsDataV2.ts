import { ALL_ACTION_CARDS } from './full80DeckData';

export interface CardV2 {
  id: string;
  name: string;
  technicalReference: string;
  type: 'exploit' | 'tool' | 'defuse';
  points: number;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  icon: string;
  simpleDescription: string;
  maxCharges?: number;
  charges?: number;
}

export const getClassBadgeInfo = (techRef: string = '', name: string = '') => {
  const ref = (techRef + ' ' + name).toLowerCase();
  if (ref.includes('injection') || ref.includes('sqli') || ref.includes('xxe') || ref.includes('ssti') || ref.includes('command')) {
    return { code: 'INJ', label: '💉 INJECTION', color: '#f0883e', bg: 'rgba(240, 136, 62, 0.2)' };
  }
  if (ref.includes('access') || ref.includes('idor') || ref.includes('bola') || ref.includes('traversal') || ref.includes('cors') || ref.includes('bfla') || ref.includes('privesc')) {
    return { code: 'BAC', label: '🚪 ACCESS CTRL', color: '#c084fc', bg: 'rgba(192, 132, 252, 0.2)' };
  }
  if (ref.includes('scripting') || ref.includes('xss') || ref.includes('dom')) {
    return { code: 'XSS', label: '🪞 XSS', color: '#f472b6', bg: 'rgba(244, 114, 182, 0.2)' };
  }
  if (ref.includes('auth') || ref.includes('jwt') || ref.includes('stuffing') || ref.includes('session') || ref.includes('oauth') || ref.includes('mfa')) {
    return { code: 'AUTH', label: '🔑 AUTHENTICATION', color: '#eab308', bg: 'rgba(234, 179, 8, 0.2)' };
  }
  if (ref.includes('ssrf') || ref.includes('csrf') || ref.includes('gopher') || ref.includes('metadata')) {
    return { code: 'SSRF', label: '🕵️ SSRF / CSRF', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.2)' };
  }
  if (ref.includes('logic') || ref.includes('race') || ref.includes('coupon') || ref.includes('price') || ref.includes('rounding') || ref.includes('overflow')) {
    return { code: 'LOGIC', label: '⏰ BIZ LOGIC', color: '#2dd4bf', bg: 'rgba(45, 212, 191, 0.2)' };
  }
  if (ref.includes('crypt') || ref.includes('hash') || ref.includes('md5') || ref.includes('cipher') || ref.includes('oracle') || ref.includes('ecb')) {
    return { code: 'CRYPTO', label: '🔒 CRYPTOGRAPHY', color: '#39d353', bg: 'rgba(57, 211, 83, 0.2)' };
  }
  return { code: 'LEGENDARY', label: '💀 LEGENDARY RCE', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.2)' };
};

// EXPORTAÇÃO DO BARALHO OFICIAL COMPLETO DE 95 CARTAS DE AÇÃO (80 VULNERABILIDADES + 12 TOOLS + 3 DEFUSES)
export const CARDS_V2: CardV2[] = ALL_ACTION_CARDS;
