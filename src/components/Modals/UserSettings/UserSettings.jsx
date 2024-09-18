import css from './UserSettings.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useMemo, useRef, useState } from 'react';

const UserSettings = () => {
    const [userData, setUserData] = useState(null);
    const [userAvatar, setUserAvatar] = useState(null);
    const [gender, setGender] = useState('female');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [weight, setWeight] = useState(null);
    const [requiredWater, setRequiredWater] = useState(1.5);
    const [wantWater, setWantWater] = useState();
    const [time, setTime] = useState(null);
    const [loding, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/users/???');
                setUserData(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (weight && gender) {
            let WaterAmout;
            if (gender === 'female') {
                waterAmount = weight * 0.03 + time * 0.4;
            } else {
                waterAmount = weight * 0.04 + time * 0.6;
            }
        }

        setRequiredWater(waterAmount.toFixed(2));
    }, []);

    return (
        <>
            <form>
                <div className={css.avatarSettingWrapper}>
                    <h2>Setting</h2>
                    <img src={userAvatar} alt="user avatar" />
                    <button>Upload a photo</button>
                </div>

                <div className={userSettingWrapper}>
                    <div className={css.genderInputWrapper}>
                        <label htmlFor="">Your gender identity</label>
                        <input type="checkbox" />
                    </div>
                    <div className={css.userDataWrapper}>
                        <div className={css.userNameWrapper}>
                            <label htmlFor="name">Your Name</label>
                            <input type="text" id="name" />
                        </div>
                        <div className={css.userEmailWrapper}>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" />
                        </div>
                    </div>
                    <div className={css.dailyNormaWrapper}>
                        <h2>My daily norma</h2>
                        <div className={css.mathWrapper}>
                            <div className={css.formulaWrapper}>
                                <p>For woman:</p>
                                <p>V=(M*0,03) + (T*0,4)</p>
                            </div>
                            <div className={css.formulaWrapper}>
                                <p>For man:</p>
                                <p>V=(M*0,04) + (T*0,6)</p>
                            </div>
                            <p className={howItWorks}>
                                * V is the volume of the water norm in liters
                                per day, M is your body weight, T is the time of
                                active sports, or another type of activity
                                commensurate in terms of loads (in the absence
                                of these, you must set 0)
                            </p>
                            <p className={css.warning}>Active time in hours</p>
                            <div className={css.weightTimeWrapper}>
                                <div className={weightWrapper}>
                                    <label htmlFor="weight">
                                        Your weight in kilograms
                                    </label>
                                    <input type="text" />
                                </div>
                                <div className={css.timeWrapper}>
                                    <label htmlFor="time">
                                        The time of active participation in
                                        sports:
                                    </label>
                                    <input type="text" />
                                </div>
                            </div>
                            <div className={css.waterNeedsWrapper}>
                                <div className={css.requiredWater}>
                                    <p>
                                        The required amount of water in liters
                                        per day:
                                    </p>
                                    <p>{requiredWater}</p>
                                </div>
                                <div className={css.requiredWater}>
                                    <label htmlFor="waterNeed">
                                        Write down how much water you will
                                        drink:
                                    </label>
                                    <input type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit">Save</button>
            </form>
        </>
    );
};
export default UserSettings;
