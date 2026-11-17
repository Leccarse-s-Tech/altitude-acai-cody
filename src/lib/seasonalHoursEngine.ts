/**
 * Zero-backend seasonal store hours engine for Altitude Açaí (Cody, Wyoming).
 * Resolves live local date, time, season, and open/closed status using the
 * native Intl.DateTimeFormat API pinned to the 'America/Denver' time zone.
 */

export const CODY_TIME_ZONE = 'America/Denver' as const;

export const SEASONAL_NOTICE =
  'Seasonal hours automatically updated for Cody, WY — check our Instagram @altitude_acai for weather or holiday updates' as const;

export type SeasonKey = 'summer' | 'fall' | 'winter' | 'spring';

export type DayName =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export const DAY_ORDER: readonly DayName[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export const SEASON_ORDER: readonly SeasonKey[] = [
  'summer',
  'fall',
  'winter',
  'spring',
] as const;

export interface TimeShift {
  openMinutes: number;
  closeMinutes: number;
  label: string;
}

export interface DaySchedule {
  day: DayName;
  isClosed: boolean;
  shifts: readonly TimeShift[];
  displayLabel: string;
}

export interface SeasonSchedule {
  season: SeasonKey;
  label: string;
  monthsLabel: string;
  months: readonly number[];
  summaryNote: string;
  days: Record<DayName, DaySchedule>;
  orderedDays: readonly DaySchedule[];
}

export interface CodyDateParts {
  year: number;
  month: number;
  day: number;
  weekday: DayName;
  hour: number;
  minute: number;
  minutesSinceMidnight: number;
  timeZoneAbbreviation: string;
  formattedTime: string;
  formattedDate: string;
}

export interface NextOpeningInfo {
  day: DayName;
  isToday: boolean;
  daysAhead: number;
  season: SeasonKey;
  timeLabel: string;
  shift: TimeShift;
}

export interface LiveStoreStatus {
  currentSeason: SeasonKey;
  seasonSchedule: SeasonSchedule;
  codyDateLabel: string;
  codyTimeLabel: string;
  codyWeekday: DayName;
  codyParts: CodyDateParts;
  isOpen: boolean;
  activeShift: TimeShift | null;
  nextOpening: NextOpeningInfo | null;
  statusBadgeText: string;
  statusDetail: string;
  seasonalNotice: string;
}

const MINUTES_PER_DAY = 1440;
const MAX_LOOKAHEAD_DAYS = 14;
// 19:00 UTC corresponds to 12:00 PM MST / 1:00 PM MDT, keeping calendar-day stepping away from DST midnight shifts.
const CODY_MIDDAY_UTC_HOUR = 19;

const SHIFT_SUMMER_MORNING: TimeShift = Object.freeze({
  openMinutes: 450,
  closeMinutes: 870,
  label: '7:30 AM - 2:30 PM',
});

const SHIFT_SUMMER_EVENING: TimeShift = Object.freeze({
  openMinutes: 1020,
  closeMinutes: 1200,
  label: '5:00 PM - 8:00 PM',
});

const SHIFT_FALL_SUNDAY: TimeShift = Object.freeze({
  openMinutes: 660,
  closeMinutes: 840,
  label: '11:00 AM - 2:00 PM',
});

const SHIFT_STANDARD_DAY: TimeShift = Object.freeze({
  openMinutes: 480,
  closeMinutes: 840,
  label: '8:00 AM - 2:00 PM',
});

const codyPartsFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: CODY_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  weekday: 'long',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
  timeZoneName: 'short',
});

const codyDateLabelFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: CODY_TIME_ZONE,
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

function isDayName(value: string): value is DayName {
  return (DAY_ORDER as readonly string[]).includes(value);
}

function createDaySchedule(day: DayName, shifts: readonly TimeShift[]): DaySchedule {
  const frozenShifts = Object.freeze([...shifts]);
  return Object.freeze({
    day,
    isClosed: frozenShifts.length === 0,
    shifts: frozenShifts,
    displayLabel:
      frozenShifts.length === 0
        ? 'CLOSED'
        : frozenShifts.map((shift) => shift.label).join(' & '),
  });
}

function buildSeasonSchedule(config: {
  season: SeasonKey;
  label: string;
  monthsLabel: string;
  months: readonly number[];
  summaryNote: string;
  shiftsByDay: Record<DayName, readonly TimeShift[]>;
}): SeasonSchedule {
  const days = {} as Record<DayName, DaySchedule>;
  const orderedDays: DaySchedule[] = [];

  for (const day of DAY_ORDER) {
    const schedule = createDaySchedule(day, config.shiftsByDay[day]);
    days[day] = schedule;
    orderedDays.push(schedule);
  }

  return Object.freeze({
    season: config.season,
    label: config.label,
    monthsLabel: config.monthsLabel,
    months: Object.freeze([...config.months]),
    summaryNote: config.summaryNote,
    days: Object.freeze(days),
    orderedDays: Object.freeze(orderedDays),
  });
}

