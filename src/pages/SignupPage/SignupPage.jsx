
import { Helmet } from 'react-helmet-async';
import css from './SignUpPage.module.css';
import { useTranslation } from 'react-i18next';
{/* ============================ */}
{/* import AdvantagesSection from '/components/Home/AdvantagesSection/AdvantagesSection';
import SignUpForm from '/components/SignUpForm/SignUpForm';
import Container from '/shared/components/Container/Container';
import { useMedia } from 'hooks/useMedia';
import Languages from 'shared/components/Languages/Languages';
{/* ============================ */}

const SignUpPage = () => {
    const { t } = useTranslation();
    const { isDesktop } = useMedia();
    retur(
        <>
            <Helmet>
                <title>{t('page.sinUp')}</title>
            </Helmet>

            <Container>
                <div className={css.containerPageUp}>
                    <languages />
                    <div className={css.containerHomeUp}
                    >
                        <SingnUpForm />
                        {isDesktop && <AdvantagesSection/>}
                        
                        </div>
                </div>

            </Container>
        </>
    );
    
};
export default SignUpPage;