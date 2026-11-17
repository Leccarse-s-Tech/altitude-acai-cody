import { InstagramLogo, MapPin, Mountains } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy } from '../../data/editorial-copy';
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
      className="surface-cotton-paper relative flex min-h-[100dvh] flex-col justify-between overflow-hidden pt-20 pb-0"
    >
      <CottonPaperGrain variant="light" opacity={0.045} />
      <WoodgrainOverlay variant="light" opacity={0.09} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Editorial Stack (Strictly 4 Elements) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: WOODCUT_EASE }}
            className="lg:col-span-6"
          >
            {/* Eyebrow 1 of max 2 on page */}
            <div className="inline-flex items-center gap-2 rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF] px-3 py-1.5 shadow-[3px_3px_0px_#1E2749]">
              <Mountains size={16} weight="bold" className="text-[#1E2749]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#1E2749]">
                {hero.locationTag}
              </span>
            </div>

            <h1
              id="hero-heading"
              className="font-display mt-6 text-4xl font-extrabold tracking-[-0.025em] text-[#1E2749] sm:text-5xl xl:text-[3.65rem] xl:leading-[1.06]"
            >
              {hero.headline}
            </h1>

            <p className="mt-5 max-w-[50ch] text-base leading-relaxed text-[#30343F] sm:text-lg">
              {hero.subhead}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={hero.primaryCta.ariaLabel}
                className="woodcut-btn woodcut-btn-primary text-base whitespace-nowrap"
              >
                <MapPin size={20} weight="bold" aria-hidden="true" />
                <span>{hero.primaryCta.label}</span>
              </a>

              <a
                href={hero.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={hero.secondaryCta.ariaLabel}
                className="woodcut-btn woodcut-btn-secondary text-base whitespace-nowrap"
              >
                <InstagramLogo size={20} weight="bold" aria-hidden="true" />
                <span>{hero.secondaryCta.label}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Asymmetric Cordel Print + Official Bowl Spread Composition */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.08, ease: WOODCUT_EASE }}
            className="relative lg:col-span-6"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-12 sm:items-end">
              {/* Primary Cordel Woodcut Mountain Landscape */}
              <div className="relative sm:col-span-8">
                <CarvedWoodblockFrame
                  variant="light"
                  showCornerMarks={true}
                  className="shadow-[6px_6px_0px_#1E2749]"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#E4D9FF]">
                    <img
                      src="./assets/brand/hero-cordel-landscape.webp"
                      alt="Woodcut print illustration of Wyoming Absaroka mountains above a carved açaí bowl"
                      className="h-full w-full object-cover"
                      width={800}
                      height={600}
                    />
                  </div>
                </CarvedWoodblockFrame>

                {/* Overlapping Official Crest Medallion */}
                <div className="absolute -top-4 -left-3 z-20 h-20 w-20 overflow-hidden rounded-sm border-2 border-[#1E2749] bg-[#FAFAFF] p-1 shadow-[4px_4px_0px_#1E2749] sm:-left-5 sm:h-24 sm:w-24">
                  <img
                    src="./assets/brand/logo-official.webp"
                    alt={hero.logoAlt}
                    className="h-full w-full object-cover"
                    width={96}
                    height={96}
                  />
                </div>
              </div>

              {/* Official Bowl Overhead Spread Plate */}
              <div className="sm:col-span-4 sm:-ml-6 sm:mb-4">
                <CarvedWoodblockFrame
                  variant="periwinkle"
                  showCornerMarks={false}
                  className="shadow-[5px_5px_0px_#1E2749]"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden border-b-2 border-[#1E2749]">
                    <img
                      src="./assets/bowls/official-overhead-spread.webp"
                      alt="Overhead view of handcrafted Altitude Açaí bowls with fresh berries, bananas, granola, and honey drizzle"
                      className="h-full w-full object-cover"
                      width={480}
                      height={600}
                    />
                  </div>
                  <div className="bg-[#E4D9FF] p-3">
                    <p className="font-mono text-xs font-semibold text-[#1E2749]">
                      1302 Beck Ave · Cody
                    </p>
                  </div>
                </CarvedWoodblockFrame>
              </div>
            </div>

            {/* Verified Shop Facts Strip Framed Beneath Visual Collage */}
            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {hero.quickFacts.map((fact) => (
                <div
                  key={fact}
                  className="rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF]/75 px-3.5 py-2.5 text-sm font-semibold text-[#1E2749] shadow-[3px_3px_0px_#1E2749]"
                >
                  {fact}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wyoming Mountains Cordel Engraving Band Anchoring Bottom Edge */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <CarvedWoodblockFrame variant="light" showCornerMarks={false} className="shadow-[4px_4px_0px_#1E2749]">
          <img
            src="./assets/cordel/wyoming-mountains-cordel.svg"
            alt="Cody, Wyoming Absaroka Mountain Peaks and Açaí Harvest in Cordel Woodcut Style"
            className="h-auto max-h-44 w-full object-cover sm:max-h-52 lg:max-h-60"
            width={1440}
            height={540}
          />
        </CarvedWoodblockFrame>
      </div>
    </section>
  );
}