const TRANSITION_SHIFTS: Record<DayName, readonly TimeShift[]> = {
  Sunday: [],
  Monday: [],
  Tuesday: [],
  Wednesday: [SHIFT_STANDARD_DAY],
  Thursday: [SHIFT_STANDARD_DAY],
  Friday: [SHIFT_STANDARD_DAY],
  Saturday: [SHIFT_STANDARD_DAY],
};

const SEASON_SCHEDULES: Record<SeasonKey, SeasonSchedule> = {
  summer: buildSeasonSchedule({
    season: 'summer',
    label: 'Summer Hours',
    monthsLabel: 'June – August',
    months: [6, 7, 8],
    summaryNote:
      'Open 7 days a week from 7:30 AM - 2:30 PM, with extra weekend evening hours Friday & Saturday from 5:00 PM - 8:00 PM.',
    shiftsByDay: {
      Sunday: [SHIFT_SUMMER_MORNING],
      Monday: [SHIFT_SUMMER_MORNING],
      Tuesday: [SHIFT_SUMMER_MORNING],
      Wednesday: [SHIFT_SUMMER_MORNING],
      Thursday: [SHIFT_SUMMER_MORNING],
      Friday: [SHIFT_SUMMER_MORNING, SHIFT_SUMMER_EVENING],
      Saturday: [SHIFT_SUMMER_MORNING, SHIFT_SUMMER_EVENING],
    },
  }),
  fall: buildSeasonSchedule({
    season: 'fall',
    label: 'Fall Hours',
    monthsLabel: 'September – November',
    months: [9, 10, 11],
    summaryNote:
      'Starting in October: Sunday 11:00 AM - 2:00 PM, Wednesday–Saturday 8:00 AM - 2:00 PM, closed Monday & Tuesday.',
    shiftsByDay: {
      Sunday: [SHIFT_FALL_SUNDAY],
      Monday: [],
      Tuesday: [],
      Wednesday: [SHIFT_STANDARD_DAY],
      Thursday: [SHIFT_STANDARD_DAY],
      Friday: [SHIFT_STANDARD_DAY],
      Saturday: [SHIFT_STANDARD_DAY],
    },
  }),
  winter: buildSeasonSchedule({
    season: 'winter',
    label: 'Winter Hours',
    monthsLabel: 'December – February',
    months: [12, 1, 2],
    summaryNote:
      'Open Wednesday–Saturday 8:00 AM - 2:00 PM. Closed Sunday, Monday, and Tuesday.',
    shiftsByDay: TRANSITION_SHIFTS,
  }),
  spring: buildSeasonSchedule({
    season: 'spring',
    label: 'Spring Hours',
    monthsLabel: 'March – May',
    months: [3, 4, 5],
    summaryNote:
      'Maintains verified transition hours (Wednesday–Saturday 8:00 AM - 2:00 PM; closed Sunday–Tuesday) alongside Spring Food Truck community dates.',
    shiftsByDay: TRANSITION_SHIFTS,
  }),
};

/**
 * Formats minutes since midnight (0..1439) into a clean 12-hour EN-US time string (e.g. "7:30 AM").
 */
export function formatMinutesToTimeLabel(minutes: number): string {
  if (!Number.isInteger(minutes) || minutes < 0 || minutes >= MINUTES_PER_DAY) {
    throw new RangeError(
      `Invalid minutes "${minutes}". Expected an integer between 0 and ${MINUTES_PER_DAY - 1}.`,
    );
  }

  const hour24 = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const period = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const paddedMinute = String(minute).padStart(2, '0');

  return `${hour12}:${paddedMinute} ${period}`;
}

/**
 * Extracts Cody, Wyoming local calendar and clock parts from a Date instant using America/Denver.
 */
export function getCodyDateParts(date: Date = new Date()): CodyDateParts {
  if (Number.isNaN(date.getTime())) {
    throw new RangeError('Invalid Date provided to getCodyDateParts.');
  }

  const partMap = new Map<Intl.DateTimeFormatPartTypes, string>();
  for (const part of codyPartsFormatter.formatToParts(date)) {
    partMap.set(part.type, part.value);
  }

  const year = Number(partMap.get('year'));
  const month = Number(partMap.get('month'));
  const day = Number(partMap.get('day'));
  const rawHour = Number(partMap.get('hour'));
  const hour = rawHour === 24 ? 0 : rawHour;
  const minute = Number(partMap.get('minute'));
  const rawWeekday = partMap.get('weekday') ?? '';
  const timeZoneAbbreviation = partMap.get('timeZoneName') ?? 'MT';

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    !Number.isInteger(hour) ||
    !Number.isInteger(minute) ||
    !isDayName(rawWeekday)
  ) {
    throw new Error('Failed to resolve Cody, WY date parts from Intl.DateTimeFormat.');
  }

  const minutesSinceMidnight = hour * 60 + minute;
  const formattedTime = `${formatMinutesToTimeLabel(minutesSinceMidnight)} ${timeZoneAbbreviation}`;
  const formattedDate = codyDateLabelFormatter
    .format(date)
    .replace(/[\u202f\u00a0]/g, ' ');

  return {
    year,
    month,
    day,
    weekday: rawWeekday,
    hour,
    minute,
    minutesSinceMidnight,
    timeZoneAbbreviation,
    formattedTime,
    formattedDate,
  };
}

