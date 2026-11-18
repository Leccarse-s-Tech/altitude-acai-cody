# PROMPT.md — Reformulação Editorial, Expansão Widescreen e Fim do "Visual de IA" (Argon 4): Altitude Açaí (Cody, WY)

## 1. Diretrizes Inegociáveis do Projeto

Este documento define a arquitetura, a direção de arte editorial e as regras de negócio para a landing page da **Altitude Açaí** (`https://www.altitudeacai.com/`), localizada em **1302 Beck Avenue, Cody, WY 82414**[cite: 3]. O orquestrador **Argon 4** deve coordenar os subagentes em paralelo e registrar cada task concluída no arquivo `PROGRESS.md`.

1. **Idioma 100% Inglês (`EN-US`):** Toda a interface deve estar em inglês[cite: 2, 3, 5].
2. **Fidelidade Factual Absoluta (Zero Invenções):** É proibido inventar textos, depoimentos, histórias ou promessas exageradas[cite: 2, 3, 4, 5].
3. **Vitrine Institucional (Zero Preços e Zero Carrinho):** Nenhum valor monetário deve aparecer no site. Remova todas as marcações de preço dos materiais brutos (`+$1.00`, `+.50`, `+ 50¢`, `+.75 Cents`, `+ 75¢`)[cite: 2, 3].
4. **Corte Global de Repetições (DRY na UI e no Copy):**
   - É proibido resumir parágrafos em mini-cards logo abaixo do próprio texto (ex: remover imediatamente os 3 cards redundantes `2024`, `Summer Events` e `Brick & Mortar` abaixo do texto de `"How Altitude Açaí Started"`)[cite: 20].
   - O endereço `1302 Beck Avenue, Cody, WY 82414` deve aparecer apenas na seção `Visit Us` e no Footer[cite: 11].
5. **Repositório Oficial:** Todos os commits e o pipeline de deploy devem apontar para `https://github.com/Leccarse-s-Tech/altitude-acai-cody`.

---

## 2. Desconstrução da "Cara de IA" (Diretrizes Anti-Template para o `Agent-Frontend`)

O site NÃO pode parecer um template genérico de IA/SaaS cheio de caixas quadradas idênticas[cite: 18, 19, 20]. Aplique imediatamente esta reformulação de estilo:

1. **Banimento de Clichês Visuais de IA:**
   - **REMOVER cantoneiras técnicas (`┌ ┐ └ ┘`)** de dentro dos cards e quadros — isso tem estética de dashboard técnico/cyberpunk e destoa completamente de uma loja artesanal de açaí e xilogravura[cite: 14, 16, 18, 19].
   - **REMOVER pílulas/badges genéricas (`FRESH SUPERFOOD BOWLS`, etc.)** com borda preta e fonte monoespaçada acima de todos os títulos[cite: 19]. Use subtítulos tipográficos elegantes em estilo editorial/xilogravura.
   - **REMOVER os divisores tracejados com losango no meio (`--- ◇ ---`)** que separam as seções de forma mecânica[cite: 19, 20].
   - **PROIBIR que tudo seja um Card Quadrado:** Nem todo texto, ingrediente ou informação precisa estar preso dentro de um retângulo com `border: 2px solid` e sombra dura (`4px 4px 0px`)[cite: 14, 18, 20].
2. **Novo Estilo Editorial & Xilogravura Artesanal (Folheto de Cordel + Tipografia Impressa):**
   - **Tipografia e Hierarquia Aberta:** Deixe os textos respirarem diretamente sobre o fundo texturizado da seção, usando fios entalhados orgânicos, linhas divisórias finas estilo cardápio clássico impresso e grandes títulos expressivos.
   - **Bordas Entalhadas Imperfeitas:** Quando um container realmente precisar de moldura (como na tabela de horários ou no simulador de bowl), use bordas com textura de entalhe em madeira (via `SVG filter` sutil ou `border-image` de xilogravura) em vez de caixas geométricas chapadas com sombra dura de CSS.
   - **Composição de Fotos Estilo Colagem Editorial:** Em vez de prender as fotos reais dos bowls em um grid quadrado rígido[cite: 20], apresente-as em composições assimétricas sobrepostas, integradas com gravuras de cordel (frutas, folhas de açaí, colher de mel) saindo por trás das fotos.

