# PROMPT.md — Arquitetura, Orquestração (Argon 4) e Especificação Técnica: Altitude Açaí (Cody, WY)

## 1. Visão Geral e Diretrizes Inegociáveis do Projeto

Este documento define o plano mestre de execução para a reformulação completa da landing page da **Altitude Açaí** (`[https://www.altitudeacai.com/](https://www.altitudeacai.com/)`), localizada em **1302 Beck Avenue, Cody, WY 82414**. O projeto será executado através do orquestrador **Argon 4**, coordenando múltiplos subagentes em paralelo, onde cada subagente deve carregar suas respectivas *skills* especializadas e registrar cada avanço no arquivo `PROGRESS.md`.

* **Idioma Exclusivo da Interface:** Todo o conteúdo visível da página deve estar estritamente em **inglês (EN-US)**, respeitando a localização física em Cody, Wyoming.
* **Fidelidade Absoluta aos Dados (Zero Invenções):** É terminantemente proibido inventar ingredientes, depoimentos falsos, histórias fictícias, promessas exageradas ou dados que não constem no site oficial, nas redes sociais oficiais ou nos materiais oficiais da marca[cite: 2, 3, 4, 5, 6].
* **Posicionamento de Vitrine Institucional (Zero Preços e Zero E-Commerce):** O site atua exclusivamente como uma vitrine digital interativa e ponto de direcionamento físico/social. É proibido exibir carrinho de compras, checkout ou qualquer valor monetário — todos os acréscimos de preço presentes nos cardápios brutos (como `+$1.00`, `+.50` / `+50¢` e `+.75 Cents` / `+75¢`) devem ser removidos da interface[cite: 2, 3].
* **Direcionamento de Conversão (CTAs):** Todos os botões de ação devem encaminhar o usuário apenas para canais reais verificados: rota no Google Maps (`1302 Beck Avenue, Cody, WY 82414`), Instagram (`[https://www.instagram.com/altitude_acai](https://www.instagram.com/altitude_acai)`), Facebook (`[https://web.facebook.com/people/Altitude-A%C3%A7a%C3%AD/61561749391480/](https://web.facebook.com/people/Altitude-A%C3%A7a%C3%AD/61561749391480/)`), telefone (`307-527-0812`) ou e-mail (`altitudeacai@gmail.com`).


* **Repositório e Versionamento:** Todos os commits estruturados e a configuração de deploy contínuo devem apontar para `[https://github.com/JoaoHBatistaLeal/altitude-acai-cody.git](https://github.com/JoaoHBatistaLeal/altitude-acai-cody.git)`.

## 2. Identidade Visual, Paleta de Cores, Texturas e Ilustrações Estilo Cordel

### 2.1. Paleta de Cores Obrigatória

A interface deve utilizar exclusivamente os códigos hexadecimais definidos na paleta selecionada:

* **Jet Black (`#30343F`):** Textos principais em fundos claros, contornos de xilogravura/cordel, alto contraste tipográfico e detalhes estruturais.


* **Ghost White (`#FAFAFF`):** Superfície clara principal com textura de papel artesanal/algodão, textos sobre fundos escuros e áreas de respiro.


* **Periwinkle (`#E4D9FF`):** Destaques suaves, badges de ingredientes, fundos secundários iluminados e estados de hover.


* **Lavender Grey (`#8687B4`):** Textos secundários, bordas ornamentais sutis, divisores e ícones de apoio.


* **Dusty Grape (`#575E8F`):** Cards intermediários, camadas de ilustração de fundo e cabeçalhos de subseções.


* **Twilight Indigo (`#273469`):** Seções de contraste profundo, botões primários e molduras de destaque.


* **Space Indigo (`#1E2749`):** Navbar, rodapé institucional, seções imersivas noturnas/montanhosas e sombras sólidas em estilo xilogravura.



### 2.2. Direção de Arte: Texturas Táteis e Xilogravura / Cordel

* **Proibição de Design Chapado (Flat Design):** Nenhuma seção pode ter cor sólida pura sem tratamento de superfície; aplique texturas de papel aquarela, fibra rústica de madeira, granulação orgânica (`SVG feTurbulence` com opacidade controlada entre 3% e 6%) e bordas entalhadas inspiradas nos materiais gráficos originais da marca.


