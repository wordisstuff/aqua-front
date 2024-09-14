import { NavLink } from 'react-router-dom';
import WelcomeWrap from '../ShareComponents/WelcomeWrap/WelcomeWrap';
import CSS from './Welcome.module.css';
import { useTranslation } from 'react-i18next';

const Welcome = () => {
    const { t } = useTranslation();

    const isLoggedIn = false;
    return (
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
    );
};

export default Welcome;