/**
 * Maps a Cody calendar month (1-12) to its corresponding Altitude Açaí season key.
 */
export function getSeasonForMonth(month: number): SeasonKey {
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new RangeError(`Invalid month "${month}". Expected an integer from 1 to 12.`);
  }

  if (month >= 6 && month <= 8) {
    return 'summer';
  }
  if (month >= 9 && month <= 11) {
    return 'fall';
  }
  if (month >= 3 && month <= 5) {
    return 'spring';
  }
  return 'winter';
}

/**
 * Returns the verified weekly schedule definition for a given season.
 */
export function getSeasonSchedule(season: SeasonKey): SeasonSchedule {
  return SEASON_SCHEDULES[season];
}

function findActiveShift(
  shifts: readonly TimeShift[],
  minutesSinceMidnight: number,
): TimeShift | null {
  for (const shift of shifts) {
    if (
      minutesSinceMidnight >= shift.openMinutes &&
      minutesSinceMidnight < shift.closeMinutes
    ) {
      return shift;
    }
  }
  return null;
}

function findNextOpening(codyParts: CodyDateParts): NextOpeningInfo {
  for (let daysAhead = 0; daysAhead <= MAX_LOOKAHEAD_DAYS; daysAhead += 1) {
    const candidateParts =
      daysAhead === 0
        ? codyParts
        : getCodyDateParts(
            new Date(
              Date.UTC(
                codyParts.year,
                codyParts.month - 1,
                codyParts.day + daysAhead,
                CODY_MIDDAY_UTC_HOUR,
                0,
                0,
              ),
            ),
          );

    const candidateSeason = getSeasonForMonth(candidateParts.month);
    const candidateSchedule = getSeasonSchedule(candidateSeason);
    const daySchedule = candidateSchedule.days[candidateParts.weekday];

    const matchingShift = daySchedule.shifts.find((shift) =>
      daysAhead === 0 ? shift.openMinutes > codyParts.minutesSinceMidnight : true,
    );

    if (matchingShift) {
      return {
        day: candidateParts.weekday,
        isToday: daysAhead === 0,
        daysAhead,
        season: candidateSeason,
        timeLabel: formatMinutesToTimeLabel(matchingShift.openMinutes),
        shift: matchingShift,
      };
    }
  }

  throw new Error('Unable to resolve next opening shift within seasonal lookahead window.');
}

/**
 * Computes the complete live Altitude Açaí store status for Cody, WY at the supplied instant.
 */
export function getLiveStoreStatus(now: Date = new Date()): LiveStoreStatus {
  const codyParts = getCodyDateParts(now);
  const currentSeason = getSeasonForMonth(codyParts.month);
  const seasonSchedule = getSeasonSchedule(currentSeason);
  const todaySchedule = seasonSchedule.days[codyParts.weekday];
  const activeShift = findActiveShift(todaySchedule.shifts, codyParts.minutesSinceMidnight);

  if (activeShift !== null) {
    const closingTime = formatMinutesToTimeLabel(activeShift.closeMinutes);
    return {
      currentSeason,
      seasonSchedule,
      codyDateLabel: codyParts.formattedDate,
      codyTimeLabel: codyParts.formattedTime,
      codyWeekday: codyParts.weekday,
      codyParts,
      isOpen: true,
      activeShift,
      nextOpening: null,
      statusBadgeText: 'Open Now in Cody, WY',
      statusDetail: `Closes at ${closingTime}`,
      seasonalNotice: SEASONAL_NOTICE,
    };
  }

  const nextOpening = findNextOpening(codyParts);
  const openingDayLabel = nextOpening.isToday ? 'Today' : nextOpening.day;

  return {
    currentSeason,
    seasonSchedule,
    codyDateLabel: codyParts.formattedDate,
    codyTimeLabel: codyParts.formattedTime,
    codyWeekday: codyParts.weekday,
    codyParts,
    isOpen: false,
    activeShift: null,
    nextOpening,
    statusBadgeText: `Currently Closed — Opens ${openingDayLabel} at ${nextOpening.timeLabel}`,
    statusDetail: `Opens ${openingDayLabel} at ${nextOpening.timeLabel}`,
    seasonalNotice: SEASONAL_NOTICE,
  };
}
