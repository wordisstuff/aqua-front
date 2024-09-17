import axios from '../../helpers/axsiosConfig.js';

export const requestDeleteWater = async (waterId) => {
    const { data } = await axios.delete(`/water/${waterId}`); 
    return data;
};

export const requestGetWaterDay = async (date) => {
    const { data } = await axios.get(`water/daily/${date}`);
    return data;
};

export const requestGetWaterMonth = async (date) => {
    const { data } = await axios.get(`/water/monthly/${date.year}/${date / month}`);
    return data;
};

