import { useState } from 'react';
import { Check } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy, type BowlLayerId } from '../../data/editorial-copy';
import { assetUrl } from '../../lib/router';
import { CordelBackgroundArtwork } from '../ui/CordelBackgroundArtwork';
import { CottonPaperGrain } from '../ui/WoodcutTextures';

const WOODCUT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface AnatomyLayerDetail {
  id: BowlLayerId;
  order: number;
  name: string;
  role: string;
  description: string;
  ingredients: readonly string[];
}

const LAYER_INGREDIENTS: Record<BowlLayerId, readonly string[]> = {
  'acai-sorbet': ['Açaí Sorbet'],
  crunch: ['Granola', 'Protein Granola'],
  'favorite-fruit': brandData.menu.createYourOwn.fruits,
  topping: brandData.menu.createYourOwn.toppings,
  sauce: brandData.menu.createYourOwn.sauces,
};

const ANATOMY_LAYERS: readonly AnatomyLayerDetail[] =
  brandData.bowlAnatomy.layersBottomToTop.map((layer) => ({
    id: layer.id as BowlLayerId,
    order: layer.order,
    name: layer.name,
    role: layer.role,
    description: layer.description,
    ingredients: LAYER_INGREDIENTS[layer.id as BowlLayerId],
  }));

export function BowlAnatomySection() {
  const [activeLayerId, setActiveLayerId] = useState<BowlLayerId>('acai-sorbet');
  const prefersReducedMotion = useReducedMotion();

  const activeLayer =
    ANATOMY_LAYERS.find((layer) => layer.id === activeLayerId) ?? ANATOMY_LAYERS[0];

  return (
    <section
      id="whats-in-a-bowl"
      aria-labelledby="bowl-anatomy-heading"
      className="relative overflow-hidden bg-[#1E2749] py-20 text-[#FAFAFF] sm:py-24 lg:py-28"
    >
      {/* Full-Bleed 100vw Panoramic Wyoming Mountain Woodcut Background + Translucent Indigo Glaze */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      >
        <img
          src={assetUrl('assets/cordel/wyoming-mountains-cordel.svg')}
          alt=""
          className="h-full w-full object-cover object-center opacity-55"
          width={1440}
          height={540}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2749]/92 via-[#273469]/84 to-[#1E2749]/94" />
      </div>

      <CottonPaperGrain variant="dark" opacity={0.045} />
      <CordelBackgroundArtwork placement="anatomy-fruits" variant="dark" />

      <div className="widescreen-container relative z-10">
        {/* Top Widescreen Split Header & Verbatim Copy */}
        <div className="grid grid-cols-1 items-end gap-8 border-b border-[#E4D9FF]/25 pb-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-5">
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#E4D9FF]">
              {editorialCopy.whatsInABowl.layerOrderNote} · 5 Layers
            </p>
            <h2
              id="bowl-anatomy-heading"
              className="font-display mt-3 text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.06] font-extrabold tracking-tight text-[#FAFAFF]"
            >
              {editorialCopy.whatsInABowl.title}
            </h2>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <p className="w-full max-w-[68ch] text-base leading-relaxed text-[#E4D9FF] sm:text-lg sm:leading-relaxed">
              {editorialCopy.whatsInABowl.officialParagraph}
            </p>
          </div>
        </div>

        {/* End-to-End Horizontal 5-Layer Widescreen Bar */}
        <div
          role="group"
          aria-label="Interactive bowl layers from bottom to top"
          className="mt-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4 xl:gap-6"
        >
          {ANATOMY_LAYERS.map((layer) => {
            const isSelected = layer.id === activeLayerId;
            return (
              <button
                key={layer.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveLayerId(layer.id)}
                className={`focus-on-dark group relative flex min-h-[112px] flex-col justify-between border-b-2 px-4 py-4 text-left transition-all duration-200 sm:px-5 ${
                  isSelected
                    ? 'border-[#FAFAFF] bg-[#FAFAFF] text-[#1E2749] shadow-[0_14px_30px_-14px_rgba(228,217,255,0.45)]'
                    : 'border-[#E4D9FF]/45 bg-[#1E2749]/65 text-[#FAFAFF] backdrop-blur-[2px] hover:border-[#E4D9FF] hover:bg-[#273469]/85'
                }`}
              >
                <div className="flex w-full items-baseline justify-between gap-2">
                  <span
                    className={`font-mono text-xs font-bold tracking-widest ${
                      isSelected ? 'text-[#575E8F]' : 'text-[#E4D9FF]/80'
                    }`}
                  >
                    0{layer.order}
                  </span>
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      isSelected ? 'text-[#273469]' : 'text-[#E4D9FF]/80'
                    }`}
                  >
                    {layer.role}
                  </span>
                </div>

                <div className="mt-4">
                  <span className="font-display block text-lg font-extrabold tracking-tight xl:text-xl">
                    {layer.order}. {layer.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Horizontal Cutaway Diagram + Selected Layer Editorial Detail Panel */}
        <div className="mt-8 grid grid-cols-1 items-center gap-8 border border-[#E4D9FF]/35 bg-[#1E2749]/80 p-5 backdrop-blur-[3px] sm:p-8 lg:grid-cols-12 lg:gap-12">
          {/* Compact Interactive Cutaway Bowl Cross-Section */}
          <div className="min-w-0 lg:col-span-5">
            <p className="mb-3 text-xs font-medium tracking-wide text-[#E4D9FF]">
              {editorialCopy.whatsInABowl.interactionPrompt}
            </p>
            <svg
              viewBox="0 0 420 285"
              className="mx-auto h-auto w-full max-w-[380px]"
              role="img"
              aria-label={`Bowl cross-section highlighting layer ${activeLayer.order}: ${activeLayer.name}`}
            >
              <defs>
                <pattern
                  id="cutaway-hatch"
                  width="7"
                  height="7"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(35)"
                >
                  <path d="M0 0 Q1.5 3.5 0 7" stroke="#1E2749" strokeWidth="1.5" />
                </pattern>
              </defs>

              <path
                d="M46 146 C50 226 118 264 210 264 C302 264 370 226 374 146 Z"
                fill="#FAFAFF"
                stroke="#1E2749"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <path
                d="M150 262 L162 278 L258 278 L270 262"
                fill="#575E8F"
                stroke="#1E2749"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              <g onClick={() => setActiveLayerId('acai-sorbet')} className="cursor-pointer">
                <path
                  d="M68 188 C82 232 138 254 210 254 C282 254 338 232 352 188 Z"
                  fill={activeLayerId === 'acai-sorbet' ? '#273469' : '#575E8F'}
                  stroke="#1E2749"
                  strokeWidth={activeLayerId === 'acai-sorbet' ? '3.5' : '2.4'}
                />
                <text
                  x="210"
                  y="224"
                  textAnchor="middle"
                  fill="#FAFAFF"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                >
                  1. ACAI SORBET
                </text>
              </g>

              <g onClick={() => setActiveLayerId('crunch')} className="cursor-pointer">
                <path
                  d="M54 150 L366 150 L354 188 L66 188 Z"
                  fill={activeLayerId === 'crunch' ? '#E4D9FF' : '#8687B4'}
                  stroke="#1E2749"
                  strokeWidth={activeLayerId === 'crunch' ? '3.5' : '2.4'}
                />
                <path
                  d="M54 150 L366 150 L354 188 L66 188 Z"
                  fill="url(#cutaway-hatch)"
                  opacity={activeLayerId === 'crunch' ? '0.18' : '0.28'}
                />
                <text
                  x="210"
                  y="173"
                  textAnchor="middle"
                  fill="#1E2749"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                >
                  2. CRUNCH
                </text>
              </g>

              <g onClick={() => setActiveLayerId('favorite-fruit')} className="cursor-pointer">
                <rect
                  x="64"
                  y="108"
                  width="292"
                  height="38"
                  rx="6"
                  fill={activeLayerId === 'favorite-fruit' ? '#E4D9FF' : '#FAFAFF'}
                  stroke="#1E2749"
                  strokeWidth={activeLayerId === 'favorite-fruit' ? '3.5' : '2.4'}
                />
                <text
                  x="210"
                  y="131"
                  textAnchor="middle"
                  fill="#1E2749"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                >
                  3. FAVORITE FRUIT
                </text>
              </g>

              <g onClick={() => setActiveLayerId('topping')} className="cursor-pointer">
                <rect
                  x="92"
                  y="64"
                  width="236"
                  height="38"
                  rx="6"
                  fill={activeLayerId === 'topping' ? '#273469' : '#E4D9FF'}
                  stroke="#1E2749"
                  strokeWidth={activeLayerId === 'topping' ? '3.5' : '2.4'}
                />
                <text
                  x="210"
                  y="87"
                  textAnchor="middle"
                  fill={activeLayerId === 'topping' ? '#FAFAFF' : '#1E2749'}
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                >
                  4. TOPPING
                </text>
              </g>

              <g onClick={() => setActiveLayerId('sauce')} className="cursor-pointer">
                <path
                  d="M128 32 C152 14 268 14 292 32 C302 42 296 58 278 58 L142 58 C124 58 118 42 128 32 Z"
                  fill={activeLayerId === 'sauce' ? '#1E2749' : '#575E8F'}
                  stroke="#E4D9FF"
                  strokeWidth={activeLayerId === 'sauce' ? '3.5' : '2.4'}
                />
                <text
                  x="210"
                  y="43"
                  textAnchor="middle"
                  fill="#FAFAFF"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                >
                  5. SAUCE
                </text>
              </g>
            </svg>
          </div>

          {/* Right Wide Editorial Inspector */}
          <div className="min-w-0 lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.id}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: 0.24, ease: WOODCUT_EASE }}
                className="border-l-2 border-[#E4D9FF] pl-5 sm:pl-8"
              >
                <p className="font-mono text-xs font-bold tracking-wider text-[#E4D9FF]">
                  Layer {activeLayer.order} of 5 · {activeLayer.role}
                </p>

                <h3 className="font-display mt-2 text-2xl font-extrabold tracking-tight text-[#FAFAFF] sm:text-4xl">
                  {activeLayer.order}. {activeLayer.name}
                </h3>

                <p className="mt-3 w-full max-w-[56ch] text-base leading-relaxed text-[#E4D9FF] sm:text-lg">
                  {activeLayer.description}.
                </p>

                <div className="mt-6 border-t border-[#E4D9FF]/25 pt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#E4D9FF]/85">
                    In This Layer
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2.5">
                    {activeLayer.ingredients.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#FAFAFF] sm:text-base"
                      >
                        <Check size={15} weight="bold" className="text-[#E4D9FF]" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
