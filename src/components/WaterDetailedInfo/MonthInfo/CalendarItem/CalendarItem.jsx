import clsx from 'clsx';
import css from './CalendarItem.module.css';
import { selectPercentPerDay } from '../../../../redux/water/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetWaterDay } from '../../../../redux/water/operation';
import { setDate } from '../../../../redux/water/slice';
const CalendarItem = ({ day, percentageConsumed, onClick, currentDate }) => {
    const dispatch = useDispatch();
    const selectedPercentWater = useSelector(selectPercentPerDay);

    const dayNumber = parseInt(day.split('-')[2], 10);
    const cappedPercentage = Math.min(percentageConsumed, 100);

    const handleOnClick = () => {
        dispatch(apiGetWaterDay(day));
        dispatch(setDate(day));
    };
    return (
        <div
            className={css.calendarItemWripper}
            onClick={() => onClick(handleOnClick)}
        >
            <div
                className={clsx(css.number, {
                    [css.bgHighlighted]: cappedPercentage < 100,
                    [css.current]: currentDate === day,
                })}
            >
                {dayNumber}
            </div>
            <span className={css.percentages}>{cappedPercentage}%</span>
        </div>
    );
};

export default CalendarItem;
