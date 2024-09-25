import { aquaApi } from '../../services/axios';

export const deleteWaterService = async waterId => {
    const { data } = await aquaApi.delete(`/water/${waterId}`);
    return data;
};

export const getWaterDayService = async date => {
    const { data } = await aquaApi.get(`water/daily/${date}`);

    return data;
};

export const getWaterMonthService = async date => {
    const data = await aquaApi.get(`/water/monthly/${date.year}/${date.month}`);
    return data;
};

//********************************************************************************/

export const addWaterService = async water => {
    const { data } = await aquaApi.post('/water', water);
    console.log('data', data.data);
    return data;
};

//********************************************************************************/

export const updateWaterService = async water => {
    const { data } = await aquaApi.patch(`/water/${water.id}`, {
        amount: water.amount,
        date: water.date,
    });
    return data;
};

//********************************************************************************/

export const getWaterStatsService = async () => {
    const { data } = await aquaApi.get(`/water/stats`);
    return data;
};
