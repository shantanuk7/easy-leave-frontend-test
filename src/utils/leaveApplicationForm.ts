import { eachDayOfInterval, format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

export const getDatesBetween = (range: DateRange | undefined): string[] => {
  const noDatesSelected = !range || !range.from;
  if (noDatesSelected) return [];

  const startDate = range.from;
  const endDate = range.to ?? range.from;
  const allDays = eachDayOfInterval({ start: startDate!, end: endDate! });

  const weekdays = allDays.filter((day) => day.getDay() !== 0 && day.getDay() !== 6);
  const formattedDays = weekdays.map((day) => format(day, 'yyyy-MM-dd'));

  return formattedDays;
};
