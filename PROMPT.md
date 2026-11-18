# PROMPT.md — Especificação Completa e Correções de UI/UX (Argon 4): Altitude Açaí (Cody, WY)

## 1. Diretrizes Inegociáveis do Projeto

Este documento define a arquitetura, o design system e as regras de negócio para a landing page da **Altitude Açaí** (`https://www.altitudeacai.com/`), localizada em **1302 Beck Avenue, Cody, WY 82414**. O orquestrador **Argon 4** deve coordenar os subagentes em paralelo e registrar cada task concluída no arquivo `PROGRESS.md`.

1. **Idioma 100% Inglês (`EN-US`):** Toda a interface deve estar em inglês.
2. **Fidelidade Factual Absoluta (Zero Invenções):** É proibido inventar textos, depoimentos, histórias, descrições genéricas ou promessas exageradas. Use exclusivamente os dados verificados da marca.
3. **Vitrine Institucional (Zero Preços e Zero Carrinho):** Nenhum valor monetário deve aparecer no site. Remova todas as marcações de preço dos materiais brutos (`+$1.00`, `+.50`, `+ 50¢`, `+.75 Cents`, `+ 75¢`).
4. **Proibição Global de Numerações, Kickers e Textos Redundantes (DRY na UI e no Copy):**
   - É terminantemente proibido numerar cards, bowls, ingredientes ou etapas (`01`, `02`, `03`, `1.`, `2.`, `Layer 1 of 5`, etc.) em qualquer página do site.
   - É proibido adicionar subtítulos/kickers em caixa alta acima dos títulos de seção (`— FRESH SUPERFOOD BOWLS`, `STACKED BOTTOM TO TOP · 5 LAYERS`, etc.).
   - O endereço `1302 Beck Avenue, Cody, WY 82414` deve aparecer apenas na seção `Visit Us` e no Footer.
5. **Repositório Oficial:** Todos os commits e o pipeline de deploy devem apontar para `https://github.com/Leccarse-s-Tech/altitude-acai-cody`.

---

## 2. Remoções Obrigatórias Mapeadas por Seção (Limpeza de Poluição Visual)

### 2.1. Navbar e Hero Section
1. **Navbar:** Remova o texto `"Altitude Açaí"` escrito ao lado da imagem da logo (pois a própria ilustração da logo já contém o nome `"ALTITUDE AÇAÍ"`). Mantenha apenas a imagem da logo oficial clicável apontando para `/`.
2. **Hero Section:** Remova a linha superior `"— FRESH SUPERFOOD BOWLS"` acima do título `H1` (`"Handcrafted Açaí Bowls in Cody, Wyoming"`).

### 2.2. Seção "What's in an Açaí Bowl?"
1. **REMOVER Subtítulo Superior:** Exclua o texto `"STACKED BOTTOM TO TOP · 5 LAYERS"` acima do título `"What's in an Açaí Bowl?"`.
2. **REMOVER Numerações e Rótulos Técnicos dos 5 Botões de Camada:**
   - Exclua os números `01`, `02`, `03`, `04`, `05` no canto superior esquerdo de cada botão.
   - Exclua os rótulos `BASE LAYER`, `GRANOLA LAYER`, `FRESH FRUIT LAYER`, `TOPPINGS LAYER` e `FINISH LAYER` no canto superior direito de cada botão.
   - Exclua os prefixos `1.`, `2.`, `3.`, `4.`, `5.` antes do nome de cada camada (tanto nos botões quanto dentro do desenho da tigela em camadas). Os nomes devem ser estritamente: `ACAI SORBET`, `CRUNCH`, `FAVORITE FRUIT`, `TOPPING` e `SAUCE`.
3. **REMOVER Texto de Instrução Óbvio:** Exclua a frase `"Select any layer in the diagram to inspect its ingredients."` acima do diagrama da tigela.
4. **REMOVER Cabeçalho Redundante no Painel de Inspeção da Camada:**
   - No bloco à direita do diagrama da tigela, exclua o contador `"Layer 5 of 5 · Finish Layer"`, exclua a repetição do título `"5. SAUCE"` e exclua frases descritivas inventadas como `"Drizzle of 1 sauce or nut butter to finish."`. Exiba diretamente a lista limpa dos ingredientes reais que compõem aquela camada.

### 2.3. Seção "Signature Bowls" (Na Home `/` e na Rota `/menu`)
1. **REMOVER Numeração dos Bowls:** Exclua os números `01`, `02`, `03` (e seguintes) posicionados acima dos títulos `Mountain Man`, `Montana Mama`, `Goldilocks`, `Bear Attack`, `T-Rux` e `SQUATch Protein Bowl`.
2. **REMOVER Numeração no `Create Your Own Bowl`:** Na rota `/menu`, use apenas `Fruits`, `Toppings` e `Sauces` sem prefixos numéricos (`1.`, `2.`, `3.`).

### 2.4. Seção de Horários Sazonais (`Hours`) e Food Truck
1. **REMOVER do Card `Weekly Hours`:**
   - Exclua completamente o botão/dropdown `"Shop Posters & Notices"` na parte inferior do card `Weekly Hours`.
   - Exclua o texto `"Times follow Mountain Time (America/Denver)."` no topo direito do card.
