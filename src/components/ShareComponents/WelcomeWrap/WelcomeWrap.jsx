import Logo from '../Logo/Logo';
import CSS from './WelcomeWrap.module.css';
const WelcomeWrap = ({ children, logoClass }) => {
    return (
        <>
            <div
                data-aos="fade-up"
                data-aos-anchor="#example-anchor"
                data-aos-offset="360"
                data-aos-duration="360"
                className={`${CSS.welcome}`}
            >
                <Logo className={`${logoClass}`} />
                {children}
            </div>
        </>
    );
};

export default WelcomeWrap;
