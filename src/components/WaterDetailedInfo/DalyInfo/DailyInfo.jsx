import css from './DailyInfo.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectWaterPerDay,
    selectDate,
} from '../../../redux/water/selectors.js';
import { apiGetWaterDay } from '../../../redux/water/operation.js';
import WaterList from './WaterList/WaterList.jsx';

import HorizontalScroll from './HorizonalScroll/HorizonalScroll.jsx';

import { useTranslation } from 'react-i18next';
import AddWaterDetailInfoBtn from './AddWaterDetailInfoBtn/AddWaterDetailInfoBtn.jsx';

import useTodayDateUpdater from '../../../helpers/useHooks/useTodayDateUpdater.js';
import ChooseDate from './ChooseDate/ChooseDate.jsx';

function DailyInfo() {
    const { t } = useTranslation();
    const waterPerDay = useSelector(selectWaterPerDay);
    const currentDate = useSelector(selectDate);
    const dispatch = useDispatch();

    useTodayDateUpdater();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(apiGetWaterDay(currentDate));
            } catch (error) {
                console.error('Failed to fetch water data', error);
            }
        };

        if (currentDate) {
            fetchData();
        }
    }, [currentDate, dispatch]);

    const hasWaterData = Array.isArray(waterPerDay) && waterPerDay.length > 0;

    return (
        <div className={css.wrapper}>
            <div className={css.dataEntryContainer}>
                <ChooseDate />
                <AddWaterDetailInfoBtn />
            </div>
            {hasWaterData ? (
                <HorizontalScroll>
                    <WaterList />
                </HorizontalScroll>
            ) : (
                <div className={css.text}>
                    <p className={css.waterEmpty}>{t('DailyInfo.info')}</p>
                </div>
            )}
        </div>
    );
}

export default DailyInfo;
