import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './WaterList.module.css';
import WaterItem from '../WaterItem/WaterItem';
import { FUNCTION } from '../../../../redux/water/operation';
import { selectDate, SELECTOR } from '../../../../redux/water/selectors';

function WaterList() {
    const todayDay = useSelector(selectDate);
    const waterPerDay = useSelector(SELECTOR);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FUNCTION(todayDay));
    }, [todayDay, dispatch]);
    return (
        <ul className={css.waterList}>
            {waterPerDay.map((data, index) => (
                <WaterItem key={index} data={data} />
            ))}
        </ul>
    );
}

export default WaterList;
