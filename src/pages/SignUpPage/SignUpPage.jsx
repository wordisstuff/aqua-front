import { Helmet } from 'react-helmet-async';
import css from './SignUpPage.module.css';
import { useTranslation } from 'react-i18next';
import Additional from '../../components/Home/Additional.jsx';
import useMedia from '../../helpers/useHooks/useMedia.js';
import Container from '../../components/ShareComponents/Container/Container.jsx';
import Languages from '../../components/ShareComponents/Languages/Languages.jsx';
import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';

const SignUpPage = () => {
    const { t } = useTranslation();
    const { desktop } = useMedia();

    return (
        <>
            <Helmet>
                <title>{t('page.signUp')}</title>
            </Helmet>
            <Container>
                <div className={css.containerPageUp}>
                    {/* <Languages /> */}
                    <div className={css.containerHomeUp}>
                        <SignUpForm />
                        {desktop && <Additional />}
                    </div>
                </div>
            </Container>
        </>
    );
};

export default SignUpPage;
