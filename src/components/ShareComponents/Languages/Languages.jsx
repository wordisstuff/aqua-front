import { useTranslation } from 'react-i18next';
import CSS from './Languages.module.css';
import { icons } from '../../../utils/icons';
import { useState } from 'react';

const Languages = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={CSS.container}>
            <header
                data-aos="zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="250"
                data-aos-offset="0"
                className={CSS.lang}
            >
                <button className={CSS.langBtn} onClick={toggleModal}>
                    <svg width="33" height="33" aria-label="Language switch">
                        <use xlinkHref={`${icons}#${i18n.language}-flag`}></use>
                    </svg>

                    <svg
                        width="16"
                        height="16"
                        className={`${CSS.arrowIcon} ${isOpen ? CSS.rotated : ''}`}
                        aria-label="Arrow down"
                    >
                        <use xlinkHref={`${icons}#arrow-down`}></use>
                    </svg>
                </button>
                {isOpen && (
                    <div className={CSS.modalContainer} onClick={toggleModal}>
                        <div
                            className={CSS.modal}
                            onClick={e => e.stopPropagation()}
                        >
                            {i18n.language === 'ua' && (
                                <button
                                    className={CSS.modalBtn}
                                    onClick={() => changeLanguage('us')}
                                >
                                    <svg
                                        width="33"
                                        height="33"
                                        aria-label="Flag us"
                                    >
                                        <use
                                            xlinkHref={`${icons}#us-flag`}
                                        ></use>
                                    </svg>
                                </button>
                            )}
                            {i18n.language === 'us' && (
                                <button
                                    className={CSS.modalBtn}
                                    onClick={() => changeLanguage('ua')}
                                >
                                    <svg
                                        width="33"
                                        height="33"
                                        aria-label="Flag ua"
                                    >
                                        <use
                                            xlinkHref={`${icons}#ua-flag`}
                                        ></use>
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
};

export default Languages;
