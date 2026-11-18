import { useEffect, useState, type ReactNode } from 'react';
import {
  FacebookLogo,
  Flower,
  InstagramLogo,
  Leaf,
  Snowflake,
  Sun,
  Truck,
} from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy } from '../../data/editorial-copy';
import { assetUrl } from '../../lib/router';
import {
  SEASON_ORDER,
  getLiveStoreStatus,
  getSeasonSchedule,
  type LiveStoreStatus,
  type SeasonKey,
} from '../../lib/seasonalHoursEngine';
import { CordelBackgroundArtwork } from '../ui/CordelBackgroundArtwork';
import {
  CarvedWoodblockFrame,
  CottonPaperGrain,
  WoodgrainOverlay,
} from '../ui/WoodcutTextures';

const WOODCUT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SEASON_ICONS: Record<SeasonKey, ReactNode> = {
  summer: <Sun size={18} weight="bold" aria-hidden="true" />,
  fall: <Leaf size={18} weight="bold" aria-hidden="true" />,
  winter: <Snowflake size={18} weight="bold" aria-hidden="true" />,
  spring: <Flower size={18} weight="bold" aria-hidden="true" />,
};

export function SeasonalHoursSection() {
  const [liveStatus, setLiveStatus] = useState<LiveStoreStatus>(() => getLiveStoreStatus());
  const [selectedSeason, setSelectedSeason] = useState<SeasonKey>(
    () => getLiveStoreStatus().currentSeason,
  );
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLiveStatus(getLiveStoreStatus());
    }, 30_000);
    return () => window.clearInterval(intervalId);
  }, []);

  const displayedSchedule = getSeasonSchedule(selectedSeason);
  const isViewingActiveSeason = selectedSeason === liveStatus.currentSeason;
  const { seasonalHours, locationAndContact } = editorialCopy;

  const conciseStatusLine = liveStatus.isOpen
    ? `Open Now — ${liveStatus.statusDetail}`
    : liveStatus.statusBadgeText;

  return (
    <section
      id="hours"
      aria-labelledby="seasonal-hours-heading"
      className="surface-cotton-paper relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <CottonPaperGrain variant="light" opacity={0.045} />
      <WoodgrainOverlay variant="light" opacity={0.08} />
      <CordelBackgroundArtwork placement="hours-ambient" variant="light" />

      {/* Subtle Full-Width Cody Peaks Horizon Silhouette Along Lower Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-56 overflow-hidden opacity-[0.11] select-none sm:h-72"
      >
        <img
          src={assetUrl('assets/cordel/seasonal-peaks-woodcut.svg')}
          alt=""
          className="h-full w-full object-cover object-bottom"
          width={1200}
          height={360}
        />
      </div>

      <div className="widescreen-container relative z-10">
        {/* Header + Clean Live Clock Status Ledger */}
        <div className="grid grid-cols-1 gap-8 border-b border-[#1E2749]/25 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="min-w-0 lg:col-span-7">
            <h2
              id="seasonal-hours-heading"
              className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.06] font-extrabold tracking-tight text-[#1E2749]"
            >
              {seasonalHours.title}
            </h2>

            <p className="mt-4 w-full max-w-[54ch] text-base leading-relaxed text-[#30343F] sm:text-lg">
              {seasonalHours.intro}
            </p>
          </div>

          <div data-testid="live-clock-widget" className="min-w-0 lg:col-span-5">
            <CarvedWoodblockFrame variant="dark" className="p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-2xl font-extrabold text-[#FAFAFF] sm:text-3xl">
                  {liveStatus.codyTimeLabel}
                </p>
                <p className="text-sm font-medium text-[#E4D9FF]">{liveStatus.codyDateLabel}</p>
              </div>

              <div className="mt-4 border-t border-[#E4D9FF]/30 pt-3.5">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                      liveStatus.isOpen ? 'bg-[#E4D9FF]' : 'bg-[#8687B4]'
                    }`}
                  />
                  <p className="font-display text-sm font-bold text-[#FAFAFF] sm:text-base">
                    {conciseStatusLine}
                  </p>
                </div>
              </div>
            </CarvedWoodblockFrame>
          </div>
        </div>

        {/* Equal-Height Two-Column Season Selector + Weekly Hours Ledger */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          {/* Left Column: Season Tabs + Stretched Season Summary Panel */}
          <div className="flex min-w-0 flex-col gap-5 lg:col-span-5 lg:h-full">
            <div
              role="tablist"
              aria-label="Browse seasonal storefront schedules"
              className="grid shrink-0 grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2"
            >
              {SEASON_ORDER.map((seasonKey) => {
                const isSelected = selectedSeason === seasonKey;
                const isCurrent = liveStatus.currentSeason === seasonKey;
                const tabCopy = seasonalHours.seasonTabs[seasonKey];

                return (
                  <button
                    key={seasonKey}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`season-panel-${seasonKey}`}
                    id={`season-tab-${seasonKey}`}
                    onClick={() => setSelectedSeason(seasonKey)}
                    className={`flex min-h-[52px] flex-col items-start justify-center border px-3.5 py-2.5 text-left transition-all duration-200 sm:px-4 ${
                      isSelected
                        ? 'border-[#1E2749] bg-[#273469] text-[#FAFAFF] shadow-[0_8px_18px_-10px_rgba(30,39,73,0.55)]'
                        : 'border-[#1E2749]/45 bg-[#FAFAFF] text-[#1E2749] hover:border-[#1E2749] hover:bg-[#E4D9FF]'
                    }`}
                  >
                    <span className="flex w-full items-center justify-between gap-1.5 font-display text-sm font-bold sm:text-base">
                      <span className="inline-flex items-center gap-1.5">
                        {SEASON_ICONS[seasonKey]}
                        <span>{tabCopy.label}</span>
                      </span>
                      {isCurrent && (
                        <span
                          className={`px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                            isSelected
                              ? 'bg-[#E4D9FF] text-[#1E2749]'
                              : 'bg-[#273469] text-[#FAFAFF]'
                          }`}
                        >
                          Now
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <div data-testid="season-summary-card" className="flex flex-1 flex-col">
              <CarvedWoodblockFrame
                variant="periwinkle"
                className="flex-1 p-5 sm:p-7"
                contentClassName="flex h-full flex-col justify-between gap-6"
              >
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2.5 border-b border-[#1E2749]/20 pb-3">
                    <h3 className="font-display text-2xl font-extrabold text-[#1E2749]">
                      {displayedSchedule.label}
                    </h3>
                    {isViewingActiveSeason && (
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#273469]">
                        {seasonalHours.status.activeSeasonBadge}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 w-full max-w-[46ch] text-base leading-relaxed text-[#30343F]">
                    {displayedSchedule.summaryNote}
                  </p>
                </div>

                <div className="border-t border-[#1E2749]/25 pt-5">
                  <p className="text-sm font-medium leading-relaxed text-[#1E2749]">
                    {seasonalHours.springNotice}
                  </p>
                  <a
                    href={brandData.social.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-[44px] items-center gap-2 font-mono text-xs font-bold text-[#273469] underline hover:text-[#1E2749]"
                  >
                    <InstagramLogo size={16} weight="bold" aria-hidden="true" />
                    <span>Check @altitude_acai</span>
                  </a>
                </div>
              </CarvedWoodblockFrame>
            </div>
          </div>

          {/* Right Column: Stretched Weekly Hours Ledger (Clean — Zero Posters Dropdown) */}
          <div
            role="tabpanel"
            id={`season-panel-${selectedSeason}`}
            aria-labelledby={`season-tab-${selectedSeason}`}
            data-testid="weekly-hours-card"
            className="flex min-w-0 flex-col lg:col-span-7 lg:h-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSeason}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: WOODCUT_EASE }}
                className="flex h-full flex-1 flex-col"
              >
                <CarvedWoodblockFrame
                  variant="light"
                  className="flex-1 p-5 sm:p-7"
                  contentClassName="flex h-full flex-col justify-between"
                >
                  <div>
                    <div className="border-b border-[#1E2749]/25 pb-3.5">
                      <h3 className="font-display text-xl font-extrabold text-[#1E2749] sm:text-2xl">
                        Weekly Hours · {displayedSchedule.label}
                      </h3>
                    </div>

                    <ul className="mt-4 divide-y divide-[#1E2749]/15">
                      {displayedSchedule.orderedDays.map((dayItem) => {
                        const isTodayRow =
                          isViewingActiveSeason && dayItem.day === liveStatus.codyWeekday;

                        return (
                          <li
                            key={dayItem.day}
                            className={`flex flex-col justify-between gap-2 px-3 py-3 sm:flex-row sm:items-center sm:px-4 ${
                              isTodayRow
                                ? 'border-l-4 border-[#273469] bg-[#E4D9FF]/65'
                                : ''
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="font-display text-base font-bold text-[#1E2749]">
                                {dayItem.day}
                              </span>
                              {isTodayRow && (
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#273469]">
                                  · {seasonalHours.status.todayBadge}
                                </span>
                              )}
                            </div>

                            <div className="sm:text-right">
                              {dayItem.isClosed ? (
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#575E8F]">
                                  {seasonalHours.status.closedDayLabel}
                                </span>
                              ) : (
                                <div className="flex flex-wrap gap-3 sm:justify-end">
                                  {dayItem.shifts.map((shift) => (
                                    <span
                                      key={shift.label}
                                      className="font-mono text-sm font-bold text-[#1E2749]"
                                    >
                                      {shift.label}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </CarvedWoodblockFrame>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Single Institutional Food Truck & Local Events Horizontal Editorial Strip */}
        <div className="mt-12 border-y border-[#1E2749]/35 bg-[#E4D9FF]/55 px-5 py-7 backdrop-blur-[2px] sm:px-8 sm:py-9">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-7">
              <h3 className="font-display flex items-center gap-3 text-2xl font-extrabold text-[#1E2749] sm:text-3xl">
                <Truck size={28} weight="bold" className="shrink-0 text-[#273469]" aria-hidden="true" />
                <span>{seasonalHours.foodTruckBanner.title}</span>
              </h3>
              <p className="mt-2.5 w-full max-w-[60ch] text-base leading-relaxed text-[#30343F]">
                {seasonalHours.foodTruckBanner.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-5 lg:justify-end">
              <a
                href={brandData.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locationAndContact.channels.instagram.ariaLabel}
                className="woodcut-btn woodcut-btn-primary text-sm"
              >
                <InstagramLogo size={19} weight="bold" aria-hidden="true" />
                <span>{seasonalHours.foodTruckBanner.instagramLabel}</span>
              </a>

              <a
                href={brandData.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locationAndContact.channels.facebook.ariaLabel}
                className="woodcut-btn woodcut-btn-secondary text-sm"
              >
                <FacebookLogo size={19} weight="bold" aria-hidden="true" />
                <span>{seasonalHours.foodTruckBanner.facebookLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
