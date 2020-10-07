export enum WeekDayEnum {
  Monday = 'Lun',
  Tuesday = 'Mar',
  Wednesday = 'Mer',
  Thursday = 'Jeu',
  Friday = 'Ven',
  Saturday = 'Sam',
  Sunday = 'Dim',
}

export enum MonthEnum {
  January = 'JANV.',
  February = 'FEVR.',
  March = 'MARS',
  April = 'AVR.',
  May = 'MAI',
  June = 'JUIN',
  July = 'JUIL',
  August = 'AOUT',
  September = 'SEPT.',
  October = 'OCT.',
  November = 'NOV.',
  December = 'DEC.',
}

export const getWeekDay = (date: Date): WeekDayEnum => {
  const day = date.getDay()

  const lookups = {
    [WeekDayEnum.Monday]: 1,
    [WeekDayEnum.Tuesday]: 2,
    [WeekDayEnum.Wednesday]: 3,
    [WeekDayEnum.Thursday]: 4,
    [WeekDayEnum.Friday]: 5,
    [WeekDayEnum.Saturday]: 6,
    [WeekDayEnum.Sunday]: 0,
  }

  for (const key in lookups) {
    if (lookups[key as keyof typeof lookups] === day) {
      return key as keyof typeof lookups
    }
  }

  throw new Error('Invalid day date')
}

export const getMonth = (date: Date): MonthEnum => {
  const month = date.getMonth()

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
  }

  for (const key in lookups) {
    if (lookups[key as keyof typeof lookups] === month) {
      return key as keyof typeof lookups
    }
  }

  throw new Error('Invalid month date')
}

export const humanDuration = (duration: string): string => {
  // 03:13:00
  const durationSplit = duration.split(':')
  const [h, m] = durationSplit

  // console.log('*******************************************************');
  // console.log('h', h);
  // console.log('m', m);
  // console.log('durationSplit', durationSplit);
  // console.log('durationSplit length', durationSplit.length);
  // console.log('durationSplit str', durationSplit.toString());

  if (durationSplit.length === 1 && h !== '') {
    const m = durationSplit.toString().substring(0, 2)
    return `${m} MIN`
  }

  if (durationSplit.length === 2) {
    const [m] = durationSplit
    return `${m} MIN`
  }

  if (m === undefined || (m === '' && h === undefined) || h === '') {
    return ``
  }

  if (h === '00' || h === undefined || h === '') {
    return `${Number(m)} MIN`
  }

  if (m === undefined || m === '') {
    return `${Number(h)} H`
  }

  return `${Number(h)} H ${m} MIN`
}
