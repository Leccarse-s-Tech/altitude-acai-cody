import { ArrowRight } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy } from '../../data/editorial-copy';
import { AppLink, assetUrl } from '../../lib/router';
import { CordelBackgroundArtwork } from '../ui/CordelBackgroundArtwork';
import { CottonPaperGrain, WoodgrainOverlay } from '../ui/WoodcutTextures';

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
      className="surface-periwinkle-print relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <CottonPaperGrain variant="periwinkle" opacity={0.05} />
      <WoodgrainOverlay variant="periwinkle" opacity={0.08} />
      <CordelBackgroundArtwork placement="featured-botanicals" variant="periwinkle" />

      <div className="widescreen-container relative z-10">
        {/* Horizontal Editorial Header Bar */}
        <div className="scroll-reveal flex flex-col justify-between gap-6 border-b border-[#1E2749]/35 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <h2
              id="featured-bowls-heading"
              className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.06] font-extrabold tracking-tight text-[#1E2749]"
            >
              {featuredPreview.title}
            </h2>
            <p className="mt-3 w-full max-w-[52ch] text-base leading-relaxed text-[#30343F] sm:text-lg">
              {featuredPreview.intro}
            </p>
          </div>

          <AppLink
            to={featuredPreview.ctaTo}
            className="woodcut-btn woodcut-btn-primary w-full shrink-0 text-center text-sm sm:w-auto sm:text-base"
          >
            <span>{featuredPreview.ctaLabel}</span>
            <ArrowRight size={19} weight="bold" aria-hidden="true" />
          </AppLink>
        </div>

        {/* Widescreen Editorial Collage Trio (Open Paper Typography + Asymmetric Photos, Zero Boxy Grids) */}
        <div className="mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {featuredBowls.map((bowl, index) => {
            const media = BOWL_IMAGE_MAP[bowl.id];
            const isLead = index === 0;

            return (
              <motion.article
                key={bowl.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.38, delay: index * 0.06, ease: WOODCUT_EASE }}
                className={
                  isLead
                    ? 'lg:col-span-6'
                    : index === 1
                      ? 'lg:col-span-3 lg:pt-8'
                      : 'lg:col-span-3'
                }
              >
                <div
                  className={
                    isLead
                      ? 'grid grid-cols-1 items-center gap-7 sm:grid-cols-12'
                      : 'flex flex-col gap-5'
                  }
                >
                  {/* Editorial Photo Plate (Zero Heavy Bordered Card Wrapper) */}
                  <div className={isLead ? 'relative sm:col-span-7' : 'relative'}>
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -inset-2 bg-[#273469]/12 ${
                        index % 2 === 0 ? '-rotate-2' : 'rotate-2'
                      }`}
                    />
                    <div className="relative aspect-[4/3] overflow-hidden border border-[#1E2749] bg-[#FAFAFF] p-1.5 shadow-[0_18px_36px_-18px_rgba(30,39,73,0.45)] sm:aspect-square">
                      <img
                        src={assetUrl(media.src)}
                        alt={media.alt}
                        className="h-full w-full object-cover"
                        width={460}
                        height={460}
                      />
                    </div>
                  </div>

                  {/* Open Editorial Typography + Engraved Rule (Zero Numbering) */}
                  <div className={isLead ? 'min-w-0 sm:col-span-5' : 'min-w-0'}>
                    <h3 className="font-display text-2xl font-extrabold tracking-tight text-[#1E2749] xl:text-3xl">
                      {bowl.name}
                    </h3>

                    <div className="my-3 h-px w-16 bg-[#1E2749]/45" aria-hidden="true" />

                    <p className="text-sm leading-relaxed font-medium text-[#30343F] sm:text-base">
                      {bowl.ingredients.join(' · ')}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
