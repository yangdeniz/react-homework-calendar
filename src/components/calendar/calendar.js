import './calendar.css';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ru';

function Calendar(props) {
  moment.locale('ru');
  const currentDate = moment(props.date);
  const currentYear = currentDate.year();
  const currentMonth = currentDate.month();
  const currentDay = currentDate.date();

  const firstDayInMonth = moment().year(currentYear).month(currentMonth).date(1);
  const lastDayInMonth = moment().year(currentYear).month(currentMonth).date(currentDate.daysInMonth());
  const firstWeekInMonth = firstDayInMonth.month() === 0 && firstDayInMonth.week() > 1 ? 0 : firstDayInMonth.week();
  
  const weeks = [];
  const weeksCount = lastDayInMonth.week() - firstWeekInMonth + 1;
  const offset = (firstDayInMonth.day() + 6) % 7;
  const start = moment(firstDayInMonth).subtract(offset, 'days');
  for (let weekNum = 0; weekNum < weeksCount; weekNum++) {
    const week = [];
    for (let dayNum = 0; dayNum < 7; dayNum++) {
      const date = moment(start).add(dayNum + weekNum * 7, 'days');
      week.push(date);
    }
    weeks.push(week);
  }

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{currentDate.format('dddd')}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{currentDay}</div>
          <div className="ui-datepicker-material-month">{currentDate.format('D MMMM').split(' ')[1]}</div>
          <div className="ui-datepicker-material-year">{currentYear}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{currentDate.format('MMMM')}</span>&nbsp;<span className="ui-datepicker-year">{currentYear}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map(week => <tr key={weeks.indexOf(week)}>
            {week.map(day => {
              const classes = [];
              if (!day.isSame(currentDate, 'month')) {
                classes.push('ui-datepicker-other-month');
              }
              if (day.isSame(currentDate, 'day')) {
                classes.push('ui-datepicker-today');
              }
              return <td className={classes.join(' ')} key={day.day()}>{day.date()}</td>;
            })}
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired
}

export default Calendar;