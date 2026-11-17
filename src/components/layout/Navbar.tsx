import { useEffect, useState } from 'react';
import { List, MapPin, X } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy } from '../../data/editorial-copy';
import { getLiveStoreStatus, type LiveStoreStatus } from '../../lib/seasonalHoursEngine';
import { CottonPaperGrain } from '../ui/WoodcutTextures';

const WOODCUT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveStatus, setLiveStatus] = useState<LiveStoreStatus>(() =>
    getLiveStoreStatus(),
  );
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLiveStatus(getLiveStoreStatus());
    }, 30_000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const directionsUrl = brandData.location.googleMapsDirectionsUrl;

  return (
    <header className="surface-woodblock-indigo sticky top-0 z-50 border-b-2 border-[#E4D9FF]/35">
      <CottonPaperGrain variant="dark" opacity={0.04} />

      <div className="relative z-10 mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Emblem & Wordmark */}
        <a
          href="#top"
          className="focus-on-dark inline-flex min-h-[44px] shrink-0 items-center gap-3 rounded-sm pr-2"
        >
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-sm border-2 border-[#E4D9FF] bg-[#FAFAFF] shadow-[2px_2px_0px_#E4D9FF]">
            <img
              src="./assets/brand/logo-official.webp"
              alt={editorialCopy.hero.logoAlt}
              className="h-full w-full object-cover"
              width={44}
              height={44}
            />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight whitespace-nowrap text-[#FAFAFF] sm:text-xl">
            {editorialCopy.navigation.brandLabel}
          </span>
        </a>

        {/* Single-Line Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex xl:gap-2"
        >
          {editorialCopy.navigation.links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="focus-on-dark inline-flex min-h-[44px] items-center rounded-sm px-2.5 text-sm font-medium whitespace-nowrap text-[#FAFAFF] transition-colors duration-200 hover:bg-[#273469] hover:text-[#E4D9FF]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Live Cody Status Pill + Primary Directions CTA + Mobile Menu Toggle */}
        <div className="flex shrink-0 items-center gap-2.5">
          <a
            href="#hours"
            aria-label={`Current store status in Cody, Wyoming: ${liveStatus.statusBadgeText}`}
            className="focus-on-dark hidden min-h-[44px] items-center gap-2 rounded-sm border border-[#E4D9FF]/50 bg-[#273469] px-3 py-1.5 text-xs font-medium whitespace-nowrap text-[#FAFAFF] transition-colors duration-200 hover:border-[#E4D9FF] hover:bg-[#575E8F] xl:inline-flex"
          >
            <span
              aria-hidden="true"
              className={`h-2.5 w-2.5 shrink-0 rounded-full border border-[#1E2749] ${
                liveStatus.isOpen ? 'bg-[#E4D9FF]' : 'bg-[#8687B4]'
              }`}
            />
            <span className="font-mono tracking-tight">
              {liveStatus.isOpen ? 'Open in Cody' : 'Closed'} · {liveStatus.codyTimeLabel}
            </span>
          </a>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={editorialCopy.hero.primaryCta.ariaLabel}
            className="woodcut-btn woodcut-btn-on-dark hidden text-sm whitespace-nowrap sm:inline-flex"
          >
            <MapPin size={18} weight="bold" aria-hidden="true" />
            <span>{editorialCopy.navigation.primaryCta}</span>
          </a>

          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={
              mobileMenuOpen
                ? editorialCopy.navigation.mobileMenuCloseLabel
                : editorialCopy.navigation.mobileMenuOpenLabel
            }
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="focus-on-dark inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border-2 border-[#E4D9FF] bg-[#273469] text-[#FAFAFF] shadow-[2px_2px_0px_#E4D9FF] transition-transform duration-150 active:translate-x-[1px] active:translate-y-[1px] lg:hidden"
          >
            {mobileMenuOpen ? (
              <X size={22} weight="bold" aria-hidden="true" />
            ) : (
              <List size={22} weight="bold" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: WOODCUT_EASE }}
            className="surface-twilight-plate relative z-20 border-t-2 border-[#E4D9FF]/40 px-4 pt-4 pb-6 lg:hidden"
          >
            <CottonPaperGrain variant="dark" opacity={0.045} />
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-3">
              <div className="flex items-center justify-between rounded-sm border border-[#E4D9FF]/45 bg-[#1E2749] px-3.5 py-2.5 text-sm text-[#FAFAFF]">
                <span className="inline-flex items-center gap-2 font-medium">
                  <span
                    aria-hidden="true"
                    className={`h-2.5 w-2.5 rounded-full ${
                      liveStatus.isOpen ? 'bg-[#E4D9FF]' : 'bg-[#8687B4]'
                    }`}
                  />
                  <span>{liveStatus.statusBadgeText}</span>
                </span>
                <span className="font-mono text-xs text-[#E4D9FF]">
                  {liveStatus.codyTimeLabel}
                </span>
              </div>

              <nav aria-label="Mobile navigation" className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {editorialCopy.navigation.links.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="focus-on-dark flex min-h-[44px] items-center rounded-sm border border-[#E4D9FF]/25 bg-[#1E2749]/75 px-4 text-base font-medium text-[#FAFAFF] transition-colors duration-150 hover:border-[#E4D9FF] hover:bg-[#575E8F]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={editorialCopy.hero.primaryCta.ariaLabel}
                onClick={() => setMobileMenuOpen(false)}
                className="woodcut-btn woodcut-btn-on-dark mt-1 w-full text-base whitespace-nowrap"
              >
                <MapPin size={19} weight="bold" aria-hidden="true" />
                <span>{editorialCopy.navigation.primaryCta}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
