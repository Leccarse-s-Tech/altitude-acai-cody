import { useEffect, useState } from 'react';
import { List, MapPin, X } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy } from '../../data/editorial-copy';
import { AppLink, assetUrl, usePathname } from '../../lib/router';
import { getLiveStoreStatus, type LiveStoreStatus } from '../../lib/seasonalHoursEngine';
import { CottonPaperGrain } from '../ui/WoodcutTextures';

const WOODCUT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveStatus, setLiveStatus] = useState<LiveStoreStatus>(() => getLiveStoreStatus());
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();

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
  const compactStatusLabel = liveStatus.isOpen ? 'Open Now' : 'Closed';

  return (
    <header className="surface-woodblock-indigo sticky top-0 z-50 border-b-2 border-[#E4D9FF]/35">
      <CottonPaperGrain variant="dark" opacity={0.04} />

      <div className="relative z-10 mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 lg:px-8">
        {/* Brand Crest & Wordmark */}
        <AppLink
          to="/"
          className="focus-on-dark inline-flex min-h-[44px] min-w-0 shrink-0 items-center gap-2 rounded-sm pr-1 sm:gap-3 sm:pr-2"
        >
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-sm border-2 border-[#E4D9FF] bg-[#FAFAFF] shadow-[2px_2px_0px_#E4D9FF] sm:h-11 sm:w-11">
            <img
              src={assetUrl('assets/brand/logo-official.webp')}
              alt={editorialCopy.hero.logoAlt}
              className="h-full w-full object-cover"
              width={44}
              height={44}
            />
          </span>
          <span className="font-display text-base font-extrabold tracking-tight whitespace-nowrap text-[#FAFAFF] sm:text-xl">
            {editorialCopy.navigation.brandLabel}
          </span>
        </AppLink>

        {/* Single-Line Desktop Navigation (>= 1024px) */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex xl:gap-2">
          {editorialCopy.navigation.links.map((link) => {
            const isActiveRoute = link.to === '/menu' && pathname === '/menu';
            return (
              <AppLink
                key={link.id}
                to={link.to}
                aria-current={isActiveRoute ? 'page' : undefined}
                className={`focus-on-dark inline-flex min-h-[44px] items-center rounded-sm px-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  isActiveRoute
                    ? 'bg-[#E4D9FF] font-bold text-[#1E2749]'
                    : 'text-[#FAFAFF] hover:bg-[#273469] hover:text-[#E4D9FF]'
                }`}
              >
                {link.label}
              </AppLink>
            );
          })}
        </nav>

        {/* Live Status Pill + Single Directions CTA + Hamburger Toggle (< 1024px) */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <AppLink
            to="/#hours"
            aria-label={`Current store status: ${compactStatusLabel}`}
            className="focus-on-dark hidden min-h-[44px] items-center gap-2 rounded-sm border border-[#E4D9FF]/50 bg-[#273469] px-3 py-1.5 text-xs font-medium whitespace-nowrap text-[#FAFAFF] transition-colors duration-200 hover:border-[#E4D9FF] hover:bg-[#575E8F] xl:inline-flex"
          >
            <span
              aria-hidden="true"
              className={`h-2.5 w-2.5 shrink-0 rounded-full border border-[#1E2749] ${
                liveStatus.isOpen ? 'bg-[#E4D9FF]' : 'bg-[#8687B4]'
              }`}
            />
            <span className="font-mono tracking-tight">
              {compactStatusLabel} · {liveStatus.codyTimeLabel}
            </span>
          </AppLink>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={editorialCopy.navigation.primaryCtaAria}
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

      {/* Accessible Mobile & Tablet Drawer (< 1024px) */}
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
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-sm border border-[#E4D9FF]/45 bg-[#1E2749] px-3.5 py-2.5 text-sm text-[#FAFAFF]">
                <span className="inline-flex items-center gap-2 font-medium">
                  <span
                    aria-hidden="true"
                    className={`h-2.5 w-2.5 rounded-full ${
                      liveStatus.isOpen ? 'bg-[#E4D9FF]' : 'bg-[#8687B4]'
                    }`}
                  />
                  <span>{compactStatusLabel}</span>
                </span>
                <span className="font-mono text-xs text-[#E4D9FF]">{liveStatus.codyTimeLabel}</span>
              </div>

              <nav aria-label="Mobile navigation" className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {editorialCopy.navigation.links.map((link) => {
                  const isActiveRoute = link.to === '/menu' && pathname === '/menu';
                  return (
                    <AppLink
                      key={link.id}
                      to={link.to}
                      aria-current={isActiveRoute ? 'page' : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`focus-on-dark flex min-h-[44px] items-center rounded-sm border px-4 text-base font-medium transition-colors duration-150 ${
                        isActiveRoute
                          ? 'border-[#E4D9FF] bg-[#E4D9FF] font-bold text-[#1E2749]'
                          : 'border-[#E4D9FF]/25 bg-[#1E2749]/75 text-[#FAFAFF] hover:border-[#E4D9FF] hover:bg-[#575E8F]'
                      }`}
                    >
                      {link.label}
                    </AppLink>
                  );
                })}
              </nav>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={editorialCopy.navigation.primaryCtaAria}
                onClick={() => setMobileMenuOpen(false)}
                className="woodcut-btn woodcut-btn-on-dark mt-1 w-full text-base"
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
