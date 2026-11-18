import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { FloatingTextUsButton } from './components/ui/FloatingTextUsButton';
import { WoodcutCarvedFilterDefs } from './components/ui/WoodcutTextures';
import { editorialCopy } from './data/editorial-copy';
import { usePathname } from './lib/router';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isMenu = pathname === '/menu';
  const isNotFound = !isHome && !isMenu;

  useEffect(() => {
    if (isMenu) {
      document.title = 'Menu | Altitude Açaí';
    } else if (isNotFound) {
      document.title = '404 | Altitude Açaí';
    } else {
      document.title = 'Altitude Açaí | Handcrafted Açaí Bowls in Cody, Wyoming';
    }
  }, [isMenu, isNotFound]);

  if (isNotFound) {
    return (
      <MotionConfig reducedMotion="user">
        <WoodcutCarvedFilterDefs />
        <NotFoundPage />
      </MotionConfig>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <WoodcutCarvedFilterDefs />
      <div className="min-h-[100dvh] bg-[#FAFAFF] text-[#30343F]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-sm focus:border-2 focus:border-[#E4D9FF] focus:bg-[#1E2749] focus:px-4 focus:py-2.5 focus:font-display focus:text-sm focus:font-bold focus:text-[#FAFAFF] focus:shadow-[4px_4px_0px_#E4D9FF]"
        >
          {editorialCopy.navigation.skipToContent}
        </a>

        <Navbar />

        <main id="main-content" tabIndex={-1} className="outline-none">
          {isMenu ? <MenuPage /> : <HomePage />}
        </main>

        <Footer />
        <FloatingTextUsButton />
      </div>
    </MotionConfig>
  );
}

export default App;