2. **REMOVER do Card Esquerdo da Estação:** Exclua a badge de meses (`September - November`, `December - February`, etc.).
3. **REMOVER do Widget Escuro de Relógio:** Exclua `"Mountain Time"`, exclua a badge `"Fall Hours"` e mantenha apenas uma linha única de status de abertura.
4. **IGUALAR ALTURA DOS CARDS:** A coluna esquerda e o card `Weekly Hours` da direita devem ter exatamente a mesma altura total (`items-stretch` / `h-full`).
5. **Food Truck:** Mantenha apenas o aviso único direcionando para o Instagram (`@altitude_acai`) e Facebook oficial, sem cards de eventos fixos.

---

## 3. Novo Componente Obrigatório: Botão Flutuante Fixo "Text us"

Adicione um botão de ação flutuante (FAB) inspirado no botão original da loja, fixado no canto inferior direito da tela em todas as páginas públicas (`/` e `/menu`, oculto apenas na rota `/404`):

1. **Posicionamento e Comportamento:**
   - `position: fixed; bottom: 24px; right: 24px; z-index: 50;` (com ajuste responsivo seguro em telas mobile `320px+` para não cobrir textos essenciais).
2. **Design e Conteúdo:**
   - Formato pílula (`rounded-full`), fundo claro em `#FAFAFF` com contraste nítido, borda sutil e sombra elegante, texto em `#1E2749` / `#30343F`.
   - Ícone de smartphone com balão de mensagem à esquerda + rótulo curto `"Text us"`.
3. **Ação de Redirecionamento:**
   - Link direto para envio de mensagem/contato telefônico no número oficial verificado da Altitude Açaí (`307-527-0812`): `href="sms:+13075270812"` (com suporte nativo em dispositivos móveis e telefone).

---

## 4. Direção de Arte Editorial, Widescreen e Background Cordel

1. **Paleta de Cores Exclusiva:** `#30343F` (Jet Black), `#FAFAFF` (Ghost White), `#E4D9FF` (Periwinkle), `#8687B4` (Lavender Grey), `#575E8F` (Dusty Grape), `#273469` (Twilight Indigo) e `#1E2749` (Space Indigo).
2. **Aproveitamento Lateral Widescreen e Fim da "Cara de IA":**
   - Containers amplos (`max-w-[1440px] xl:max-w-[1600px]`), sem cantoneiras técnicas (`┌ ┐`), sem divisores tracejados com losango (`--- ◇ ---`) e sem os 3 mini-cards repetitivos na seção `"How Altitude Açaí Started"`.
   - Alternância de seções com backgrounds panorâmicos (`100vw`) e seções com gravuras de cordel (frutas, tigelas, favo de mel, coco, amêndoas e sementes) espalhadas de forma orgânica por todo o fundo da página (`/` e `/menu`).
   - Sol liso nas ilustrações de montanha com nuvens onduladas orgânicas (proibido usar raios retos radiais).
3. **Rotas (`/`, `/menu`, `404`) e Footer Dinâmico:**
   - Rota `/404` isolada (sem Navbar, sem Footer e sem botão flutuante), exibindo `404` com um **Bowl de Açaí em cordel** no lugar do `0`, título `"This page does not exist"` e botão único `"Back to Home"` (`/`).
   - Footer com ano atualizado automaticamente via JavaScript (`© {new Date().getFullYear()} Altitude Açaí`).

---

## 5. Checklist de Execução para Subagentes (`PROGRESS.md`)

Cada subagente do **Argon 4** deve executar sua parte e registrar no `PROGRESS.md`:
- `TASK-CLEAN-1 (Agent-Frontend & Agent-Copywriter)`: Remover o texto `"Altitude Açaí"` ao lado da logo na Navbar, remover `"— FRESH SUPERFOOD BOWLS"` na Hero e remover `"STACKED BOTTOM TO TOP · 5 LAYERS"` na seção do Açaí Bowl.
- `TASK-CLEAN-2 (Agent-Frontend)`: Na seção `"What's in an Açaí Bowl?"`, remover todos os números (`01`-`05` e `1.`-`5.`), os rótulos `BASE LAYER` a `FINISH LAYER`, a frase de instrução acima do diagrama e o cabeçalho/descrição repetidos no painel direito de ingredientes.
- `TASK-CLEAN-3 (Agent-Frontend)`: Remover os números `01`, `02`, `03` acima dos Signature Bowls e remover o dropdown `"Shop Posters & Notices"` do card `Weekly Hours`.
- `TASK-FAB-4 (Agent-Frontend)`: Implementar o botão flutuante fixo `"Text us"` no canto inferior direito direcionando para o telefone `307-527-0812` (`sms:+13075270812`).
- `TASK-QA-5 (Agent-QA-DevOps)`: Validar responsividade de `320px` a `1920px`, confirmar todas as remoções, fazer commit e publicar em `https://github.com/Leccarse-s-Tech/altitude-acai-cody`.
