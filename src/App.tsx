import { useRef, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { BowlAnatomySection } from './components/sections/BowlAnatomySection';
import {
  CreateYourOwnSimulator,
  type BowlBuilderPreset,
} from './components/sections/CreateYourOwnSimulator';
import { HeroSection } from './components/sections/HeroSection';
import { LocationContactSection } from './components/sections/LocationContactSection';
import { SeasonalHoursSection } from './components/sections/SeasonalHoursSection';
import { SignatureBowlsSection } from './components/sections/SignatureBowlsSection';
import { editorialCopy } from './data/editorial-copy';

export function App() {
  const [activePreset, setActivePreset] = useState<BowlBuilderPreset | null>(null);
  const presetCounterRef = useRef(0);

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
    <MotionConfig reducedMotion="user">
      <div className="min-h-[100dvh] bg-[#FAFAFF] text-[#30343F]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-sm focus:border-2 focus:border-[#E4D9FF] focus:bg-[#1E2749] focus:px-4 focus:py-2.5 focus:font-display focus:text-sm focus:font-bold focus:text-[#FAFAFF] focus:shadow-[4px_4px_0px_#E4D9FF]"
        >
          {editorialCopy.navigation.skipToContent}
        </a>

        <Navbar />

        <main id="main-content" tabIndex={-1} className="outline-none">
          <HeroSection />
          <BowlAnatomySection />
          <SignatureBowlsSection onPreviewBowl={handlePreviewBowl} />
          <CreateYourOwnSimulator
            activePreset={activePreset}
            onClearPreset={() => setActivePreset(null)}
          />
          <SeasonalHoursSection />
          <LocationContactSection />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
