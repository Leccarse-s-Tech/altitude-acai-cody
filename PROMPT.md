# PROMPT.md — Especificação Completa e Correções de UI/UX (Argon 4): Altitude Açaí (Cody, WY)

## 1. Diretrizes Inegociáveis do Projeto

Este documento define a arquitetura, o design system e as regras de negócio para a landing page da **Altitude Açaí** (`https://www.altitudeacai.com/`), localizada em **1302 Beck Avenue, Cody, WY 82414**. O orquestrador **Argon 4** deve coordenar os subagentes em paralelo e registrar cada task concluída no arquivo `PROGRESS.md`.

1. **Idioma 100% Inglês (`EN-US`):** Toda a interface deve estar em inglês.
2. **Fidelidade Factual Absoluta (Zero Invenções):** É proibido inventar textos, depoimentos, histórias ou promessas exageradas. Use exclusivamente os dados verificados da marca.
3. **Vitrine Institucional (Zero Preços e Zero Carrinho):** Nenhum valor monetário deve aparecer no site. Remova todas as marcações de preço dos materiais brutos (`+$1.00`, `+.50`, `+ 50¢`, `+.75 Cents`, `+ 75¢`).
4. **Corte Global de Repetições (DRY na UI e no Copy):**
   - Nenhuma informação (endereço, cidade, regras de base, tamanho de tigela ou horário de abertura) pode ser repetida várias vezes na mesma seção ou dentro do mesmo card.
   - O endereço `1302 Beck Avenue, Cody, WY 82414` deve aparecer apenas na seção `Visit Us` e no Footer.
5. **Repositório Oficial:** Todos os commits e o pipeline de deploy devem apontar para `https://github.com/Leccarse-s-Tech/altitude-acai-cody`.

---

## 2. Identidade Visual, Paleta de Cores e Background Cordel Espalhado por Todo o Site

### 2.1. Paleta de Cores Exclusiva
Utilize estritamente os 7 códigos hexadecimais abaixo:
- `#30343F` (Jet Black)
- `#FAFAFF` (Ghost White)
- `#E4D9FF` (Periwinkle)
- `#8687B4` (Lavender Grey)
- `#575E8F` (Dusty Grape)
- `#273469` (Twilight Indigo)
- `#1E2749` (Space Indigo)

### 2.2. Ilustrações Estilo Cordel / Xilogravura Espalhadas pelo Background Global
- **Proibição de Enfileiramento Rígido ou Caixas Isoladas:** Não coloque as frutas alinhadas em uma fileira reta no topo de uma única seção (como em `Create Your Own Bowl`) e não prenda os ícones dentro de quadros isolados com linhas tracejadas.
- **Distribuição Orgânica em Todas as Seções (`/` e `/menu`):** As gravuras em estilo cordel/xilogravura — incluindo morangos (`Strawberries`), bananas (`Bananas`), mirtilos (`Blueberries`), amoras (`Blackberries`), framboesas (`Raspberries`), abacaxi (`Pineapple`), manga (`Mango`), lascas de coco (`Coconut Shavings`), amêndoas (`Almonds`), favo e pegador de mel (`Honey`), sementes (`Chia`, `Pumpkin Seeds`, `Hemp Hearts`, `Flax`), aveia (`Rolled Oats`) e tigelas de açaí — devem ser distribuídas de maneira orgânica, variada e espalhada por todo o fundo da página (cantos, laterais e espaços de respiro de todas as seções).
- **Acabamento Visual e Guardrail Semiótico:**
  - Posicione os elementos no background com `position: absolute; pointer-events: none; z-index: 0;`, rotações sutis variadas (`-12deg` a `+15deg`), escalas diversas e opacidade suave (`0.08` a `0.16`) combinada com a textura de papel artesanal/xilogravura.
  - Nas ilustrações de montanha com sol, é terminantemente proibido usar raios retos radiais (padrão sunburst/imperial). Use sempre sol liso com nuvens onduladas orgânicas e hachuras curvas de xilogravura.

---

## 3. Regras Específicas para Horários Sazonais, Relógio e Food Truck

### 3.1. Limpeza do Widget Escuro de Relógio em Tempo Real
No card escuro que exibe o horário atual de Cody (`11:35 AM MST` e a data `Tuesday, November 17, 2026`):
1. **REMOVER:** O texto `"Mountain Time"` no canto superior esquerdo.
2. **REMOVER:** A badge `"Fall Hours"` (ou nome da estação) no canto superior direito.
3. **REMOVER DUPLICAÇÃO INTERNA:** Dentro da caixa de status, exiba apenas uma linha concisa (`"Currently Closed — Opens Wednesday at 8:00 AM"` ou `"Open Now — Closes at 2:00 PM"`), eliminando a segunda linha repetida logo abaixo.

### 3.2. Limpeza e Alinhamento de Altura dos Cards da Aba de Horários (`Hours`)
Na seção comparativa de horários sazonais (composta pela coluna esquerda com os seletores `Summer`, `Fall`, `Winter`, `Spring` + card descritivo da estação, e pela coluna direita com o card `Weekly Hours`):
1. **REMOVER do Card Esquerdo:** A badge de meses no canto superior direito (`September - November`, `December - February`, etc.).
2. **REMOVER do Card Direito (`Weekly Hours`):** O texto `"Times follow Mountain Time (America/Denver)."` no canto superior direito do cabeçalho.
3. **IGUALAR O TAMANHO DOS CARDS (Equal Height Layout):**
   - Utilize `display: grid` com `align-items: stretch` no container principal de duas colunas (`lg:grid-cols-12 lg:items-stretch`).
   - A coluna da esquerda (`flex flex-col h-full`) deve fazer com que o card descritivo da estação (`flex-1 flex flex-col justify-between`) estique verticalmente até alinhar a borda inferior exatamente na mesma linha horizontal que a borda inferior do card `"Weekly Hours"` da direita. Ambos os lados devem ter exatamente a mesma altura total no desktop.

