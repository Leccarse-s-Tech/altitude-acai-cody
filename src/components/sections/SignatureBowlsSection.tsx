import { ArrowRight } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy } from '../../data/editorial-copy';
import { assetUrl } from '../../lib/router';
import { CordelBackgroundArtwork } from '../ui/CordelBackgroundArtwork';
import { CottonPaperGrain, WoodgrainOverlay } from '../ui/WoodcutTextures';
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
    imagePath: 'assets/bowls/bowl-mountain-man.webp',
    imageAlt:
      'Mountain Man açaí bowl topped with strawberries, bananas, blueberries, chia seeds, hemp hearts, peanut butter, and honey',
    preset: {
      sourceBowlName: 'Mountain Man',
      fruits: ['Strawberries', 'Banana', 'Blueberries'],
      toppings: ['Chia Seeds', 'Hemp Hearts'],
      sauce: 'Peanut Butter',
      presetNote: 'In-shop Mountain Man also finishes with a drizzle of Honey.',
    },
  },
  'montana-mama': {
    id: 'montana-mama',
    imagePath: 'assets/bowls/bowl-montana-mama.webp',
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
    imagePath: 'assets/bowls/bowl-goldilocks.webp',
    imageAlt:
      'Goldilocks açaí bowl topped with mangos, pineapples, bananas, coconut shavings, almonds, and dark chocolate sauce',
    preset: {
      sourceBowlName: 'Goldilocks',
      fruits: ['Mango', 'Pineapple', 'Banana'],
      toppings: ['Coconut Shavings', 'Slivered Almonds'],
      sauce: 'Dark Chocolate',
    },
  },
  'bear-attack': {
    id: 'bear-attack',
    imagePath: 'assets/bowls/bowl-bear-attack.webp',
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
    imagePath: 'assets/bowls/bowl-t-rux.webp',
    imageAlt:
      'T-Rux açaí bowl topped with extra bananas, blueberries, rolled oats, graham crackers, and Nutella',
    preset: {
      sourceBowlName: 'T-Rux',
      fruits: ['Banana', 'Blueberries'],
      toppings: ['Rolled Oats', 'Graham Cracker'],
      sauce: 'Nutella',
      presetNote: 'In-shop T-Rux recipe includes extra banana slices.',
    },
  },
  'squatch-protein-bowl': {
    id: 'squatch-protein-bowl',
    imagePath: 'assets/bowls/bowl-squatch-protein.webp',
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
  const { menuPage } = editorialCopy;
  const bowls = brandData.menu.signatureBowls;

  return (
    <section
      id="signature-bowls"
      aria-labelledby="signature-bowls-heading"
      className="surface-cotton-paper relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <CottonPaperGrain variant="light" opacity={0.045} />
      <WoodgrainOverlay variant="light" opacity={0.08} />
      <CordelBackgroundArtwork placement="menu-signatures" variant="light" />

      <div className="widescreen-container relative z-10">
        <div className="border-b border-[#1E2749]/30 pb-6">
          <h2
            id="signature-bowls-heading"
            className="font-display text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.08] font-extrabold tracking-tight text-[#1E2749]"
          >
            {menuPage.signatureSectionTitle}
          </h2>
        </div>

        {/* Fine-Dining / Cordel Broadside Printed Menu Grid (No Repetitive Square Card Boxes) */}
        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 lg:gap-x-16 lg:gap-y-14">
          {bowls.map((bowl, index) => {
            const config = BOWL_CONFIG_BY_ID[bowl.id];
            const isMountainMan = bowl.id === 'mountain-man';

            return (
              <motion.article
                key={bowl.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.36, delay: index * 0.04, ease: WOODCUT_EASE }}
                className="min-w-0 border-b border-[#1E2749]/20 pb-8"
              >
                <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-12">
                  {/* Overlapping Editorial Bowl Plate */}
                  <div className={`relative sm:col-span-5 ${index % 2 === 1 ? 'sm:order-2' : ''}`}>
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -inset-1.5 bg-[#E4D9FF] ${
                        index % 2 === 0 ? '-rotate-2' : 'rotate-2'
                      }`}
                    />
                    <div className="relative aspect-square overflow-hidden border border-[#1E2749] bg-[#FAFAFF] p-1 shadow-[0_14px_28px_-14px_rgba(30,39,73,0.4)]">
                      <img
                        src={assetUrl(config.imagePath)}
                        alt={config.imageAlt}
                        className="h-full w-full object-cover"
                        width={420}
                        height={420}
                      />
                    </div>
                  </div>

                  {/* Open Typography Menu Ledger Entry */}
                  <div
                    className={`flex min-w-0 flex-col justify-between sm:col-span-7 ${
                      index % 2 === 1 ? 'sm:order-1' : ''
                    }`}
                  >
                    <div>
                      {isMountainMan && (
                        <div className="mb-1.5 flex items-center gap-3">
                          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#273469]">
                            House Favorite
                          </span>
                          <span className="editorial-menu-leader" aria-hidden="true" />
                        </div>
                      )}

                      <h3 className="font-display text-2xl font-extrabold tracking-tight text-[#1E2749] sm:text-3xl">
                        {bowl.name}
                      </h3>

                      <p className="mt-3 text-base leading-relaxed font-medium text-[#30343F]">
                        {bowl.ingredients.join(' · ')}
                      </p>
                    </div>

                    <div className="mt-5">
                      <button
                        type="button"
                        onClick={() => onPreviewBowl(config.preset)}
                        className="woodcut-btn woodcut-btn-secondary w-full justify-between text-xs sm:w-auto sm:text-sm"
                      >
                        <span>Preview in Bowl Builder</span>
                        <ArrowRight size={16} weight="bold" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Verified Specialty Drink Typographic Line */}
        <div className="mt-10 border-l-2 border-[#273469] pl-4">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#575E8F]">
            Also on the menu
          </p>
          <p className="mt-1 font-display text-lg font-bold text-[#1E2749]">
            {brandData.menu.specialtyDrinks.join(' · ')}
          </p>
        </div>
      </div>
    </section>
  );
}
