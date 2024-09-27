import { Helmet } from 'react-helmet-async';
import css from './ForgotPage.module.css';
import { useTranslation } from 'react-i18next';
import Additional from '../../components/Home/Additional.jsx';
import useMedia from '../../helpers/useHooks/useMedia.js';
import Container from '../../components/ShareComponents/Container/Container.jsx';
import Languages from '../../components/ShareComponents/Languages/Languages.jsx';
import ForgotPageForm from '../../components/ForgotPageForm/ForgotPageForm.jsx';

const ForgotPage = () => {
    const { t } = useTranslation();
    const { desktop } = useMedia();

    return (
        <>
            <Helmet>
                <title>{t('page.forgotPassword')}</title>
            </Helmet>
            <Container>
                <div className={css.containerPage}>
                    <div className={css.containerForm}>
                        <ForgotPageForm />
                        {desktop && <Additional />}
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ForgotPage;
