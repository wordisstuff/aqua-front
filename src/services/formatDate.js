import { useTranslation } from 'react-i18next';

const formatDate = (date, y) => {
    const { t } = useTranslation();
    const m = new Date(date)
        .toLocaleString('default', { month: 'long' })
        .toLowerCase();
    if (y) {
        const year = new Date(date).getUTCFullYear();
        return `${t(`ChooseDate.${m}`)},${year}`;
    }
    if (date === new Date().toISOString().split('T')[0]) {
        return t('ChooseDate.today');
    } else {
        const day = new Date(date).getUTCDate();
        return `${day}, ${t(`ChooseDate.${m}`)}`;
    }
};
export default formatDate;
