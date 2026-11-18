import { useRef, useState } from 'react';
import { Sparkle } from '@phosphor-icons/react';
import {
  CreateYourOwnSimulator,
  type BowlBuilderPreset,
} from '../components/sections/CreateYourOwnSimulator';
import { SignatureBowlsSection } from '../components/sections/SignatureBowlsSection';
import { CordelBackgroundArtwork } from '../components/ui/CordelBackgroundArtwork';
import { CottonPaperGrain, WoodgrainOverlay } from '../components/ui/WoodcutTextures';
import { editorialCopy } from '../data/editorial-copy';

export function MenuPage() {
  const [activePreset, setActivePreset] = useState<BowlBuilderPreset | null>(null);
  const presetCounterRef = useRef(0);
  const { menuPage } = editorialCopy;

  function handlePreviewBowl(preset: Omit<BowlBuilderPreset, 'requestId'>) {
    presetCounterRef.current += 1;
    setActivePreset({
      ...preset,
      requestId: presetCounterRef.current,
    });

    const target = document.getElementById('build-your-own');
    if (target) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }
  }

  return (
    <>
      {/* Single Editorial Menu Header (displays 12 oz Bowl, 16 oz Bowl, and Base Rule ONCE) */}
      <section
        aria-labelledby="menu-page-heading"
        className="surface-woodblock-indigo relative overflow-hidden border-b border-[#E4D9FF]/30 py-16 text-[#FAFAFF] sm:py-20"
      >
        <CottonPaperGrain variant="dark" opacity={0.05} />
        <WoodgrainOverlay variant="dark" opacity={0.09} />
        <CordelBackgroundArtwork placement="menu-header" variant="dark" />

        <div className="widescreen-container relative z-10">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-7">
              <h1
                id="menu-page-heading"
                className="font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05] font-extrabold tracking-tight text-[#FAFAFF]"
              >
                {menuPage.title}
              </h1>
              <p className="mt-4 w-full max-w-[56ch] text-base leading-relaxed text-[#E4D9FF] sm:text-xl">
                {menuPage.intro}
              </p>
            </div>

            {/* Single Canonical Sizes & Base Rule Editorial Print Strip */}
            <div className="min-w-0 border-l-2 border-[#E4D9FF]/60 pl-5 lg:col-span-5">
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                {menuPage.sizes.map((size) => (
                  <span
                    key={size}
                    className="font-display text-lg font-extrabold tracking-tight text-[#FAFAFF] sm:text-xl"
                  >
                    {size}
                  </span>
                ))}
              </div>

              <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[#E4D9FF] sm:text-base">
                <Sparkle size={15} weight="bold" className="shrink-0" aria-hidden="true" />
                <span>{menuPage.baseRule}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <SignatureBowlsSection onPreviewBowl={handlePreviewBowl} />

      <CreateYourOwnSimulator
        activePreset={activePreset}
        onClearPreset={() => setActivePreset(null)}
      />
    </>
  );
}
