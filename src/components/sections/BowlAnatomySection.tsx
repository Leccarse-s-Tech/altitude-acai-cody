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
  name: string;
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
    name: layer.name,
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
        {/* Top Widescreen Split Header & Verbatim Copy (Zero Kicker Subtitle) */}
        <div className="scroll-reveal grid grid-cols-1 items-end gap-8 border-b border-[#E4D9FF]/25 pb-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-5">
            <h2
              id="bowl-anatomy-heading"
              className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.06] font-extrabold tracking-tight text-[#FAFAFF]"
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

        {/* End-to-End Horizontal 5-Layer Widescreen Selector (Zero Numbers or Technical Tags) */}
        <div
          role="group"
          aria-label="Interactive bowl layers from bottom to top"
          className="mt-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4 xl:gap-6"
        >
          {ANATOMY_LAYERS.map((layer, index) => {
            const isSelected = layer.id === activeLayerId;
            return (
              <button
                key={layer.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveLayerId(layer.id)}
                style={{ ['--layer-stagger' as string]: `${index * 65}ms` }}
                className={`bowl-layer-anim focus-on-dark flex min-h-[76px] items-center justify-center border-b-2 px-4 py-4 text-center transition-all duration-200 sm:px-5 ${
                  isSelected
                    ? 'border-[#FAFAFF] bg-[#FAFAFF] text-[#1E2749] shadow-[0_14px_30px_-14px_rgba(228,217,255,0.45)]'
                    : 'border-[#E4D9FF]/45 bg-[#1E2749]/65 text-[#FAFAFF] backdrop-blur-[2px] hover:border-[#E4D9FF] hover:bg-[#273469]/85'
                }`}
              >
                <span className="font-display text-base font-extrabold tracking-wide xl:text-lg">
                  {layer.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Horizontal Cutaway Diagram + Direct Ingredient List Panel */}
        <div className="mt-8 grid grid-cols-1 items-center gap-8 border border-[#E4D9FF]/35 bg-[#1E2749]/80 p-5 backdrop-blur-[3px] sm:p-8 lg:grid-cols-12 lg:gap-12">
          {/* Interactive Cutaway Bowl Cross-Section SVG */}
          <div className="min-w-0 lg:col-span-5">
            <svg
              viewBox="0 0 420 285"
              className="mx-auto h-auto w-full max-w-[380px]"
              role="img"
              aria-label={`Bowl cross-section highlighting ${activeLayer.name}`}
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
                  ACAI SORBET
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
                  CRUNCH
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
                  FAVORITE FRUIT
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
                  TOPPING
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
                  SAUCE
                </text>
              </g>
            </svg>
          </div>

          {/* Right Direct Ingredient Showcase (Zero Redundant Title/Counter/Description) */}
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
                <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-4">
                  {activeLayer.ingredients.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-2.5 font-display text-lg font-bold text-[#FAFAFF] sm:text-xl"
                    >
                      <Check
                        size={17}
                        weight="bold"
                        className="shrink-0 text-[#E4D9FF]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
