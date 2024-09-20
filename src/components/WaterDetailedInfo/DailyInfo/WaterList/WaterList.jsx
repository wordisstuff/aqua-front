import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './WaterList.module.css';
import WaterItem from '../WaterItem/WaterItem';
import { apiGetWaterDay } from '../../../../redux/water/operation';
import {
    selectDate,
    selectWaterPerDay,
} from '../../../../redux/water/selectors';

function WaterList() {
    const currentDay = useSelector(selectDate);
    const waterDay = useSelector(selectWaterPerDay);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(apiGetWaterDay(currentDay));
    }, [currentDay, dispatch]);

    return (
        <ul className={css.waterList}>
            {waterDay.map((data, index) => (
                <WaterItem key={index} data={data} />
            ))}
        </ul>
    );
}

export default WaterList;
