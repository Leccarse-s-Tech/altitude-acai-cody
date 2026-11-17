import { ArrowRight, MapPin, Mountains } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy } from '../../data/editorial-copy';
import { AppLink, assetUrl } from '../../lib/router';
import { CordelBackgroundArtwork } from '../ui/CordelBackgroundArtwork';
import {
  CarvedWoodblockFrame,
  CottonPaperGrain,
  WoodgrainOverlay,
} from '../ui/WoodcutTextures';

const WOODCUT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const { hero } = editorialCopy;
  const directionsUrl = brandData.location.googleMapsDirectionsUrl;

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="surface-cotton-paper relative flex min-h-[100dvh] flex-col justify-between overflow-hidden pt-12 pb-0 sm:pt-16 lg:pt-20"
    >
      <CottonPaperGrain variant="light" opacity={0.045} />
      <WoodgrainOverlay variant="light" opacity={0.09} />
      <CordelBackgroundArtwork placement="hero" variant="light" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Editorial Stack */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: WOODCUT_EASE }}
            className="min-w-0 lg:col-span-6"
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex max-w-full items-center gap-2 rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF] px-3 py-1.5 shadow-[3px_3px_0px_#1E2749]">
              <Mountains size={16} weight="bold" className="shrink-0 text-[#1E2749]" aria-hidden="true" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1E2749] sm:text-xs">
                {hero.badge}
              </span>
            </div>

            <h1
              id="hero-heading"
              className="font-display mt-5 text-[clamp(1.85rem,6vw,3.65rem)] leading-[1.07] font-extrabold tracking-[-0.025em] text-[#1E2749]"
            >
              {hero.headline}
            </h1>

            <p className="mt-5 w-full max-w-prose text-base leading-relaxed text-[#30343F] sm:text-lg">
              {hero.subhead}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
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

          {/* Right Asymmetric Cordel Print + Official Bowl Spread Composition */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.08, ease: WOODCUT_EASE }}
            className="relative min-w-0 lg:col-span-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-end sm:gap-5">
              {/* Primary Cordel Woodcut Mountain Landscape */}
              <div className="relative sm:col-span-8">
                <CarvedWoodblockFrame
                  variant="light"
                  showCornerMarks={true}
                  className="shadow-[5px_5px_0px_#1E2749] sm:shadow-[6px_6px_0px_#1E2749]"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#E4D9FF]">
                    <img
                      src={assetUrl('assets/brand/hero-cordel-landscape.webp')}
                      alt="Woodcut print illustration of Wyoming Absaroka mountains with natural sun, organic clouds, pines, and açaí flora"
                      className="h-full w-full object-cover"
                      width={1024}
                      height={687}
                    />
                  </div>
                </CarvedWoodblockFrame>

                {/* Official Crest Medallion (inset safely on < 640px so zero 320px overflow) */}
                <div className="absolute top-3 left-3 z-20 h-16 w-16 overflow-hidden rounded-sm border-2 border-[#1E2749] bg-[#FAFAFF] p-1 shadow-[3px_3px_0px_#1E2749] sm:-top-4 sm:-left-4 sm:h-24 sm:w-24 sm:shadow-[4px_4px_0px_#1E2749]">
                  <img
                    src={assetUrl('assets/brand/logo-official.webp')}
                    alt={hero.logoAlt}
                    className="h-full w-full object-cover"
                    width={96}
                    height={96}
                  />
                </div>
              </div>

              {/* Official Bowl Overhead Spread Plate (zero redundant caption or address) */}
              <div className="sm:col-span-4 sm:-ml-6 sm:mb-4">
                <CarvedWoodblockFrame
                  variant="periwinkle"
                  showCornerMarks={false}
                  className="shadow-[4px_4px_0px_#1E2749] sm:shadow-[5px_5px_0px_#1E2749]"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={assetUrl('assets/bowls/official-overhead-spread.webp')}
                      alt="Overhead view of handcrafted açaí bowls with fresh berries, bananas, granola, and honey drizzle"
                      className="h-full w-full object-cover"
                      width={480}
                      height={600}
                    />
                  </div>
                </CarvedWoodblockFrame>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wyoming Mountains Cordel Engraving Band Anchoring Bottom Edge */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <CarvedWoodblockFrame variant="light" showCornerMarks={false} className="shadow-[4px_4px_0px_#1E2749]">
          <img
            src={assetUrl('assets/cordel/wyoming-mountains-cordel.svg')}
            alt="Absaroka Mountain Peaks, Natural Sun with Organic Clouds, Pines, and Açaí Flora in Cordel Woodcut Style"
            className="block h-auto w-full"
            width={1440}
            height={540}
          />
        </CarvedWoodblockFrame>
      </div>
    </section>
  );
}
