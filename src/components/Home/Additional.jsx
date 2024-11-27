import { useEffect, useState } from 'react';
import CSS from './Additional.module.css';
import { icons } from '../../utils/icons';
import { useTranslation } from 'react-i18next';
import { Hearts } from 'react-loader-spinner';
import getRandomColor from '../../services/getRandomColor';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/users/operation';
import {
    selectUsersAvatars,
    selectUsersCount,
} from '../../redux/users/selectors';

const Additional = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const avatarsArr = useSelector(selectUsersAvatars);
    const usersCount = useSelector(selectUsersCount);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getUsers());
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div
            data-aos="fade-down"
            data-aos-anchor="#example-anchor"
            data-aos-offset="600"
            data-aos-duration="600"
            className={CSS.main}
        >
            <div
                data-aos="zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="300"
                data-aos-offset="0"
                className={CSS.customers}
            >
                {loading ? (
                    <div className={CSS.loader}>
                        <Hearts
                            height="35"
                            width="35"
                            color={getRandomColor()}
                            ariaLabel="hearts-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>
                ) : (
                    <div className={CSS.happy}>
                        {avatarsArr
                            .filter(
                                avatar =>
                                    avatar !== 'null' &&
                                    typeof avatar === 'string' &&
                                    !avatar.startsWith('//www.gravatar.com'),
                            )
                            .map((avatar, idx) => (
                                <div key={idx} className={CSS.customer}>
                                    <img className={CSS.avater} src={avatar} />
                                </div>
                            ))}
                        <div className={CSS.custNum}>+{usersCount}</div>
                    </div>
                )}

                <p className={CSS.text}>
                    {t('additional.our')}{' '}
                    <span className={CSS.burnText}>
                        {t('additional.happy')}
                    </span>{' '}
                    {t('additional.customers')}
                </p>
            </div>
            <div className={CSS.benefits}>
                <div
                    data-aos="zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-delay="300"
                    data-aos-offset="0"
                    className={CSS.common}
                >
                    <div className={CSS.firstB}>
                        <svg className={CSS.icon}>
                            <use xlinkHref={`${icons}#ellips`} />
                        </svg>
                        <p
                            data-aos="zoom-in"
                            data-aos-easing="ease-in-back"
                            data-aos-delay="300"
                            data-aos-offset="0"
                            className={CSS.textB}
                        >
                            {t('additional.habit')}
                        </p>
                    </div>
                    <p className={CSS.secB}>{t('additional.statistics')}</p>
                </div>
                <p
                    data-aos="zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-delay="300"
                    data-aos-offset="0"
                    className={CSS.lastB}
                >
                    {t('additional.setting')}
                </p>
            </div>
        </div>
    );
};

export default Additional;
