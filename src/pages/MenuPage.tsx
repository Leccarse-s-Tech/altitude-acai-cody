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
      {/* Single Menu Rules Header (displays 12 oz Bowl, 16 oz Bowl, and Base Rule ONCE) */}
      <section
        aria-labelledby="menu-page-heading"
        className="surface-woodblock-indigo relative overflow-hidden border-b-2 border-[#E4D9FF]/40 py-14 text-[#FAFAFF] sm:py-16"
      >
        <CottonPaperGrain variant="dark" opacity={0.05} />
        <WoodgrainOverlay variant="dark" opacity={0.09} />
        <CordelBackgroundArtwork placement="menu-header" variant="dark" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1
              id="menu-page-heading"
              className="font-display text-[clamp(2rem,5.5vw,3.4rem)] leading-[1.08] font-extrabold tracking-tight text-[#FAFAFF]"
            >
              {menuPage.title}
            </h1>
            <p className="mt-4 w-full max-w-prose text-base leading-relaxed text-[#E4D9FF] sm:text-lg">
              {menuPage.intro}
            </p>

            {/* Single Canonical Sizes & Base Rule Banner */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {menuPage.sizes.map((size) => (
                <span
                  key={size}
                  className="inline-flex items-center rounded-sm border-2 border-[#E4D9FF] bg-[#273469] px-3.5 py-1.5 font-mono text-xs font-bold text-[#FAFAFF] shadow-[3px_3px_0px_#E4D9FF]"
                >
                  {size}
                </span>
              ))}

              <span className="inline-flex max-w-full items-center gap-2 rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF] px-3.5 py-1.5 font-mono text-xs font-bold text-[#1E2749] shadow-[3px_3px_0px_#1E2749]">
                <Sparkle size={14} weight="bold" className="shrink-0" aria-hidden="true" />
                <span>{menuPage.baseRule}</span>
              </span>
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