* **Ilustrações Autorais Estilo Cordel / Woodcut no Background:** O subagente de mídia deve gerar ilustrações vetoriais ou imagens de alta resolução utilizando a chave de API do **Google AI Studio** ou o **MCP de navegador conectado ao Google Flow**. As ilustrações devem retratar em traço de xilogravura/cordel (linhas entalhadas em `#1E2749`, `#30343F` e `#575E8F` sobre fundo `#FAFAFF` ou `#E4D9FF`):


* As montanhas de Cody/Wyoming com o sol ao fundo e ramos de açaí inspirados na logo oficial.


* Frutas reais do cardápio: morangos, bananas, mirtilos (blueberries), amoras (blackberries), framboesas (raspberries), abacaxi e manga[cite: 2, 3].
* Toppings e elementos do preparo: tigelas (bowls), favos e colher de mel (honey dipper), sementes, granola, lascas de coco e amêndoas[cite: 2, 3, 5].



## 3. Conteúdo Verificado e Arquitetura de Dados (100% Fiel)

### 3.1. Seção Institucional: "What's in an Açaí Bowl?"

Esta seção deve apresentar um diagrama interativo em camadas (de baixo para cima) acompanhado do texto institucional literal extraído do site oficial:

* **Camada 1 (Base):** `ACAI SORBET` — base cremosa e refrescante de sorbet de açaí.


* **Camada 2:** `CRUNCH` — camada crocante de granola inclusa em todos os bowls[cite: 2, 3, 5].
* **Camada 3:** `FAVORITE FRUIT` — seleção de frutas frescas fatiadas.


* **Camada 4:** `TOPPING` — sementes, castanhas e superfoods.


* **Camada 5 (Topo):** `SAUCE` — finalização com calda ou pasta artesanal.


* **Copy Oficial Obrigatória (sem alterações):**
> "An Açaí Bowl is your ultimate build-your-own adventure in a bowl—starting with our delicious, nutrient-rich superfood base: smooth, refreshing açaí sorbet. From there, it's all about YOU. Layer in your choice of CRUNCH, your favorite fruits, mouthwatering toppings, and a drizzle of sauce to finish it off. Every bowl is a perfect mix of flavor, texture, and feel-good energy—fresh, fun, and made exactly how you like it."
> 
> 



### 3.2. Tamanhos e Base Padrão

* **Tamanhos Disponíveis (Apenas Informativo, Sem Preços):** `12 oz Bowl` e `16 oz Bowl`.


* **Regra de Base:** `"All bowls start with Açaí Base and Granola"` / `"Açaí Sorbet Base and Granola"`[cite: 2, 3].

### 3.3. Cardápio Completo: Signature Açaí Bowls (Sem Preços)

Exibir todos os 6 bowls assinados consolidando os dados oficiais do PDF e do cardápio visual da loja, omitindo qualquer valor adicional[cite: 2, 3]:

* **Mountain Man:** Bananas, Strawberries, Blueberries, Hemp Hearts, Chia Seeds, Peanut Butter, Honey[cite: 2, 3].
* **Montana Mama:** Pineapples, Strawberries, Blackberries, Coconut Shavings, Dark Chocolate Shavings, Honey[cite: 2, 3].
* **Goldilocks:** Pineapples, Mangos, Bananas, Coconut Shavings, Almonds, Dark Chocolate Sauce[cite: 2, 3].
* **Bear Attack:** Blackberries, Raspberries, Strawberries, Pumpkin Seeds, Bee Pollen, Honey[cite: 2, 3].
* **T-Rux:** Extra Bananas, Blueberries, Rolled Oats, Graham Crackers, Nutella[cite: 2, 3].
* **SQUATch Protein Bowl:** Protein Granola, Blackberries/Raspberries, Pumpkin Seeds, Hemp Hearts, Peanut Butter, Honey (remover a marcação `+ $1.00`).



### 3.4. Seção Interativa: "Create Your Own Bowl" (Simulador Visual de Vitrine, Sem Checkout)

