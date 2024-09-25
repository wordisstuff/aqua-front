import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectDate, selectWaterPerDay } from '../../../redux/water/selectors';
import { apiGetWaterDay } from '../../../redux/water/operation';
import WaterList from './WaterList/WaterList';
import ChooseData from './ChooseDate/ChooseDate';
import AddWaterDetailInfoBtn from './AddWaterDetailInfoBtn/AddWaterDetailInfoBtn';
import HorizontalScroll from './HorizonalScroll/HorizonalScroll';
import css from './DailyInfo.module.css';
import { format } from 'date-fns';

function DailyInfo() {
    const { t } = useTranslation();
    const waterDay = useSelector(selectWaterPerDay);
    // const currentDate = useSelector(selectDate);
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentDate) {
            dispatch(apiGetWaterDay(currentDate));
        }
    }, [currentDate, dispatch]);

    const isWaterDayArray = Array.isArray(waterDay) && waterDay.length > 0;

    return (
        <div className={css.dailyInfoWrapper}>
            <div className={css.dataWriteContainer}>
                <ChooseData />
                <AddWaterDetailInfoBtn />
            </div>
            {isWaterDayArray ? (
                <HorizontalScroll>
                    <WaterList />
                </HorizontalScroll>
            ) : (
                <div className={css.waterBootle}>
                    <p className={css.bootleText}>{t('DailyInfo.info')}</p>
                </div>
            )}
        </div>
    );
}

export default DailyInfo;
