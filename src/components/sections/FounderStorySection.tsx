import { motion, useReducedMotion } from 'motion/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy } from '../../data/editorial-copy';
import { assetUrl } from '../../lib/router';
import { CordelBackgroundArtwork } from '../ui/CordelBackgroundArtwork';
import { CottonPaperGrain, WoodgrainOverlay } from '../ui/WoodcutTextures';

const WOODCUT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function FounderStorySection() {
  const prefersReducedMotion = useReducedMotion();
  const { founderStory } = editorialCopy;

  return (
    <section
      id="our-story"
      aria-labelledby="founder-story-heading"
      className="surface-woodblock-indigo relative overflow-hidden py-20 text-[#FAFAFF] sm:py-24 lg:py-28"
    >
      <CottonPaperGrain variant="dark" opacity={0.05} />
      <WoodgrainOverlay variant="dark" opacity={0.09} />
      <CordelBackgroundArtwork placement="story-branches" variant="dark" />

      <div className="widescreen-container relative z-10">
        {/* 12-Column Editorial Magazine Spread (Title Left, Verbatim Narrative Center, Overlapping Collage Right — ZERO Mini-Cards) */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
          {/* Left Expressive Display Title */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.42, ease: WOODCUT_EASE }}
            className="min-w-0 lg:col-span-3"
          >
            <div className="h-[2px] w-14 bg-[#E4D9FF]" aria-hidden="true" />
            <h2
              id="founder-story-heading"
              className="font-display mt-5 text-[clamp(2rem,4.4vw,3.3rem)] leading-[1.06] font-extrabold tracking-tight text-[#FAFAFF]"
            >
              {founderStory.title}
            </h2>
          </motion.div>

          {/* Center Fluid Editorial Narrative Breathing Directly on #1E2749 */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.44, delay: 0.05, ease: WOODCUT_EASE }}
            className="min-w-0 lg:border-l lg:border-[#E4D9FF]/25 lg:pl-10 lg:col-span-5"
          >
            <p className="w-full max-w-[54ch] text-base leading-[1.8] text-[#E4D9FF] sm:text-lg sm:leading-[1.85]">
              {founderStory.officialParagraph}
            </p>
          </motion.div>

          {/* Right Overlapping Editorial Photography Collage */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.48, delay: 0.1, ease: WOODCUT_EASE }}
            className="relative min-w-0 lg:col-span-4"
          >
            <div className="relative space-y-4">
              <figure className="overflow-hidden border border-[#E4D9FF]/75 bg-[#273469] p-1.5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]">
                <div className="aspect-[16/10] overflow-hidden bg-[#1E2749]">
                  <img
                    src={assetUrl('assets/bowls/official-cody-bench-duo.webp')}
                    alt={brandData.officialMedia.bowlGallery[1].alt}
                    className="h-full w-full object-cover"
                    width={800}
                    height={500}
                  />
                </div>
              </figure>

              <div className="grid grid-cols-2 gap-4 sm:-ml-6 sm:pr-4">
                <figure className="overflow-hidden border border-[#E4D9FF]/65 bg-[#E4D9FF] p-1 shadow-[0_14px_28px_-14px_rgba(0,0,0,0.55)]">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={assetUrl('assets/bowls/official-window-seeds-bowl.webp')}
                      alt={brandData.officialMedia.bowlGallery[2].alt}
                      className="h-full w-full object-cover"
                      width={480}
                      height={360}
                    />
                  </div>
                </figure>

                <figure className="overflow-hidden border border-[#E4D9FF]/65 bg-[#FAFAFF] p-1 shadow-[0_14px_28px_-14px_rgba(0,0,0,0.55)] sm:translate-y-3">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={assetUrl('assets/bowls/official-berry-pollen-bowl.webp')}
                      alt={brandData.officialMedia.bowlGallery[3].alt}
                      className="h-full w-full object-cover"
                      width={480}
                      height={360}
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
