import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import format from 'date-fns/format';

import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import css from './CalendarPagination.module.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonth } from '../../../../redux/water/selectors';
import { setMonth } from '../../../../redux/water/slice';

const CalendarPagination = ({ currentDate, changeMonth, onMonthHandler }) => {
    const { t } = useTranslation();
    const [date, setDate] = useState(currentDate);

    const initialSubDate = subMonths(currentDate, 1);
    const [years, setYears] = useState(
        format(new Date(initialSubDate), 'yyyy'),
    );
    const [monthses, setMonthses] = useState(
        format(new Date(initialSubDate), 'MM'),
    );

    const selectedMonth = useSelector(selectMonth);
    const dispatch = useDispatch();

    useEffect(() => {
        const newSubDate = subMonths(date, 1);
        setYears(format(newSubDate, 'yyyy'));
        setMonthses(format(newSubDate, 'MM'));
    }, [date]);

    useEffect(() => {
        setDate(currentDate);
    }, [currentDate]);

    const handlePrev = () => {
        const newDate = subMonths(date, 1);
        const newYear = format(new Date(newDate), 'yyyy');
        const newMonth = format(new Date(newDate), 'MM');
        setDate(newDate);
        dispatch(setMonth({ year: newYear, month: newMonth }));
        changeMonth(-1);
    };

    const handleNext = () => {
        const newDate = addMonths(date, 1);
        const newYear = format(new Date(newDate), 'yyyy');
        const newMonth = format(new Date(newDate), 'MM');
        console.log(newDate, newMonth);
        setDate(newDate);
        dispatch(setMonth({ year: newYear, month: newMonth }));
        changeMonth(1);
    };

    const months = {
        1: t('ChooseDate.january'),
        2: t('ChooseDate.february'),
        3: t('ChooseDate.march'),
        4: t('ChooseDate.april'),
        5: t('ChooseDate.may'),
        6: t('ChooseDate.june'),
        7: t('ChooseDate.july'),
        8: t('ChooseDate.august'),
        9: t('ChooseDate.september'),
        10: t('ChooseDate.october'),
        11: t('ChooseDate.november'),
        12: t('ChooseDate.december'),
    };

    const monthNumber = parseInt(format(date, 'M'), 10);
    const month = months[monthNumber];
    const year = format(date, 'yyyy');

    return (
        <div className={css.wrapperButtons}>
            <button onClick={handlePrev} className={css.chevronButton}>
                <FaChevronLeft />
            </button>
            <button onClick={onMonthHandler} className={css.monthButton}>
                {`${month}, ${year}`}
            </button>
            <button onClick={handleNext} className={css.chevronButton}>
                <FaChevronRight />
            </button>
        </div>
    );
};

export default CalendarPagination;
