import { apiGetWaterMonth } from '../../../../redux/water/operation';
import { selectMonthData } from '../../../../redux/water/selectors';
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const Calendar = ({ monthItem, onClick, currentDate, selectedDate }) => {
    const dispatch = useDispatch();
    const selectedPercentWater = useSelector(selectMonthData);
    useEffect(() => {
        dispatch(apiGetWaterMonth(selectedPercentWater));
    }, [selectedPercentWater, dispatch]);

    return (
        <ul className={css.calendarWrapper}>
            {monthItem.daysInMonth &&
                monthItem.daysInMonth.map(({ day, percentComplete }, index) => {
                    const uniqueKey = index;
                    const isActiveItem = selectedDate === day;
                    return (
                        <CalendarItem
                            key={uniqueKey}
                            day={day}
                            percentageConsumed={percentComplete}
                            onClick={onClick}
                            currentDate={currentDate}
                            selectedDate={selectedDate}
                            isActive={isActiveItem}
                        />
                    );
                })}
        </ul>
    );
};

export default Calendar;
