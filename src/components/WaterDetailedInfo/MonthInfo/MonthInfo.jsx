import { useState, useEffect } from 'react';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import format from 'date-fns/format';
import Calendar from './Calendar/Calendar.jsx';
import CalendarPagination from './CalendarPagination/CalendarPagination.jsx';
import CalendarTitle from './CalendarTitle/CalendarTitle.jsx';
import CalendarToggle from './CalendarToogle/CalendarToogle.jsx';
import Loader from './Loader/Loader.jsx';
import css from './MonthInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectMonthData,
    selectPercentPerDay,
    selectMonth,
} from '../../../redux/water/selectors.js';
import { apiGetWaterMonth } from '../../../redux/water/operation.js';
import WaterChart from './Calendar/WaterChart/WaterChart.jsx';

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
    const dispatch = useDispatch();
    const selectedMonthData = useSelector(selectMonthData);
    const percentPerDay = useSelector(selectPercentPerDay);

    const selectedMonth = useSelector(selectMonth);
    console.log(selectedMonth);
    console.log(selectedMonthData);
    const [isActive, setIsActive] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(
        format(new Date(), 'yyyy-MM'),
    );
    const [monthArray, setMonthArray] = useState([]);
    const [selectedDate, setSelectedDate] = useState(
        format(new Date(), 'yyyy-MM-dd'),
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const year = parseInt(currentMonth.split('-')[0], 10);
    const month = parseInt(currentMonth.split('-')[1], 10) - 1;
    const monthDay = getMonthDaysArray(year, month);
    console.log(year, month);
    useEffect(() => {
        const newMonth = Number(selectedMonth.month);
        dispatch(
            apiGetWaterMonth({
                year: selectedMonth.year,
                month: newMonth,
            }),
        );
    }, [selectedMonth]);
    const calendarArray = monthDay.map(date => {
        const item = monthArray.find(
            item => convertDate(currentMonth, item.date) === date,
        );
        // console.log(item, date);

        const percentage = percentPerDay || '0%';

        return {
            date,
            percentage,
        };
    });
    // console.log(calendarArray);
    const changeMonth = increment => {
        const newDate =
            increment > 0
                ? addMonths(new Date(currentMonth), 1)
                : subMonths(new Date(currentMonth), 1);
        setCurrentMonth(format(newDate, 'yyyy-MM'));
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
        // Имитация логики извлечения данных
        // можем разместить свой запрос на выборку и обрабатывать ошибки здесь
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
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
            {isActive ? (
                <Calendar
                    monthItem={selectedMonthData}
                    selectedDate={selectedDate}
                    currentDate={format(new Date(), 'yyyy-MM-dd')}
                    isActive={isActive}
                    onClick={handleDateClick}
                />
            ) : (
                <WaterChart />
            )}
        </div>
    );
}

export default MonthInfo;
