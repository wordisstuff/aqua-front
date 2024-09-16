import axios from '../../helpers/axsiosConfig.js';

export const requestDeleteWater = async (waterId) => {
    const { data } = await axios.delete(`/water/${waterId}`); //всі роути запитів не звіряла з беком, можливі відмінності
    return data;
};

export const requestGetWaterDay = async (date) => {
    const { data } = await axios.get(`water/daily/${date}`);//всі роути запитів не звіряла з беком, можливі відмінності
    return data;
};

export const requestGetWaterMonth = async (date) => {
    const { data } = await axios.get(`/water/monthly/${date.year}/${date / month}`);//всі роути запитів не звіряла з беком, можливі відмінності
    return data;
};

