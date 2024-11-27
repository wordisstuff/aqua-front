import { Helmet } from 'react-helmet-async';
import css from './NotFoundPage.module.css';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '../../components/ShareComponents/Container/Container';

const NotFoundPage = () => {
    const { t } = useTranslation();
    return (
        <>
            <Helmet>
                <title>{t('page.notFound')}</title>
            </Helmet>
            <div className={css.containerPage404}>
                <Container>
                    <div className={css.table}>
                        <h2 className={css.titlePage}>404</h2>
                        <p>{t('page.notFound')}</p>
                    </div>
                    {/* <div className={css.arrow}></div> */}
                    <p className={css.message}>
                    {t('page.presGoBack')}
                    </p>
                    <div className={css.btnBox}>
                    <NavLink to="/" className={css.goBack}>
                    {t('page.goBack')}
                    </NavLink>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default NotFoundPage;
