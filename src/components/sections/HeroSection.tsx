import { ArrowRight, MapPin } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy } from '../../data/editorial-copy';
import { AppLink, assetUrl } from '../../lib/router';
import { CordelBackgroundArtwork } from '../ui/CordelBackgroundArtwork';
import { CottonPaperGrain, WoodgrainOverlay } from '../ui/WoodcutTextures';

const WOODCUT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const { hero } = editorialCopy;
  const directionsUrl = brandData.location.googleMapsDirectionsUrl;

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="surface-cotton-paper relative flex min-h-[min(92dvh,860px)] items-center overflow-hidden border-b border-[#1E2749]/20 py-14 sm:py-16 lg:py-20"
    >
      <CottonPaperGrain variant="light" opacity={0.045} />
      <WoodgrainOverlay variant="light" opacity={0.09} />
      <CordelBackgroundArtwork placement="hero" variant="light" />

      <div className="widescreen-container relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left Editorial Stack (Direct H1 — Zero Eyebrow Kickers) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: WOODCUT_EASE }}
            className="min-w-0 lg:col-span-5"
          >
            <h1
              id="hero-heading"
              className="font-display text-[clamp(2.1rem,5.2vw,4.35rem)] leading-[1.03] font-extrabold tracking-[-0.03em] text-[#1E2749]"
            >
              {hero.headline}
            </h1>

            <p className="mt-6 w-full max-w-[46ch] text-base leading-relaxed text-[#30343F] sm:text-xl sm:leading-relaxed">
              {hero.subhead}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <AppLink
                to={hero.primaryCta.to}
                aria-label={hero.primaryCta.ariaLabel}
                className="woodcut-btn woodcut-btn-primary text-sm sm:text-base"
              >
                <span>{hero.primaryCta.label}</span>
                <ArrowRight size={19} weight="bold" aria-hidden="true" />
              </AppLink>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={hero.secondaryCta.ariaLabel}
                className="woodcut-btn woodcut-btn-secondary text-sm sm:text-base"
              >
                <MapPin size={19} weight="bold" aria-hidden="true" />
                <span>{hero.secondaryCta.label}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Widescreen Editorial Collage Bleed (Cordel Mountain Print + Real Bowls) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.08, ease: WOODCUT_EASE }}
            className="relative min-w-0 lg:col-span-7 lg:-mr-6 xl:-mr-10"
          >
            <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-12 sm:items-center sm:gap-6">
              {/* Primary Cordel Mountain Woodblock Engraving */}
              <div className="relative z-10 sm:col-span-8">
                <figure className="relative overflow-hidden border border-[#1E2749] bg-[#E4D9FF] p-2 shadow-[0_20px_44px_-22px_rgba(30,39,73,0.45)] sm:p-2.5">
                  <div className="aspect-[16/11] w-full overflow-hidden">
                    <img
                      src={assetUrl('assets/brand/hero-cordel-landscape.webp')}
                      alt="Woodcut print illustration of Wyoming Absaroka mountains with natural sun, organic clouds, pines, and açaí flora"
                      className="h-full w-full object-cover"
                      width={1024}
                      height={687}
                    />
                  </div>
                </figure>

                {/* Overlapping Official Crest Medallion (Safe inset on mobile, clean editorial overlap on tablet/desktop) */}
                <div className="mt-3 inline-flex items-center gap-3 sm:absolute sm:-bottom-5 sm:left-4 sm:z-30 sm:mt-0 sm:block">
                  <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-[#1E2749] bg-[#FAFAFF] p-1 shadow-[0_10px_22px_-8px_rgba(30,39,73,0.4)] sm:h-24 sm:w-24">
                    <img
                      src={assetUrl('assets/brand/logo-official.webp')}
                      alt={hero.logoAlt}
                      className="h-full w-full rounded-full object-cover"
                      width={96}
                      height={96}
                    />
                  </div>
                </div>
              </div>

              {/* Overlapping Asymmetric Real Bowl Duo (Extending Toward Right Lateral Margin) */}
              <div className="relative z-20 flex flex-col gap-5 sm:col-span-4 sm:-ml-10">
                <figure className="overflow-hidden border border-[#1E2749] bg-[#FAFAFF] p-1.5 shadow-[0_18px_36px_-16px_rgba(30,39,73,0.45)] sm:rotate-[1.5deg]">
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={assetUrl('assets/bowls/official-overhead-spread.webp')}
                      alt="Overhead view of handcrafted açaí bowls with fresh berries, bananas, granola, and honey drizzle"
                      className="h-full w-full object-cover"
                      width={480}
                      height={600}
                    />
                  </div>
                </figure>

                <figure className="hidden overflow-hidden border border-[#1E2749] bg-[#E4D9FF] p-1.5 shadow-[0_14px_28px_-14px_rgba(30,39,73,0.4)] sm:ml-6 sm:block sm:-rotate-[2deg]">
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={assetUrl('assets/bowls/official-berry-pollen-bowl.webp')}
                      alt="Handcrafted açaí bowl topped with raspberries, blackberries, bee pollen, and honey drizzle"
                      className="h-full w-full object-cover"
                      width={480}
                      height={300}
                    />
                  </div>
                </figure>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
