import { useEffect, useState, type ReactNode } from 'react';
import {
  CalendarBlank,
  CaretDown,
  CaretUp,
  Clock,
  Flower,
  InstagramLogo,
  Leaf,
  MapPin,
  Snowflake,
  Sun,
  Truck,
} from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy } from '../../data/editorial-copy';
import {
  SEASONAL_NOTICE,
  SEASON_ORDER,
  getLiveStoreStatus,
  getSeasonSchedule,
  type LiveStoreStatus,
  type SeasonKey,
} from '../../lib/seasonalHoursEngine';
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
    imagePath: './assets/brand/official-winter-hours-poster.webp',
    imageAlt:
      'Official Altitude Açaí Winter Hours poster listing Wednesday through Saturday 8:00 AM to 2:00 PM',
  },
  {
    id: 'veterans-day',
    title: brandData.specialHolidayNotices[0].title,
    subtitle: `${brandData.specialHolidayNotices[0].date} · ${brandData.specialHolidayNotices[0].hours}`,
    imagePath: './assets/brand/official-veterans-notice.webp',
    imageAlt:
      'Official Altitude Açaí Veterans Day appreciation poster offering a complimentary bowl to veterans and active duty military',
  },
  {
    id: 'thanksgiving-break',
    title: brandData.specialHolidayNotices[1].title,
    subtitle: `${brandData.specialHolidayNotices[1].status} · ${brandData.specialHolidayNotices[1].reopening}`,
    imagePath: './assets/brand/official-thanksgiving-notice.webp',
    imageAlt:
      'Official Altitude Açaí Thanksgiving Break notice showing holiday closure dates and reopening schedule',
  },
];

