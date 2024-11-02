import css from './ChooseDate.module.css';
import { useSelector } from 'react-redux';
import { selectDate } from '../../../../redux/water/selectors';
import formatDate from '../../../../services/formatDate';

function ChooseDate() {
    const selectedDate = useSelector(selectDate);

    return (
        <div className={css.chooseDateWrapper}>
            <h3 className={css.chosenDate}>{formatDate(selectedDate)}</h3>
        </div>
    );
}

export default ChooseDate;
