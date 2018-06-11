import translate from 'components/Translate';

export const TIME_OPTIONS_1 = [
  {
    value: 'ALL_DAY',
    text: translate('all_day'),
  },
  {
    value: 'TODAY',
    text: translate('today'),
  },
  {
    value: 'TOMORROW',
    text: translate('tomorrow'),
  },
  {
    value: 'THIS_WEEK',
    text: translate('this_week'),
  },
  {
    value: 'THIS_WEEKEND',
    text: translate('this_weeked'),
  },
  {
    value: 'NEXT_WEEK',
    text: translate('next_week'),
  },
  {
    value: 'NEXT_MONTH',
    text: translate('next_month'),
  },
];

export const TIME_OPTIONS_2 = [
  {
    key: 'ALL_DAY',
    value: translate('all_day'),
  },
  {
    key: 'TODAY',
    value: translate('today'),
  },
  {
    key: 'TOMORROW',
    value: translate('tomorrow'),
  },
  {
    key: 'THIS_WEEK',
    value: translate('this_week'),
  },
  {
    key: 'THIS_WEEKEND',
    value: translate('this_weeked'),
  },
  {
    key: 'NEXT_WEEK',
    value: translate('next_week'),
  },
  {
    key: 'NEXT_MONTH',
    value: translate('next_month'),
  },
];

export const getTime = value => {
  const current = new Date();
  let lastSunday;

  switch (value) {
    case 'TODAY':
      return {
        fromDate: new Date().toISOString(),
        toDate: new Date().toISOString(),
      };
    case 'TOMORROW': {
      const tmr = new Date().getDate() + 1;
      const date = new Date().setDate(tmr);
      return {
        fromDate: new Date(date).toISOString(),
        toDate: new Date(date).toISOString(),
      };
    }
    case 'THIS_WEEK': {
      lastSunday = current.getDate() - current.getDay();
      const firstDay = lastSunday + 1;
      const lastDay = lastSunday + 7;
      return {
        fromDate: new Date(current.setDate(firstDay)).toISOString(),
        toDate: new Date(current.setDate(lastDay)).toISOString(),
      };
    }
    case 'THIS_WEEKEND': {
      lastSunday = current.getDate() - current.getDay();
      const thisSunday = lastSunday + 7;
      return {
        fromDate: new Date(current.setDate(thisSunday)).toISOString(),
        toDate: new Date(current.setDate(thisSunday)).toISOString(),
      };
    }
    case 'NEXT_WEEK': {
      lastSunday = current.getDate() - current.getDay();
      const nextWeekMonday = lastSunday + 8;
      const nextWeekSunday = lastSunday + 14;
      return {
        fromDate: new Date(current.setDate(nextWeekMonday)).toISOString(),
        toDate: new Date(current.setDate(nextWeekSunday)).toISOString(),
      };
    }
    case 'NEXT_MONTH': {
      const nextMonth = new Date().setMonth(current.getMonth() + 1);
      const firstDate = new Date(nextMonth).setDate(1);
      const lastDate = new Date(
        current.getFullYear(),
        current.getMonth() + 2,
        0
      );
      return {
        fromDate: new Date(firstDate).toISOString(),
        toDate: new Date(lastDate).toISOString(),
      };
    }
    default:
      return {
        fromDate: '',
        toDate: '',
      };
  }
};
