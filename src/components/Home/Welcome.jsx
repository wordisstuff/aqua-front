import { NavLink } from 'react-router-dom';
import WelcomeWrap from '../ShareComponents/WelcomeWrap/WelcomeWrap';
import CSS from './Welcome.module.css';
import { useTranslation } from 'react-i18next';

const Welcome = () => {
    const { t } = useTranslation();

    const isLoggedIn = false;
    return (
        <div
            data-aos="fade-down"
            data-aos-anchor="#example-anchor"
            data-aos-offset="600"
            data-aos-duration="600"
            //className={CSS.main}
        >
            <WelcomeWrap logoClass={CSS.logoWrap}>
                <div className={CSS.info}>
                    <p className={CSS.text}>{t('welcomeSection.mainText')}</p>
                    <h1 className={CSS.title}>{t('welcomeSection.title')}</h1>
                    <div className={CSS.btn}>
                        {isLoggedIn ? (
                            <NavLink to="/tracker" className={CSS.tryTracker}>
                                {t('welcomeSection.tryTracker')}
                            </NavLink>
                        ) : (
                            <NavLink to="/signup" className={CSS.tryTracker}>
                                {t('welcomeSection.tryTracker')}
                            </NavLink>
                        )}
                        <NavLink to="/signin" className={CSS.signIn}>
                            {t('welcomeSection.signIn')}
                        </NavLink>
                    </div>
                </div>
            </WelcomeWrap>
        </div>
    );
};

export default Welcome;