export function SeasonalHoursSection() {
  const [liveStatus, setLiveStatus] = useState<LiveStoreStatus>(() =>
    getLiveStoreStatus(),
  );
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
  const { seasonalHours } = editorialCopy;

  return (
    <section
      id="hours"
      aria-labelledby="seasonal-hours-heading"
      className="surface-cotton-paper relative overflow-hidden py-20 lg:py-24"
    >
      <CottonPaperGrain variant="light" opacity={0.045} />
      <WoodgrainOverlay variant="light" opacity={0.08} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header + Eyebrow 2 of max 2 on page */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF] px-3 py-1.5 shadow-[3px_3px_0px_#1E2749]">
              <Clock size={16} weight="bold" className="text-[#1E2749]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#1E2749]">
                {seasonalHours.eyebrow}
              </span>
            </div>

            <h2
              id="seasonal-hours-heading"
              className="font-display mt-5 text-3xl font-extrabold tracking-tight text-[#1E2749] sm:text-4xl lg:text-5xl"
            >
              {seasonalHours.title}
            </h2>

            <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-[#30343F] sm:text-lg">
              {seasonalHours.intro}
            </p>
          </div>

          {/* Live Mountain Time Status Card */}
          <div className="lg:col-span-5">
            <CarvedWoodblockFrame variant="dark" showCornerMarks={true} className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold text-[#E4D9FF]">
                  Cody Local Time
                </span>
                <span className="rounded-sm border border-[#E4D9FF] bg-[#1E2749] px-2.5 py-0.5 font-mono text-xs font-bold text-[#FAFAFF]">
                  {liveStatus.seasonSchedule.label}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-2xl font-extrabold text-[#FAFAFF] sm:text-3xl">
                  {liveStatus.codyTimeLabel}
                </p>
                <p className="text-sm font-medium text-[#E4D9FF]">
                  {liveStatus.codyDateLabel}
                </p>
              </div>

              <div className="mt-4 rounded-sm border-2 border-[#E4D9FF] bg-[#1E2749] px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={`h-3 w-3 shrink-0 rounded-full border border-[#1E2749] ${
                      liveStatus.isOpen ? 'bg-[#E4D9FF]' : 'bg-[#8687B4]'
                    }`}
                  />
                  <p className="font-display text-base font-bold text-[#FAFAFF]">
                    {liveStatus.statusBadgeText}
                  </p>
                </div>
                <p className="mt-1 pl-5.5 font-mono text-xs text-[#E4D9FF]">
                  {liveStatus.statusDetail}
                </p>
              </div>
            </CarvedWoodblockFrame>
          </div>
        </div>

        {/* Cordel Seasonal Peaks Woodcut Engraving */}
        <div className="mt-10">
          <CarvedWoodblockFrame variant="light" showCornerMarks={false}>
            <img
              src="./assets/cordel/seasonal-peaks-woodcut.svg"
              alt="Cody, Wyoming seasonal mountain woodcut contrasting summer sun and winter snow ridges"
              className="h-auto w-full object-cover"
              width={1200}
              height={360}
            />
          </CarvedWoodblockFrame>
        </div>

        {/* Interactive Season Selector + 7-Day Ledger */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Season Tabs + Summary + Mandatory Notice */}
          <div className="space-y-5 lg:col-span-5">
            <div
              role="tablist"
              aria-label="Browse Cody, WY seasonal storefront schedules"
              className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2"
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
                    className={`flex min-h-[52px] flex-col items-start justify-center rounded-sm border-2 px-4 py-2.5 text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-[#1E2749] bg-[#273469] text-[#FAFAFF] shadow-[3px_3px_0px_#1E2749]'
                        : 'border-[#1E2749] bg-[#FAFAFF] text-[#1E2749] hover:bg-[#E4D9FF]'
                    }`}
                  >
                    <span className="flex w-full items-center justify-between gap-2 font-display text-base font-bold">
                      <span className="inline-flex items-center gap-2">
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

            <CarvedWoodblockFrame variant="periwinkle" showCornerMarks={false} className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-2xl font-extrabold text-[#1E2749]">
                  {displayedSchedule.label}
                </h3>
                <span className="rounded-sm border border-[#1E2749] bg-[#FAFAFF] px-2.5 py-1 font-mono text-xs font-bold text-[#1E2749]">
                  {displayedSchedule.monthsLabel}
                </span>
              </div>

              {isViewingActiveSeason && (
                <p className="mt-2 inline-block rounded-sm bg-[#273469] px-2.5 py-0.5 font-mono text-xs font-semibold text-[#FAFAFF]">
                  {seasonalHours.status.activeSeasonBadge}
                </p>
              )}

              <p className="mt-3 text-base leading-relaxed text-[#30343F]">
                {displayedSchedule.summaryNote}
              </p>

              {/* Mandatory Verified Seasonal Instagram Notice */}
              <div className="mt-5 rounded-sm border-2 border-[#1E2749] bg-[#FAFAFF] p-4 shadow-[3px_3px_0px_#1E2749]">
                <p className="text-sm font-medium leading-relaxed text-[#1E2749]">
                  {SEASONAL_NOTICE}
                </p>
                <a
                  href={brandData.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-[44px] items-center gap-2 font-mono text-xs font-bold text-[#273469] underline hover:text-[#1E2749]"
                >
                  <InstagramLogo size={16} weight="bold" aria-hidden="true" />
                  <span>Check @altitude_acai on Instagram</span>
                </a>
              </div>
            </CarvedWoodblockFrame>
          </div>

          {/* 7-Day Schedule Ledger */}
          <div
            role="tabpanel"
            id={`season-panel-${selectedSeason}`}
            aria-labelledby={`season-tab-${selectedSeason}`}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSeason}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: WOODCUT_EASE }}
              >
                <CarvedWoodblockFrame variant="light" showCornerMarks={true} className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#1E2749]/15 pb-3.5">
                    <h3 className="font-display text-xl font-extrabold text-[#1E2749]">
                      Weekly Hours · {displayedSchedule.label}
                    </h3>
                    <span className="font-mono text-xs font-semibold text-[#575E8F]">
                      {seasonalHours.timezoneNote}
                    </span>
                  </div>

                  <ul className="mt-4 divide-y-2 divide-[#1E2749]/10">
                    {displayedSchedule.orderedDays.map((dayItem) => {
                      const isTodayRow =
                        isViewingActiveSeason && dayItem.day === liveStatus.codyWeekday;

                      return (
                        <li
                          key={dayItem.day}
                          className={`flex flex-col justify-between gap-2 rounded-sm px-3.5 py-3 sm:flex-row sm:items-center ${
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
                                    className="inline-block rounded-sm border border-[#1E2749] bg-[#FAFAFF] px-3 py-1 font-mono text-xs font-bold text-[#1E2749]"
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

                  {/* Expandable Official Storefront Notice Flyers */}
                  <div className="mt-6 border-t-2 border-[#1E2749]/15 pt-4">
                    <button
                      type="button"
                      aria-expanded={showPosters}
                      aria-controls="official-shop-posters-panel"
                      onClick={() => setShowPosters((prev) => !prev)}
                      className="woodcut-btn woodcut-btn-secondary w-full justify-between text-sm"
                    >
                      <span>View Official Shop Posters & Holiday Notices</span>
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
                                  src={poster.imagePath}
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

        <CordelDivider variant="light" className="my-14" />

        {/* Verified Food Truck & Community Events Schedule */}
        <div>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h3 className="font-display flex items-center gap-3 text-2xl font-extrabold text-[#1E2749] sm:text-3xl">
                <Truck size={28} weight="bold" className="text-[#273469]" aria-hidden="true" />
                <span>{brandData.foodTruck.pageTitle}</span>
              </h3>
              <p className="mt-2 max-w-[65ch] text-base text-[#30343F]">
                Catch the Altitude Açaí Food Truck across Cody parks, summer concerts, and Park
                County community tournaments.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {brandData.foodTruck.events.map((eventItem, index) => {
              const isLeadEvent = index === 0;
              return (
                <CarvedWoodblockFrame
                  key={eventItem.id}
                  variant={isLeadEvent ? 'periwinkle' : 'light'}
                  showCornerMarks={false}
                  className={`p-5 sm:p-6 ${isLeadEvent ? 'md:col-span-2' : ''}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="font-display text-xl font-extrabold text-[#1E2749]">
                        {eventItem.name}
                      </h4>
                      <p className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#273469]">
                        <CalendarBlank size={15} weight="bold" aria-hidden="true" />
                        <span>{eventItem.scheduleSummary}</span>
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-sm border border-[#1E2749] bg-[#FAFAFF] px-3 py-1 font-mono text-xs font-semibold text-[#1E2749]">
                      <MapPin size={14} weight="bold" aria-hidden="true" />
                      <span>{eventItem.venue}</span>
                    </span>
                  </div>

                  <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-[#30343F]">
                    {eventItem.description}
                  </p>

                  <p className="mt-3 font-mono text-xs font-semibold text-[#575E8F]">
                    Location: {eventItem.address}
                  </p>
                </CarvedWoodblockFrame>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
