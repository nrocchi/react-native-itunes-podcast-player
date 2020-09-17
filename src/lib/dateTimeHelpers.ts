export enum WeekDayEnum {
  Monday = 'Lundi',
  Tuesday = 'Mardi',
  Wednesday = 'Mercredi',
  Thursday = 'Jeudi',
  Friday = 'Vendredi',
  Saturday = 'Samedi',
  Sunday = 'Dimanche',
}

export enum MonthEnum {
  January = 'Janvier',
  February = 'Février',
  March = 'Mars',
  April = 'Avril',
  May = 'Mai',
  June = 'Juin',
  July = 'Juillet',
  August = 'Août',
  September = 'Septembre',
  October = 'Octobre',
  November = 'Novembre',
  December = 'Décembre',
}

export const getWeekDay = (date : Date): WeekDayEnum => {
  const day = date.getDay();

  const lookups = {
    [WeekDayEnum.Monday]: 1,
    [WeekDayEnum.Tuesday]: 2,
    [WeekDayEnum.Wednesday]: 3,
    [WeekDayEnum.Thursday]: 4,
    [WeekDayEnum.Friday]: 5,
    [WeekDayEnum.Saturday]: 6,
    [WeekDayEnum.Sunday]: 0,
  };

  for (const key in lookups) {
    if (lookups[key as keyof typeof lookups] === day) {
      return key as keyof typeof lookups;
    }
  }

  throw new Error('Invalid day date');
};

export const getMonth = (date : Date): MonthEnum => {
  const month = date.getMonth();

  const lookups = {
    [MonthEnum.January]: 0,
    [MonthEnum.February]: 1,
    [MonthEnum.March]: 2,
    [MonthEnum.April]: 3,
    [MonthEnum.May]: 4,
    [MonthEnum.June]: 5,
    [MonthEnum.July]: 6,
    [MonthEnum.August]: 7,
    [MonthEnum.September]: 8,
    [MonthEnum.October]: 9,
    [MonthEnum.November]: 10,
    [MonthEnum.December]: 11,
  };

  for (const key in lookups) {
    if (lookups[key as keyof typeof lookups] === month) {
      return key as keyof typeof lookups;
    }
  }

  throw new Error('Invalid month date');
};

export const humanDuration = (duration: string): string => {
  // 03:13:00
  const durationSplit = duration.split(':');
  const [h, m] = durationSplit;

  if (durationSplit.length === 2) {
    const [m] = durationSplit;
    return `${Number(m)}min`;
  }

  if (m === undefined || m === '' || h === undefined || h === '') {
    return ``;
  }

  if (h === '00' || h === undefined || h === '') {
    return `${Number(m)}min`;
  }

  if (m === '00' || m === undefined || m === '') {
    return `${Number(h)}h`;
  }

  return `${Number(h)}h ${Number(m)}min`;
};