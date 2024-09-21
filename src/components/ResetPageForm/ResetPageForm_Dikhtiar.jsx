import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'; 
import { useState } from 'react'; 

export const ResetPageForm = () => {
    const emailId = useId();
    const { t } = useTranslation(); 
    const dispatch = useDispatch();
    const [email, setEmail] = useState(''); //стан для email
    const [isValid, setIsValid] = useState(false); // стан для перевірки валідності

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email submitted:', email);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setIsValid(e.target.value.includes('@')); //перевірка валідності email
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>{t('send_your_email')}</h1> 
                <div>
                    <label htmlFor={emailId}>{t('email')}</label>
                    <input
                        type="email"
                        id={emailId}
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <button type="submit" disabled={!isValid}>
                    {t('send')}
                </button>
            </form>

            <div>
                <p>{t('Remember_password')}</p>
                <NavLink to="/signin">{t('sign_in')}</NavLink>
            </div>

            <nav>
                <NavLink to="/signup">{t('sign_up')}</NavLink>
                <NavLink to="/signin">{t('sign_in')}</NavLink>
            </nav>
        </div>
    );
};
