import React from 'react';
import { useDispatch } from 'react-redux';
import { googleLogin, googleRedirect } from '../../../redux/auth/operation';
import css from './GoogleButton.module.css';
import { useTranslation } from 'react-i18next';
export const GoogleButton = ({ type }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleGoogleLogin = async () => {
        try {
            const googleOAuth = await dispatch(googleRedirect()).unwrap();
            console.log(googleOAuth);
            window.location.href = googleOAuth;
        } catch (error) {
            console.log(error);
        } // const urlParams = new URLSearchParams(window.location.search);
        //const authCode = urlParams.get('code');
        //dispatch(googleLogin(authCode));
    };

    return (
        <button
            type="button"
            className={css.googleLogin}
            onClick={handleGoogleLogin}
        >
            {type === 'in'
                ? t('googleButton.googleInBtn')
                : t('googleButton.googleUpBtn')}
        </button>
    );
};
