import { useTranslation } from 'react-i18next';
import { format, isSameDay } from 'date-fns';
import css from './ChooseDate.module.css';
import { useSelector } from 'react-redux';
import { selectDate } from '../../../../redux/water/selectors';

function ChooseDate() {
    const selectedDate = useSelector(selectDate);

    const { t } = useTranslation();
    let renderDate;
    const today = format(new Date(), 'yyyy-MM-dd');

    if (today !== selectedDate) {
        renderDate = selectedDate;
    } else {
        renderDate = today;
    }

    const formatDisplayDate = date => {
        const dateObj = new Date(date);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = format(dateObj, 'MMMM').toLowerCase();
        return `${day}, ${t(`ChooseDate.${month}`) || month}`;
    };

    const formattedDate =
        renderDate === format(today, 'yyyy-MM-dd')
            ? t('WaterMainInfo.today')
            : formatDisplayDate(renderDate);

    return (
        <div className={css.chooseDateWrapper}>
            <h3 className={css.chosenDate}>{formattedDate}</h3>
        </div>
    );
}

export default ChooseDate;