Permitir que o visitante explore ou simule visualmente a combinação do seu bowl seguindo a regra oficial (`Pick up to: 3 Fruits, 2 Toppings, 1 Sauce` sobre `Açaí Sorbet Base and Granola`), sem exibir preços de upgrade[cite: 2, 3]:

* **Fruits (Pick up to 3):** Strawberries, Blueberries, Blackberries, Mango, Pineapple, Bananas, Raspberries (remover a marcação `+.50` / `+ 50¢`)[cite: 2, 3].
* **Toppings (Granola Base Included — Pick up to 2):** Hemp Hearts, Coconut Shavings, Slivered Almonds, Dark Chocolate Shavings, Pumpkin Seeds, Bee Pollen, Chia Seeds, Rolled Oats, Graham Crackers, Flax Seeds, Protein Granola Upgrade (remover a marcação `+ .75 Cents` / `+ 75¢`)[cite: 2, 3].
* **Sauces (Pick 1):** Dark Chocolate, Peanut Butter, Almond Butter, Nutella, Honey[cite: 2, 3].

## 4. Motor Frontend de Horários Sazonais Automáticos (Zero Backend)

A landing page deve conter um módulo puro em JavaScript/TypeScript no frontend que detecta automaticamente a data e hora atual nos Estados Unidos utilizando a API nativa `Intl.DateTimeFormat` configurada para o fuso horário de Cody, Wyoming (`timeZone: 'America/Denver'`).

### 4.1. Regras de Horários Verificados por Temporada

* **Summer Hours (Verão):**
* **Funcionamento Diário:** 7 dias por semana, das `7:30 AM` às `2:30 PM`.


* **Turno Extra de Fim de Semana:** Sextas e Sábados (`Friday and Saturdays`), também das `5:00 PM` às `8:00 PM`.




* **Fall Hours (Outono — A partir de Outubro / Starting in October):**
* **Sunday:** `11:00 AM - 2:00 PM`
* **Monday:** `CLOSED`
* **Tuesday:** `CLOSED`
* **Wednesday:** `8:00 AM - 2:00 PM`
* **Thursday:** `8:00 AM - 2:00 PM`
* **Friday:** `8:00 AM - 2:00 PM`
* **Saturday:** `8:00 AM - 2:00 PM`


* **Winter Hours (Inverno):**
* **Sunday, Monday, Tuesday:** `CLOSED`.


* **Wednesday, Thursday, Friday, Saturday:** `OPEN 8:00 AM - 2:00 PM`.




* **Spring Hours (Primavera):**
* O Subagente de Investigação deve verificar no Instagram (`@altitude_acai`) e Facebook oficial se há postagem específica de horários de primavera; caso a loja mantenha a grade de inverno/outono até o início do verão, o módulo deve aplicar a regra verificada de transição e exibir um aviso claro como *"Seasonal hours automatically updated for Cody, WY — check our Instagram @altitude_acai for weather or holiday updates"*.





### 4.2. Comportamento Inteligente na UI

* **Detecção Automática de Estação e Status em Tempo Real:** O componente lê o mês, dia do mês, dia da semana e horário local em `America/Denver`, destaca automaticamente a temporada vigente (`Summer`, `Fall`, `Winter` ou `Spring`), destaca o dia da semana atual e exibe um badge dinâmico (`Open Now in Cody, WY` ou `Currently Closed — Opens [Day] at [Time]`).
* **Seletor de Consulta Sazonal:** Embora a estação atual venha selecionada automaticamente sem necessidade de alterar código, o usuário pode clicar em abas (`Summer`, `Fall`, `Winter`, `Spring`) caso queira planejar uma visita futura em outra estação do ano.



## 5. Orquestração Argon 4: Subagentes Paralelos, Skills e `PROGRESS.md`

O orquestrador **Argon 4** deve instanciar os subagentes abaixo em paralelo. **Regra obrigatória:** Ao concluir qualquer task ou subtask, o subagente responsável deve atualizar imediatamente o arquivo `PROGRESS.md` na raiz do repositório com timestamp, status (`[DONE]`, `[IN PROGRESS]`, `[BLOCKED]`), artefatos gerados e hash do commit.

