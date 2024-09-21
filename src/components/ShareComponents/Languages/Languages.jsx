import { useTranslation } from 'react-i18next';
import CSS from './Languages.module.css';
import { icons } from '../../../utils/icons';
import { useEffect, useState } from 'react';

const Languages = () => {
    const [showUaLang, setShowUaLang] = useState(false);
    const [showUsLang, setShowUsLang] = useState(true);
    const { i18n } = useTranslation();
    console.log(i18n.language);

    // useEffect(() => {
    //     if (i18n.language === 'us') {
    //         setShowUaLang(false);
    //         setShowUsLang(true);
    //     } else {
    //         setShowUsLang(false);
    //         setShowUaLang(true);
    //     }
    // }, [i18n.language]);
    return (
        <>
            <div
                data-aos="zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="250"
                data-aos-offset="0"
                className={CSS.lang}
            >
                {showUsLang && (
                    <button
                        onMouseEnter={() => {
                            if (i18n.language === 'us') {
                                setShowUaLang(true);
                                setShowUsLang(false);
                            }
                        }}
                        onMouseLeave={() => {
                            if (i18n.language === 'us') {
                                setShowUaLang(false);
                                setShowUsLang(true);
                            }
                        }}
                        className={CSS.langBtn}
                        onClick={() => {
                            setShowUsLang(true);
                            return i18n.changeLanguage('us');
                        }}
                    >
                        <svg
                            // width="33"
                            // height="33"
                            aria-label="Flag usa"
                            className={CSS.icon}
                        >
                            <use xlinkHref={`${icons}#us-flag`}></use>
                        </svg>
                    </button>
                )}
                {showUaLang && (
                    <button
                        onMouseEnter={() => {
                            if (i18n.language === 'ua') {
                                setShowUaLang(false);
                                setShowUsLang(true);
                            }
                        }}
                        onMouseLeave={() => {
                            if (i18n.language === 'ua') {
                                setShowUaLang(false);
                                setShowUsLang(true);
                            }
                        }}
                        className={CSS.langBtn}
                        onClick={() => {
                            setShowUaLang(true);
                            return i18n.changeLanguage('ua');
                        }}
                    >
                        <svg
                            width="33"
                            height="18"
                            aria-label="Flag ua"
                            className={CSS.icon}
                        >
                            <use xlinkHref={`${icons}#ua-flag`}></use>
                        </svg>
                    </button>
                )}
            </div>
        </>
    );
};

export default Languages;
