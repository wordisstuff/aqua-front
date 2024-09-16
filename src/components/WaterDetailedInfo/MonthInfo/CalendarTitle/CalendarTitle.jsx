import css from './CalendarTitle.module.css';

const CalendarTitle = ({ onTodayHandler, title }) => {
    const handleClick = () => {
        if (title === 'Month') {
            onTodayHandler();
        }
    };

    return (
        <div className={css.calendarTitleWrapper} onClick={handleClick}>
            {title}
        </div>
    );
};

export default CalendarTitle;
