import { ArrowRight, Sparkle } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy } from '../../data/editorial-copy';
import {
  CarvedWoodblockFrame,
  CordelDivider,
  CottonPaperGrain,
  WoodgrainOverlay,
} from '../ui/WoodcutTextures';
import type { BowlBuilderPreset } from './CreateYourOwnSimulator';

export interface SignatureBowlsSectionProps {
  onPreviewBowl: (preset: Omit<BowlBuilderPreset, 'requestId'>) => void;
}

interface SignatureBowlConfig {
  id: string;
  imagePath: string;
  imageAlt: string;
  preset: Omit<BowlBuilderPreset, 'requestId'>;
}

const WOODCUT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const BOWL_CONFIG_BY_ID: Record<string, SignatureBowlConfig> = {
  'mountain-man': {
    id: 'mountain-man',
    imagePath: './assets/bowls/bowl-mountain-man.webp',
    imageAlt:
      'Mountain Man açaí bowl topped with strawberries, bananas, blueberries, chia seeds, hemp hearts, peanut butter, and honey',
    preset: {
      sourceBowlName: 'Mountain Man',
      fruits: ['Strawberries', 'Bananas', 'Blueberries'],
      toppings: ['Chia Seeds', 'Hemp Hearts'],
      sauce: 'Peanut Butter',
      presetNote: 'In-shop Mountain Man also finishes with a drizzle of Honey.',
    },
  },
  'montana-mama': {
    id: 'montana-mama',
    imagePath: './assets/bowls/bowl-montana-mama.webp',
    imageAlt:
      'Montana Mama açaí bowl topped with pineapples, strawberries, blackberries, coconut shavings, dark chocolate shavings, and honey',
    preset: {
      sourceBowlName: 'Montana Mama',
      fruits: ['Pineapple', 'Strawberries', 'Blackberries'],
      toppings: ['Coconut Shavings', 'Dark Chocolate Shavings'],
      sauce: 'Honey',
    },
  },
  goldilocks: {
    id: 'goldilocks',
    imagePath: './assets/bowls/bowl-goldilocks.webp',
    imageAlt:
      'Goldilocks açaí bowl topped with mangos, pineapples, bananas, coconut shavings, almonds, and dark chocolate sauce',
    preset: {
      sourceBowlName: 'Goldilocks',
      fruits: ['Mango', 'Pineapple', 'Bananas'],
      toppings: ['Coconut Shavings', 'Slivered Almonds'],
      sauce: 'Dark Chocolate',
    },
  },
  'bear-attack': {
    id: 'bear-attack',
    imagePath: './assets/bowls/bowl-bear-attack.webp',
    imageAlt:
      'Bear Attack açaí bowl topped with blackberries, raspberries, strawberries, pumpkin seeds, bee pollen, and honey',
    preset: {
      sourceBowlName: 'Bear Attack',
      fruits: ['Blackberries', 'Raspberries', 'Strawberries'],
      toppings: ['Pumpkin Seeds', 'Bee Pollen'],
      sauce: 'Honey',
    },
  },
  't-rux': {
    id: 't-rux',
    imagePath: './assets/bowls/bowl-t-rux.webp',
    imageAlt:
      'T-Rux açaí bowl topped with extra bananas, blueberries, rolled oats, graham crackers, and Nutella',
    preset: {
      sourceBowlName: 'T-Rux',
      fruits: ['Bananas', 'Blueberries'],
      toppings: ['Rolled Oats', 'Graham Crackers'],
      sauce: 'Nutella',
      presetNote: 'In-shop T-Rux recipe is served with Extra Bananas.',
    },
  },
  'squatch-protein-bowl': {
    id: 'squatch-protein-bowl',
    imagePath: './assets/bowls/bowl-squatch-protein.webp',
    imageAlt:
      'SQUATch Protein Bowl with protein granola, blackberries, raspberries, pumpkin seeds, hemp hearts, peanut butter, and honey',
    preset: {
      sourceBowlName: 'SQUATch Protein Bowl',
      fruits: ['Blackberries', 'Raspberries'],
      toppings: ['Protein Granola Upgrade', 'Pumpkin Seeds'],
      sauce: 'Peanut Butter',
      presetNote: 'In-shop SQUATch Protein Bowl also adds Hemp Hearts and Honey.',
    },
  },
};