### 3.3. Dados Sazonais Automáticos no Frontend (`America/Denver`)
O cálculo automático de estação e horário local permanece 100% no frontend sem necessidade de alterar código:
- **Summer Hours:** 7 dias por semana das `7:30 AM - 2:30 PM`, mais Sextas e Sábados das `5:00 PM - 8:00 PM`.
- **Fall Hours (Starting in October):** Sunday `11:00 AM - 2:00 PM`; Monday & Tuesday `CLOSED`; Wednesday a Saturday `8:00 AM - 2:00 PM`.
- **Winter Hours:** Sunday, Monday & Tuesday `CLOSED`; Wednesday a Saturday `8:00 AM - 2:00 PM`.
- **Spring Hours:** Transição automática no fuso `America/Denver` com abas clicáveis para consulta.

### 3.4. Substituição da Seção de Eventos do Food Truck
1. **REMOVER COMPLETAMENTE:** Todos os cards de eventos fixos (`Cody Concerts in the Park`, `Cody Wyoming Softball Tournament`, `Cody Soccer Tournament`, `Cody Stampede Rodeo`, `Cody Warriors Lacrosse Tournament`) e quaisquer datas/locais de torneios hardcoded.
2. **SUBSTITUIR POR:** Um único card/banner institucional limpo intitulado `"Food Truck & Local Events"`, informando que a agenda do Food Truck e participações em eventos da comunidade variam ao longo do ano e direcionando o usuário com CTAs diretos para checar as atualizações em tempo real no Instagram (`@altitude_acai`) e no Facebook oficial da Altitude Açaí.

---

## 4. Arquitetura de Rotas (`/`, `/menu`, `404`) e Footer Dinâmico

### 4.1. Rota `/` (Home) e Rota `/menu` (Cardápio Completo)
- **Home (`/`):** Apresenta a Hero Section sem repetições de endereço, a seção `"What's in an Açaí Bowl?"` com as 5 camadas (`ACAI SORBET`, `CRUNCH`, `FAVORITE FRUIT`, `TOPPING`, `SAUCE`) e o texto institucional original, preview enxuto de bowls levando para `/menu`, seção de Horários Sazonais corrigida, banner único de Food Truck para redes sociais e seção `Visit Us` (`1302 Beck Avenue, Cody, WY 82414`, `307-527-0812`, `altitudeacai@gmail.com`).
- **Menu (`/menu`):** Exibe tamanhos (`12 oz Bowl` e `16 oz Bowl`) e regra base (`All bowls start with Açaí Base and Granola`) uma única vez no topo, os 6 Signature Bowls (`Mountain Man`, `Montana Mama`, `Goldilocks`, `Bear Attack`, `T-Rux`, `SQUATch Protein Bowl`) e o simulador visual `Create Your Own Bowl` (`3 Fruits`, `2 Toppings`, `1 Sauce`) com todas as opções reais do PDF e zero preços, cercado pelas gravuras de cordel espalhadas organicamente pelo fundo da página.

### 4.2. Rota de Erro `404` Personalizada
- Sem Navbar e sem Footer.
- Número `404` centralizado em destaque onde os dois dígitos `4` ladeiam uma ilustração estilo xilogravura/cordel de um **Bowl de Açaí** no lugar do dígito `0`.
- Apenas o título `"This page does not exist"` e um botão único `"Back to Home"` apontando para `/`.

### 4.3. Atualização Automática do Ano no Footer
- No rodapé (`Footer`), o ano do copyright nunca deve ser fixo no código. Implemente dinamicamente via JavaScript/TypeScript (`new Date().getFullYear()`):
  `© {new Date().getFullYear()} Altitude Açaí`

---

## 5. Checklist de Execução para Subagentes (`PROGRESS.md`)

Cada subagente do **Argon 4** deve executar sua parte e registrar no `PROGRESS.md`:
- `TASK-FIX-1 (Agent-Frontend)`: Remover a seção de eventos fixos do Food Truck e substituir pelo card único de redirecionamento para Instagram/Facebook.
- `TASK-FIX-2 (Agent-Frontend)`: Remover os textos marcados com X no widget de relógio (`Mountain Time` e badge `Fall Hours` + linha duplicada de abertura) e na seção de horários (badge de meses `September - November` e texto `Times follow Mountain Time (America/Denver).`), igualando a altura total da coluna esquerda com o card `Weekly Hours` da direita (`items-stretch` / `h-full`).
- `TASK-FIX-3 (Agent-Frontend)`: Tornar o ano do copyright no Footer 100% dinâmico (`new Date().getFullYear()`).
- `TASK-FIX-4 (Agent-Art-Cordel & Agent-Frontend)`: Desfazer a fileira única de frutas no topo do `Create Your Own Bowl` e espalhar as gravuras de frutas, sementes, mel e bowls em estilo cordel de forma orgânica por todo o background do site (`/` e `/menu`).
- `TASK-FIX-5 (Agent-QA-DevOps)`: Validar responsividade de `320px` a `1920px`, confirmar o alinhamento de altura dos cards de horário, fazer commit e publicar em `https://github.com/Leccarse-s-Tech/altitude-acai-cody`.
