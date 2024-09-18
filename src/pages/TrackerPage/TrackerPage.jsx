import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import css from './TrackerPage.module.css';
import Languages from '../../components/ShareComponents/Languages/Languages';
import { icons } from '../../utils/icons';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import Container from '../../components/ShareComponents/Container/Container';
import Modals from '../../components/Modals/Modals';

const TrackerPage = () => {
    const { t } = useTranslation();
    const { setIsOpen } = useTour(); // кроки

    useEffect(() => {
        const isFirstVisit = localStorage.getItem('firstVisit') === null;
        if (isFirstVisit) {
            localStorage.setItem('firstVisit', 'false');
            setIsOpen(true);
        }
    }, [setIsOpen]);

    return (
        <>
            <Helmet>
                <title>{t('page.tracker')}</title>
            </Helmet>
            <Container>
                <div className={css.trackerStyle}>
                    <div className={css.trackerElement}>
                        <button
                            className={css.btnInfo}
                            onClick={() => setIsOpen(true)}
                        >
                            <svg
                                width="18"
                                height="18"
                                aria-label="Tour in web"
                                className={css.iconInfo}
                            >
                                <use xlinkHref={`${icons}#icon-info`}></use>
                            </svg>
                        </button>
                        <Languages />
                    </div>
                    <div className={css.trackerWrapper} data-tour="step-1">
                        <WaterMainInfo />
                        <WaterDetailedInfo />
                    </div>
                </div>
            </Container>
            <Modals />
        </>
    );
};

export default TrackerPage;
