import { useTranslation } from 'react-i18next';

const formatDate = (date, y) => {
    const { t } = useTranslation();
    const normalizedDate = date.replace(/-/g, '/');
    const m = new Date(normalizedDate)
        .toLocaleString('en-US', { month: 'long' })
        .toLowerCase();
    if (y) {
        const year = new Date(normalizedDate).getUTCFullYear();
        return `${t(`ChooseDate.${m}`)} , ${year}`;
    }
    if (normalizedDate === new Date().toISOString().split('T')[0]) {
        return t('ChooseDate.today');
    } else {
        const day = new Date(normalizedDate).getUTCDate();
        return `${day} , ${t(`ChooseDate.${m}`)}`;
    }
};
export default formatDate;
