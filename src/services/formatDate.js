import { useTranslation } from 'react-i18next';

const formatDate = date => {
    const { t } = useTranslation();
    if (date === new Date().toISOString().split('T')[0]) {
        return t('ChooseDate.today');
    } else {
        const day = new Date(date).getUTCDate();
        const m = new Date()
            .toLocaleString('en-US', { month: 'long' })
            .toLowerCase();
        return `${day}, ${t(`ChooseDate.${m}`)}`;
    }
};
export default formatDate;
