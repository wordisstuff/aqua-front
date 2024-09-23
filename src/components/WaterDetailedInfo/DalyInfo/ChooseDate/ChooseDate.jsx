import { useState, useEffect } from 'react';
import { selectDate } from '../../../../redux/water/selectors';
import css from './ChooseDate.module.css';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function ChooseDate() {
    const { t } = useTranslation();
    const currentDate = useSelector(selectDate);
    const [formattedDate, setFormattedDate] = useState('');

    const todayDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const months = {
        january: t('ChooseDate.january'),
        february: t('ChooseDate.february'),
        march: t('ChooseDate.march'),
        april: t('ChooseDate.april'),
        may: t('ChooseDate.may'),
        june: t('ChooseDate.june'),
        july: t('ChooseDate.july'),
        august: t('ChooseDate.august'),
        september: t('ChooseDate.september'),
        october: t('ChooseDate.october'),
        november: t('ChooseDate.november'),
        december: t('ChooseDate.december'),
    };

    const formatDisplayDate = dateString => {
        const dateObj = new Date(dateString);
        const day = String(dateObj.getDate());
        const month = dateObj
            .toLocaleString('en-US', { month: 'long' })
            .toLowerCase();
        return `${day}, ${months[month]}`;
    };

    const today = todayDate();

    useEffect(() => {
        if (currentDate.slice(0, 10) === today) {
            setFormattedDate(t('WaterMainInfo.today'));
        } else {
            setFormattedDate(formatDisplayDate(currentDate));
        }
    }, [currentDate, today, t]);

    return (
        <div className={css.wrapper}>
            {<h3 className={css.date}>{formattedDate}</h3>}
        </div>
    );
}

export default ChooseDate;
