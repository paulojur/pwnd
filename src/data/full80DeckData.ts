import { CardV2 } from './cardsDataV2';

// BARALHO OFICIAL DE 80 VULNERABILIDADES (MATRIZ DO GDD V1.0 PÁGINA 24)
export const FULL_80_VULNERABILITIES: CardV2[] = [
  // --- 1. INJECTION (16 CARTAS: 6 Common, 4 Uncommon, 3 Rare, 2 Epic, 1 Legendary) ---
  {
    id: 'inj-1',
    name: 'Injeção de Boato',
    technicalReference: 'SQL Injection (SQLi)',
    type: 'exploit',
    points: 25,
    rarity: 'Common',
    icon: '🗣️',
    simpleDescription: 'Você cochicha um boato falso no campo de texto e o banco de dados acredita, entregando a lista de senhas.'
  },
  {
    id: 'inj-2',
    name: 'A Injeção da Vovó',
    technicalReference: 'SQL Injection (SQLi)',
    type: 'exploit',
    points: 45,
    rarity: 'Rare',
    icon: '👵',
    simpleDescription: 'OR 1=1 — Entrada de banco de dados clássica. Quando reportada com sucesso, compre 3 cartas do deck.'
  },
  {
    id: 'inj-3',
    name: 'OS Command Input',
    technicalReference: 'OS Command Injection',
    type: 'exploit',
    points: 20,
    rarity: 'Common',
    icon: '💻',
    simpleDescription: 'Insere comandos de sistema operacional em campos de formulários desprotegidos.'
  },
  {
    id: 'inj-4',
    name: 'XML External Entity (XXE)',
    technicalReference: 'XXE Injection',
    type: 'exploit',
    points: 25,
    rarity: 'Common',
    icon: '📜',
    simpleDescription: 'O parser XML lê arquivos do servidor local ao processar notas fiscais digitais.'
  },
  {
    id: 'inj-5',
    name: 'Template Injection (SSTI)',
    technicalReference: 'Server-Side Template Injection',
    type: 'exploit',
    points: 22,
    rarity: 'Common',
    icon: '🎨',
    simpleDescription: 'Comandos executados através de variáveis no motor de templates de e-mail.'
  },
  {
    id: 'inj-6',
    name: 'Header Injection',
    technicalReference: 'HTTP Header Injection',
    type: 'exploit',
    points: 18,
    rarity: 'Common',
    icon: '📑',
    simpleDescription: 'Manipula cabeçalhos HTTP para injetar respostas falsas no navegador do usuário.'
  },
  {
    id: 'inj-7',
    name: 'NoSQL Operator Leak',
    technicalReference: 'NoSQL Injection',
    type: 'exploit',
    points: 30,
    rarity: 'Uncommon',
    icon: '🍃',
    simpleDescription: 'Injeta operadores $gt e $ne no MongoDB bypassando autenticação de usuário.'
  },
  {
    id: 'inj-8',
    name: 'ORM Leakage',
    technicalReference: 'ORM Injection',
    type: 'exploit',
    points: 28,
    rarity: 'Uncommon',
    icon: '🗄️',
    simpleDescription: 'Explora falhas de abstração em queries ORM para vazamento de colunas privadas.'
  },
  {
    id: 'inj-9',
    name: 'XPath Injection',
    technicalReference: 'XPath Injection',
    type: 'exploit',
    points: 26,
    rarity: 'Uncommon',
    icon: '🔍',
    simpleDescription: 'Navega pela árvore XML de dados bancários manipulando parâmetros de pesquisa.'
  },
  {
    id: 'inj-10',
    name: 'LDAP Filter Bypass',
    technicalReference: 'LDAP Injection',
    type: 'exploit',
    points: 32,
    rarity: 'Uncommon',
    icon: '🌲',
    simpleDescription: 'Bypassa autenticação de diretório corporativo Active Directory via filtro wildcard.'
  },
  {
    id: 'inj-11',
    name: 'Blind SQLi via Time',
    technicalReference: 'Time-Based Blind SQLi',
    type: 'exploit',
    points: 40,
    rarity: 'Rare',
    icon: '⏱️',
    simpleDescription: 'Força o banco a pausar por 10 segundos para extrair caracteres de senhas hash.'
  },
  {
    id: 'inj-12',
    name: 'Second-Order Injection',
    technicalReference: 'Second-Order SQLi',
    type: 'exploit',
    points: 38,
    rarity: 'Rare',
    icon: '⏳',
    simpleDescription: 'Injeta payload no perfil do usuário que só é executado no relatório mensal do admin.'
  },
  {
    id: 'inj-13',
    name: 'Automated SQLi Pipeline',
    technicalReference: 'Automated Injection',
    type: 'exploit',
    points: 50,
    rarity: 'Epic',
    icon: '🤖',
    simpleDescription: 'Pipeline automatizado extrai a base de dados inteira com zero intervenção manual.'
  },
  {
    id: 'inj-14',
    name: 'Command Injection Worker',
    technicalReference: 'Async Worker RCE',
    type: 'exploit',
    points: 48,
    rarity: 'Epic',
    icon: '⚙️',
    simpleDescription: 'Injeta comandos no processador assíncrono de conversão de PDFs corporativos.'
  },
  {
    id: 'inj-15',
    name: 'Zero-Day SQLi Master',
    technicalReference: 'Critical Database Takeover',
    type: 'exploit',
    points: 55,
    rarity: 'Legendary',
    icon: '💥',
    simpleDescription: 'Acesso root à instância mestra do banco relacional de dados bancários.'
  },
  {
    id: 'inj-16',
    name: 'DLL Injection Pipeline',
    technicalReference: 'DLL Search Order Hijacking',
    type: 'exploit',
    points: 20,
    rarity: 'Common',
    icon: '🔌',
    simpleDescription: 'Carrega bibliotecas DLL maliciosas no caminho de execução do software legado.'
  },

  // --- 2. BROKEN ACCESS CONTROL (14 CARTAS: 5 Common, 4 Uncommon, 3 Rare, 1 Epic, 1 Legendary) ---
  {
    id: 'bac-1',
    name: 'Porta Escancarada',
    technicalReference: 'Insecure Direct Object Reference (IDOR)',
    type: 'exploit',
    points: 20,
    rarity: 'Common',
    icon: '🚪',
    simpleDescription: 'Você muda o número no final do endereço do site (de /usuario/10 para /usuario/1) e entra na conta do diretor.'
  },
  {
    id: 'bac-2',
    name: 'O Plebeu Privilegiado',
    technicalReference: 'Privilege Escalation (PrivEsc)',
    type: 'exploit',
    points: 25,
    rarity: 'Common',
    icon: '👑',
    simpleDescription: 'Estagiário altera parâmetro de perfil no request e vira administrador do sistema.'
  },
  {
    id: 'bac-3',
    name: 'Path Traversal',
    technicalReference: 'Directory Traversal',
    type: 'exploit',
    points: 22,
    rarity: 'Common',
    icon: '📁',
    simpleDescription: 'Usa ../../../etc/passwd no parâmetro de imagem para baixar arquivos do servidor.'
  },
  {
    id: 'bac-4',
    name: 'CORS Misconfiguration',
    technicalReference: 'Cross-Origin Resource Sharing',
    type: 'exploit',
    points: 18,
    rarity: 'Common',
    icon: '🌐',
    simpleDescription: 'Configuração Access-Control-Allow-Origin: * vazando dados privados de usuários.'
  },
  {
    id: 'bac-5',
    name: 'Insecure Direct Pointer',
    technicalReference: 'Direct Resource Leak',
    type: 'exploit',
    points: 20,
    rarity: 'Common',
    icon: '📍',
    simpleDescription: 'URLs de download de faturas em PDF expostas publicamente sem chave de checagem.'
  },
  {
    id: 'bac-6',
    name: 'BOLA no Ângulo',
    technicalReference: 'Broken Object Level Auth (BOLA)',
    type: 'exploit',
    points: 32,
    rarity: 'Uncommon',
    icon: '⚽',
    simpleDescription: 'Troca o ID do objeto na chamada REST da API mobile para consultar dados de terceiros.'
  },
  {
    id: 'bac-7',
    name: 'BFLA (Function Level)',
    technicalReference: 'Broken Function Level Auth',
    type: 'exploit',
    points: 30,
    rarity: 'Uncommon',
    icon: '🛠️',
    simpleDescription: 'Acessa o botão /admin/delete_all_users que esqueceu de verificar o token de sessão.'
  },
  {
    id: 'bac-8',
    name: 'Tenant Data Leak',
    technicalReference: 'Multi-Tenant Isolation Bypass',
    type: 'exploit',
    points: 35,
    rarity: 'Uncommon',
    icon: '🏢',
    simpleDescription: 'Bypassa isolamento de empresas na nuvem acessando dados de organizações vizinhas.'
  },
  {
    id: 'bac-9',
    name: 'Hardcoded Admin Route',
    technicalReference: 'Unprotected Admin Route',
    type: 'exploit',
    points: 28,
    rarity: 'Uncommon',
    icon: '🔑',
    simpleDescription: 'Rota oculta /management/dashboard disponível sem exigência de login.'
  },
  {
    id: 'bac-10',
    name: 'PrivEsc via JWT Claim',
    technicalReference: 'JWT Role Manipulation',
    type: 'exploit',
    points: 42,
    rarity: 'Rare',
    icon: '📜',
    simpleDescription: 'Altera o campo "role": "user" para "role": "superadmin" no token assinado fracamente.'
  },
  {
    id: 'bac-11',
    name: 'Mass Assignment Flaw',
    technicalReference: 'Mass Assignment / Auto-Binding',
    type: 'exploit',
    points: 38,
    rarity: 'Rare',
    icon: '📦',
    simpleDescription: 'Envia "is_verified": true no formulário de cadastro e ganha selo de conta oficial.'
  },
  {
    id: 'bac-12',
    name: 'IDOR em Relatórios',
    technicalReference: 'Bulk Export IDOR',
    type: 'exploit',
    points: 40,
    rarity: 'Rare',
    icon: '📊',
    simpleDescription: 'Baixa a lista de exportação completa de relatórios financeiros de todas as empresas.'
  },
  {
    id: 'bac-13',
    name: 'Bypass Completo de ACL',
    technicalReference: 'Global Authorization Bypass',
    type: 'exploit',
    points: 48,
    rarity: 'Epic',
    icon: '🛡️',
    simpleDescription: 'Anula totalmente a camada de controle de acesso de microsserviços na nuvem.'
  },
  {
    id: 'bac-14',
    name: 'Master Admin Hijack',
    technicalReference: 'Root Organization Takeover',
    type: 'exploit',
    points: 58,
    rarity: 'Legendary',
    icon: '👑',
    simpleDescription: 'Assume o controle total do painel de administração da matriz global da empresa.'
  },

  // --- 3. CROSS-SITE SCRIPTING (12 CARTAS: 5 Common, 4 Uncommon, 2 Rare, 1 Epic, 0 Legendary) ---
  {
    id: 'xss-1',
    name: 'Espelho Falso',
    technicalReference: 'Cross-Site Scripting (Reflected XSS)',
    type: 'exploit',
    points: 20,
    rarity: 'Common',
    icon: '🪞',
    simpleDescription: 'Você coloca um espelho na tela do usuário. Quando ele clica, está na verdade enviando o código para você.'
  },
  {
    id: 'xss-2',
    name: 'O Labirinto de Espelhos',
    technicalReference: 'DOM-based XSS',
    type: 'exploit',
    points: 22,
    rarity: 'Common',
    icon: '🌀',
    simpleDescription: 'DOM-based XSS encadeado em rotas dinâmicas do Single Page App.'
  },
  {
    id: 'xss-3',
    name: 'Reflected XSS em Busca',
    technicalReference: 'Reflected XSS',
    type: 'exploit',
    points: 18,
    rarity: 'Common',
    icon: '🔎',
    simpleDescription: 'Injeta script malicioso no campo de busca que é refletido sem sanitização na página.'
  },
  {
    id: 'xss-4',
    name: 'DOM XSS via Hash',
    technicalReference: 'DOM Manipulation XSS',
    type: 'exploit',
    points: 20,
    rarity: 'Common',
    icon: '⚓',
    simpleDescription: 'Manipula window.location.hash para executar código JavaScript na leitura do elemento.'
  },
  {
    id: 'xss-5',
    name: 'HTML Payload Injection',
    technicalReference: 'HTML Injection',
    type: 'exploit',
    points: 15,
    rarity: 'Common',
    icon: '🏷️',
    simpleDescription: 'Injeta tags <h1> e <iframe> falsas na tela de login de usuários leigos.'
  },
  {
    id: 'xss-6',
    name: 'Stored XSS em Comentários',
    technicalReference: 'Stored XSS',
    type: 'exploit',
    points: 30,
    rarity: 'Uncommon',
    icon: '💬',
    simpleDescription: 'Salva um script no fórum de suporte que infecta qualquer pessoa que leia o post.'
  },
  {
    id: 'xss-7',
    name: 'XSS via Upload SVG',
    technicalReference: 'SVG File Upload XSS',
    type: 'exploit',
    points: 28,
    rarity: 'Uncommon',
    icon: '🖼️',
    simpleDescription: 'Sobe uma imagem de perfil em formato SVG contendo código JavaScript embutido.'
  },
  {
    id: 'xss-8',
    name: 'Attribute Breakout',
    technicalReference: 'Attribute Injection XSS',
    type: 'exploit',
    points: 25,
    rarity: 'Uncommon',
    icon: '✂️',
    simpleDescription: 'Escapa da aspa do atributo input com " onfocus="alert(1) e dispara a falha.'
  },
  {
    id: 'xss-9',
    name: 'Markdown Script Exec',
    technicalReference: 'Markdown Parser XSS',
    type: 'exploit',
    points: 32,
    rarity: 'Uncommon',
    icon: '📝',
    simpleDescription: 'Explora o interpretador de Markdown na caixa de texto do editor de chamados.'
  },
  {
    id: 'xss-10',
    name: 'O Espelho Narcisista',
    technicalReference: 'Reflected XSS Advanced',
    type: 'exploit',
    points: 40,
    rarity: 'Rare',
    icon: '🪞',
    simpleDescription: 'Se jogado com a ferramenta Browser ativa, duplica a compra de cartas na ação Recon.'
  },
  {
    id: 'xss-11',
    name: 'Blind XSS no Admin',
    technicalReference: 'Blind Stored XSS',
    type: 'exploit',
    points: 42,
    rarity: 'Rare',
    icon: '🙈',
    simpleDescription: 'Executa código oculto no painel interno de triagem usado exclusivamente pelos administradores.'
  },
  {
    id: 'xss-12',
    name: 'WebSocket Session Hijack',
    technicalReference: 'WebSocket XSS Hijack',
    type: 'exploit',
    points: 48,
    rarity: 'Epic',
    icon: '⚡',
    simpleDescription: 'Rouba tokens de sessão em tempo real através do canal aberto de WebSockets.'
  },

  // --- 4. AUTHENTICATION & SESSION FLAWS (10 CARTAS: 4 Common, 3 Uncommon, 2 Rare, 1 Epic, 0 Legendary) ---
  {
    id: 'auth-1',
    name: 'Chave Mestra',
    technicalReference: 'Authentication Bypass',
    type: 'exploit',
    points: 30,
    rarity: 'Common',
    icon: '🔑',
    simpleDescription: 'Você descobre uma brecha na catraca e entra direto sem precisar digitar senha ou mostrar documento.'
  },
  {
    id: 'auth-2',
    name: 'Cookie Unsigned',
    technicalReference: 'Cookie Tampering',
    type: 'exploit',
    points: 18,
    rarity: 'Common',
    icon: '🍪',
    simpleDescription: 'Modifica o valor admin=false para admin=true no cookie do navegador sem assinatura.'
  },
  {
    id: 'auth-3',
    name: 'Reset Token Previsível',
    technicalReference: 'Weak Reset Token',
    type: 'exploit',
    points: 22,
    rarity: 'Common',
    icon: '⏳',
    simpleDescription: 'O token de redefinição de senha usa a hora exata em segundos e é facilmente adivinhado.'
  },
  {
    id: 'auth-4',
    name: 'Remember Me Leak',
    technicalReference: 'Persistent Session Leak',
    type: 'exploit',
    points: 20,
    rarity: 'Common',
    icon: '📌',
    simpleDescription: 'O token de "Lembrar de Mim" nunca expira e permite reuso infinito de sessão.'
  },
  {
    id: 'auth-5',
    name: 'A Porta dos Fundos',
    technicalReference: 'Authentication Bypass (JWT None)',
    type: 'exploit',
    points: 35,
    rarity: 'Uncommon',
    icon: '🚪',
    simpleDescription: 'Altera o algoritmo do cabeçalho JWT para "none" e entra sem digitar senha.'
  },
  {
    id: 'auth-6',
    name: 'Credential Stuffing',
    technicalReference: 'Automated Account Takeover',
    type: 'exploit',
    points: 32,
    rarity: 'Uncommon',
    icon: '🤖',
    simpleDescription: 'Testa vazamentos de senhas conhecidas em massa contra a tela de login.'
  },
  {
    id: 'auth-7',
    name: 'OAuth State Poisoning',
    technicalReference: 'OAuth CSRF / State Fixation',
    type: 'exploit',
    points: 28,
    rarity: 'Uncommon',
    icon: '🔗',
    simpleDescription: 'Omite o parâmetro state no login via redes sociais para vincular a conta da vítima.'
  },
  {
    id: 'auth-8',
    name: 'MFA Race Condition',
    technicalReference: 'Multi-Factor Auth Bypass',
    type: 'exploit',
    points: 40,
    rarity: 'Rare',
    icon: '📱',
    simpleDescription: 'Bypassa a verificação de código SMS de 2 fatores enviando requisições em paralelo.'
  },
  {
    id: 'auth-9',
    name: 'JWT Signature None',
    technicalReference: 'Alg None JWT Attack',
    type: 'exploit',
    points: 42,
    rarity: 'Rare',
    icon: '🔓',
    simpleDescription: 'Anula a validação da assinatura digital do token JWT corporativo.'
  },
  {
    id: 'auth-10',
    name: 'SSO Hijacking Master',
    technicalReference: 'SAML Response Tampering',
    type: 'exploit',
    points: 50,
    rarity: 'Epic',
    icon: '🏢',
    simpleDescription: 'Falsifica respostas SAML/Single Sign-On assumindo o controle de qualquer usuário da empresa.'
  },

  // --- 5. SSRF / CSRF (8 CARTAS: 3 Common, 2 Uncommon, 2 Rare, 1 Epic, 0 Legendary) ---
  {
    id: 'ssrf-1',
    name: 'O Espião Interno',
    technicalReference: 'Server-Side Request Forgery (SSRF)',
    type: 'exploit',
    points: 35,
    rarity: 'Common',
    icon: '🕵️',
    simpleDescription: 'Você convence o servidor da recepção a dar uma voltinha no porão secreto da empresa e trazer fotos dos arquivos.'
  },
  {
    id: 'ssrf-2',
    name: 'CSRF em Ações Críticas',
    technicalReference: 'Cross-Site Request Forgery',
    type: 'exploit',
    points: 20,
    rarity: 'Common',
    icon: '📩',
    simpleDescription: 'Faz o usuário transferir saldo ao clicar em um link malicioso sem token CSRF.'
  },
  {
    id: 'ssrf-3',
    name: 'Internal Port Scanner',
    technicalReference: 'Network Scanning via SSRF',
    type: 'exploit',
    points: 22,
    rarity: 'Common',
    icon: '📡',
    simpleDescription: 'Usa o campo de upload de avatar para mapear portas abertas na rede interna da empresa.'
  },
  {
    id: 'ssrf-4',
    name: 'Fantasma na Máquina',
    technicalReference: 'SSRF via Webhook',
    type: 'exploit',
    points: 32,
    rarity: 'Uncommon',
    icon: '👻',
    simpleDescription: 'O webhook de notificação enviou a chave de API interna de volta para você.'
  },
  {
    id: 'ssrf-5',
    name: 'Cloud Metadata Leak',
    technicalReference: 'AWS EC2 Metadata SSRF',
    type: 'exploit',
    points: 38,
    rarity: 'Uncommon',
    icon: '☁️',
    simpleDescription: 'Acessa http://169.254.169.254 e obtém credenciais temporárias do servidor AWS.'
  },
  {
    id: 'ssrf-6',
    name: 'DNS Rebinding Attack',
    technicalReference: 'DNS Rebinding Bypass',
    type: 'exploit',
    points: 40,
    rarity: 'Rare',
    icon: '🔄',
    simpleDescription: 'Altera o IP de resposta do servidor DNS para bypassar a lista negra de IPs locais.'
  },
  {
    id: 'ssrf-7',
    name: 'Out-of-band SSRF',
    technicalReference: 'OOB Interaction SSRF',
    type: 'exploit',
    points: 42,
    rarity: 'Rare',
    icon: '📡',
    simpleDescription: 'Força o servidor a realizar requisições externas capturadas pelo Burp Collaborator.'
  },
  {
    id: 'ssrf-8',
    name: 'Redis Unauth via Gopher',
    technicalReference: 'Gopher SSRF to Redis RCE',
    type: 'exploit',
    points: 52,
    rarity: 'Epic',
    icon: '⚡',
    simpleDescription: 'Usa protocolo Gopher via SSRF para gravar chave SSH no servidor Redis interno.'
  },

  // --- 6. BUSINESS LOGIC ERRORS (8 CARTAS: 3 Common, 2 Uncommon, 2 Rare, 1 Epic, 0 Legendary) ---
  {
    id: 'bl-1',
    name: 'O Relógio Quebrado',
    technicalReference: 'Business Logic Error',
    type: 'exploit',
    points: 20,
    rarity: 'Common',
    icon: '⏰',
    simpleDescription: 'Você descobre que se clicar no botão de confirmação exatamente na virada do minuto, o sistema não cobra o valor.'
  },
  {
    id: 'bl-2',
    name: 'Preço Negativo na Carteira',
    technicalReference: 'Negative Amount Logic Flaw',
    type: 'exploit',
    points: 22,
    rarity: 'Common',
    icon: '💸',
    simpleDescription: 'Adiciona quantidade -5 de um produto no carrinho de compras e faz a loja pagar você.'
  },
  {
    id: 'bl-3',
    name: 'Coupon Stacking Exploit',
    technicalReference: 'Coupon Reuse Logic',
    type: 'exploit',
    points: 18,
    rarity: 'Common',
    icon: '🎟️',
    simpleDescription: 'Aplica o cupom de 10% de desconto 10 vezes seguidas até o produto sair de graça.'
  },
  {
    id: 'bl-4',
    name: 'Glicor por um Fio',
    technicalReference: 'Race Condition',
    type: 'exploit',
    points: 30,
    rarity: 'Uncommon',
    icon: '🧪',
    simpleDescription: 'Você clica no botão de saque 50 vezes no mesmo segundo antes do banco perceber que o saldo acabou.'
  },
  {
    id: 'bl-5',
    name: 'Rounding Error Overflow',
    technicalReference: 'Floating Point Currency Flaw',
    type: 'exploit',
    points: 28,
    rarity: 'Uncommon',
    icon: '🧮',
    simpleDescription: 'Arredondamento de frações de centavos acumuladas em transações bancárias.'
  },
  {
    id: 'bl-6',
    name: 'Infinite Trial Loop',
    technicalReference: 'Subscription Logic Bypass',
    type: 'exploit',
    points: 38,
    rarity: 'Rare',
    icon: '🔄',
    simpleDescription: 'Cancela e reativa a avaliação gratuita no último segundo mantendo acesso premium infinito.'
  },
  {
    id: 'bl-7',
    name: 'Cart Quantity Overflow',
    technicalReference: 'Integer Overflow in Cart',
    type: 'exploit',
    points: 40,
    rarity: 'Rare',
    icon: '🛒',
    simpleDescription: 'Estoura o número inteiro de itens no carrinho fazendo o valor total virar negativo.'
  },
  {
    id: 'bl-8',
    name: 'Unverified Transfer Duplication',
    technicalReference: 'State Machine Duplication',
    type: 'exploit',
    points: 50,
    rarity: 'Epic',
    icon: '🏦',
    simpleDescription: 'Duplica transferências bancárias em lote manipulando o estado da transação.'
  },

  // --- 7. CRYPTOGRAPHIC FAILURES (6 CARTAS: 2 Common, 2 Uncommon, 1 Rare, 1 Epic, 0 Legendary) ---
  {
    id: 'crypto-1',
    name: 'Cadeado de Papel',
    technicalReference: 'Weak Cryptography (MD5 / Single Hash)',
    type: 'exploit',
    points: 15,
    rarity: 'Common',
    icon: '🔒',
    simpleDescription: 'A empresa trancou os segredos com uma senha boba tipo "123456" que você descobre em 2 segundos.'
  },
  {
    id: 'crypto-2',
    name: 'Criptografia de Pão Duro',
    technicalReference: 'Weak Hash / No Salt',
    type: 'exploit',
    points: 18,
    rarity: 'Common',
    icon: '🥖',
    simpleDescription: 'Senhas salvas em tabela MD5 sem salt que são encontradas instantaneamente na internet.'
  },
  {
    id: 'crypto-3',
    name: 'Hardcoded Private Key',
    technicalReference: 'Embedded Secret Key',
    type: 'exploit',
    points: 28,
    rarity: 'Uncommon',
    icon: '🔑',
    simpleDescription: 'A chave privada RSA de produção estava salva dentro do código JavaScript do frontend.'
  },
  {
    id: 'crypto-4',
    name: 'Cleartext Sensitive Data',
    technicalReference: 'Insecure Data Transmission',
    type: 'exploit',
    points: 26,
    rarity: 'Uncommon',
    icon: '🔓',
    simpleDescription: 'Dados de cartão de crédito trafegando sem criptografia TLS via HTTP puro.'
  },
  {
    id: 'crypto-5',
    name: 'Padding Oracle Attack',
    technicalReference: 'CBC Padding Oracle',
    type: 'exploit',
    points: 40,
    rarity: 'Rare',
    icon: '🔮',
    simpleDescription: 'Decodifica mensagens cifradas analisando as respostas de erro de padding do servidor.'
  },
  {
    id: 'crypto-6',
    name: 'ECB Mode Key Leak',
    technicalReference: 'AES ECB Pattern Leak',
    type: 'exploit',
    points: 48,
    rarity: 'Epic',
    icon: '🐧',
    simpleDescription: 'Criptografia AES no modo ECB que preserva o padrão visual dos dados confidenciais.'
  },

  // --- 8. LEGENDARY / MULTI-STAGE EXPLOITS (6 CARTAS: 0 Common, 1 Uncommon, 1 Rare, 1 Epic, 3 Legendary) ---
  {
    id: 'leg-1',
    name: 'Chain Attack Alpha',
    technicalReference: 'Multi-Stage Chained Exploit',
    type: 'exploit',
    points: 30,
    rarity: 'Uncommon',
    icon: '🔗',
    simpleDescription: 'Combina um XSS refletido com um IDOR para roubar o token de acesso do administrador.'
  },
  {
    id: 'leg-2',
    name: 'Chain Attack Beta',
    technicalReference: 'SSRF to Internal Admin Chain',
    type: 'exploit',
    points: 42,
    rarity: 'Rare',
    icon: '⚙️',
    simpleDescription: 'Encadeia um SSRF local para acessar o console interno de gerenciamento de contêineres.'
  },
  {
    id: 'leg-3',
    name: 'Spring4Shell RCE',
    technicalReference: 'Remote Code Execution (RCE)',
    type: 'exploit',
    points: 50,
    rarity: 'Epic',
    icon: '🌱',
    simpleDescription: 'Explora vulnerabilidade no framework Java Spring para executar comandos no servidor de produção.'
  },
  {
    id: 'leg-4',
    name: 'Controle Remoto Total',
    technicalReference: 'Remote Code Execution (RCE)',
    type: 'exploit',
    points: 50,
    rarity: 'Legendary',
    icon: '🎮',
    simpleDescription: 'O prêmio supremo! Você assume o controle total do computador da empresa como se estivesse sentado na cadeira deles.'
  },
  {
    id: 'leg-5',
    name: 'Boneco de Marionete',
    technicalReference: 'Remote Code Execution (RCE root)',
    type: 'exploit',
    points: 52,
    rarity: 'Legendary',
    icon: '🧸',
    simpleDescription: 'Mãos etéreas controlando o rack de servidores. Ao ser reportada, força oponentes a descartarem Tools.'
  },
  {
    id: 'leg-6',
    name: 'Deserialização Macabra',
    technicalReference: 'Log4Shell / Java Deserialization',
    type: 'exploit',
    points: 55,
    rarity: 'Legendary',
    icon: '💀',
    simpleDescription: 'Log4Shell! Chamas de código consumindo a infraestrutura de nuvem com RCE instantâneo.'
  }
];

