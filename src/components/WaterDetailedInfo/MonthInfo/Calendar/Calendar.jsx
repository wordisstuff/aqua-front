import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';

const Calendar = ({
    monthItem,
    onClick,
    currentDate,
    selectedDate,
    isActive,
}) => {
    return (
        <ul className={css.calendarWrapper}>
            {monthItem.map(({ date, percentage }, index) => {
                const uniqueKey = index;
                const isActiveItem = selectedDate === date;

                return (
                    <CalendarItem
                        key={uniqueKey}
                        day={date}
                        percentageConsumed={percentage}
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
