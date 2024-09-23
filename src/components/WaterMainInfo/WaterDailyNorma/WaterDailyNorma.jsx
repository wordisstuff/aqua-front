import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/auth/selectors';
import css from './WaterDailyNorma.module.css';
import { useTranslation } from 'react-i18next';



export default function WaterDailyNorma() {

    const user = useSelector(selectUser)
    
    return (
        <div className={css.normabox}>
            <p className={css.normaAmount}>1.5 L</p>
            <p className={css.normaText}>My daily norma</p>
        </div>
    );
}

