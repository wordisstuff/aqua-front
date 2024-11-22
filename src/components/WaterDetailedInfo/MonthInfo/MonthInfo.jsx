import { useState, useEffect } from 'react';
import format from 'date-fns/format';
import Calendar from './Calendar/Calendar.jsx';
import CalendarPagination from './CalendarPagination/CalendarPagination.jsx';
import CalendarTitle from './CalendarTitle/CalendarTitle.jsx';
import CalendarToggle from './CalendarToogle/CalendarToogle.jsx';
import css from './MonthInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectMonthData,
    selectMonth,
} from '../../../redux/water/selectors.js';
import { apiGetWaterMonth } from '../../../redux/water/operation.js';
import { useTranslation } from 'react-i18next';
import WaterChart from './Calendar/WaterChart/WaterChart.jsx';

function MonthInfo() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const selectedMonthData = useSelector(selectMonthData);
    const selectedMonth = useSelector(selectMonth);

    const [isActive, setIsActive] = useState(true);

    const [selectedDate, setSelectedDate] = useState(
        format(new Date(), 'yyyy-MM-dd'),
    );
    useEffect(() => {
        dispatch(
            apiGetWaterMonth({
                year: Number(selectedMonth.year),
                month: Number(selectedMonth.month),
            }),
        );
    }, [selectedMonth, dispatch]);

    const onTodayHandler = () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        setSelectedDate(today);
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
                    <CalendarPagination onMonthHandler={onTodayHandler} />
                    <CalendarToggle
                        isActive={isActive}
                        setIsActive={setIsActive}
                    />
                </div>
            </div>
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
