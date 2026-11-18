import fs from 'node:fs';
import path from 'node:path';
import { createElement } from 'react';
import { cleanup, fireEvent, render, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from '../../App';
import {
  VERBATIM_FOUNDER_STORY_COPY,
  VERBATIM_WHATS_IN_A_BOWL_COPY,
} from '../../data/editorial-copy';
import brandData from '../../data/verified-brand-data.json';

const PROJECT_ROOT = path.resolve(__dirname, '..', '..', '..');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');

function collectFilesRecursively(dirPath: string, extension: string): string[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const results: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFilesRecursively(fullPath, extension));
    } else if (entry.isFile() && fullPath.endsWith(extension)) {
      results.push(fullPath);
    }
  }

  return results;
}

function extractStringValues(node: unknown): string[] {
  if (typeof node === 'string') {
    return [node];
  }
  if (Array.isArray(node)) {
    return node.flatMap(extractStringValues);
  }
  if (node !== null && typeof node === 'object') {
    return Object.values(node).flatMap(extractStringValues);
  }
  return [];
}

function stripTemplateInterpolations(source: string): string {
  return source.replace(/\$\{/g, '{');
}

function getAllSourceFiles(): Array<{ filePath: string; content: string }> {
  const componentFiles = collectFilesRecursively(path.join(SRC_DIR, 'components'), '.tsx');
  const pageFiles = collectFilesRecursively(path.join(SRC_DIR, 'pages'), '.tsx');
  const targetFiles = [
    path.join(SRC_DIR, 'data', 'verified-brand-data.json'),
    path.join(SRC_DIR, 'data', 'editorial-copy.ts'),
    path.join(SRC_DIR, 'App.tsx'),
    ...componentFiles,
    ...pageFiles,
  ];

  return targetFiles.map((filePath) => ({
    filePath: path.relative(PROJECT_ROOT, filePath),
    content: fs.readFileSync(filePath, 'utf8'),
  }));
}

function collectRenderedTextAndLabels(container: HTMLElement): string {
  const textContent = container.textContent ?? '';
  const ariaLabels = Array.from(container.querySelectorAll('[aria-label]')).map(
    (el) => el.getAttribute('aria-label') ?? '',
  );
  const altTexts = Array.from(container.querySelectorAll('img[alt]')).map(
    (el) => el.getAttribute('alt') ?? '',
  );
  const iframeTitles = Array.from(container.querySelectorAll('iframe[title]')).map(
    (el) => el.getAttribute('title') ?? '',
  );

  return [textContent, ...ariaLabels, ...altTexts, ...iframeTitles].join(' ');
}

function renderRoute(pathname: string) {
  window.history.pushState({}, '', pathname);
  return render(createElement(App));
}

afterEach(() => {
  cleanup();
  window.history.pushState({}, '', '/');
});

describe('Anti-Hallucination, Multi-Route, DRY & Semiotic Compliance Audit', () => {
  describe('Source file compliance scans & semiotic Cordel guardrails', () => {
    const sourceFiles = getAllSourceFiles();

    it('contains ZERO price symbols or monetary upcharge strings in source copy, pages, and components', () => {
      const bannedPricePatterns: RegExp[] = [
        /\$/,
        /¢/,
        /\+\s*\.50/,
        /\+\s*\.75/,
        /\+\s*1\.00/,
        /\b75\s+cents\b/i,
        /\b50\s+cents\b/i,
        /\b\d+\.\d{2}\s*(?:usd|dollars?)\b/i,
      ];

      for (const value of extractStringValues(brandData)) {
        for (const pattern of bannedPricePatterns) {
          expect(value, `verified-brand-data.json matched ${pattern}: ${value}`).not.toMatch(
            pattern,
          );
        }
      }

      for (const file of sourceFiles) {
        const sanitized = stripTemplateInterpolations(file.content);
        for (const pattern of bannedPricePatterns) {
          expect(sanitized, `${file.filePath} matched banned price pattern ${pattern}`).not.toMatch(
            pattern,
          );
        }
      }
    });

    it('contains ZERO e-commerce, cart, or checkout terminology in source copy, pages, and components', () => {
      const bannedEcommercePatterns: RegExp[] = [
        /\badd to cart\b/i,
        /\bshopping cart\b/i,
        /\bcheckout\b/i,
        /\bbuy now\b/i,
        /\border online\b/i,
        /\byour cart\b/i,
        /\bshopping bag\b/i,
        /\bsubtotal\b/i,
      ];

      for (const file of sourceFiles) {
        for (const pattern of bannedEcommercePatterns) {
          expect(
            file.content,
            `${file.filePath} matched banned e-commerce term ${pattern}`,
          ).not.toMatch(pattern);
        }
      }
    });

    it('includes all 7 mandatory Cordel/Woodcut palette hex codes in src/index.css', () => {
      const cssContent = fs.readFileSync(path.join(SRC_DIR, 'index.css'), 'utf8').toUpperCase();
      const mandatoryPalette = [
        '#30343F',
        '#FAFAFF',
        '#E4D9FF',
        '#8687B4',
        '#575E8F',
        '#273469',
        '#1E2749',
      ] as const;

      for (const hex of mandatoryPalette) {
        expect(cssContent, `Missing mandatory palette color ${hex} in src/index.css`).toContain(hex);
      }
    });

    it('enforces semiotic Cordel illustration guardrails and frameless transparent asset prints', () => {
      const wyomingSvg = fs.readFileSync(
        path.join(PROJECT_ROOT, 'public', 'assets', 'cordel', 'wyoming-mountains-cordel.svg'),
        'utf8',
      );
      const seasonalSvg = fs.readFileSync(
        path.join(PROJECT_ROOT, 'public', 'assets', 'cordel', 'seasonal-peaks-woodcut.svg'),
        'utf8',
      );
      const fruitsSvg = fs.readFileSync(
        path.join(PROJECT_ROOT, 'public', 'assets', 'cordel', 'fruits-woodcut-frieze.svg'),
        'utf8',
      );
      const toppingsSvg = fs.readFileSync(
        path.join(PROJECT_ROOT, 'public', 'assets', 'cordel', 'toppings-honey-woodcut.svg'),
        'utf8',
      );
      const bowl404Svg = fs.readFileSync(
        path.join(PROJECT_ROOT, 'public', 'assets', 'cordel', 'cordel-bowl-404.svg'),
        'utf8',
      );

      for (const [name, svg] of [
        ['wyoming-mountains-cordel.svg', wyomingSvg],
        ['seasonal-peaks-woodcut.svg', seasonalSvg],
      ] as const) {
        expect(svg, `${name} must not contain sunbeams or sunburst motifs`).not.toMatch(
          /sunbeam|sunburst|radiating/i,
        );
        expect(svg, `${name} must use curved Bézier organic gouges`).toMatch(/<path[^>]*\sQ\d+/);
      }

      const wyomingSunMatch = wyomingSvg.match(/<g id="cordel-sun">([\s\S]*?)<\/g>/);
      expect(wyomingSunMatch).not.toBeNull();
      expect(wyomingSunMatch![1]).not.toMatch(/<line\b/);

      const seasonalSunMatch = seasonalSvg.match(/<g id="summer-natural-sun">([\s\S]*?)<\/g>/);
      expect(seasonalSunMatch).not.toBeNull();
      expect(seasonalSunMatch![1]).not.toMatch(/<line\b/);

      expect(wyomingSvg).toContain('id="cordel-clouds"');
      expect(wyomingSvg).toContain('id="cordel-organic-sky"');
      expect(wyomingSvg).toContain('id="alpine-pines"');
      expect(wyomingSvg).toContain('id="acai-branches-left"');

      expect(seasonalSvg).toContain('id="summer-clouds"');
      expect(seasonalSvg).toContain('id="summer-organic-sky"');
      expect(seasonalSvg).toContain('id="summer-flora-pines"');

      // Frameless transparent ingredient sheets (no outer frame box rects)
      expect(fruitsSvg).not.toContain('width="1180" height="260"');
      expect(toppingsSvg).not.toContain('width="980" height="300"');

      // 404 Bowl illustration contains expected toppings & spoon
      expect(bowl404Svg).toContain('id="cordel-spoon"');
      expect(bowl404Svg).toContain('id="bowl404-bananas"');
      expect(bowl404Svg).toContain('id="bowl404-strawberries"');
      expect(bowl404Svg).toContain('id="bowl404-blueberries"');
    });
  });

  describe('Route / (Home) DRY Law & Content Verification', () => {
    it('enforces exact Hero copy, 5-layer bowl anatomy, 3-bowl preview, and ZERO DRY repetitions', () => {
      const { container } = renderRoute('/');

      // Header logo-only crest (ZERO "Altitude Açaí" text beside logo) & links
      const header = container.querySelector('header') as HTMLElement;
      expect(header.querySelector('img[src*="logo-official.webp"]')).not.toBeNull();
      expect(header.textContent).not.toContain('Altitude Açaí');

      const nav = container.querySelector('header nav');
      expect(nav).not.toBeNull();
      expect(within(nav as HTMLElement).getByText('Inside a Bowl')).toBeInTheDocument();
      expect(within(nav as HTMLElement).getByText('Menu')).toBeInTheDocument();
      expect(within(nav as HTMLElement).getByText('Hours')).toBeInTheDocument();
      expect(within(nav as HTMLElement).getByText('Visit Us')).toBeInTheDocument();

      // Hero exact copy & CTAs (ZERO "FRESH SUPERFOOD BOWLS" kicker, zero bottom mountain box)
      const hero = container.querySelector('#top') as HTMLElement;
      expect(hero).not.toBeNull();
      expect(hero.textContent).not.toMatch(/FRESH SUPERFOOD BOWLS/i);
      expect(hero.querySelector('img[src*="wyoming-mountains-cordel.svg"]')).toBeNull();
      expect(within(hero).getByRole('heading', { level: 1 })).toHaveTextContent(
        'Handcrafted Açaí Bowls in Cody, Wyoming',
      );
      expect(hero.textContent).toContain(
        'Smooth açaí sorbet layered with crunchy granola, fresh fruit, and your favorite toppings.',
      );
      expect(within(hero).getByRole('link', { name: /Explore Full Menu/i })).toHaveAttribute(
        'href',
        '/menu',
      );
      expect(within(hero).getByRole('link', { name: /Get Directions/i })).toBeInTheDocument();

      // DRY checks on Hero
      expect(hero.textContent).not.toMatch(/1302\s+Beck/i);
      expect(hero.textContent).not.toMatch(/307-527-0812/);
      expect(hero.textContent).not.toMatch(/altitudeacai@gmail\.com/i);
      expect(hero.textContent).not.toMatch(/12\s*oz|16\s*oz/i);

      // Bowl Anatomy: zero kickers, zero numbering, zero technical role labels, direct ingredient list
      const anatomy = container.querySelector('#whats-in-a-bowl') as HTMLElement;
      expect(anatomy.querySelector('img[src*="wyoming-mountains-cordel.svg"]')).not.toBeNull();
      expect(anatomy.textContent).toContain("What's in an Açaí Bowl?");
      expect(anatomy.textContent).toContain(VERBATIM_WHATS_IN_A_BOWL_COPY);
      expect(anatomy.textContent).not.toContain('STACKED BOTTOM TO TOP');
      expect(anatomy.textContent).not.toContain('Select any layer in the diagram');
      expect(anatomy.textContent).not.toMatch(/Layer \d+ of 5/i);
      expect(anatomy.textContent).not.toMatch(/\b(01|02|03|04|05)\b/);
      expect(anatomy.textContent).not.toMatch(/\b[1-5]\.\s*(ACAI SORBET|CRUNCH|FAVORITE FRUIT|TOPPING|SAUCE)/i);
      expect(anatomy.textContent).not.toMatch(/Base Layer|Granola Layer|Fresh Fruit Layer|Toppings Layer|Finish Layer/i);
      expect(anatomy.textContent).not.toMatch(/12\s*oz|16\s*oz/i);
      expect(anatomy.textContent).not.toMatch(/1302\s+Beck/i);
      expect(anatomy.textContent).not.toMatch(/Cody,\s*Wyoming/i);

      // Founder Story spread has verbatim copy and ZERO redundant milestone mini-cards
      const ourStory = container.querySelector('#our-story') as HTMLElement;
      expect(ourStory).not.toBeNull();
      expect(ourStory.textContent).toContain(VERBATIM_FOUNDER_STORY_COPY);
      expect(ourStory.textContent).not.toContain('Launched the Altitude Açaí food truck');
      expect(ourStory.textContent).not.toContain('Served bowls across Park County community gatherings');
      expect(ourStory.textContent).not.toContain('Opened year-round storefront doors for local regulars');
      expect(ourStory.textContent).not.toContain('Summer Events');
      expect(ourStory.textContent).not.toContain('Brick & Mortar');

      // Anti-AI guardrails: zero technical corner brackets & zero --- ◇ --- diamond dividers
      const woodcutTexturesSource = fs.readFileSync(
        path.join(SRC_DIR, 'components', 'ui', 'WoodcutTextures.tsx'),
        'utf8',
      );
      expect(woodcutTexturesSource).not.toContain('WoodcutCornerMarks');
      expect(woodcutTexturesSource).not.toContain('CordelDivider');
      expect(container.innerHTML).not.toContain('M2 14V2H14');
      expect(container.innerHTML).not.toContain('320,2 332,12 320,22 308,12');

      // Widescreen expansion rule present in CSS and sections
      const cssRaw = fs.readFileSync(path.join(SRC_DIR, 'index.css'), 'utf8');
      expect(cssRaw).toContain('1440px');
      expect(cssRaw).toContain('1600px');
      expect(container.querySelectorAll('.widescreen-container').length).toBeGreaterThanOrEqual(6);

      // 3-Bowl Signature Preview on Home (Zero numbering 01/02/03) + CTA to /menu
      const preview = container.querySelector('#signature-bowls-preview') as HTMLElement;
      expect(preview).not.toBeNull();
      expect(preview.querySelectorAll('article')).toHaveLength(3);
      expect(preview.textContent).toContain('Mountain Man');
      expect(preview.textContent).toContain('Montana Mama');
      expect(preview.textContent).toContain('Goldilocks');
      expect(preview.textContent).not.toMatch(/\b(01|02|03)\b/);
      expect(preview.textContent).not.toContain('Bear Attack');
      expect(preview.textContent).not.toMatch(/12\s*oz|16\s*oz/i);
      expect(preview.textContent).not.toContain('All bowls start with');
      expect(
        within(preview).getByRole('link', { name: /See All Signature Bowls & Toppings/i }),
      ).toHaveAttribute('href', '/menu');

      // Visit Us & Footer own address, phone, and email exclusively
      const visitUs = container.querySelector('#visit-us') as HTMLElement;
      const footer = container.querySelector('footer') as HTMLElement;
      const hours = container.querySelector('#hours') as HTMLElement;

      expect(hours.textContent).not.toMatch(/1302\s+Beck/i);
      expect(hours.textContent).not.toMatch(/Cody,\s*Wyoming/i);
      expect(hours.textContent).not.toMatch(/307-527-0812/);

      expect(visitUs.textContent).toContain('1302 Beck Avenue, Cody, WY 82414');
      expect(visitUs.textContent).toContain('Cody, Wyoming');
      expect(visitUs.textContent).toContain('307-527-0812');
      expect(visitUs.textContent).toContain('altitudeacai@gmail.com');

      // Only 1 Get Directions link inside #visit-us (zero duplicate CTA inside section)
      expect(within(visitUs).getAllByRole('link', { name: /Get Directions/i })).toHaveLength(1);

      // Footer single-line address & contacts + dynamic copyright year without repeating "Cody, Wyoming"
      const currentYear = String(new Date().getFullYear());
      expect(footer.textContent).toContain('1302 Beck Avenue, Cody, WY 82414');
      expect(footer.textContent).toContain('307-527-0812');
      expect(footer.textContent).toContain('altitudeacai@gmail.com');
      expect(footer.textContent).toContain(`© ${currentYear} Altitude Açaí`);
      expect(footer.textContent).not.toMatch(/Cody,\s*Wyoming/i);
      const footerSource = fs.readFileSync(
        path.join(SRC_DIR, 'components', 'layout', 'Footer.tsx'),
        'utf8',
      );
      expect(footerSource).toContain('new Date().getFullYear()');

      // TASK-FIX-1 & TASK-FIX-2: Hours clock widget & Food Truck banner checks
      const liveClockWidget = hours.querySelector('[data-testid="live-clock-widget"]') as HTMLElement;
      expect(liveClockWidget).not.toBeNull();
      expect(liveClockWidget.textContent).not.toContain('Mountain Time');
      expect(liveClockWidget.textContent).not.toMatch(/Summer Hours|Fall Hours|Winter Hours|Spring Hours/);

      expect(hours.textContent).not.toContain('Times follow Mountain Time');
      expect(hours.textContent).not.toContain('Shop Posters & Notices');
      expect(hours.textContent).not.toMatch(
        /September - November|June - August|December - February|March - May/,
      );
      expect(hours.textContent).not.toMatch(
        /Cody Concerts in the Park|Softball Tournament|Soccer Tournament|Stampede Rodeo|Lacrosse Tournament/,
      );
      expect(hours.textContent).toContain('Food Truck & Local Events');

      // TASK-FAB-4: Persistent floating "Text us" SMS button present on /
      const fab = container.querySelector('[data-testid="floating-text-us-fab"]') as HTMLElement;
      expect(fab).not.toBeNull();
      expect(fab).toHaveAttribute('href', 'sms:+13075270812');
      expect(fab.textContent).toContain('Text us');

      // TASK-FIX-4: Organically scattered Cordel background motifs in every section of /
      const cordelLayers = container.querySelectorAll('[data-cordel-background]');
      expect(cordelLayers.length).toBeGreaterThanOrEqual(5);
      for (const layer of cordelLayers) {
        expect(layer.className).toContain('pointer-events-none');
        expect(layer.className).toContain('z-0');
      }
      expect(container.querySelector('img[src*="fruits-woodcut-frieze.svg"]')).toBeNull();
      expect(container.querySelector('img[src*="toppings-honey-woodcut.svg"]')).toBeNull();

      // Global DRY count of "Cody, Wyoming" on Home = 2 (Hero H1 + Visit Us)
      const fullRenderedText = collectRenderedTextAndLabels(container);
      const cityMatches = fullRenderedText.match(/Cody,\s*Wyoming/gi) ?? [];
      expect(cityMatches).toHaveLength(2);
    });

    it('renders zero prices, zero Portuguese words, and all verified contact links on /', () => {
      const { container } = renderRoute('/');
      const renderedText = collectRenderedTextAndLabels(container);

      expect(renderedText).not.toMatch(/\$|¢|\badd to cart\b|\bcheckout\b|\bbuy now\b/i);
      expect(renderedText).not.toMatch(/\bpreços?\b|\bhorários?\b|\bcardápios?\b|\bendereços?\b/i);

      const links = Array.from(container.querySelectorAll('a[href]')).map(
        (anchor) => anchor.getAttribute('href') ?? '',
      );
      expect(links.some((href) => href.includes('1302') && href.includes('Beck'))).toBe(true);
      expect(links).toContain('https://www.instagram.com/altitude_acai');
      expect(links).toContain(
        'https://web.facebook.com/people/Altitude-A%C3%A7a%C3%AD/61561749391480/',
      );
      expect(
        links.some((href) => href === 'tel:307-527-0812' || href === 'tel:+13075270812'),
      ).toBe(true);
      expect(links).toContain('mailto:altitudeacai@gmail.com');
    });

    it('supports interactive Bowl Anatomy layers and Seasonal Hours tabs on /', async () => {
      const { container } = renderRoute('/');

      const anatomySection = container.querySelector('#whats-in-a-bowl') as HTMLElement;
      const anatomy = within(anatomySection);
      fireEvent.click(anatomy.getByRole('button', { name: /^FAVORITE FRUIT$/i }));
      expect(await anatomy.findByText('Strawberries')).toBeInTheDocument();
      expect(anatomySection.textContent).toContain('Pineapple');
      expect(anatomySection.textContent).toContain('Mango');
      expect(anatomySection.textContent).not.toMatch(/Layer 3 of 5/i);

      const hoursSection = container.querySelector('#hours') as HTMLElement;
      const hours = within(hoursSection);
      fireEvent.click(hours.getByRole('tab', { name: /Summer/i }));
      expect(await hours.findByText(/Weekly Hours · Summer Hours/i)).toBeInTheDocument();
      expect(hoursSection.textContent).toContain('7:30 AM - 2:30 PM');
      expect(hoursSection.textContent).toContain('5:00 PM - 8:00 PM');

      fireEvent.click(hours.getByRole('tab', { name: /Winter/i }));
      expect(await hours.findByText(/Weekly Hours · Winter Hours/i)).toBeInTheDocument();
    });
  });

  describe('Route /menu Full Catalog & DRY Verification', () => {
    it('renders sizes & base rule ONCE in menu header, all 6 Signature Bowls, and enforces Create Your Own limits', () => {
      const { container } = renderRoute('/menu');
      const main = container.querySelector('main') as HTMLElement;
      const mainText = main.textContent ?? '';

      // Single occurrence of sizes & base rule across <main>
      expect(mainText.match(/12 oz Bowl/g) ?? []).toHaveLength(1);
      expect(mainText.match(/16 oz Bowl/g) ?? []).toHaveLength(1);
      expect(mainText.match(/All bowls start with Açaí Base and Granola/g) ?? []).toHaveLength(1);

      // Scattered Cordel background layers across /menu sections (no single horizontal row strip)
      expect(container.querySelectorAll('[data-cordel-background]').length).toBeGreaterThanOrEqual(3);
      expect(container.querySelector('img[src*="fruits-woodcut-frieze.svg"]')).toBeNull();

      // DRY: no address, city, or phone inside /menu <main>
      expect(mainText).not.toMatch(/1302\s+Beck/i);
      expect(mainText).not.toMatch(/Cody,\s*Wyoming/i);
      expect(mainText).not.toMatch(/307-527-0812/);
      expect(mainText).not.toMatch(/\$|¢/);

      // All 6 Signature Bowls rendered WITHOUT numbers 01..06
      const signatureSection = container.querySelector('#signature-bowls') as HTMLElement;
      expect(signatureSection.textContent).not.toMatch(/\b(01|02|03|04|05|06)\b/);
      for (const name of [
        'Mountain Man',
        'Montana Mama',
        'Goldilocks',
        'Bear Attack',
        'T-Rux',
        'SQUATch Protein Bowl',
      ]) {
        expect(signatureSection.textContent).toContain(name);
      }

      // Create Your Own limits (3 Fruits, 2 Toppings, 1 Sauce) WITHOUT numbered headings (1. / 2. / 3.)
      const buildSection = container.querySelector('#build-your-own') as HTMLElement;
      expect(buildSection.textContent).not.toMatch(/1\.\s*Fruits|2\.\s*Toppings|3\.\s*Sauces/i);
      const cyoFab = container.querySelector('[data-testid="floating-text-us-fab"]');
      expect(cyoFab).not.toBeNull();
      expect(cyoFab).toHaveAttribute('href', 'sms:+13075270812');
      const builder = within(buildSection);
      expect(buildSection.textContent).toContain('Banana');
      expect(buildSection.textContent).toContain('Graham Cracker');

      for (const fruit of ['Strawberries', 'Blueberries', 'Blackberries', 'Mango']) {
        fireEvent.click(builder.getByRole('button', { name: fruit }));
      }
      expect(builder.getByText('3 of 3 selected')).toBeInTheDocument();
      expect(builder.getByRole('button', { name: 'Mango' })).toHaveAttribute('aria-pressed', 'false');

      for (const topping of ['Hemp Hearts', 'Coconut Shavings', 'Slivered Almonds']) {
        fireEvent.click(builder.getByRole('button', { name: topping }));
      }
      expect(builder.getByText('2 of 2 selected')).toBeInTheDocument();
      expect(builder.getByRole('button', { name: 'Slivered Almonds' })).toHaveAttribute(
        'aria-pressed',
        'false',
      );

      fireEvent.click(builder.getByRole('button', { name: 'Honey' }));
      fireEvent.click(builder.getByRole('button', { name: 'Nutella' }));
      expect(builder.getByText('1 of 1 selected')).toBeInTheDocument();
      expect(builder.getByRole('button', { name: 'Honey' })).toHaveAttribute('aria-pressed', 'true');
      expect(builder.getByRole('button', { name: 'Nutella' })).toHaveAttribute(
        'aria-pressed',
        'false',
      );

      // Previewing a signature bowl populates builder cleanly
      const previewButtons = within(signatureSection).getAllByRole('button', {
        name: /Preview in Bowl Builder/i,
      });
      expect(previewButtons).toHaveLength(6);
      fireEvent.click(previewButtons[0]);
      expect(buildSection.textContent).toContain('Previewing Inspiration: Mountain Man');
    });
  });

  describe('Route 404 Isolated Theme Verification', () => {
    it('renders isolated 4 [Bowl] 4 page WITHOUT Navbar or Footer, with single heading and Back to Home CTA', () => {
      const { container } = renderRoute('/non-existent-route');

      expect(container.querySelector('header')).toBeNull();
      expect(container.querySelector('nav')).toBeNull();
      expect(container.querySelector('footer')).toBeNull();
      expect(container.querySelector('[data-testid="floating-text-us-fab"]')).toBeNull();

      expect(container.querySelector('[aria-label="404"]')).not.toBeNull();
      const bowlImg = container.querySelector('img[src*="cordel-bowl-404.svg"]');
      expect(bowlImg).not.toBeNull();

      expect(within(container).getByRole('heading', { level: 1 })).toHaveTextContent(
        'This page does not exist',
      );
      const backLink = within(container).getByRole('link', { name: 'Back to Home' });
      expect(backLink).toHaveAttribute('href', '/');

      // Zero extraneous copy or address on 404
      expect(container.textContent).not.toMatch(/1302\s+Beck|307-527-0812|altitudeacai/i);

      // Clicking Back to Home returns cleanly to /
      fireEvent.click(backLink);
      expect(window.location.pathname).toBe('/');
      expect(container.querySelector('header')).not.toBeNull();
      expect(container.querySelector('footer')).not.toBeNull();
    });
  });
});
