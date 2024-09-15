import { Helmet } from 'react-helmet-async'
import css from './SignInPage.module.css';
import SigninForm from '../../components/SignInForm/SigninForm.jsx';
import { useTranslation } from 'react-i18next';
{/* ============================ */}
{/* ЦИХ КОMПОНЕНТІВ ЩЕ НЕ CТВОРИЛИ(в роботі) */ }
// import { useMedia } from 'hooks/useMedia';(приблизні імпорти) щоб зрозуміло звідки воно прийде
//import Languages from 'shared/components/Languages/Languages';//<=ця не підтяглась мені
// import Container from 'shared/components/Container/Container';
// import AdvantagesSection from 'components/Home/AdvantagesSection/AdvantagesSection';
{/* ============================ */}

const SignInPage = () => {
    const { t } = useTranslation();
    const { isDesktop } = useMedia();
    return (
        <>
            <Helmet>
                <title>
                    {t('page.signIn')}
                    </title>
            </Helmet>
        <Container >
                <div className={css.containerPageIn }>
                    <languages />
                    <div className={css.containerHomeIn} >
                        <SigninForm />
                        {isDesktop && <AdvantagesSection/>}
                    </div>
                </div>
            </Container>
        </>
    )

}
export default SignInPage;