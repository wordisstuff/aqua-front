import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import css from './CalendarPagination.module.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonth } from '../../../../redux/water/selectors';
import { decreaseMonth, increaseMonth } from '../../../../redux/water/slice';
import formatDate from '../../../../services/formatDate';
import disabledBtn from '../../../../services/disabledBnt';

const CalendarPagination = ({ onMonthHandler }) => {
    const { t } = useTranslation();

    const { year, month } = useSelector(selectMonth);
    const dispatch = useDispatch();
    const handlePrev = () => {
        dispatch(decreaseMonth());
    };

    const handleNext = () => {
        dispatch(increaseMonth());
    };
    const dateString = `${year}-${month}-1`;
    return (
        <div className={css.wrapperButtons}>
            <button onClick={handlePrev} className={css.chevronButton}>
                <FaChevronLeft />
            </button>
            <button onClick={onMonthHandler} className={css.monthButton}>
                {formatDate(dateString, true)}
            </button>
            <button
                disabled={disabledBtn(`${year}-${month}`)}
                onClick={handleNext}
                className={css.chevronButton}
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default CalendarPagination;
