import { BowlAnatomySection } from '../components/sections/BowlAnatomySection';
import { FeaturedBowlsPreviewSection } from '../components/sections/FeaturedBowlsPreviewSection';
import { HeroSection } from '../components/sections/HeroSection';
import { LocationContactSection } from '../components/sections/LocationContactSection';
import { SeasonalHoursSection } from '../components/sections/SeasonalHoursSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <BowlAnatomySection />
      <FeaturedBowlsPreviewSection />
      <SeasonalHoursSection />
      <LocationContactSection />
    </>
  );
}