### Subagente 1: Investigação e Auditoria de Dados (`Agent-Investigator`)

* **Skills Requeridas:** Ferramentas de navegação web, scraping ético, inspeção de redes sociais e Google Maps.
* **Escopo:**
1. Inspecionar `[https://www.altitudeacai.com/](https://www.altitudeacai.com/)`, `[https://www.instagram.com/altitude_acai](https://www.instagram.com/altitude_acai)` e `[https://web.facebook.com/people/Altitude-A%C3%A7a%C3%AD/61561749391480/](https://web.facebook.com/people/Altitude-A%C3%A7a%C3%AD/61561749391480/)`.
2. Extrair coordenadas exatas e URL de embed/rota do Google Maps para `1302 Beck Avenue, Cody, WY 82414`.


3. Verificar se existem anúncios de horários de Primavera (Spring) ou avisos sazonais adicionais nas redes sociais sem inventar nenhum dado.
4. Consolidar o arquivo `src/data/verified-brand-data.json` contendo apenas informações 100% comprovadas[cite: 2, 3, 4, 5, 6].



### Subagente 2: Direção de Arte e Geração de Mídia (`Agent-Art-Cordel`)

* **Skills Requeridas:** Integração com API do Google AI Studio (`GEMINI_API_KEY`) e/ou Browser MCP com **Google Flow**, otimização de SVGs e texturas. 
NÃO VAZAR CREDENCIAIS

* **Escopo:**
1. Gerar ilustrações autorais em estilo **Cordel / Xilogravura (Woodcut)** utilizando exclusivamente as cores `#1E2749`, `#273469`, `#575E8F`, `#8687B4`, `#E4D9FF`, `#FAFAFF` e `#30343F`.



2. Criar gravuras de fundo para cada seção: montanhas de Wyoming com sol e bagas de açaí, frutas cortadas (morango, banana, abacaxi, manga, mirtilo, amora, framboesa)[cite: 2, 3], tigelas de açaí com granola e fio de mel, e paisagem de inverno/verão para a seção de horários.


3. Criar texturas leves de papel artesanal e entalhe em madeira para garantir que nenhum fundo do site pareça chapado.

4. Criar imagens e vídeos de bowls de açaí e/ou ingredientes naturais frescos que vão no bowl (usar no site em formato .webp para performance)



### Subagente 3: Copywriting e Revisão Editorial (`Agent-Copywriter`)

* **Skills Requeridas:** `human-style-writing` (prosa natural, humana, sem clichês robóticos de IA).
* **Escopo:**
1. Estruturar todos os textos da interface em inglês natural, direto e autêntico, mantendo intacto o parágrafo oficial de *"What's in an Acai Bowl???"*.


2. Auditar rigorosamente todas as strings do projeto para garantir **zero preços**, **zero promessas exageradas** e **zero informações inventadas**[cite: 2, 3].
3. Redigir microcopies claros para os CTAs de redirecionamento (Google Maps, Instagram `@altitude_acai`, Facebook, telefone `307-527-0812` e e-mail `altitudeacai@gmail.com`).





### Subagente 4: Arquitetura Frontend e Lógica Sazonal (`Agent-Frontend`)

* **Skills Requeridas:** Desenvolvimento web moderno (React/Next.js, Astro ou Angular + Tailwind CSS), animações sutis e engenharia de fuso horário.
* **Escopo:**
1. Configurar o design system com as 7 variáveis de cor exatas (`#30343F`, `#FAFAFF`, `#E4D9FF`, `#8687B4`, `#575E8F`, `#273469`, `#1E2749`) e camadas de textura tátil.


2. Implementar o componente interativo de anatomia do Açaí Bowl (5 camadas: `ACAI SORBET`, `CRUNCH`, `FAVORITE FRUIT`, `TOPPING`, `SAUCE`).


3. Implementar a vitrine dos 6 Signature Bowls (`Mountain Man`, `Montana Mama`, `Goldilocks`, `Bear Attack`, `T-Rux`, `SQUATch Protein Bowl`) e o visualizador interativo `Create Your Own Bowl` (3 Fruits, 2 Toppings, 1 Sauce) sem preços ou carrinho[cite: 2, 3].
4. Desenvolver o motor `SeasonalHoursEngine` baseado no fuso `America/Denver` com testes unitários cobrindo datas de Primavera, Verão, Outono e Inverno.





