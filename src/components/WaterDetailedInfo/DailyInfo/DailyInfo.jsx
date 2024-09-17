import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectDate, SELECTOR } from '../../../redux/water/selectors';
// import { FUNCTION } from '../../../redux/';
import WaterList from './WaterList/WaterList';
import ChooseData from './ChooseDate/ChooseDate';
import AddWaterDetailInfoBtn from './AddWaterDetailInfoBtn/AddWaterDetailInfoBtn';
import css from './DailyInfo.module.css';

function DailyInfo() {
    const { t } = useTranslation();
    const waterPerDay = useSelector(SELECTOR);
    const todayDate = useSelector(selectDate);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FUNCTION(todayDate));
    }, [todayDate, dispatch]);

    return (
        <div className={css.dailyInfoWrapper}>
            <div className={css.dataWriteContainer}>
                <ChooseData />
                <AddWaterDetailInfoBtn />
            </div>
            {waterPerDay.length > 0 ? (
                <div className={css.scrollContainer}>
                    <WaterList />
                </div>
            ) : (
                <div className={css.bootleText}>
                    <p className={css.waterBootle}>{t('DailyInfo.info')}</p>
                </div>
            )}
        </div>
    );
}

export default DailyInfo;