export function SignatureBowlsSection({ onPreviewBowl }: SignatureBowlsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const { signatureBowls } = editorialCopy;

  const bowls = brandData.menu.signatureBowls;
  const mountainMan = bowls.find((b) => b.id === 'mountain-man') ?? bowls[0];
  const squatchBowl = bowls.find((b) => b.id === 'squatch-protein-bowl') ?? bowls[5];
  const galleryBowls = bowls.filter(
    (b) => b.id !== 'mountain-man' && b.id !== 'squatch-protein-bowl',
  );

  return (
    <section
      id="signature-bowls"
      aria-labelledby="signature-bowls-heading"
      className="surface-cotton-paper relative overflow-hidden py-20 lg:py-24"
    >
      <CottonPaperGrain variant="light" opacity={0.045} />
      <WoodgrainOverlay variant="light" opacity={0.08} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header (Zero Eyebrow) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2
              id="signature-bowls-heading"
              className="font-display text-3xl font-extrabold tracking-tight text-[#1E2749] sm:text-4xl lg:text-5xl"
            >
              {signatureBowls.title}
            </h2>
            <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-[#30343F] sm:text-lg">
              {signatureBowls.intro}
            </p>
          </div>

          <div className="lg:col-span-5 lg:text-right">
            <div className="inline-flex flex-wrap items-center gap-2 lg:justify-end">
              {signatureBowls.sizes.map((size) => (
                <span
                  key={size}
                  className="inline-flex items-center rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF] px-3 py-1 font-mono text-xs font-bold text-[#1E2749] shadow-[2px_2px_0px_#1E2749]"
                >
                  {size}
                </span>
              ))}
            </div>
            <p className="mt-2.5 text-sm font-semibold text-[#575E8F]">
              {signatureBowls.baseRule}
            </p>
          </div>
        </div>

        <CordelDivider variant="light" className="my-10" />

        {/* Top Asymmetric Duo: Mountain Man (7 cols) + SQUATch Protein Bowl (5 cols) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 lg:gap-8">
          {/* Featured Lead Card: Mountain Man */}
          <motion.article
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, ease: WOODCUT_EASE }}
            className="md:col-span-7"
          >
            <CarvedWoodblockFrame
              variant="periwinkle"
              showCornerMarks={true}
              className="h-full p-5 sm:p-6"
            >
              <div className="grid h-full grid-cols-1 items-center gap-6 sm:grid-cols-12">
                <div className="sm:col-span-6">
                  <div className="aspect-square overflow-hidden rounded-sm border-2 border-[#1E2749] bg-[#FAFAFF] shadow-[4px_4px_0px_#1E2749]">
                    <img
                      src={BOWL_CONFIG_BY_ID[mountainMan.id].imagePath}
                      alt={BOWL_CONFIG_BY_ID[mountainMan.id].imageAlt}
                      className="h-full w-full object-cover"
                      width={520}
                      height={520}
                    />
                  </div>
                </div>

                <div className="flex h-full flex-col justify-between sm:col-span-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-sm border border-[#1E2749] bg-[#FAFAFF] px-2.5 py-1 font-mono text-xs font-bold text-[#1E2749]">
                      <Sparkle size={13} weight="bold" aria-hidden="true" />
                      House Favorite
                    </span>
                    <h3 className="font-display mt-3 text-2xl font-extrabold text-[#1E2749] sm:text-3xl">
                      {mountainMan.name}
                    </h3>
                    <p className="mt-3 font-mono text-xs font-bold text-[#575E8F]">
                      {signatureBowls.ingredientsLabel}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {mountainMan.ingredients.map((ingredient) => (
                        <li
                          key={ingredient}
                          className="rounded-sm border border-[#1E2749] bg-[#FAFAFF] px-2.5 py-1 text-xs font-semibold text-[#1E2749]"
                        >
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => onPreviewBowl(BOWL_CONFIG_BY_ID[mountainMan.id].preset)}
                    className="woodcut-btn woodcut-btn-primary mt-6 w-full text-sm whitespace-nowrap"
                  >
                    <span>Preview in Bowl Builder</span>
                    <ArrowRight size={17} weight="bold" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </CarvedWoodblockFrame>
          </motion.article>

          {/* Featured Dark Woodblock Plate: SQUATch Protein Bowl */}
          <motion.article
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.06, ease: WOODCUT_EASE }}
            className="md:col-span-5"
          >
            <CarvedWoodblockFrame
              variant="dark"
              showCornerMarks={true}
              className="h-full p-5 sm:p-6"
            >
              <div className="flex h-full flex-col justify-between gap-5">
                <div>
                  <div className="aspect-[16/10] overflow-hidden rounded-sm border-2 border-[#E4D9FF] bg-[#FAFAFF]">
                    <img
                      src={BOWL_CONFIG_BY_ID[squatchBowl.id].imagePath}
                      alt={BOWL_CONFIG_BY_ID[squatchBowl.id].imageAlt}
                      className="h-full w-full object-cover"
                      width={520}
                      height={325}
                    />
                  </div>

                  <h3 className="font-display mt-4 text-2xl font-extrabold text-[#FAFAFF]">
                    {squatchBowl.name}
                  </h3>

                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {squatchBowl.ingredients.map((ingredient) => (
                      <li
                        key={ingredient}
                        className="rounded-sm border border-[#1E2749] bg-[#E4D9FF] px-2.5 py-1 text-xs font-semibold text-[#1E2749]"
                      >
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onPreviewBowl(BOWL_CONFIG_BY_ID[squatchBowl.id].preset)}
                  className="woodcut-btn woodcut-btn-on-dark w-full text-sm whitespace-nowrap"
                >
                  <span>Preview in Bowl Builder</span>
                  <ArrowRight size={17} weight="bold" aria-hidden="true" />
                </button>
              </div>
            </CarvedWoodblockFrame>
          </motion.article>
        </div>

        {/* Remaining 4 Signature Bowls (2-col asymmetric split plates on desktop, 1-col < 768px) */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-8 lg:gap-8">
          {galleryBowls.map((bowl, index) => {
            const config = BOWL_CONFIG_BY_ID[bowl.id];
            const imageFirstOnDesktop = index % 2 === 0;

            return (
              <motion.article
                key={bowl.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.36,
                  delay: index * 0.04,
                  ease: WOODCUT_EASE,
                }}
              >
                <CarvedWoodblockFrame variant="light" showCornerMarks={false} className="h-full p-5">
                  <div className="grid h-full grid-cols-1 items-center gap-5 sm:grid-cols-12">
                    <div
                      className={`sm:col-span-5 ${
                        imageFirstOnDesktop ? 'sm:order-1' : 'sm:order-2'
                      }`}
                    >
                      <div className="aspect-square overflow-hidden rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF]/30 shadow-[3px_3px_0px_#1E2749]">
                        <img
                          src={config.imagePath}
                          alt={config.imageAlt}
                          className="h-full w-full object-cover"
                          width={380}
                          height={380}
                        />
                      </div>
                    </div>

                    <div
                      className={`flex h-full flex-col justify-between sm:col-span-7 ${
                        imageFirstOnDesktop ? 'sm:order-2' : 'sm:order-1'
                      }`}
                    >
                      <div>
                        <h3 className="font-display text-2xl font-extrabold text-[#1E2749]">
                          {bowl.name}
                        </h3>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {bowl.ingredients.map((ingredient) => (
                            <li
                              key={ingredient}
                              className="rounded-sm border border-[#1E2749] bg-[#E4D9FF] px-2.5 py-1 text-xs font-semibold text-[#1E2749]"
                            >
                              {ingredient}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={() => onPreviewBowl(config.preset)}
                        className="woodcut-btn woodcut-btn-secondary mt-5 w-full text-sm whitespace-nowrap"
                      >
                        <span>Preview in Bowl Builder</span>
                        <ArrowRight size={16} weight="bold" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </CarvedWoodblockFrame>
              </motion.article>
            );
          })}
        </div>

        {/* Specialty Drink & In-Shop Callout */}
        <div className="mt-8 rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF]/75 px-5 py-4 shadow-[4px_4px_0px_#1E2749]">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <p className="text-sm font-semibold text-[#1E2749]">
              {signatureBowls.inStoreNote}
            </p>
            <p className="font-mono text-xs font-bold text-[#273469]">
              Also served: {brandData.menu.specialtyDrinks.join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
