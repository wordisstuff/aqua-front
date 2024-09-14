import { useEffect, useState } from 'react';
import CSS from './Additional.module.css';
import { icons } from '../../utils/icons';
import { useTranslation } from 'react-i18next';
import { Hearts } from 'react-loader-spinner';
import getRandomColor from '../../services/getRandomColor';

const Additional = () => {
    const { t } = useTranslation();
    const [avatars, setAvatars] = useState([]);
    const usersCount = 12;
    const loading = Math.random() < 0.5;
    const avBasePath = '../../utils/images/mainPage/';
    const userAvatar = [1, 2, 3];

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
                        {avatars.map((avatar, idx) => (
                            <div key={idx} className={CSS.customer}>
                                <img
                                    className={CSS.avater}
                                    src={avatar}
                                    alt="user avatar"
                                />
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