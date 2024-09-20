import {aquaApi} from '../../services/axios' 

export const requestDeleteWater = async waterId => {
    const { data } = await aquaApi.delete(`/water/${waterId}`);
    return data;
};

export const requestGetWaterDay = async date => {
    const { data } = await aquaApi.get(`water/daily/${date}`);
    return data;
};

export const requestGetWaterMonth = async date => {
    const { data } = await aquaApi.get(
        `/water/monthly/${date.year}/${date.month}`,
    );
    return data;
};

//********************************************************************************/

export const requestAddWater = async water => {
    const { data } = await aquaApi.post('/water', water);
    return data;
};

//********************************************************************************/

export const requestUpdateWater = async water => {
    const { data } = await aquaApi.put(`/water/${water.id}`, {
        amount: water.amount,
        date: water.date,
    });
    return data;
};

//********************************************************************************/

export const requestGetWaterStats = async () => {
    const { data } = await aquaApi.get(`/water/stats`);
    return data;
};