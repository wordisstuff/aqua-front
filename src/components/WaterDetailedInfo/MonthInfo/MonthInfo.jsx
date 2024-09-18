import { format } from 'date-fns';
import Calendar from './Calendar/Calendar.jsx';
import CalendarPagination from './CalendarPagination/CalendarPagination.jsx';
import CalendarTitle from './CalendarTitle/CalendarTitle.jsx';
import CalendarToggle from './CalendarToogle/CalendarToogle.jsx';
import Loader from './Loader/Loader.jsx';
import css from './MonthInfo.module.css';
import { useState, useEffect } from 'react';

const formatPercentage = percentage => {
    if (!percentage) return 0;
    const value = parseFloat(percentage.replace('%', ''));
    return isNaN(value) ? 0 : Math.floor(value);
};

const convertDate = (monthYear, dateStr) => {
    const [monthName, day] = dateStr.split(', ');
    const monthIndex = new Date(Date.parse(monthName + ' 1, 2020')).getMonth();
    const year = monthYear.split('-')[0];
    return format(new Date(year, monthIndex, day), 'yyyy-MM-dd');
};

const getMonthDaysArray = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        return format(new Date(year, month, day), 'yyyy-MM-dd');
    });
};

function MonthInfo() {
    const [isActive, setIsActive] = useState(true);
    const [currentMonth, setCurrentMonth] = useState('2024-09'); // ВЗЯТИ ЗНАЧЕННЯ З Redux
    const [monthArray, setMonthArray] = useState([]); // ПІДСТАВИТИ
    const [selectedDate, setSelectedDate] = useState(
        format(new Date(), 'yyyy-MM-dd'),
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const year = parseInt(currentMonth.split('-')[0], 10);
    const month = parseInt(currentMonth.split('-')[1], 10) - 1;
    const monthDay = getMonthDaysArray(year, month);

    const calendarArray = monthDay.map(date => {
        const item = monthArray.find(
            item => convertDate(currentMonth, item.date) === date,
        );
        const percentage = item?.percentage || '0%';

        return {
            date,
            percentage: formatPercentage(percentage),
        };
    });

    const changeMonth = increment => {
        if (increment > 0) {
            setCurrentMonth(
                format(addMonths(new Date(currentMonth), 1), 'yyyy-MM'),
            );
        } else if (increment < 0) {
            setCurrentMonth(
                format(subMonths(new Date(currentMonth), 1), 'yyyy-MM'),
            );
        }
    };

    const onTodayHandler = () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        setSelectedDate(today);
        setCurrentMonth(format(new Date(), 'yyyy-MM'));
    };

    const handleDateClick = date => {
        setSelectedDate(date);
    };

    useEffect(() => {
        setIsLoading(true);
        // ТРЕБА ЗАПИТ НА ДАНІ З МІСЯЦЯ
        // ОТРИМАЛА ДАНІ
        // setMonthArray(data) НАПР;
        setIsLoading(false);
    }, [currentMonth]);

    return (
        <div className={css.container}>
            <div className={css.containerHeader}>
                <CalendarTitle onTodayHandler={onTodayHandler} title="Month" />
                <div className={css.containerToggle}>
                    <CalendarPagination
                        currentDate={new Date(year, month, 1)}
                        changeMonth={changeMonth}
                        onMonthHandler={onTodayHandler}
                    />
                    <CalendarToggle
                        isActive={isActive}
                        setIsActive={setIsActive}
                    />
                </div>
            </div>
            {isError && (
                <div className={css.errorMessage}>
                    <p>An error occurred</p>
                </div>
            )}

            {isLoading && (
                <div className={css.loaderContainer}>
                    <Loader />
                </div>
            )}

            <Calendar
                monthItem={calendarArray}
                selectedDate={selectedDate}
                currentDate={format(new Date(), 'yyyy-MM-dd')}
                isActive={isActive}
                onClick={handleDateClick}
            />
        </div>
    );
}

export default MonthInfo;
