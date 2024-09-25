import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/auth/selectors.js';
import css from './WaterDailyNorma.module.css';
import { useTranslation } from 'react-i18next';

const WaterDailyNorma = ({ setWillWater }) => {
    const { t } = useTranslation();
    const user = useSelector(selectUser);

    const dailyUserGoal = user.recommendedWater;

    return (
        <div className={css.dailyNorma} data-tour="step-2">
            <a className={css.title}>
                {dailyUserGoal} {t('WaterMainInfo.l')}
            </a>
            <a className={css.subtitle}>
                {setWillWater}
                {t('WaterMainInfo.norma')}
            </a>
        </div>
    );
};

export default WaterDailyNorma;
