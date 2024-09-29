import {
    apiGetWaterDay,
    apiGetWaterMonth,
} from '../../../../redux/water/operation';
import {
    selectMonthData,
    selectPercentPerDay,
} from '../../../../redux/water/selectors';
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const Calendar = ({
    monthItem,
    onClick,
    currentDate,
    selectedDate,
    isActive,
}) => {
    const dispatch = useDispatch();
    const selectedPercentWater = useSelector(selectMonthData);
    useEffect(() => {
        dispatch(apiGetWaterMonth(selectedPercentWater));
    }, [selectedPercentWater, dispatch]);
    console.log('HOJO', selectedPercentWater);

    return (
        <ul className={css.calendarWrapper}>
            {monthItem.daysInMonth &&
                monthItem.daysInMonth.map(({ day, percentComplete }, index) => {
                    const uniqueKey = index;
                    const isActiveItem = selectedDate === day;
                    console.log('PCN', percentComplete);
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
