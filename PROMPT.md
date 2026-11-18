# PROMPT.md — Especificação Final, Limpeza do Menu e Scroll-Driven Events com Fallback (Argon 4): Altitude Açaí (Cody, WY)

## 1. Diretrizes Inegociáveis do Projeto

Este documento define a arquitetura, o design system e as regras de negócio para a landing page da **Altitude Açaí** (`https://www.altitudeacai.com/`), localizada em **1302 Beck Avenue, Cody, WY 82414**. O orquestrador **Argon 4** deve coordenar os subagentes em paralelo e registrar cada task concluída no arquivo `PROGRESS.md`.

1. **Idioma 100% Inglês (`EN-US`):** Toda a interface deve estar em inglês.
2. **Fidelidade Factual Absoluta (Zero Invenções):** É proibido inventar textos, badges como `"HOUSE FAVORITE"`, depoimentos, histórias ou promessas exageradas. Use exclusivamente os dados verificados da marca.
3. **Vitrine Institucional (Zero Preços e Zero Carrinho):** Nenhum valor monetário deve aparecer no site. Remova todas as marcações de preço dos materiais brutos (`+$1.00`, `+.50`, `+ 50¢`, `+.75 Cents`, `+ 75¢`).
4. **Proibição Global de Numerações, Kickers e Textos Redundantes (DRY na UI e no Copy):**
   - Nenhuma informação (endereço, cidade, limites de seleção de ingredientes ou contadores `3/3`) pode ser repetida múltiplas vezes na mesma seção.
   - É proibido numerar cards, bowls ou etapas (`01`, `02`, `1.`, `2.`).
5. **Repositório Oficial:** Todos os commits e o pipeline de deploy devem apontar para `https://github.com/Leccarse-s-Tech/altitude-acai-cody`.

---

## 2. Limpeza de Redundâncias na Rota `/menu` e no `Create Your Own Bowl`

### 2.1. Cabeçalho do `Official Menu` e `Signature Açaí Bowls`
1. **REMOVER do Topo Direito do Header (`Official Menu`):** Exclua a linha `"✦ All bowls start with Açaí Base and Granola"` abaixo de `"12 oz Bowl  16 oz Bowl"`. Mantenha apenas a indicação limpa dos tamanhos `12 oz Bowl` e `16 oz Bowl`.
2. **REMOVER Rótulos Inventados nos Bowls:** Exclua o kicker `"HOUSE FAVORITE"` acima de `Mountain Man`.

### 2.2. Desduplicação Radical na Seção `Create Your Own Bowl`
1. **REMOVER o Texto do Canto Superior Direito:** Exclua completamente `"PICK UP TO: 3 FRUITS, 2 TOPPINGS, 1 SAUCE"` no topo direito da seção.
2. **UNIFICAR Subtítulos e Contadores nas 3 Categorias (`Fruits`, `Toppings`, `Sauces`):**
   - **REMOVER** os subtextos abaixo dos títulos de categoria (`"Pick up to 3"`, `"Granola Base Included — Pick up to 2"` e `"Pick 1"`).
   - **SUBSTITUIR** as badges redundantes `"3 OF 3 SELECTED"`, `"2 OF 2 SELECTED"` e `"1 OF 1 SELECTED"` por um contador curto e limpo (`0/3`, `1/3`, `3/3` para Fruits; `0/2` a `2/2` para Toppings; `0/1` a `1/1` para Sauces) alinhado discretamente ao lado do título de cada categoria.
3. **LIMPAR o Rodapé do Card `"Your Bowl Mix"`:**
   - **REMOVER** o bloco textual repetitivo abaixo da ilustração da tigela (`"FRUITS (3/3): ..."`, `"TOPPINGS (2/2): ..."`, `"SAUCE (1/1): ..."`), deixando a ilustração do bowl respirar dentro do painel `"Your Bowl Mix"`.

---

## 3. Scroll-Driven Events com Fallback Obrigatório de Acessibilidade (`prefers-reduced-motion`)

1. **Comportamento dos Scroll-Driven Events (Quando Animações Estão Ativas):**
   - **Parallax Sutil nas Gravuras de Cordel (`.cordel-parallax`):** `translateY` e rotação leve (`-4deg` a `+4deg`) via `requestAnimationFrame` passivo / `animation-timeline: view()`.
   - **Transição Progressiva em `"What's in an Açaí Bowl?"` (`.bowl-layer-anim`):** acomodação sequencial fluida das 5 camadas ao entrar na viewport.
   - **Revelação Editorial das Seções (`.scroll-reveal`):** entrada suave (`fade + subtle slide-up` de `16px`).
2. **Fallback Estrito (`prefers-reduced-motion: reduce`):**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
     .scroll-reveal, .cordel-parallax, .bowl-layer-anim {
       opacity: 1 !important;
       transform: none !important;
       filter: none !important;
     }
   }
   ```
   Checar `window.matchMedia('(prefers-reduced-motion: reduce)').matches` antes de registrar qualquer listener de scroll ou `IntersectionObserver`.

---

## 4. Checklist de Execução (`PROGRESS.md`)

- `TASK-MENU-CLEAN-1`: Remover `"All bowls start with Açaí Base and Granola"` e `"HOUSE FAVORITE"` da rota `/menu`.
- `TASK-BUILDER-CLEAN-2`: No `Create Your Own Bowl`, remover `"PICK UP TO: 3 FRUITS, 2 TOPPINGS, 1 SAUCE"`, subtextos abaixo de cada categoria, pílulas `"X OF Y SELECTED"` (trocar por contador `0/3`, `0/2`, `0/1`) e a listagem repetida `"FRUITS (3/3)..."` abaixo do desenho do bowl.
- `TASK-SCROLL-3`: Implementar os Scroll-Driven Events com fallback completo para `prefers-reduced-motion: reduce`.
- `TASK-QA-4`: Testar com animações ativas e `prefers-reduced-motion: reduce` emulado no Chromium (`320px` a `1920px`), fazer commits separados e publicar em `https://github.com/Leccarse-s-Tech/altitude-acai-cody`.
