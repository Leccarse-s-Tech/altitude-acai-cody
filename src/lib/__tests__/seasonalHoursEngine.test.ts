import { describe, expect, it } from 'vitest';
import {
  CODY_TIME_ZONE,
  DAY_ORDER,
  SEASONAL_NOTICE,
  formatMinutesToTimeLabel,
  getCodyDateParts,
  getLiveStoreStatus,
  getSeasonForMonth,
  getSeasonSchedule,
} from '../seasonalHoursEngine';

describe('seasonalHoursEngine', () => {
  describe('getCodyDateParts (America/Denver UTC conversion)', () => {
    it('converts UTC instants to Mountain Daylight Time (MDT, UTC-6) including UTC date rollover', () => {
      // 2026-07-18T00:30:00Z is Friday, July 17, 2026 at 6:30 PM MDT in Cody, WY
      const parts = getCodyDateParts(new Date('2026-07-18T00:30:00Z'));

      expect(CODY_TIME_ZONE).toBe('America/Denver');
      expect(parts).toEqual({
        year: 2026,
        month: 7,
        day: 17,
        weekday: 'Friday',
        hour: 18,
        minute: 30,
        minutesSinceMidnight: 1110,
        timeZoneAbbreviation: 'MDT',
        formattedTime: '6:30 PM MDT',
        formattedDate: 'Friday, July 17, 2026',
      });
    });

    it('converts UTC instants to Mountain Standard Time (MST, UTC-7) and normalizes midnight', () => {
      // 2026-01-15T17:15:00Z is Thursday, January 15, 2026 at 10:15 AM MST
      const morningParts = getCodyDateParts(new Date('2026-01-15T17:15:00Z'));
      expect(morningParts.weekday).toBe('Thursday');
      expect(morningParts.hour).toBe(10);
      expect(morningParts.minute).toBe(15);
      expect(morningParts.timeZoneAbbreviation).toBe('MST');
      expect(morningParts.formattedTime).toBe('10:15 AM MST');
      expect(morningParts.formattedDate).toBe('Thursday, January 15, 2026');

      // 2026-01-15T07:00:00Z is Thursday, January 15, 2026 at 12:00 AM MST (midnight)
      const midnightParts = getCodyDateParts(new Date('2026-01-15T07:00:00Z'));
      expect(midnightParts.hour).toBe(0);
      expect(midnightParts.minute).toBe(0);
      expect(midnightParts.minutesSinceMidnight).toBe(0);
      expect(midnightParts.formattedTime).toBe('12:00 AM MST');
    });

    it('throws RangeError when given an invalid Date', () => {
      expect(() => getCodyDateParts(new Date('invalid-date'))).toThrow(RangeError);
    });
  });

  describe('getSeasonForMonth & formatMinutesToTimeLabel', () => {
    it('maps all 12 calendar months to the verified Altitude Açaí seasons', () => {
      expect(getSeasonForMonth(6)).toBe('summer');
      expect(getSeasonForMonth(7)).toBe('summer');
      expect(getSeasonForMonth(8)).toBe('summer');

      expect(getSeasonForMonth(9)).toBe('fall');
      expect(getSeasonForMonth(10)).toBe('fall');
      expect(getSeasonForMonth(11)).toBe('fall');

      expect(getSeasonForMonth(12)).toBe('winter');
      expect(getSeasonForMonth(1)).toBe('winter');
      expect(getSeasonForMonth(2)).toBe('winter');

      expect(getSeasonForMonth(3)).toBe('spring');
      expect(getSeasonForMonth(4)).toBe('spring');
      expect(getSeasonForMonth(5)).toBe('spring');
    });

    it('rejects out-of-range months and invalid minutes', () => {
      expect(() => getSeasonForMonth(0)).toThrow(RangeError);
      expect(() => getSeasonForMonth(13)).toThrow(RangeError);
      expect(() => formatMinutesToTimeLabel(-1)).toThrow(RangeError);
      expect(() => formatMinutesToTimeLabel(1440)).toThrow(RangeError);
    });
  });

  describe('getSeasonSchedule (verified weekly shifts per season)', () => {
    it('returns exact Summer daily and weekend evening shifts', () => {
      const summer = getSeasonSchedule('summer');

      expect(summer.months).toEqual([6, 7, 8]);
      expect(summer.orderedDays.map((d) => d.day)).toEqual(DAY_ORDER);

      for (const weekday of ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'] as const) {
        expect(summer.days[weekday].isClosed).toBe(false);
        expect(summer.days[weekday].shifts).toEqual([
          { openMinutes: 450, closeMinutes: 870, label: '7:30 AM - 2:30 PM' },
        ]);
      }

      for (const weekendEveningDay of ['Friday', 'Saturday'] as const) {
        expect(summer.days[weekendEveningDay].isClosed).toBe(false);
        expect(summer.days[weekendEveningDay].shifts).toEqual([
          { openMinutes: 450, closeMinutes: 870, label: '7:30 AM - 2:30 PM' },
          { openMinutes: 1020, closeMinutes: 1200, label: '5:00 PM - 8:00 PM' },
        ]);
      }
    });

    it('returns exact Fall schedule (Sunday 11-2, Mon-Tue closed, Wed-Sat 8-2)', () => {
      const fall = getSeasonSchedule('fall');

      expect(fall.months).toEqual([9, 10, 11]);
      expect(fall.days.Sunday.shifts).toEqual([
        { openMinutes: 660, closeMinutes: 840, label: '11:00 AM - 2:00 PM' },
      ]);
      expect(fall.days.Monday.isClosed).toBe(true);
      expect(fall.days.Tuesday.isClosed).toBe(true);
      for (const day of ['Wednesday', 'Thursday', 'Friday', 'Saturday'] as const) {
        expect(fall.days[day].shifts).toEqual([
          { openMinutes: 480, closeMinutes: 840, label: '8:00 AM - 2:00 PM' },
        ]);
      }
    });

    it('returns exact Winter and Spring transition schedules', () => {
      const winter = getSeasonSchedule('winter');
      const spring = getSeasonSchedule('spring');

      expect(winter.months).toEqual([12, 1, 2]);
      expect(spring.months).toEqual([3, 4, 5]);

      for (const schedule of [winter, spring]) {
        for (const closedDay of ['Sunday', 'Monday', 'Tuesday'] as const) {
          expect(schedule.days[closedDay].isClosed).toBe(true);
          expect(schedule.days[closedDay].displayLabel).toBe('CLOSED');
        }
        for (const openDay of ['Wednesday', 'Thursday', 'Friday', 'Saturday'] as const) {
          expect(schedule.days[openDay].isClosed).toBe(false);
          expect(schedule.days[openDay].shifts).toEqual([
            { openMinutes: 480, closeMinutes: 840, label: '8:00 AM - 2:00 PM' },
          ]);
        }
      }
    });
  });

  describe('getLiveStoreStatus', () => {
    it('reports Summer weekday morning open (7:30 AM - 2:30 PM) and exact minute boundaries', () => {
      // Wednesday, July 15, 2026 at 10:15 AM MDT
      const midMorning = getLiveStoreStatus(new Date('2026-07-15T16:15:00Z'));
      expect(midMorning.currentSeason).toBe('summer');
      expect(midMorning.codyWeekday).toBe('Wednesday');
      expect(midMorning.codyTimeLabel).toBe('10:15 AM MDT');
      expect(midMorning.codyDateLabel).toBe('Wednesday, July 15, 2026');
      expect(midMorning.isOpen).toBe(true);
      expect(midMorning.statusBadgeText).toBe('Open Now in Cody, WY');
      expect(midMorning.statusDetail).toBe('Closes at 2:30 PM');

      // 7:29 AM MDT -> closed, opens Today at 7:30 AM
      const beforeOpen = getLiveStoreStatus(new Date('2026-07-15T13:29:00Z'));
      expect(beforeOpen.isOpen).toBe(false);
      expect(beforeOpen.statusBadgeText).toBe('Currently Closed — Opens Today at 7:30 AM');

      // 7:30 AM MDT -> open
      const exactOpen = getLiveStoreStatus(new Date('2026-07-15T13:30:00Z'));
      expect(exactOpen.isOpen).toBe(true);
      expect(exactOpen.statusBadgeText).toBe('Open Now in Cody, WY');

      // 2:30 PM MDT -> closed, opens Thursday at 7:30 AM
      const exactClose = getLiveStoreStatus(new Date('2026-07-15T20:30:00Z'));
      expect(exactClose.isOpen).toBe(false);
      expect(exactClose.statusBadgeText).toBe('Currently Closed — Opens Thursday at 7:30 AM');
    });

    it('handles Summer Friday afternoon closed gap (3:30 PM -> Today at 5:00 PM) and Friday evening open (6:30 PM)', () => {
      // Friday, July 17, 2026 at 3:30 PM MDT
      const fridayGap = getLiveStoreStatus(new Date('2026-07-17T21:30:00Z'));
      expect(fridayGap.currentSeason).toBe('summer');
      expect(fridayGap.codyWeekday).toBe('Friday');
      expect(fridayGap.isOpen).toBe(false);
      expect(fridayGap.statusBadgeText).toBe('Currently Closed — Opens Today at 5:00 PM');
      expect(fridayGap.nextOpening).toMatchObject({
        day: 'Friday',
        isToday: true,
        daysAhead: 0,
        timeLabel: '5:00 PM',
      });

      // Friday, July 17, 2026 at 6:30 PM MDT (2026-07-18T00:30:00Z)
      const fridayEvening = getLiveStoreStatus(new Date('2026-07-18T00:30:00Z'));
      expect(fridayEvening.currentSeason).toBe('summer');
      expect(fridayEvening.codyWeekday).toBe('Friday');
      expect(fridayEvening.codyTimeLabel).toBe('6:30 PM MDT');
      expect(fridayEvening.isOpen).toBe(true);
      expect(fridayEvening.statusBadgeText).toBe('Open Now in Cody, WY');
      expect(fridayEvening.statusDetail).toBe('Closes at 8:00 PM');

      // Saturday, July 18, 2026 at 7:59 PM MDT -> open, then 8:00 PM MDT -> closed until Sunday 7:30 AM
      const saturdayOpen = getLiveStoreStatus(new Date('2026-07-19T01:59:00Z'));
      expect(saturdayOpen.codyWeekday).toBe('Saturday');
      expect(saturdayOpen.isOpen).toBe(true);
      expect(saturdayOpen.statusDetail).toBe('Closes at 8:00 PM');

      const saturdayClosed = getLiveStoreStatus(new Date('2026-07-19T02:00:00Z'));
      expect(saturdayClosed.codyWeekday).toBe('Saturday');
      expect(saturdayClosed.isOpen).toBe(false);
      expect(saturdayClosed.statusBadgeText).toBe('Currently Closed — Opens Sunday at 7:30 AM');
    });

    it('handles Fall Sunday open (11:30 AM), Fall Saturday afternoon -> Sunday, and Fall Monday closed -> Wednesday 8:00 AM', () => {
      // Sunday, October 18, 2026 at 11:30 AM MDT
      const fallSundayOpen = getLiveStoreStatus(new Date('2026-10-18T17:30:00Z'));
      expect(fallSundayOpen.currentSeason).toBe('fall');
      expect(fallSundayOpen.codyWeekday).toBe('Sunday');
      expect(fallSundayOpen.isOpen).toBe(true);
      expect(fallSundayOpen.statusBadgeText).toBe('Open Now in Cody, WY');
      expect(fallSundayOpen.statusDetail).toBe('Closes at 2:00 PM');

      // Saturday, October 17, 2026 at 3:00 PM MDT -> Opens Sunday at 11:00 AM
      const fallSaturdayClosed = getLiveStoreStatus(new Date('2026-10-17T21:00:00Z'));
      expect(fallSaturdayClosed.isOpen).toBe(false);
      expect(fallSaturdayClosed.statusBadgeText).toBe('Currently Closed — Opens Sunday at 11:00 AM');

      // Monday, October 19, 2026 at 10:00 AM MDT -> skips Tuesday -> Opens Wednesday at 8:00 AM
      const fallMondayClosed = getLiveStoreStatus(new Date('2026-10-19T16:00:00Z'));
      expect(fallMondayClosed.currentSeason).toBe('fall');
      expect(fallMondayClosed.codyWeekday).toBe('Monday');
      expect(fallMondayClosed.isOpen).toBe(false);
      expect(fallMondayClosed.statusBadgeText).toBe('Currently Closed — Opens Wednesday at 8:00 AM');
      expect(fallMondayClosed.nextOpening?.daysAhead).toBe(2);
    });

    it('handles Winter Sunday closed -> Wednesday 8:00 AM and Winter Thursday open (9:00 AM)', () => {
      // Sunday, January 18, 2026 at 10:00 AM MST -> skips Sun/Mon/Tue -> Opens Wednesday at 8:00 AM
      const winterSundayClosed = getLiveStoreStatus(new Date('2026-01-18T17:00:00Z'));
      expect(winterSundayClosed.currentSeason).toBe('winter');
      expect(winterSundayClosed.codyWeekday).toBe('Sunday');
      expect(winterSundayClosed.codyTimeLabel).toBe('10:00 AM MST');
      expect(winterSundayClosed.isOpen).toBe(false);
      expect(winterSundayClosed.statusBadgeText).toBe(
        'Currently Closed — Opens Wednesday at 8:00 AM',
      );
      expect(winterSundayClosed.nextOpening?.daysAhead).toBe(3);

      // Thursday, January 15, 2026 at 9:00 AM MST -> open
      const winterThursdayOpen = getLiveStoreStatus(new Date('2026-01-15T16:00:00Z'));
      expect(winterThursdayOpen.currentSeason).toBe('winter');
      expect(winterThursdayOpen.codyWeekday).toBe('Thursday');
      expect(winterThursdayOpen.codyTimeLabel).toBe('9:00 AM MST');
      expect(winterThursdayOpen.isOpen).toBe(true);
      expect(winterThursdayOpen.statusBadgeText).toBe('Open Now in Cody, WY');
      expect(winterThursdayOpen.statusDetail).toBe('Closes at 2:00 PM');
    });

    it('handles Spring Wednesday open, Spring Tuesday closed, and mandatory seasonal notice', () => {
      const expectedNotice =
        'Seasonal hours automatically updated for Cody, WY — check our Instagram @altitude_acai for weather or holiday updates';

      // Wednesday, April 15, 2026 at 9:00 AM MDT
      const springWednesdayOpen = getLiveStoreStatus(new Date('2026-04-15T15:00:00Z'));
      expect(springWednesdayOpen.currentSeason).toBe('spring');
      expect(springWednesdayOpen.codyWeekday).toBe('Wednesday');
      expect(springWednesdayOpen.isOpen).toBe(true);
      expect(springWednesdayOpen.statusBadgeText).toBe('Open Now in Cody, WY');
      expect(springWednesdayOpen.statusDetail).toBe('Closes at 2:00 PM');
      expect(springWednesdayOpen.seasonalNotice).toBe(expectedNotice);
      expect(SEASONAL_NOTICE).toBe(expectedNotice);

      // Tuesday, April 14, 2026 at 10:00 AM MDT -> Opens Wednesday at 8:00 AM
      const springTuesdayClosed = getLiveStoreStatus(new Date('2026-04-14T16:00:00Z'));
      expect(springTuesdayClosed.currentSeason).toBe('spring');
      expect(springTuesdayClosed.codyWeekday).toBe('Tuesday');
      expect(springTuesdayClosed.isOpen).toBe(false);
      expect(springTuesdayClosed.statusBadgeText).toBe(
        'Currently Closed — Opens Wednesday at 8:00 AM',
      );
      expect(springTuesdayClosed.seasonalNotice).toBe(expectedNotice);
    });

    it('resolves next opening across season month boundaries accurately', () => {
      // Sunday, May 31, 2026 at 3:00 PM MDT (Spring) -> next day is June 1 (Summer Monday, open 7:30 AM)
      const springToSummer = getLiveStoreStatus(new Date('2026-05-31T21:00:00Z'));
      expect(springToSummer.currentSeason).toBe('spring');
      expect(springToSummer.isOpen).toBe(false);
      expect(springToSummer.statusBadgeText).toBe('Currently Closed — Opens Monday at 7:30 AM');
      expect(springToSummer.nextOpening?.season).toBe('summer');

      // Monday, August 31, 2026 at 8:00 PM MDT (Summer) -> Sep 1 is Fall Tuesday (closed) -> Opens Wednesday Sep 2 at 8:00 AM
      const summerToFall = getLiveStoreStatus(new Date('2026-09-01T02:00:00Z'));
      expect(summerToFall.currentSeason).toBe('summer');
      expect(summerToFall.codyWeekday).toBe('Monday');
      expect(summerToFall.isOpen).toBe(false);
      expect(summerToFall.statusBadgeText).toBe('Currently Closed — Opens Wednesday at 8:00 AM');
      expect(summerToFall.nextOpening?.season).toBe('fall');
    });
  });
});
