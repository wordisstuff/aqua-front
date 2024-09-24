import React from 'react';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../../../redux/auth/operation';
import css from './GoogleButton.module.css';
import { useTranslation } from 'react-i18next';
export const GoogleButton = ({ type }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleGoogleLogin = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get('code');
        dispatch(googleLogin(authCode));
    };

    return (
        <button className={css.googleLogin} onclick={handleGoogleLogin}>
            {type === 'in'
                ? t('googleButton.googleInBtn')
                : t('googleButton.googleUpBtn')}
        </button>
    );
};
