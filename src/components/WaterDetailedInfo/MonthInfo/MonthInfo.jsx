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
    selectMonth,
} from '../../../redux/water/selectors.js';
import { apiGetWaterMonth } from '../../../redux/water/operation.js';
import { useTranslation } from 'react-i18next';

function MonthInfo() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const selectedMonthData = useSelector(selectMonthData);
    const selectedMonth = useSelector(selectMonth);

    const [isActive, setIsActive] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(
        format(new Date(), 'yyyy-MM'),
    );

    const [selectedDate, setSelectedDate] = useState(
        format(new Date(), 'yyyy-MM-dd'),
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const year = parseInt(currentMonth.split('-')[0], 10);
    const month = parseInt(currentMonth.split('-')[1], 10) - 1;

    useEffect(() => {
        dispatch(
            apiGetWaterMonth({
                year: Number(selectedMonth.year),
                month: Number(selectedMonth.month),
            }),
        );
    }, [selectedMonth, dispatch]);

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
        dispatch(
            apiGetWaterMonth({
                year: Number(selectedMonth.year),
                month: Number(selectedMonth.month),
            }),
        );
    };

    return (
        <div className={css.container}>
            <div className={css.containerHeader}>
                <CalendarTitle
                    onTodayHandler={onTodayHandler}
                    title={t('ChooseDate.month')}
                />
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
                    <p>{t('ChooseDate.errorOccurred')}</p>
                </div>
            )}

            {isLoading && (
                <div className={css.loaderContainer}>
                    <Loader />
                </div>
            )}

            <Calendar
                monthItem={selectedMonthData}
                selectedDate={selectedDate}
                currentDate={format(new Date(), 'yyyy-MM-dd')}
                isActive={isActive}
                onClick={handleDateClick}
            />
        </div>
    );
}

export default MonthInfo;
