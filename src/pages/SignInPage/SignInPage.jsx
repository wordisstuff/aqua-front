import { Helmet } from 'react-helmet-async';
import css from './SignInPage.module.css';
import { useTranslation } from 'react-i18next';
import useMedia from '../../helpers/useHooks/useMedia.js';
import Languages from '../../components/ShareComponents/Languages/Languages.jsx';
import Container from '../../components/ShareComponents/Container/Container.jsx';
import Additional from '../../components/Home/Additional.jsx';
import SigninForm from '../../components/SignInForm/SigninForm.jsx';

const SignInPage = () => {
    const { t } = useTranslation();
    const { desktop } = useMedia();
    return (
        <>
            <Helmet>
                <title>{t('page.signIn')}</title>
            </Helmet>
            <Container>
                <div className={css.containerPageIn}>
                    <Languages />
                    <div className={css.containerHome}>
                        <SigninForm />
                        {desktop && <Additional />}
                    </div>
                </div>
            </Container>
        </>
    );
};
export default SignInPage;