// --- 12 TOOL CARDS (SEÇÃO 5.2 E 10 DO MANUAL) ---
export const FULL_12_TOOLS: CardV2[] = [
  {
    id: 'tool-burp-1',
    name: 'Canivete Suíço Hacker',
    technicalReference: 'Burp Suite Pro',
    type: 'tool',
    points: 0,
    rarity: 'Epic',
    icon: '🧰',
    simpleDescription: 'FERRAMENTA CORINGA: Substitui qualquer equipamento necessário para colocar um Exploit no tabuleiro.'
  },
  {
    id: 'tool-burp-2',
    name: 'Burp Suite Pro',
    technicalReference: 'Burp Suite Pro',
    type: 'tool',
    points: 0,
    rarity: 'Epic',
    icon: '🧰',
    simpleDescription: 'FERRAMENTA CORINGA UNIVERSAL: Atua como substituto de qualquer ferramenta específica.'
  },
  {
    id: 'tool-nmap-1',
    name: 'Nmap + ffuf',
    technicalReference: 'Network & Fuzzing Scanner',
    type: 'tool',
    points: 0,
    rarity: 'Common',
    icon: '📡',
    simpleDescription: 'PASSIVA: Concede +1 carta adicional na execução da ação de Recon (compara 3 cartas em vez de 2).'
  },
  {
    id: 'tool-nmap-2',
    name: 'Nmap + ffuf',
    technicalReference: 'Network & Fuzzing Scanner',
    type: 'tool',
    points: 0,
    rarity: 'Common',
    icon: '📡',
    simpleDescription: 'PASSIVA: Aumenta sua capacidade de varredura no Recon para comprar 3 cartas.'
  },
  {
    id: 'tool-zap',
    name: 'OWASP ZAP',
    technicalReference: 'Automated Vulnerability Scanner',
    type: 'tool',
    points: 0,
    rarity: 'Common',
    icon: '⚡',
    simpleDescription: 'ATIVA: Zera o custo de ferramentas para vulnerabilidades de severidade Low e Medium.'
  },
  {
    id: 'tool-postman',
    name: 'Postman API Suite',
    technicalReference: 'API Testing Environment',
    type: 'tool',
    points: 0,
    rarity: 'Common',
    icon: '🚀',
    simpleDescription: 'ATIVA: Reduz o custo de ativação de falhas da classe Broken Access Control em 1 recurso.'
  },
  {
    id: 'tool-devtools-1',
    name: 'Lupa de Varredura',
    technicalReference: 'Browser DevTools',
    type: 'tool',
    points: 0,
    rarity: 'Common',
    icon: '🔍',
    simpleDescription: 'PASSIVA: Dobra o valor da recompensa obtida em cartas da categoria XSS e DOM Manipulation.'
  },
  {
    id: 'tool-devtools-2',
    name: 'Browser DevTools',
    technicalReference: 'Browser DevTools',
    type: 'tool',
    points: 0,
    rarity: 'Common',
    icon: '🔍',
    simpleDescription: 'PASSIVA: Amplificador de vulnerabilidades client-side no navegador.'
  },
  {
    id: 'tool-sqlmap',
    name: 'SQLMap Automator',
    technicalReference: 'Database Injection Tool',
    type: 'tool',
    points: 0,
    rarity: 'Uncommon',
    icon: '🛢️',
    simpleDescription: 'ATIVA: Zera o custo de ferramentas para qualquer vulnerabilidade da classe Injection.'
  },
  {
    id: 'tool-collaborator',
    name: 'Burp Collaborator',
    technicalReference: 'Out-of-band Auditor',
    type: 'tool',
    points: 0,
    rarity: 'Rare',
    icon: '📡',
    simpleDescription: 'PASSIVA: Resgata 1 carta de ferramenta do descarte toda vez que um oponente reportar SSRF.'
  },
  {
    id: 'tool-cyberchef',
    name: 'CyberChef',
    technicalReference: 'Cyber Swiss Army Knife',
    type: 'tool',
    points: 0,
    rarity: 'Uncommon',
    icon: '🍳',
    simpleDescription: 'ATIVA: Permite converter 2 cartas de ferramentas descartadas em 1 ferramenta da sua escolha.'
  },
  {
    id: 'tool-jwt-tool',
    name: 'JWT Tool',
    technicalReference: 'Token Engineering Harness',
    type: 'tool',
    points: 0,
    rarity: 'Uncommon',
    icon: '🔐',
    simpleDescription: 'PASSIVA: Vulnerabilidades da categoria Authentication concedem +50% de bônus financeiro.'
  }
];

