import clsx from 'clsx';
import css from './CalendarItem.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { apiGetWaterDay } from '../../../../redux/water/operation';
import { setDate } from '../../../../redux/water/slice';
import { selectDate } from '../../../../redux/water/selectors';

const CalendarItem = ({ day, percentageConsumed, onClick, currentDate }) => {
    const dispatch = useDispatch();
    const activeDate = useSelector(selectDate);

    const dayNumber = parseInt(day.split('-')[2], 10);
    const cappedPercentage = Math.min(percentageConsumed, 100).toFixed(0);

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
                    [css.active]: activeDate === day,
                })}
            >
                {dayNumber}
            </div>
            <span className={css.percentages}>{cappedPercentage}%</span>
        </div>
    );
};

export default CalendarItem;
