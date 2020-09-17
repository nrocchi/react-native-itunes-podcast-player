import {getMonth, getWeekDay, humanDuration, MonthEnum, WeekDayEnum} from "./dateTimeHelpers";

describe('dateTimeHelpers', () => {
  describe('#getWeekDay()', () => {
    test.each`
      date | expected
      ${new Date('2020-09-15T08:52:20.748Z')} | ${WeekDayEnum.Tuesday}
      ${new Date('2020-09-16T08:52:20.748Z')} | ${WeekDayEnum.Wednesday}
      ${new Date('2020-09-17T08:52:20.748Z')} | ${WeekDayEnum.Thursday}
      ${new Date('2020-09-18T08:52:20.748Z')} | ${WeekDayEnum.Friday}
      ${new Date('2020-09-19T08:52:20.748Z')} | ${WeekDayEnum.Saturday}
      ${new Date('2020-09-20T08:52:20.748Z')} | ${WeekDayEnum.Sunday}
      ${new Date('2020-09-21T08:52:20.748Z')} | ${WeekDayEnum.Monday}
    `('should return $expected for the given date', ({date, expected}) => {
      expect(getWeekDay(date)).toBe(expected);
    });
  });

  describe('#getMonth()', () => {
    test.each`
      date | expected
      ${new Date('2020-01-15T08:52:20.748Z')} | ${MonthEnum.January}
      ${new Date('2020-02-16T08:52:20.748Z')} | ${MonthEnum.February}
      ${new Date('2020-03-17T08:52:20.748Z')} | ${MonthEnum.March}
      ${new Date('2020-04-18T08:52:20.748Z')} | ${MonthEnum.April}
      ${new Date('2020-05-19T08:52:20.748Z')} | ${MonthEnum.May}
      ${new Date('2020-06-20T08:52:20.748Z')} | ${MonthEnum.June}
      ${new Date('2020-07-21T08:52:20.748Z')} | ${MonthEnum.July}
      ${new Date('2020-08-21T08:52:20.748Z')} | ${MonthEnum.August}
      ${new Date('2020-09-21T08:52:20.748Z')} | ${MonthEnum.September}
      ${new Date('2020-10-21T08:52:20.748Z')} | ${MonthEnum.October}
      ${new Date('2020-11-21T08:52:20.748Z')} | ${MonthEnum.November}
      ${new Date('2020-12-21T08:52:20.748Z')} | ${MonthEnum.December}
    `('should return $expected for the given month', ({date, expected}) => {
      expect(getMonth(date)).toBe(expected);
    });
  });

  describe('#humanDuration()', () => {
    it('should return the human readable duration', () => {
      expect(humanDuration('03:13:00')).toBe('3h 13min');
      expect(humanDuration('11:54:00')).toBe('11h 54min');
      expect(humanDuration('10:01:00')).toBe('10h 1min');
      expect(humanDuration('10:00:00')).toBe('10h');
      expect(humanDuration('00:55:00')).toBe('55min');
      expect(humanDuration('16:18')).toBe('16min');
      expect(humanDuration('')).toBe('');
    });
  });
});