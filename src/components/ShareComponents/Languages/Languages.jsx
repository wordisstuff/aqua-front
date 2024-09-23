import { useTranslation } from 'react-i18next';
import CSS from './Languages.module.css';
import { icons } from '../../../utils/icons';
import { useState } from 'react';

const Languages = () => {
    const { i18n } = useTranslation();

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };
    return (
        <>
            <header
                data-aos="zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="250"
                data-aos-offset="0"
                className={CSS.lang}
            >
                {i18n.language === 'ua' && (
                    <button
                        className={CSS.langBtn}
                        onClick={() => changeLanguage('ua')}
                    >
                        <svg
                            width="33"
                            height="33"
                            aria-label="Flag usa"
                            className={CSS.icon}
                        >
                            <use xlinkHref={`${icons}#ua-flag`}></use>
                        </svg>
                    </button>
                )}
                {i18n.language === 'us' && (
                    <button
                        className={CSS.langBtn}
                        onClick={() => changeLanguage('us')}
                    >
                        <svg
                            width="33"
                            height="33"
                            aria-label="Flag ua"
                            className={CSS.icon}
                        >
                            <use xlinkHref={`${icons}#us-flag`}></use>
                        </svg>
                    </button>
                )}
            </header>
        </>
    );
};

export default Languages;
