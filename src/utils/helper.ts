import * as moment from 'moment';
export const getDateFromWeek = (year: number, week: number) => {
  return moment()
    .locale('Africa/Lagos')
    .day('Sunday')
    .year(year)
    .isoWeekday(1)
    .week(week)
    .endOf('day')
    .toDate();
};

export const getYearAndWeekFromIsoString = (dateString: string) => {
  return {
    year: parseInt(dateString.split('-')[0]),
    week: parseInt(dateString.split('W')[1]),
  };
};
export const getYearAndWeekFromDate = (date: Date) => {
  const week = moment(date).format('W');
  const year = moment(date).format('Y');
  return {
    year, week,
    isoString: `${year}-W${week}`
  };
};
