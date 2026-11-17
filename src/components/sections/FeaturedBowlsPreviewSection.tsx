import { ArrowRight } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy } from '../../data/editorial-copy';
import { AppLink, assetUrl } from '../../lib/router';
import { CordelBackgroundArtwork } from '../ui/CordelBackgroundArtwork';
import {
  CarvedWoodblockFrame,
  CordelDivider,
  CottonPaperGrain,
  WoodgrainOverlay,
} from '../ui/WoodcutTextures';

const WOODCUT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const BOWL_IMAGE_MAP: Record<string, { src: string; alt: string }> = {
  'mountain-man': {
    src: 'assets/bowls/bowl-mountain-man.webp',
    alt: 'Mountain Man açaí bowl topped with strawberries, bananas, blueberries, chia seeds, hemp hearts, peanut butter, and honey',
  },
  'montana-mama': {
    src: 'assets/bowls/bowl-montana-mama.webp',
    alt: 'Montana Mama açaí bowl topped with pineapples, strawberries, blackberries, coconut shavings, dark chocolate shavings, and honey',
  },
  goldilocks: {
    src: 'assets/bowls/bowl-goldilocks.webp',
    alt: 'Goldilocks açaí bowl topped with mangos, pineapples, bananas, coconut shavings, almonds, and dark chocolate sauce',
  },
};

export function FeaturedBowlsPreviewSection() {
  const prefersReducedMotion = useReducedMotion();
  const { featuredPreview } = editorialCopy;

  const featuredBowls = featuredPreview.featuredIds
    .map((id) => brandData.menu.signatureBowls.find((bowl) => bowl.id === id))
    .filter((bowl): bowl is NonNullable<typeof bowl> => Boolean(bowl));

  return (
    <section
      id="signature-bowls-preview"
      aria-labelledby="featured-bowls-heading"
      className="surface-cotton-paper relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <CottonPaperGrain variant="light" opacity={0.045} />
      <WoodgrainOverlay variant="light" opacity={0.08} />
      <CordelBackgroundArtwork placement="featured-botanicals" variant="light" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="featured-bowls-heading"
            className="font-display text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.1] font-extrabold tracking-tight text-[#1E2749]"
          >
            {featuredPreview.title}
          </h2>
          <p className="mt-4 w-full max-w-prose text-base leading-relaxed text-[#30343F] sm:text-lg">
            {featuredPreview.intro}
          </p>
        </div>

        <CordelDivider variant="light" className="my-8 sm:my-10" />

        {/* Asymmetric 3-Bowl Preview Showcase (1 lead wide card + 2 stacked/paired cards) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {featuredBowls.map((bowl, index) => {
            const media = BOWL_IMAGE_MAP[bowl.id];
            const isLead = index === 0;

            return (
              <motion.article
                key={bowl.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.38, delay: index * 0.05, ease: WOODCUT_EASE }}
                className={isLead ? 'lg:col-span-6' : 'lg:col-span-3'}
              >
                <CarvedWoodblockFrame
                  variant={isLead ? 'periwinkle' : 'light'}
                  showCornerMarks={isLead}
                  className="h-full p-4 sm:p-6"
                >
                  <div
                    className={
                      isLead
                        ? 'grid h-full grid-cols-1 items-center gap-5 sm:grid-cols-12'
                        : 'flex h-full flex-col gap-4'
                    }
                  >
                    <div className={isLead ? 'sm:col-span-6' : ''}>
                      <div className="aspect-square overflow-hidden rounded-sm border-2 border-[#1E2749] bg-[#FAFAFF] shadow-[3px_3px_0px_#1E2749]">
                        <img
                          src={assetUrl(media.src)}
                          alt={media.alt}
                          className="h-full w-full object-cover"
                          width={460}
                          height={460}
                        />
                      </div>
                    </div>

                    <div className={isLead ? 'sm:col-span-6' : ''}>
                      <h3 className="font-display text-2xl font-extrabold text-[#1E2749]">
                        {bowl.name}
                      </h3>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {bowl.ingredients.map((ingredient) => (
                          <li
                            key={ingredient}
                            className={`rounded-sm border border-[#1E2749] px-2.5 py-1 text-xs font-semibold text-[#1E2749] ${
                              isLead ? 'bg-[#FAFAFF]' : 'bg-[#E4D9FF]'
                            }`}
                          >
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CarvedWoodblockFrame>
              </motion.article>
            );
          })}
        </div>

        {/* Single Primary Route CTA to /menu */}
        <div className="mt-10 flex justify-start sm:justify-center">
          <AppLink
            to={featuredPreview.ctaTo}
            className="woodcut-btn woodcut-btn-primary w-full text-center text-sm sm:w-auto sm:text-base"
          >
            <span>{featuredPreview.ctaLabel}</span>
            <ArrowRight size={19} weight="bold" aria-hidden="true" />
          </AppLink>
        </div>
      </div>
    </section>
  );
}