### Subagente 5: QA, Responsividade Multi-Device e Deploy (`Agent-QA-DevOps`)

* **Skills Requeridas:** Testes end-to-end/responsividade (Playwright/Browser MCP), Git e CI/CD.
* **Escopo:**
1. Testar a renderização visual, legibilidade das texturas/ilustrações de cordel e navegação touch em viewports de Smartphone (`375px`, `390px`), Tablet (`768px`, `1024px`) e Desktop (`1440px`, `1920px`).
2. Validar que todos os links externos (Google Maps `1302 Beck Avenue, Cody, WY 82414`, Instagram, Facebook, `tel:307-527-0812`, `mailto:altitudeacai@gmail.com`) abrem corretamente.


3. Configurar o repositório remoto `[https://github.com/JoaoHBatistaLeal/altitude-acai-cody.git](https://github.com/JoaoHBatistaLeal/altitude-acai-cody.git)`, realizar commits semânticos por etapa e configurar o pipeline de deploy automático (GitHub Pages / Vercel / Cloudflare Pages).



## 6. Cronograma de Etapas e Tasks (Estrutura Obrigatória do `PROGRESS.md`)

Cada subagente deve manter o arquivo `PROGRESS.md` atualizado seguindo exatamente esta matriz de execução:

* **ETAPA 1: Descoberta, Extração e Validação Factual**
* `TASK-1.1`: Extração completa do site `[https://www.altitudeacai.com/](https://www.altitudeacai.com/)`, Instagram e Facebook oficiais.
* `TASK-1.2`: Validação de endereço, mapa e consolidação dos horários de Verão, Outono, Inverno e Primavera.


* `TASK-1.3`: Geração do arquivo imutável de dados do cardápio sem preços[cite: 2, 3].


* **ETAPA 2: Identidade Visual, Texturas e Ilustrações de Cordel**
* `TASK-2.1`: Configuração dos tokens de cores (`#30343F` a `#1E2749`) e texturas orgânicas de papel/xilogravura.


* `TASK-2.2`: Geração via API AI Studio / Google Flow MCP das ilustrações estilo cordel de montanhas, frutas, toppings e caldas[cite: 2, 3, 5].


* `TASK-2.3`: Otimização dos assets visuais (WebP/SVG) para carregamento instantâneo em dispositivos móveis.


* **ETAPA 3: Desenvolvimento dos Componentes e Motor Sazonal**
* `TASK-3.1`: Construção da Hero Section com logo oficial, estética de xilogravura montanhosa e CTAs diretos para Maps e Instagram.


* `TASK-3.2`: Implementação da seção interativa *"What's in an Acai Bowl???"* com as 5 camadas e copy oficial.


* `TASK-3.3`: Implementação do catálogo *Signature Açaí Bowls* e do montador visual *Create Your Own Bowl* (12 oz / 16 oz, sem preços)[cite: 2, 3].
* `TASK-3.4`: Implementação do motor automático de horários por estação nos EUA (`America/Denver`) sem necessidade de backend.


* `TASK-3.5`: Construção da seção *Location & Contact* com mapa interativo de `1302 Beck Avenue, Cody, WY 82414`, telefone `307-527-0812` e e-mail `altitudeacai@gmail.com`.




* **ETAPA 4: Auditoria de Qualidade, Responsividade e Deploy**
* `TASK-4.1`: Testes automatizados de responsividade em mobile, tablet e desktop e verificação de contraste sobre fundos texturizados.


* `TASK-4.2`: Auditoria anti-alucinação (garantia de zero preços, zero carrinho, 100% inglês e 100% dados reais)[cite: 2, 3, 4, 5].
* `TASK-4.3`: Push para `[https://github.com/JoaoHBatistaLeal/altitude-acai-cody.git](https://github.com/JoaoHBatistaLeal/altitude-acai-cody.git)`, ativação do deploy em produção e atualização final do `PROGRESS.md`.