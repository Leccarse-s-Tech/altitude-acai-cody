import { useEffect, useState, type ReactNode } from 'react';
import {
  CaretDown,
  CaretUp,
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
  CordelDivider,
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

interface OfficialPosterItem {
  id: string;
  title: string;
  subtitle: string;
  imagePath: string;
  imageAlt: string;
}

const OFFICIAL_POSTERS: readonly OfficialPosterItem[] = [
  {
    id: 'winter-hours',
    title: 'Official Winter Schedule Poster',
    subtitle: 'Wednesday–Saturday 8:00 AM - 2:00 PM · Closed Sun–Tue',
    imagePath: 'assets/brand/official-winter-hours-poster.webp',
    imageAlt:
      'Official Altitude Açaí Winter Hours poster listing Wednesday through Saturday 8:00 AM to 2:00 PM',
  },
  {
    id: 'veterans-day',
    title: brandData.specialHolidayNotices[0].title,
    subtitle: `${brandData.specialHolidayNotices[0].date} · ${brandData.specialHolidayNotices[0].hours}`,
    imagePath: 'assets/brand/official-veterans-notice.webp',
    imageAlt:
      'Official Altitude Açaí Veterans Day appreciation poster offering a complimentary bowl to veterans and active duty military',
  },
  {
    id: 'thanksgiving-break',
    title: brandData.specialHolidayNotices[1].title,
    subtitle: `${brandData.specialHolidayNotices[1].status} · ${brandData.specialHolidayNotices[1].reopening}`,
    imagePath: 'assets/brand/official-thanksgiving-notice.webp',
    imageAlt:
      'Official Altitude Açaí Thanksgiving Break notice showing holiday closure dates and reopening schedule',
  },
];

export function SeasonalHoursSection() {
  const [liveStatus, setLiveStatus] = useState<LiveStoreStatus>(() => getLiveStoreStatus());
  const [selectedSeason, setSelectedSeason] = useState<SeasonKey>(
    () => getLiveStoreStatus().currentSeason,
  );
  const [showPosters, setShowPosters] = useState(false);
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
      className="surface-periwinkle-print relative overflow-hidden border-t-2 border-[#1E2749] py-16 sm:py-20 lg:py-24"
    >
      <CottonPaperGrain variant="periwinkle" opacity={0.045} />
      <WoodgrainOverlay variant="periwinkle" opacity={0.08} />
      <CordelBackgroundArtwork placement="hours-ambient" variant="periwinkle" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header + Clean Live Clock Status Widget */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="min-w-0 lg:col-span-7">
            <h2
              id="seasonal-hours-heading"
              className="font-display text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.1] font-extrabold tracking-tight text-[#1E2749]"
            >
              {seasonalHours.title}
            </h2>

            <p className="mt-4 w-full max-w-prose text-base leading-relaxed text-[#30343F] sm:text-lg">
              {seasonalHours.intro}
            </p>
          </div>

          <div data-testid="live-clock-widget" className="min-w-0 lg:col-span-5">
            <CarvedWoodblockFrame
              variant="dark"
              showCornerMarks={true}
              className="p-4 sm:p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-2xl font-extrabold text-[#FAFAFF] sm:text-3xl">
                  {liveStatus.codyTimeLabel}
                </p>
                <p className="text-sm font-medium text-[#E4D9FF]">{liveStatus.codyDateLabel}</p>
              </div>

              <div className="mt-4 rounded-sm border-2 border-[#E4D9FF] bg-[#1E2749] px-3.5 py-3 sm:px-4">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={`h-3 w-3 shrink-0 rounded-full border border-[#1E2749] ${
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

        {/* Cordel Seasonal Peaks Woodcut Engraving */}
        <div className="mt-8 sm:mt-10">
          <CarvedWoodblockFrame variant="light" showCornerMarks={false}>
            <img
              src={assetUrl('assets/cordel/seasonal-peaks-woodcut.svg')}
              alt="Seasonal mountain woodcut contrasting summer sun with wavy clouds and winter snow ridges"
              className="block h-auto w-full"
              width={1200}
              height={360}
            />
          </CarvedWoodblockFrame>
        </div>

        {/* Equal-Height Two-Column Season Selector + Weekly Hours Ledger */}
        <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Season Tabs + Stretched Season Description Card */}
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
                    className={`flex min-h-[52px] flex-col items-start justify-center rounded-sm border-2 px-3 py-2.5 text-left transition-all duration-200 sm:px-4 ${
                      isSelected
                        ? 'border-[#1E2749] bg-[#273469] text-[#FAFAFF] shadow-[3px_3px_0px_#1E2749]'
                        : 'border-[#1E2749] bg-[#FAFAFF] text-[#1E2749] hover:bg-[#E4D9FF]'
                    }`}
                  >
                    <span className="flex w-full items-center justify-between gap-1.5 font-display text-sm font-bold sm:text-base">
                      <span className="inline-flex items-center gap-1.5">
                        {SEASON_ICONS[seasonKey]}
                        <span>{tabCopy.label}</span>
                      </span>
                      {isCurrent && (
                        <span
                          className={`rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-bold ${
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
                variant="light"
                showCornerMarks={false}
                className="flex-1 p-4 sm:p-6"
                contentClassName="flex h-full flex-col justify-between gap-5"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display text-2xl font-extrabold text-[#1E2749]">
                      {displayedSchedule.label}
                    </h3>
                    {isViewingActiveSeason && (
                      <span className="inline-block rounded-sm bg-[#273469] px-2.5 py-0.5 font-mono text-xs font-semibold text-[#FAFAFF]">
                        {seasonalHours.status.activeSeasonBadge}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 w-full max-w-prose text-base leading-relaxed text-[#30343F]">
                    {displayedSchedule.summaryNote}
                  </p>
                </div>

                <div className="rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF]/55 p-4 shadow-[3px_3px_0px_#1E2749]">
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

          {/* Right Column: Stretched Weekly Hours Card */}
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
                  showCornerMarks={true}
                  className="flex-1 p-4 sm:p-6"
                  contentClassName="flex h-full flex-col justify-between"
                >
                  <div>
                    <div className="border-b-2 border-[#1E2749]/15 pb-3.5">
                      <h3 className="font-display text-xl font-extrabold text-[#1E2749]">
                        Weekly Hours · {displayedSchedule.label}
                      </h3>
                    </div>

                    <ul className="mt-4 divide-y-2 divide-[#1E2749]/10">
                      {displayedSchedule.orderedDays.map((dayItem) => {
                        const isTodayRow =
                          isViewingActiveSeason && dayItem.day === liveStatus.codyWeekday;

                        return (
                          <li
                            key={dayItem.day}
                            className={`flex flex-col justify-between gap-2 rounded-sm px-3 py-3 sm:flex-row sm:items-center sm:px-3.5 ${
                              isTodayRow
                                ? 'border-2 border-[#1E2749] bg-[#E4D9FF] shadow-[2px_2px_0px_#1E2749]'
                                : ''
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="font-display text-base font-bold text-[#1E2749]">
                                {dayItem.day}
                              </span>
                              {isTodayRow && (
                                <span className="rounded-sm bg-[#273469] px-2 py-0.5 font-mono text-xs font-bold text-[#FAFAFF]">
                                  {seasonalHours.status.todayBadge}
                                </span>
                              )}
                            </div>

                            <div className="sm:text-right">
                              {dayItem.isClosed ? (
                                <span className="inline-block rounded-sm border border-[#1E2749]/40 bg-[#FAFAFF] px-2.5 py-1 font-mono text-xs font-bold text-[#575E8F]">
                                  {seasonalHours.status.closedDayLabel}
                                </span>
                              ) : (
                                <div className="flex flex-wrap gap-1.5 sm:justify-end">
                                  {dayItem.shifts.map((shift) => (
                                    <span
                                      key={shift.label}
                                      className="inline-block rounded-sm border border-[#1E2749] bg-[#FAFAFF] px-2.5 py-1 font-mono text-xs font-bold text-[#1E2749]"
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

                  {/* Expandable Official Storefront Notice Flyers */}
                  <div className="mt-6 border-t-2 border-[#1E2749]/15 pt-4">
                    <button
                      type="button"
                      aria-expanded={showPosters}
                      aria-controls="official-shop-posters-panel"
                      onClick={() => setShowPosters((prev) => !prev)}
                      className="woodcut-btn woodcut-btn-secondary w-full justify-between text-xs sm:text-sm"
                    >
                      <span>Shop Posters & Notices</span>
                      {showPosters ? (
                        <CaretUp size={18} weight="bold" aria-hidden="true" />
                      ) : (
                        <CaretDown size={18} weight="bold" aria-hidden="true" />
                      )}
                    </button>

                    <AnimatePresence>
                      {showPosters && (
                        <motion.div
                          id="official-shop-posters-panel"
                          initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.22, ease: WOODCUT_EASE }}
                          className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3"
                        >
                          {OFFICIAL_POSTERS.map((poster) => (
                            <figure
                              key={poster.id}
                              className="overflow-hidden rounded-sm border-2 border-[#1E2749] bg-[#FAFAFF] shadow-[3px_3px_0px_#1E2749]"
                            >
                              <div className="aspect-[3/4] overflow-hidden border-b-2 border-[#1E2749] bg-[#E4D9FF]/30">
                                <img
                                  src={assetUrl(poster.imagePath)}
                                  alt={poster.imageAlt}
                                  className="h-full w-full object-cover"
                                  width={360}
                                  height={480}
                                />
                              </div>
                              <figcaption className="p-3">
                                <p className="font-display text-sm font-bold text-[#1E2749]">
                                  {poster.title}
                                </p>
                                <p className="mt-1 text-xs text-[#575E8F]">{poster.subtitle}</p>
                              </figcaption>
                            </figure>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CarvedWoodblockFrame>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <CordelDivider variant="light" className="my-12 sm:my-14" />

        {/* Single Institutional Food Truck & Local Events Banner (Zero Hardcoded Dates/Tournaments) */}
        <CarvedWoodblockFrame
          variant="dark"
          showCornerMarks={true}
          className="p-5 sm:p-8"
        >
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-7">
              <h3 className="font-display flex items-center gap-3 text-2xl font-extrabold text-[#FAFAFF] sm:text-3xl">
                <Truck size={28} weight="bold" className="shrink-0 text-[#E4D9FF]" aria-hidden="true" />
                <span>{seasonalHours.foodTruckBanner.title}</span>
              </h3>
              <p className="mt-3 w-full max-w-prose text-base leading-relaxed text-[#E4D9FF]">
                {seasonalHours.foodTruckBanner.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-5 lg:justify-end">
              <a
                href={brandData.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locationAndContact.channels.instagram.ariaLabel}
                className="woodcut-btn woodcut-btn-on-dark text-sm"
              >
                <InstagramLogo size={19} weight="bold" aria-hidden="true" />
                <span>{seasonalHours.foodTruckBanner.instagramLabel}</span>
              </a>

              <a
                href={brandData.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locationAndContact.channels.facebook.ariaLabel}
                className="focus-on-dark inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm border-2 border-[#E4D9FF] bg-[#1E2749] px-5 py-2.5 font-display text-sm font-bold text-[#FAFAFF] shadow-[4px_4px_0px_#E4D9FF] transition-transform duration-150 hover:-translate-x-[1px] hover:-translate-y-[1px] hover:bg-[#575E8F]"
              >
                <FacebookLogo size={19} weight="bold" aria-hidden="true" />
                <span>{seasonalHours.foodTruckBanner.facebookLabel}</span>
              </a>
            </div>
          </div>
        </CarvedWoodblockFrame>
      </div>
    </section>
  );
}
