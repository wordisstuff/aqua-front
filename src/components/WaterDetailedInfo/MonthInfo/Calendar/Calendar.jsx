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
            {monthItem.daysInMonth && monthItem.daysInMonth.map(({ day, percentComplete }, index) => {
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