---

## 3. Aproveitamento dos Espaços Laterais (Widescreen Layout) e Redução da Verticalidade

O site está excessivamente verticalizado e espremido no centro da tela[cite: 19, 20]. Refatore a malha estrutural (Grid System) para ocupar toda a largura em telas grandes (`1280px` a `1920px+`), mantendo a responsividade perfeita em mobile (`320px+`):

1. **Expansão do Container Global:**
   - Aumente a largura máxima útil das seções de `max-w-5xl` para `max-w-[1440px] xl:max-w-[1600px] w-full mx-auto px-5 sm:px-8 lg:px-16 xl:px-20`.
2. **Layouts Horizontais Panorâmicos (Menos Scroll Vertical, Mais Presença Lateral):**
   - **Hero Section Widescreen:** Distribua o título/copy na metade esquerda e expanda a composição visual na metade direita sangrando em direção à margem lateral, integrando as fotos reais de bowls com a xilogravura das montanhas sem deixar faixas brancas vazias nos cantos[cite: 19].
   - **"What's in an Açaí Bowl?" em Formato Horizontal:** Em vez de empilhar as 5 camadas (`ACAI SORBET`, `CRUNCH`, `FAVORITE FRUIT`, `TOPPING`, `SAUCE`) verticalmente[cite: 5], disponha a anatomia do bowl em uma vitrine horizontal ampla de ponta a ponta no desktop (5 colunas interativas lado a lado com o texto introdutório distribuído no topo).
   - **"How Altitude Açaí Started" em Spread Editorial:** Remova os 3 mini-cards repetitivos[cite: 20] e organize a história como uma página dupla de revista/cordel ocupando as 12 colunas: título impactante à esquerda, narrativa fluida no centro e mosaico fotográfico amplo à direita.

---

## 4. Imagens Integradas ao Background Alternando com Fundos de Cordel

É terminantemente proibido deixar ilustrações gigantes soltas dentro de caixas sem função (como o segundo quadro de montanhas abaixo da Hero na `image_01409e.jpg`)[cite: 19]. Transforme essas artes e imagens em **backgrounds reais de seção (`full-bleed 100vw`)** que se alternam ritmicamente ao longo da página:

1. **Ritmo de Alternância de Backgrounds das Seções:**
   - **Seção 1 (Hero — Fundo Papel Artesanal `#FAFAFF` + Padronagem Densa de Cordel):** Fundo claro texturizado onde as gravuras de frutas, tigelas, favo de mel, coco e sementes em estilo cordel preenchem ativamente as margens laterais e o fundo em múltiplas escalas (`opacity: 0.12` a `0.22`), nunca deixando o fundo parecer vazio[cite: 1, 12, 19].
   - **Seção 2 ("What's in an Açaí Bowl?" — Background Panorâmico da Xilogravura das Montanhas):** Remova o quadro avulso de montanhas que estava largado abaixo da Hero[cite: 19] e utilize essa **ilustração panorâmica das montanhas de Wyoming em xilogravura como o background `100vw` (`background-size: cover`) de toda a seção**, aplicando um gradiente translúcido em `#1E2749` / `#273469` para que as 5 camadas do bowl se destaquem por cima da cadeia de montanhas[cite: 1, 8, 19].
   - **Seção 3 (Preview de Bowls / Menu — Fundo `#E4D9FF` Periwinkle com Textura de Folheto de Cordel):** Fundo lavanda claro com gravuras entalhadas de morangos, bananas, mirtilos, abacaxi e manga distribuídas por toda a extensão horizontal da tela[cite: 1, 2, 3, 18].
   - **Seção 4 ("How Altitude Açaí Started" — Background Atmosférico Escuro `#1E2749` com Composição Integrada):** As imagens reais dos bowls e da trajetória da marca devem compor o cenário visual da seção (com recortes editoriais amplos e gravuras de ramos de açaí entrelaçadas no fundo escuro), sem os 3 mini-cards de IA[cite: 1, 20].
   - **Seção 5 (Horários Sazonais, Aviso Único de Food Truck e `Visit Us`):** Fundo combinando a textura rústica de papel com silhuetas sutis dos picos de Cody no horizonte inferior e gravuras de ingredientes nas extremidades laterais[cite: 8, 14].

