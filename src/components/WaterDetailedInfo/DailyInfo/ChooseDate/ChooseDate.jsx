import { useTranslation } from 'react-i18next';
import { format, isSameDay } from 'date-fns';
import css from './ChooseDate.module.css';

function ChooseDate() {
    const { t } = useTranslation();

    const today = new Date();

    const todayDateString = format(today, 'yyyy-MM-dd');

    const formatDisplayDate = date => {
        const dateObj = new Date(date);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = format(dateObj, 'MMMM').toLowerCase();
        return `${day}, ${t(`ChooseDate.${month}`) || month}`;
    };

    const formattedDate =
        todayDateString === format(today, 'yyyy-MM-dd')
            ? t('WaterMainInfo.today')
            : formatDisplayDate(todayDateString);

    return (
        <div className={css.chooseDateWrapper}>
            <h3 className={css.chosenDate}>{formattedDate}</h3>
        </div>
    );
}

export default ChooseDate;