// --- 10 DEFUSE CARDS NO DECK (8 Bypasses + 2 CVE Protections) ---
export const FULL_3_DEFUSES: CardV2[] = [
  {
    id: 'defuse-deck-1',
    name: 'Safeguard (Bypass)',
    technicalReference: 'Bypass Card',
    type: 'defuse',
    points: 0,
    rarity: 'Rare',
    icon: '🛡️',
    simpleDescription: 'Safeguard SUPREMA: Anula o efeito destrutivo do Patch Deployed e mantém suas cartas no tabuleiro.'
  },
  {
    id: 'defuse-deck-2',
    name: 'Safeguard (Bypass)',
    technicalReference: 'Bypass Card',
    type: 'defuse',
    points: 0,
    rarity: 'Rare',
    icon: '🛡️',
    simpleDescription: 'Safeguard SUPREMA: Anula o efeito destrutivo do Patch Deployed e mantém suas cartas no tabuleiro.'
  },
  {
    id: 'defuse-deck-3',
    name: 'Safeguard (Bypass)',
    technicalReference: 'Bypass Card',
    type: 'defuse',
    points: 0,
    rarity: 'Rare',
    icon: '🛡️',
    simpleDescription: 'Safeguard SUPREMA: Anula o efeito destrutivo do Patch Deployed e mantém suas cartas no tabuleiro.'
  },
  {
    id: 'defuse-deck-4',
    name: 'Safeguard (Bypass)',
    technicalReference: 'Bypass Card',
    type: 'defuse',
    points: 0,
    rarity: 'Rare',
    icon: '🛡️',
    simpleDescription: 'Safeguard SUPREMA: Anula o efeito destrutivo do Patch Deployed e mantém suas cartas no tabuleiro.'
  },
  {
    id: 'defuse-deck-5',
    name: 'Safeguard (Bypass)',
    technicalReference: 'Bypass Card',
    type: 'defuse',
    points: 0,
    rarity: 'Rare',
    icon: '🛡️',
    simpleDescription: 'Safeguard SUPREMA: Anula o efeito destrutivo do Patch Deployed e mantém suas cartas no tabuleiro.'
  },
  {
    id: 'defuse-deck-6',
    name: 'Safeguard (Bypass)',
    technicalReference: 'Bypass Card',
    type: 'defuse',
    points: 0,
    rarity: 'Rare',
    icon: '🛡️',
    simpleDescription: 'Safeguard SUPREMA: Anula o efeito destrutivo do Patch Deployed e mantém suas cartas no tabuleiro.'
  },
  {
    id: 'defuse-deck-7',
    name: 'Safeguard (Bypass)',
    technicalReference: 'Bypass Card',
    type: 'defuse',
    points: 0,
    rarity: 'Rare',
    icon: '🛡️',
    simpleDescription: 'Safeguard SUPREMA: Anula o efeito destrutivo do Patch Deployed e mantém suas cartas no tabuleiro.'
  },
  {
    id: 'defuse-deck-8',
    name: 'Safeguard (Bypass)',
    technicalReference: 'Bypass Card',
    type: 'defuse',
    points: 0,
    rarity: 'Rare',
    icon: '🛡️',
    simpleDescription: 'Safeguard SUPREMA: Anula o efeito destrutivo do Patch Deployed e mantém suas cartas no tabuleiro.'
  },
  {
    id: 'defuse-deck-9',
    name: 'CVE Assignment Protection',
    technicalReference: 'CVE Assignment (Defuse)',
    type: 'defuse',
    points: 0,
    rarity: 'Uncommon',
    icon: '📜',
    simpleDescription: 'PROTEÇÃO DE ESCOPO (uso único): Reativa. Anula a penalidade de 10% do Duplicate Report! no seu Report, bem como os Eventos Duplicate Report!, Out of Scope e DNS Hijack direcionados a você. Descarta ao ser usada. Não protege contra PATCH DEPLOYED!.'
  },
  {
    id: 'defuse-deck-10',
    name: 'CVE Assignment Protection',
    technicalReference: 'CVE Assignment (Defuse)',
    type: 'defuse',
    points: 0,
    rarity: 'Uncommon',
    icon: '📜',
    simpleDescription: 'PROTEÇÃO DE ESCOPO (uso único): Reativa. Anula a penalidade de 10% do Duplicate Report! no seu Report, bem como os Eventos Duplicate Report!, Out of Scope e DNS Hijack direcionados a você. Descarta ao ser usada. Não protege contra PATCH DEPLOYED!.'
  }
];

// COMBINAÇÃO TOTAL DO BARALHO DE AÇÃO (80 VULNS + 36 TOOLS + 10 SAFEGUARDS = 126 CARTAS TOTAIS NA CAIXA / 120 NO DECK)
export const ALL_ACTION_CARDS: CardV2[] = [
  ...FULL_80_VULNERABILITIES,
  ...FULL_12_TOOLS,
  ...FULL_12_TOOLS.map(t => ({ ...t, id: t.id + '-c2' })),
  ...FULL_12_TOOLS.map(t => ({ ...t, id: t.id + '-c3' })),
  ...FULL_3_DEFUSES
];
