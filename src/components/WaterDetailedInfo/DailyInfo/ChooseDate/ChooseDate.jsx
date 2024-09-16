import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import css from './ChooseDate.module.css';
import { selectDate } from '../../../../redux/water/selectors';

function ChooseDate() {
    const { t } = useTranslation();
    const currentDay = useSelector(selectDate);
    const [selectedDay, setSelectedDay] = useState('');

    const todayDay = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
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

    const displayDate = dateString => {
        const daysObject = new Date(dateString);
        const day = String(daysObject.getDate());
        const month = daysObject
            .toLocaleString('en-US', { month: 'long' })
            .toLowerCase();
        return `${day}, ${months[month]}`;
    };

    const today = todayDay();

    useEffect(() => {
        if (currentDay === today) {
            return setSelectedDay(t('WaterMainInfo.today'));
        } else {
            setSelectedDay(displayDate(currentDay));
        }
    }, [currentDay, today]);

    return (
        <div className={css.chooseDateWrapper}>
            {<h3 className={css.chosenDate}>{selectedDay}</h3>}
        </div>
    );
}

export default ChooseDate;
