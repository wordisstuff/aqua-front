import { useTranslation } from 'react-i18next';
import CSS from './Languages.module.css';
import { icons } from '../../../utils/icons';
import clsx from 'clsx';

const Languages = () => {
    const { i18n } = useTranslation();

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
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
                <div className={CSS.flagBox}>
                    <button
                        className={clsx(
                            CSS.flagBtn,
                            i18n.language === 'us' && CSS.active,
                        )}
                        onClick={() => changeLanguage('us')}
                    >
                        <svg className={CSS.icon} aria-label="Flag us">
                            <use xlinkHref={`${icons}#us-flag`}></use>
                        </svg>
                    </button>
                    <button
                        className={clsx(
                            CSS.flagBtn,
                            i18n.language === 'ua' && CSS.active,
                        )}
                        onClick={() => changeLanguage('ua')}
                    >
                        <svg className={CSS.icon} aria-label="Flag ua">
                            <use xlinkHref={`${icons}#ua-flag`}></use>
                        </svg>
                    </button>
                </div>
            </header>
        </div>
    );
};

export default Languages;
