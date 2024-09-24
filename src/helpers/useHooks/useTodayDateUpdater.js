import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDate } from '../../redux/water/slice.js';

function useTodayDateUpdater() {
    const dispatch = useDispatch();

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayDateString = `${year}-${month}-${day}`;

        dispatch(setDate(todayDateString));
    }, [dispatch]);
}

export default useTodayDateUpdater;
