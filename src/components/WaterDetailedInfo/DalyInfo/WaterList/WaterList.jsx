import { useEffect } from 'react';
import WaterItem from '../WaterList/WaterList';
import css from './WaterList.module.css';
import { apiGetWaterDay } from '../../../../redux/water/operation.js';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectDate,
    selectWaterPerDay,
} from '../../../../redux/water/selectors.js';

function WaterList() {
    const currentDay = useSelector(selectDate);
    const waterDay = useSelector(selectWaterPerDay);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(apiGetWaterDay(currentDay));
    }, [currentDay, dispatch]);

    return (
        <ul className={css.list}>
            {waterDay.map((data, index) => (
                <WaterItem key={index} data={data} />
            ))}
        </ul>
    );
}

export default WaterList;
