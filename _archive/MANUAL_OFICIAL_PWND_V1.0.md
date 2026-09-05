# 📖 PWND! — BUG BOUNTY CHAOS
## MANUAL DE REGRAS OFICIAL DO SISTEMA DE JOGO (V1.0)
*PWND! Game Development Studio • Regras Completas, Componentes, Guia Visual, Tabelas e FAQ*

> *"Find it. Report it. Get paid."*  
> **Data da Edição**: 01 de Setembro de 2026 | **Versão**: 1.0 Oficial Tabletop Edition

---

## 📑 SUMÁRIO INTEGRAL DAS 16 SEÇÕES

1. [Componentes do Jogo](#1-componentes-do-jogo)
2. [Objetivo do Jogo & Condição de Vitória](#2-objetivo-do-jogo--condição-de-vitória)
3. [Preparação da Mesa (Setup Passo a Passo 3.1 a 3.7)](#3-preparação-da-mesa-setup-passo-a-passo-31-a-37)
4. [Estrutura da Partida & Escala de Jogadores](#4-estrutura-da-partida--escala-de-jogadores)
5. [Ações do Turno (Recon, Exploit, Report)](#5-ações-do-turno)
6. [Patch Speed: O Relógio do Patch (Teste D6)](#6-patch-speed-o-relógio-do-patch)
7. [PATCH DEPLOYED! (Penalidades & Safeguards)](#7-patch-deployed)
8. [Event Cards & Mecânica de Caos](#8-event-cards--mecânica-de-caos)
9. [Researcher Archetypes (As 6 Classes Assimétricas)](#9-researcher-archetypes)
10. [Tool Cards (Tabela Completa de Ferramentas)](#10-tool-cards)
11. [Program Cards (Tabela de Empresas Corporativas)](#11-program-cards)
12. [Bounty Track Progressiva (28 Degraus $0 a $50.000)](#12-bounty-track-progressiva)
13. [Fim da Partida & Critérios Oficiais de Desempate](#13-fim-da-partida--critérios-oficiais-de-desempate)
14. [Rodadas Finais (7 e 8): O Caos Total](#14-rodadas-finais-7-e-8-o-caos-total)
15. [Guia Visual: Molduras, Selos e Encaixe nos Slots](#15-guia-visual-molduras-selos-e-encaixe-nos-slots)
16. [Guia de Referência Rápida & Glossário Geral](#16-guia-de-referência-rápida--glossário-geral)

---

### 1. COMPONENTES DO JOGO

O jogo **PWND! — Bug Bounty Chaos** é composto por elementos modulares de alta precisão técnica e componentes analógicos projetados para suportar partidas de 2 a 6 jogadores com máxima legibilidade em mesa.

#### 1.1 Board Central Compartilhado (30x20cm)
- **1 Slot para Event Deck:** compartimento para o baralho central de eventos de segurança.
- **1 Program Market:** 3 slots abertos com cartas de programas empresariais disponíveis para alocação imediata.
- **1 Discard Pile Compartilhada:** área para descarte coletivo de vulnerabilidades, ferramentas e eventos executados.
- **1 Round Tracker:** trilha numerada de 8 espaços para controle de rodadas globais.
- **1 Bounty Tier Legend:** guia cromático de consulta rápida de faixas de pagamento e severidades.

#### 1.2 Mats Individuais de Jogador (Player Mats 25x35cm, 6 unidades)
- **1 Slot de Researcher (155px × 115px / Retrato 63×88mm):** área dedicada à carta de arquétipo de pesquisador ativa.
- **1 Slot de Active Program (155px × 115px / Retrato 63×88mm):** área para a empresa que o pesquisador está auditando atualmente.
- **1 Slot de Defuse (155px × 115px / Retrato 63×88mm):** área reservada para Safeguards e cartas de contenção ativas (`Cofre 0-Day`).
- **1 Zona de Tools (3 Slots Verticais de 155px × 115px / Retrato 63×88mm):** 3 compartimentos operacionais para ferramentas de apoio ativas.
- **1 Zona de Exploits (Área Limpa de 160px):** área aberta de mesa onde vulnerabilidades encadeadas aguardam submissão.
- **1 Bounty Track Lateral:** trilha de recompensa progressiva graduada de $0 a $50.000 em 28 degraus monotônicos.
- **1 Zona de Hand:** área privativa de gerenciamento da mão de cartas do jogador.

#### 1.3 Baralhos e Cartas
- **80 Vulnerability Cards:** acervo balanceado distribuído em 8 classes táticas e 5 níveis de raridade (Common, Uncommon, Rare, Epic, Legendary).
- **12 Tool Cards:** ferramentas de automação, inspeção e injeção com efeitos passivos e ativos.
- **24 Program Cards:** alvos institucionais com escopos técnicos e velocidades de correção distintas (12 empresas x 2 cópias cada, permitindo a disputa de *Duplicate Report!*).
- **6 Researcher Archetype Cards:** classes assimétricas com poderes operacionais únicos.
- **23 Event Cards Centrais:** composto por 23 eventos globais/direcionados de caos.
- **Fórmula Escalar de Safeguards ($N + 4$):** 4 Safeguards `Cofre 0-Day` no baralho de Recon + 1 Safeguard inicial garantida por jogador.

#### 1.4 Componentes Auxiliares
- **6 Bounty Tokens:** marcadores hexagonais acrílicos em cores exclusivas por jogador.
- **1 Round Token:** marcador esférico verde-neon para avanço no Round Tracker central.
- **2 Dados de 6 faces (D6):** dados de precisão utilizados para os testes de Patch Speed Check.

---

### 2. OBJETIVO DO JOGO & CONDIÇÃO DE VITÓRIA

Em **PWND!**, cada participante assume o papel de um pesquisador independente de segurança ofensiva competindo em plataformas abertas de caça a falhas. Ao longo de 8 rodadas estruturadas, os participantes devem realizar varreduras, estruturar cadeias de ataque (exploits) e emitir relatórios técnicos validados antes que as equipes defensivas corrijam as vulnerabilidades em produção.

> *"O pesquisador que acumular a meta de $50.000 na Bounty Track ou o maior volume financeiro ao final da 8ª rodada é declarado o vencedor absoluto da competição."*

---

### 3. PREPARAÇÃO DA MESA (SETUP PASSO A PASSO 3.1 A 3.7)

#### 3.1 Montagem do Espaço Central e Pessoal
Posicione o Board Central no centro exato da mesa de jogo. Cada participante recebe um Mat Individual correspondente à cor de sua preferência. Os Bounty Tokens iniciam alocados na posição **$0** da trilha lateral de cada jogador.

#### 3.2 Determinação do Primeiro Jogador (Regra Social)
O primeiro jogador a agir na partida é aquele que jogou uma partida de jogo de tabuleiro mais recentemente. Em caso de empate absoluto, o privilégio de abertura pertence a quem visitou Portugal por último. Se todos os envolvidos residirem em território português ou houver persistência no empate, a prioridade é concedida a quem ingeriu a última xícara de café. O turno transcorre no sentido horário.

#### 3.3 Escolha Pública de Arquétipos
Iniciando pelo primeiro jogador e procedendo no sentido horário, cada participante escolhe abertamente (sem sorteio) 1 carta de Researcher Archetype entre as disponíveis na mesa, acoplando-a imediatamente no slot `SLOT RESEARCHER` do seu mat.

#### 3.4 Preparação dos Baralhos
1. **Main Deck (Baralho de Ação):** embaralhe as **80 Vulnerability Cards**, **12 Tool Cards** e as **4 Safeguards `Cofre 0-Day` fixas do baralho**. Posicione o maço no compartimento central.
2. **Event Deck:** embaralhe as **23 Event Cards** e coloque o baralho fechado no slot específico de eventos do Board Central.
3. **Program Market:** retire do topo do baralho de programas 3 cartas e coloque-as com a face voltada para cima nos 3 compartimentos do mercado.

#### 3.5 Distribuição da Mão Inicial Garantida ($N+4$)
Compre 5 cartas do Main Deck + **1 carta garantida de Safeguard `Cofre 0-Day` (Defuse)** e adicione-as à sua mão de forma secreta (totalizando 6 cartas iniciais). O arquétipo *The Old Guard* possui o benefício inicial de comprar 9 cartas.

#### 3.6 Seleção do Alvo Inicial
Seguindo a ordem do turno, cada pesquisador seleciona 1 Program Card do Program Market e posiciona-a em seu slot de `ACTIVE PROGRAM`. Imediatamente após a retirada de uma carta, puxe uma nova do baralho de programas para manter o mercado com 3 opções ativas.

#### 3.7 Alocação do Marcador de Rodadas
Posicione o Round Token esférico no número 1 do Round Tracker central para iniciar a partida.

---

### 4. ESTRUTURA DA PARTIDA & ESCALA DE JOGADORES

Uma partida oficial de PWND! desenvolve-se ao longo de rodadas fixas calibradas por número de participantes:

#### 4.1 Escala e Duração por Número de Jogadores
- **2 Jogadores:** 10 rodadas de jogo (calibragem para compensar o fluxo tático), duração estimada de 40 minutos.
- **3 a 4 Jogadores:** 8 rodadas oficiais, duração estimada de 45 minutos.
- **5 a 6 Jogadores:** 8 rodadas oficiais, duração estimada de 60 minutos.

```
+-------------------------------------------------------------------+
|                        FLUXO GERAL DA RODADA                      |
+-------------------------------------------------------------------+
| 1. FASE DE AÇÃO DOS JOGADORES (Sentido Horário)                   |
|    - Cada jogador escolhe EXATAMENTE UMA ação principal:          |
|      [ RECON ]  ou  [ EXPLOIT ]  ou  [ REPORT ]                   |
|                                                                   |
| 2. FASE DE VERIFICAÇÃO DE FINAL DE RODADA                         |
|    - Patch Speed Check (para jogadores com vulnerabilidades na mesa)|
|    - Resolução de penalidades de PATCH DEPLOYED!                  |
|    - Avanço do Round Token (+1 rodada no Board Central)           |
+-------------------------------------------------------------------+
```

---

### 5. AÇÕES DO TURNO

No seu turno de jogo, você é obrigado a selecionar e executar uma única ação principal dentre as três opções abaixo:

#### 5.1 Ação 1: RECON (Reconhecimento e Aquisição de Recursos)
Escolha **UMA** das três alternativas operacionais de Recon:
- **A) Sacar 2 Ações:** Compre 2 cartas do topo do Main Deck. (Se possuir a ferramenta Nmap + ffuf ativa no Tools Rack, compre 3 cartas).
- **B) Sacar 1 Evento:** Compre 1 carta do topo do Baralho de Eventos de Caos para a sua mão.
- **C) Trocar de Alvo:** Desistir do programa ativo no seu tapete e escolher um novo alvo disponível no Program Market.

*Nota tática: O limite máximo estrutural de cartas mantidas em mão é de 6 cartas (9 para The Old Guard). Excedentes devem ser descartados.*

#### 5.2 Ação 2: EXPLOIT (Execução de Falha na Mesa)
Jogue 1 Vulnerability Card da sua mão para a Zona de Exploits do seu Mat. A colocação da carta exige três etapas:
1. **Validação de Scope Técnico:** A classe descrita na Vulnerability Card precisa constar no escopo do seu Active Program (salvo se operando como *Red Teamer*).
2. **Pagamento de Custo de Ferramental:** Descarte as Tool Cards requeridas ou aplique os abatimentos de ferramentas ativas (*SQLMap* zera injeção, *Postman* reduz BAC em 1, *OWASP ZAP* zera Low/Medium, *Burp Suite Pro* é coringa universal).
3. **Disparo de Efeitos Imediatos:** Resolva habilidades *"No deploy:"* imediatamente. Habilidades *"Quando reportada:"* aguardam a submissão formal.

#### 5.3 Ação 3: REPORT (Submissão Formal e Coleta de Recompensa)
Realize a entrega formal das vulnerabilidades alocadas na sua Zona de Exploits:
1. **Verificação de Duplicação (Duplicate Check):** Se um oponente já reportou o mesmo título no mesmo programa na rodada, a falha é considerada duplicada (*Duplicate Report!*) e paga apenas 10% da recompensa.
2. **Cálculo da Severidade Base:** Some a pontuação nominal **CVSS (1.0 a 10.0)** das cartas válidas.
3. **Aplicação do Multiplicador do Programa:**
   - Low Bounty Program: Pontos = CVSS Total × 1
   - Medium Bounty Program: Pontos = CVSS Total × 2
   - High Bounty Program: Pontos = CVSS Total × 5
   - Critical Bounty Program: Pontos = CVSS Total × 10
4. **Progressão na Bounty Track:** Avance seu marcadores na régua de 28 degraus financeiras.
5. **Descarte e Reposição:** Descarte as falhas submetidas e escolha um novo programa no Program Market.

---

### 6. PATCH SPEED: O RELÓGIO DO PATCH

No final de cada rodada, a equipe de engenharia dos sistemas executa varreduras defensivas. Cada jogador com Vulnerability Cards na sua Zona de Exploits é obrigado a realizar um **Patch Speed Check** individual.

Role **1 dado D6** e compare com o índice de velocidade de correção impresso no programa ativo:

| Patch Speed do Programa | Resultado Crítico no Dado (D6) | Probabilidade Estatística |
| :--- | :--- | :--- |
| **Lenta** | Apenas resultado **6** | 16,6% (1 em 6) |
| **Moderada** | Resultados **5 ou 6** | 33,3% (2 em 6) |
| **Rápida** | Resultados **4, 5 ou 6** | 50,0% (3 em 6) |
| **Extrema** | Resultados **3, 4, 5 ou 6** | 66,6% (4 em 6) |

Caso o dado atinja ou supere o limiar indicado, ativa-se a rotina **PATCH DEPLOYED!**. Se for inferior, as cartas permanecem na mesa para a rodada seguinte.

---

### 7. PATCH DEPLOYED!

O evento **PATCH DEPLOYED!** representa a correção de emergência dos sistemas em produção, neutralizando todo o trabalho exposto que não foi submetido a tempo.

#### 7.1 Penalidades Imediatas Aplicadas
1. **Perda Integral de Exploits em Mesa:** Todas as vulnerabilidades na Zona de Exploits são descartadas para a Discard Pile sem pontuar.
2. **Recuo na Bounty Track:** Mova o seu Bounty Token **3 degraus para trás** na Bounty Track. (Piso mínimo de segurança em **$0**).
3. **Fechamento Compulsório de Programa:** O programa ativo no seu mat é encerrado e enviado ao descarte.

#### 7.2 Elementos Blindados Contra o Patch
- Cartas retidas na mão permanecem intocadas.
- Ferramentas no Tools Rack permanecem preservadas.
- Pontuação já consolidada acima de 3 degraus permanece garantida.

#### 7.3 Mecanismo de Safeguard (0-Day Reserve)
Se o jogador possuir a carta `Cofre 0-Day` (Defuse) alocada em seu slot `SLOT DEFUSE` ou na mão no momento em que o patch for acionado, ele pode descartá-la para **anular 100% dos efeitos danosos**.

---

### 8. EVENT CARDS & MECÂNICA DE CAOS

O Baralho de Eventos de Caos introduz volatilidade e reviravoltas no cenário da partida.

#### 8.1 Invasão de Eventos nas Rodadas Finais
No início da **Rodada 7**, todo o remanescente do Event Deck é recolhido e embaralhado diretamente no Main Deck. A partir desse momento, qualquer compra de Recon que puxe uma carta de evento força a sua execução imediata!

#### 8.2 Diretrizes Operacionais de Resolução
- O arquétipo **Social Engineer** pode redirecionar livremente o alvo de qualquer carta de evento por ele disparada.
- Jogar cartas de evento da mão durante a Fase 4 é totalmente opcional.

---

### 9. RESEARCHER ARCHETYPES (AS 6 CLASSES ASSIMÉTRICAS)

```
+------------------+----------------------------------------------------+
| ARQUÉTIPO        | PERFIL DE JOGABILIDADE E ESPECIALIZAÇÃO            |
+------------------+----------------------------------------------------+
| n00b             | Construtor progressivo de engine de longo prazo    |
| The Old Guard    | Combos massivos, mão ampla de 9 cartas             |
| Bug Hunter       | Alta frequência de submissões (2 Reports por turno)|
| Social Engineer  | Manipulação do baralho de eventos e sabotagem      |
| Red Teamer       | Ignora restrições de escopo com taxa de -30%       |
| The Pentester    | Resiliência defensiva (Patch apenas no 6 do D6)    |
+------------------+----------------------------------------------------+
```

#### 9.1 n00b — O Aprendiz Evolutivo
- **Evolução**: A cada *Report* concluído, escolhe permanentemente **1 nova habilidade passiva** de sua árvore operacional (+1 compra em Recon, redução de ferramentas ou expansão de mão).

#### 9.2 The Old Guard — O Veterano Metódico
- **Mão Expandida**: Mantém limite de **9 cartas** na mão.
- **Cadência**: Pode realizar a ação de *Report* no máximo 1 vez por rodada.

#### 9.3 Bug Hunter — O Especialista em Escala
- **Dupla Submissão**: Pode processar **2 Reports completos em uma única ação** de submissão.
- **Restrição**: Limitado a vulnerabilidades de severidade Low e Medium (CVSS ≤ 6.0).
- **Bônus de Volume**: +50% no bounty total se submeter 5 ou mais cartas em um único Report.

#### 9.4 Social Engineer — O Manipulador da Mesa
- **Controle de Alvo**: Decide livremente o participante afetado por qualquer Event Card que disparar.
- **Compra de Caos**: Pode comprar 1 carta do Event Deck como sua ação de Recon.

#### 9.5 Red Teamer — O Agente Irrestrito
- **Quebra de Escopo**: Pode alocar vulnerabilidades de qualquer classe em qualquer empresa.
- **Desconto Operacional**: Sofre um abatimento de **-30% no valor final de payout** do Report.

#### 9.6 The Pentester — O Auditor Estruturado
- **Imunidade Burocrática**: Imune a *Duplicate Report!* e *Triage Delay!*.
- **Controle de Risco**: Em todos os testes de Patch Speed Check, só é afetado caso tire o **número 6 no dado D6**, independentemente do programa.

---

### 10. TOOL CARDS (TABELA COMPLETA DE FERRAMENTAS)

| Ferramenta Operacional | Efeito Técnico Concedido | Modo de Ativação |
| :--- | :--- | :--- |
| **Burp Suite Pro** | Atua como coringa universal, substituindo qualquer exigência de ferramenta. | Ativa (descarte no uso) |
| **Nmap + ffuf** | Concede +1 carta adicional na execução da ação de Recon (compra 3 cartas). | Passiva (permanente no rack) |
| **OWASP ZAP** | Vulnerabilidades Low e Medium têm seu custo de ferramentas reduzido a zero. | Ativa (descarte no uso) |
| **Postman** | Reduz em 1 unidade o custo de falhas da classe Broken Access Control. | Ativa (descarte no uso) |
| **Browser DevTools** | Vulnerabilidades XSS agregam +50% de valor no momento do Report. | Passiva (permanente no rack) |
| **Burp Collaborator** | Resgata 1 Tool Card do descarte toda vez que um oponente reportar SSRF. | Passiva (permanente no rack) |
| **SQLMap** | Vulnerabilidades da classe Injection têm seu custo reduzido a zero. | Ativa (descarte no uso) |
| **Gobuster / DirBuster** | Permite revelar imediatamente 2 Program Cards adicionais do baralho. | Ativa (descarte no uso) |
| **Wireshark** | Permite inspecionar a última carta pescada da mesa por cada adversário. | Passiva (permanente no rack) |
| **CyberChef** | Permite converter 2 ferramentas do descarte em 1 ferramenta de sua escolha. | Ativa (descarte no uso) |
| **JWT Tool** | Vulnerabilidades de autenticação recebem +50% de pontuação no Report. | Passiva (permanente no rack) |
| **Commix** | Vulnerabilidades de Command Injection têm seu custo reduzido a zero. | Ativa (descarte no uso) |

---

### 11. PROGRAM CARDS (TABELA DE EMPRESAS CORPORATIVAS)

| Empresa / Alvo | Bounty Tier | Escopo Autorizado (Scope) | Patch Speed | Multiplicador |
| :--- | :--- | :--- | :--- | :--- |
| **ShopAll Global** | Medium | Escopo Amplo (aceita todas as classes) | Moderada (5+) | ×2 |
| **BankSafe Financial** | High | Restrito a APIs, Autenticação e Cripto | Rápida (4+) | ×5 |
| **GovPortal Nacional** | Low | Restrito a Broken Access Control | Lenta (6) | ×1 |
| **HealthLock Medical** | High | Restrito a Criptografia e Autenticação | Rápida (4+) | ×5 |
| **SocialBee Network** | Medium | Escopo Amplo (aceita todas as classes) | Moderada (5+) | ×2 |
| **CloudNine Systems** | Critical | Infraestrutura, RCE e SSRF | Extrema (3+) | ×10 |
| **GameVerse Studios** | Medium | WebSockets e Lógica de Negócios | Moderada (5+) | ×2 |
| **EduConnect Tech** | Low | Escopo Amplo (aceita todas as classes) | Muito Lenta (6) | ×1 |

---

### 12. BOUNTY TRACK PROGRESSIVA (28 DEGRAUS $0 A $50.000)

A **Bounty Track** disposta na lateral de cada mat individual utiliza 28 degraus monotônicos divididos em 4 zonas cromáticas:

- 🟩 **Zona Baixa ($0 – $1.000 - 10 Degraus)**: `$0` ➔ `$100` ➔ `$200` ➔ `$300` ➔ `$400` ➔ `$500` ➔ `$600` ➔ `$700` ➔ `$800` ➔ `$900` ➔ `$1.000`
- 🟨 **Zona Média ($1.500 – $10.000 - 6 Degraus)**: `$1.500` ➔ `$2.500` ➔ `$4.000` ➔ `$5.500` ➔ `$7.500` ➔ `$10.000`
- 🟧 **Zona Alta ($12.500 – $25.000 - 6 Degraus)**: `$12.500` ➔ `$15.000` ➔ `$17.500` ➔ `$20.000` ➔ `$22.500` ➔ `$25.000`
- 🟥 **Zona Crítica ($30.000 – $50.000 - 6 Degraus)**: `$30.000` ➔ `$35.000` ➔ `$40.000` ➔ `$45.000` ➔ `$48.000` ➔ **`$50.000 (TOPO DA VITÓRIA)`**

*Piso Inviolável: A pontuação nunca atinge valores negativos. Caso uma penalidade recue mais que o saldo, o marcador permanece fixado em $0.*

---

### 13. FIM DA PARTIDA & CRITÉRIOS OFICIAIS DE DESEMPATE

A partida é encerrada imediatamente após a finalização da 8ª rodada (ou 10ª rodada em partidas de 2 jogadores). O participante que tiver alcançado a posição mais avançada na Bounty Track é declarado o vencedor.

```
+-------------------------------------------------------------------+
|                   CRITÉRIOS OFICIAIS DE DESEMPATE                 |
+-------------------------------------------------------------------+
| 1º Critério: Maior número total de Reports concluídos com sucesso  |
| 2º Critério: Maior número de falhas Critical submetidas (CVSS ≥ 9.0)|
| 3º Critério: Rolagem de morte súbita (maior resultado em 1 D6)    |
+-------------------------------------------------------------------+
```

---

### 14. RODADAS FINAIS (7 E 8): O CAOS TOTAL

As rodadas finais representam o encerramento do trimestre fiscal das empresas, provocando aceleração massiva de triagens e deploys de correção.

#### 14.1 Modificadores da Rodada 7
- O remanescente do **Event Deck é integrado e embaralhado ao Main Deck**, forçando ativações automáticas de eventos durante compras normais de Recon.
- O Program Market central expande-se, recebendo **2 cartas adicionais** (totalizando 5 programas abertos para escolha).

#### 14.2 Modificadores da Rodada 8
- Todos os testes de Patch Speed Check passam a exigir a **rolagem obrigatória de 2 dados (2D6)**. O pesquisador deve atingir sucesso em ambos os dados individualmente para escapar da anulação de suas vulnerabilidades.
- O Main Deck **não é reembaralhado** caso se esgote durante esta rodada.

---

### 15. GUIA VISUAL: MOLDURAS, SELOS E ENCAIXE NOS SLOTS

#### 🎨 15.1 Molduras por Baralho:
- **Vulnerabilidade (Exploit)**: Moldura Laranja Âmbar (`#f0883e`).
- **Ferramenta (Tool)**: Moldura Azul Cyber (`#38bdf8`).
- **Safeguard (Defuse)**: Moldura Verde Esmeralda (`#39d353`).
- **Evento de Caos (Event)**: Moldura Vermelho Alerta (`#f85149`).

#### 🏷️ 15.2 Badges Técnicos de Escopo:
`INJ` (Âmbar), `BAC` (Roxo), `XSS` (Rosa), `AUTH` (Amarelo), `SSRF` (Azul), `LOGIC` (Teal), `CRYPTO` (Verde), `LEGENDARY` (Violeta).

#### 🗺️ 15.3 Encaixe nos Slots (Altura Uniforme de 160px / Retrato 63×88mm):
- `SLOT RESEARCHER` (155px × 115px) ➔ Carta de Arquétipo.
- `ACTIVE PROGRAM` (155px × 115px) ➔ Carta de Programa Corporativo.
- `SLOT DEFUSE` (155px × 115px) ➔ Carta `Cofre 0-Day`.
- `TOOLS RACK` (3 Slots de 155px × 115px) ➔ Cartas de Ferramentas.
- `ZONA DE EXPLOITS` (160px Área Limpa) ➔ Cartas de Vulnerabilidades alocadas.

---

### 16. GUIA DE REFERÊNCIA RÁPIDA & GLOSSÁRIO GERAL

- **Ações no turno:** Realize 1 ação: **Recon** (compra recursos/evento), **Exploit** (arma falhas) ou **Report** (submete e pontua).
- **Final de rodada:** Teste de **Patch Speed Check (D6)** para quem mantiver vulnerabilidades na mesa.
- **PATCH DEPLOYED!:** Descarta vulnerabilidades da mesa, recua 3 degraus na Bounty Track e encerra o programa ativo.
- **Proteção:** A carta `Cofre 0-Day` (Defuse) anula 100% o Patch Deployed.

*PWND! — Bug Bounty Chaos © 2026 PWND! Game Development Studio. Todos os direitos reservados.*