---

## 5. Regras Mantidas: Horários Sazonais, Rotas (`/`, `/menu`, `404`) e Footer

1. **Seção de Horários Sazonais (`America/Denver` Automático no Frontend):**
   - **Widget do Relógio:** Sem o texto `"Mountain Time"` na esquerda, sem a badge `"Fall Hours"` na direita e sem a segunda linha duplicada de horário de abertura[cite: 16].
   - **Cards de Horários:** Sem a badge de meses (`September - November`) no card esquerdo e sem o texto `"Times follow Mountain Time (America/Denver)."` no card direito[cite: 14, 15]. A coluna esquerda e o card `Weekly Hours` da direita devem ter exatamente a mesma altura total (`items-stretch` / `h-full`), desenhados no novo estilo editorial sem cantoneiras técnicas[cite: 14, 15].
2. **Food Truck & Local Events:**
   - Sem cards de eventos/torneios fixos[cite: 13]. Apenas uma faixa horizontal editorial convidando o visitante a checar o Instagram (`@altitude_acai`) e o Facebook oficial para acompanhar o Food Truck[cite: 3, 13].
3. **Rota `/menu` (Em Layout Editorial Widescreen, Sem "Cara de IA"):**
   - Exibir tamanhos (`12 oz Bowl` e `16 oz Bowl`) e regra base (`All bowls start with Açaí Base and Granola`) uma única vez no cabeçalho[cite: 2, 3].
   - Apresentar os **6 Signature Bowls** (`Mountain Man`, `Montana Mama`, `Goldilocks`, `Bear Attack`, `T-Rux`, `SQUATch Protein Bowl`) em um layout de cardápio artesanal de alta gastronomia/cordel (tipografia forte, linhas pontilhadas/entalhadas e ilustrações das frutas), e o montador **`Create Your Own Bowl`** (`3 Fruits`, `2 Toppings`, `1 Sauce`) ocupando a largura widescreen sem preços e com gravuras de cordel espalhadas por todo o background[cite: 2, 3, 18].
4. **Rota `404` Personalizada e Footer:**
   - **404:** Sem Navbar e sem Footer; número `404` centralizado com um **Bowl de Açaí em xilogravura** no lugar do `0`, título `"This page does not exist"` e botão único `"Back to Home"` (`/`).
   - **Footer:** Ano atualizado automaticamente via JavaScript (`© {new Date().getFullYear()} Altitude Açaí`)[cite: 17].

---

## 6. Checklist de Execução para Subagentes (`PROGRESS.md`)

Cada subagente do **Orquestrador** deve executar sua task e atualizar o `PROGRESS.md`:
- `TASK-REdesign-1 (Agent-Art-Cordel & Agent-Frontend)`: Remover o quadro gigante de montanha solto abaixo da Hero e transformá-lo em background panorâmico `100vw` de seção, alternando seções com fundos de cordel espalhados por toda a tela e seções com imagens integradas.
- `TASK-REdesign-2 (Agent-Frontend)`: Expandir todos os containers para widescreen (`max-w-[1440px]` / `1600px`), converter seções verticais em layouts horizontais amplos e preencher o espaço lateral em monitores grandes.
- `TASK-REdesign-3 (Agent-Frontend & Agent-Copywriter)`: Eliminar a "cara de IA" — remover os 3 mini-cards repetitivos (`2024`, `Summer Events`, `Brick & Mortar`), remover cantoneiras técnicas (`┌ ┐`), remover divisores tracejados com losango e substituir caixas genéricas por design editorial/xilogravura.
- `TASK-REdesign-4 (Agent-QA-DevOps)`: Testar responsividade de `320px` a `1920px`, validar o motor de horários sazonais e o ano dinâmico do footer, fazer commit e publicar em `https://github.com/Leccarse-s-Tech/altitude-acai-cody`.