import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom'; // Імпортуємо useNavigate
import { resetPassword, checkEmail } from '../../redux/auth/operation.js';
import WelcomeWrap from '../ShareComponents/WelcomeWrap/WelcomeWrap.jsx';
import style from './ForgotPageForm.module.css';
import { forgotSchema, resetPasswordSchema } from './forgotSchema.js';
import useCustomForm from '../../helpers/useHooks/useCustomForm.js';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const icons = {
    check: FaCheck,
    error: FaTimes,
};

const ForgotPageForm = () => {
    const navigate = useNavigate(); // Викликаємо useNavigate всередині компонента
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const { t } = useTranslation();
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [openPassword, setOpenPassword] = useState(false);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const tokenFromUrl = query.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        }
    }, []);

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
        reset,
    } = useCustomForm(
        isEmailChecked ? { password: '' } : { email: '' },
        isEmailChecked ? resetPasswordSchema : forgotSchema,
    );

    const togglePasswordVisibility = () => setOpenPassword(prev => !prev);

    const onSubmitEmail = async data => {
        try {
            const response = await dispatch(checkEmail(data.email));
            if (response.payload?.status === 200) {
                setEmail(data.email);
                setToken(response.payload.token);
                setIsEmailChecked(true);
                reset();
                //toast.success(response.payload.message);
                toast.success('Check your email');

                // Перенаправлення на головну сторінку
                navigate('/');
            } else {
                toast.error(t('forgotPage.emailNotFoundError'));
            }
        } catch (error) {
            toast.error(t('forgotPage.emailError'));
        }
    };
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const tokenFromUrl = query.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
            setIsEmailChecked(true); // Додайте це, щоб активувати форму для введення пароля
        }
    }, []);
    const onSubmitPassword = async data => {
        try {
            const response = await dispatch(
                resetPassword({ token, password: data.password }),
            );

            console.log('Response from server:', response);

            if (response.payload?.status === 200) {
                toast.success('Пароль успішно оновлено');

                // Перенаправлення на сторінку входу
                navigate('/signin');
            } else {
                toast.error('Помилка при скиданні пароля');
            }
        } catch (error) {
            console.error(
                'Error:',
                error.response ? error.response.data : error.message,
            );
            toast.error('Сталася помилка');
        }
    };

    useEffect(() => {
        if (errors.email) toast.error(t('forgotPage.emailError'));
        if (errors.password) toast.error(t('forgotPage.passwordError'));
    }, [errors, t]);

    // useEffect(() => {
    //     if (isLoggedIn) dispatch(refreshUser());
    // }, [isLoggedIn, dispatch]);

    return (
        <WelcomeWrap
            classNameLogo={style.form}
            classNameWelcom={style.welcomPadding}
        >
            <div className={`${style.formBlock} ${style.formPosition}`}>
                <h2 className={style.formTitle}>
                    {isEmailChecked
                        ? t('forgotPage.resetPassword')
                        : t('forgotPage.forgotPassword')}
                </h2>

                <form
                    className={style.mainForm}
                    onSubmit={
                        isEmailChecked
                            ? handleSubmit(onSubmitPassword)
                            : handleSubmit(onSubmitEmail)
                    }
                >
                    {!isEmailChecked ? (
                        <>
                            <div className={style.fieldThumb}>
                                <label
                                    className={style.formLabel}
                                    htmlFor="email"
                                >
                                    {t('forgotPage.email')}
                                </label>
                                <input
                                    className={`${style.formInput} ${errors.email ? style.errorName : ''}`}
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder={t(
                                        'forgotPage.emailPlaceholder',
                                    )}
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <span className={style.errorSpan}>
                                        {t('forgotPage.emailError')}
                                    </span>
                                )}
                            </div>
                            <button
                                type="submit"
                                className={style.btnform}
                                disabled={!isDirty || !isValid}
                            >
                                {t('forgotPage.sendResetLink')}
                            </button>
                        </>
                    ) : (
                        <>
                            <div className={style.fieldThumb}>
                                <label
                                    className={style.formLabel}
                                    htmlFor="password"
                                >
                                    {t('forgotPage.newPassword')}
                                </label>
                                <div className={style.passwordWrapper}>
                                    <input
                                        className={`${style.formInput} ${errors.password ? style.errorName : ''}`}
                                        type={
                                            openPassword ? 'text' : 'password'
                                        }
                                        name="password"
                                        id="password"
                                        placeholder={t(
                                            'forgotPage.newPasswordPlaceholder',
                                        )}
                                        {...register('password')}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className={style.eyeBtn}
                                    >
                                        <svg className={style.iconeye}>
                                            <use
                                                xlinkHref={`#${openPassword ? 'eye' : 'eye-off'}`}
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {errors.password && (
                                    <span className={style.errorSpan}>
                                        {t('forgotPage.passwordError')}
                                    </span>
                                )}
                            </div>
                            <button
                                type="submit"
                                className={style.btnform}
                                disabled={!isDirty || !isValid}
                            >
                                {t('forgotPage.resetPassword')}
                            </button>
                        </>
                    )}
                </form>

                <div className={style.haveAccountSignIn}>
                    <div className={style.question}>
                        <p className={style.haveAccountText}>
                            {t('forgotPage.backToSignIn')}
                        </p>{' '}
                        <NavLink to="/signin" className={style.haveAccountForm}>
                            {t('forgotPage.signIn')}
                        </NavLink>
                    </div>
                </div>
            </div>
        </WelcomeWrap>
    );
};

export default ForgotPageForm;
