import css from './UserSettingsModal.module.css';
import axios from 'axios';
import toast, { LoaderIcon } from 'react-hot-toast';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import sprite from '../../../utils/icons/sprite.svg';
import * as Yup from 'yup';
import { useModalContext } from '../../../context/useContext';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../redux/auth/selectors';
import { currentUser, updateUser } from '../../../redux/auth/operation';

export const UserSettingsModal = () => {
    const { t } = useTranslation();
    const user = useSelector(selectUser);
    const { closeModal } = useModalContext();
    const [userData, setUserData] = useState(user);
    const [name, setName] = useState(userData.name);
    const [gender, setGender] = useState(userData.gender);
    const [email, setEmail] = useState(userData.email);
    const [weight, setWeight] = useState(userData.weight);
    const [userAvatar, setUserAvatar] = useState(userData.photo);
    const [requiredWater, setRequiredWater] = useState('1.5');
    const [willWater, setWillWater] = useState(userData.recommendedWater);
    const [time, setTime] = useState(userData.activeTime);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [newUserData, setNewUserData] = useState('');
    console.log(user);
    console.log(userAvatar);
    // useEffect(() => {
    //     dispatch(currentUser());
    // }, []);

    const UserSchema = Yup.object().shape({
        gender: Yup.string(),
        name: Yup.string()
            .trim()
            .min(2, t('modals.UserSettingsForm.validation.nameMin'))
            .max(12, t('modals.UserSettingsForm.validation.nameMax')),
        email: Yup.string().email(
            t('modals.UserSettingsForm.validation.emailInvalid'),
        ),
        photo: Yup.mixed(),
        weight: Yup.number()
            .min(30, t('modals.UserSettingsForm.validation.weightMin'))
            .max(300, t('modals.UserSettingsForm.validation.weightMax'))
            .typeError(t('modals.UserSettingsForm.validation.weightNumber')),
        activeTime: Yup.number().typeError(
            t('modals.UserSettingsForm.validation.timeNumber'),
        ),
        recommendedWater: Yup.number().typeError(
            t('modals.UserSettingsForm.validation.waterNumber'),
        ),
    });

    useEffect(() => {
        if (weight && gender) {
            let newAmount;
            if (gender === 'male') {
                newAmount = weight * 0.04 + time * 0.6;
            }
            if (gender === 'female') {
                newAmount = weight * 0.03 + time * 0.4;
            }
            setRequiredWater((Math.ceil(newAmount * 10) / 10).toFixed(1));
        }
    }, [gender, time, weight]);

    const hiddenInputUpload = useRef(null);

    const handleClick = e => {
        e.preventDefault();
        if (hiddenInputUpload.current) {
            hiddenInputUpload.current.click();
        }
    };

    const handleChange = e => {
        if (e.target.files) {
            const fileUploaded = e.target.files[0];
            setUserAvatar(fileUploaded);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const dataForValidation = {
            gender,
            name,
            photo: userAvatar,
            email,
            weight,
            activeTime: time,
            recommendedWater: willWater,
        };
        console.log(dataForValidation);
        try {
            const validatedData = await UserSchema.validate(dataForValidation, {
                abortEarly: false,
            });

            const formData = new FormData();
            formData.append('name', validatedData.name);
            formData.append('photo', userAvatar);
            formData.append('activeTime', validatedData.activeTime);
            formData.append('recommendedWater', validatedData.recommendedWater);
            formData.append('email', validatedData.email);
            formData.append('gender', validatedData.gender);
            formData.append('weight', validatedData.weight);

            console.log(formData);

            try {
                console.log('FORM', validatedData);
                dispatch(updateUser(formData));
                toast.success(t('modals.UserSettingsForm.success'), {
                    position: 'top-right',
                });

                closeModal();
            } catch (error) {
                toast.error(error.message, {
                    position: 'top-right',
                });
            }
        } catch (validationErrors) {
            validationErrors.inner.reverse().forEach(error => {
                toast.error(error.message, {
                    position: 'top-right',
                });
            });
        }
    };

    useMemo(() => {
        if (userData) {
            setGender(userData.gender);
            setName(userData.name);
            setEmail(userData.email);
            setWeight(userData.weight);
            setTime(userData.activeTime ? userData.activeTime : '0');
            setRequiredWater(userData.recommendedWater);
            setWillWater(userData.recommendedWater);
        }
    }, [userData]);

    // useMemo(() => {
    //     if (userData) {
    //         setNewUserData({
    //             photo: userAvatar ? userAvatar : userData.photo,
    //             activeTime: time,
    //             recommendedWater: willWater ? willWater : requiredWater,
    //             email: email,
    //             gender: gender,
    //             name: name,
    //             weight: weight,
    //         });
    //     }
    // }, [
    //     userData,
    //     userAvatar,
    //     time,
    //     requiredWater,
    //     email,
    //     gender,
    //     name,
    //     weight,
    //     willWater,
    // ]);
    console.log('REturn');
    return (
        <>
            <div className={css.wrapper}>
                <form className={css.form} onSubmit={handleSubmit}>
                    <div className={css.userPic}>
                        <h2>{t('modals.UserSettingsForm.setting')}</h2>
                        <div className={css.picWrapper}>
                            <div className={css.pic}>
                                <img
                                    src={
                                        userAvatar instanceof File
                                            ? URL.createObjectURL(userAvatar)
                                            : userData?.photo
                                    }
                                    className={css.avatar}
                                    alt="avatar"
                                />
                            </div>
                            <div
                                className={css.uploadWrapper}
                                onClick={handleClick}
                            >
                                <svg className={css.iconUpload}>
                                    <use xlinkHref={`${sprite}#upload`} />
                                </svg>
                                <p className={css.textRegular}>
                                    {t(
                                        'modals.UserSettingsForm.uploadPhotoBtn',
                                    )}
                                </p>
                            </div>
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                accept=".jpg,.jpeg,.png,.webp"
                                onChange={handleChange}
                                ref={hiddenInputUpload}
                            />
                        </div>
                    </div>

                    <div className={css.inputs}>
                        <div className={css.wrapperInputsForm}>
                            <div className={css.midContainer}>
                                <h3>
                                    {t(
                                        'modals.UserSettingsForm.yourGenderLabel',
                                    )}
                                </h3>
                                <div className={css.radioContainer}>
                                    <div className={css.radioButton}>
                                        <input
                                            className={css.radio}
                                            type="radio"
                                            name="gender"
                                            id="female"
                                            value="female"
                                            onChange={e =>
                                                setGender(e.target.value)
                                            }
                                            checked={
                                                gender === 'female' ||
                                                userData?.gender === 'female'
                                            }
                                        />
                                        <label
                                            className={css.radioLabel}
                                            htmlFor="female"
                                        >
                                            {t(
                                                'modals.UserSettingsForm.femaleGenderLabel',
                                            )}
                                        </label>
                                    </div>
                                    <div className={css.radioButton}>
                                        <input
                                            className={css.radio}
                                            type="radio"
                                            name="gender"
                                            id="male"
                                            value="male"
                                            onChange={e =>
                                                setGender(e.target.value)
                                            }
                                            checked={
                                                gender === 'male' ||
                                                userData?.gender === 'male'
                                            }
                                        />
                                        <label
                                            className={css.radioLabel}
                                            htmlFor="male"
                                        >
                                            {t(
                                                'modals.UserSettingsForm.femaleGenderMale',
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className={css.midContainer}>
                                <div className={css.userInfoInputContainer}>
                                    {t('modals.UserSettingsForm.yourNameLabel')}
                                    <input
                                        className={css.userInfoInput}
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={
                                            name === ' ' ? userData.name : name
                                        }
                                        onChange={e => {
                                            setName(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className={css.userInfoInputContainer}>
                                    <h3>
                                        {t(
                                            'modals.UserSettingsForm.labelEmail',
                                        )}
                                    </h3>
                                    <input
                                        className={css.userInfoInput}
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={
                                            email === ' '
                                                ? userData.email
                                                : email
                                        }
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={css.midContainer}>
                                <h3>
                                    {t('modals.UserSettingsForm.dailyNormah')}
                                </h3>
                                <div className={css.formulaContainer}>
                                    <div className={css.formula}>
                                        <p className={css.textRegular}>
                                            {t(
                                                'modals.UserSettingsForm.forWomanP',
                                            )}
                                        </p>
                                        <p className={css.textAccent}>
                                            V=(M*0,03) + (T*0,4)
                                        </p>
                                    </div>
                                    <div className={css.formula}>
                                        <p className={css.textRegular}>
                                            {t(
                                                'modals.UserSettingsForm.forManP',
                                            )}
                                        </p>
                                        <p className={css.textAccent}>
                                            V=(M*0,04) + (T*0,6)
                                        </p>
                                    </div>
                                </div>
                                <div className={css.textarea}>
                                    <span className={css.textAccent}>*</span>{' '}
                                    {t('modals.UserSettingsForm.starText')}
                                </div>
                                <div className={css.note}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                    >
                                        <path
                                            d="M7.57934 10.4315C7.64769 11.1434 7.76356 11.6724 7.92303 12.0214C8.08447 12.3693 8.37106 12.5429 8.78478 12.5429C8.86212 12.5429 8.93131 12.5308 8.99994 12.5167C9.07025 12.5308 9.13916 12.5429 9.21706 12.5429C9.62966 12.5429 9.91709 12.3693 10.0777 12.0214C10.238 11.6724 10.3519 11.1434 10.4217 10.4315L10.789 4.93532C10.8573 3.86404 10.8922 3.09538 10.8922 2.62879C10.8922 1.99372 10.7265 1.49816 10.3941 1.14238C10.0605 0.7866 9.62234 0.609131 9.07953 0.609131C9.05056 0.609131 9.02891 0.6156 9.0005 0.616725C8.9735 0.6156 8.95128 0.609131 8.92316 0.609131C8.37922 0.609131 7.94187 0.7866 7.60887 1.14238C7.27616 1.49872 7.10938 1.99457 7.10938 2.62907C7.10938 3.09566 7.14341 3.86432 7.21287 4.9356L7.57934 10.4315ZM9.01428 14.5518C8.48722 14.5518 8.03947 14.718 7.66766 15.0505C7.29612 15.3832 7.10994 15.7871 7.10994 16.2613C7.10994 16.7965 7.29837 17.2178 7.67244 17.5238C8.04819 17.8298 8.48637 17.9828 8.98728 17.9828C9.49719 17.9828 9.94184 17.832 10.3221 17.5297C10.7018 17.2282 10.8916 16.8046 10.8916 16.2618C10.8916 15.7876 10.7099 15.3838 10.3466 15.051C9.98319 14.718 9.53909 14.5518 9.01344 14.5518"
                                            fill="#9BE1A0"
                                        />
                                    </svg>
                                    <p className={css.textRegular}>
                                        {t(
                                            'modals.UserSettingsForm.activeText',
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={css.wrapperInputsForm}>
                            <div className={css.midContainer}>
                                <div
                                    className={`${css.userInfoInputContainer} ${css.down}`}
                                >
                                    <p className={css.textRegular}>
                                        {t('modals.UserSettingsForm.infoUser')}
                                    </p>
                                    <input
                                        className={css.userInfoInput}
                                        type="number"
                                        name="weight"
                                        id="weight"
                                        value={weight}
                                        step=".1"
                                        onChange={e =>
                                            setWeight(e.target.value)
                                        }
                                    />
                                </div>
                                <div className={css.userInfoInputContainer}>
                                    <p className={css.textRegular}>
                                        {t(
                                            'modals.UserSettingsForm.TheTimeSportsLabel',
                                        )}
                                    </p>
                                    <input
                                        className={css.userInfoInput}
                                        type="number"
                                        name="time"
                                        id="time"
                                        value={time}
                                        step=".1"
                                        onChange={e => setTime(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={css.midContainer}>
                                <div
                                    className={`${css.userInfoInputContainer} ${css.amount}`}
                                >
                                    <p className={css.textRegular}>
                                        {t(
                                            'modals.UserSettingsForm.requiredWater',
                                        )}
                                    </p>
                                    <p className={css.textAccent}>
                                        {`${requiredWater ? requiredWater : userData.recommendedWater} ${t('modals.UserSettingsForm.l')}`}
                                    </p>
                                </div>
                            </div>

                            <div className={css.userInfoInputContainer}>
                                <h3>
                                    {t(
                                        'modals.UserSettingsForm.writeDownLabel',
                                    )}
                                </h3>
                                <input
                                    className={css.userInfoInput}
                                    type="number"
                                    name="water"
                                    value={willWater || ''}
                                    id="water"
                                    step=".1"
                                    onChange={e =>
                                        setWillWater(
                                            e.target.value
                                                ? parseFloat(e.target.value)
                                                : '',
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className={css.buttonContainer}>
                        <button className={css.saveButton} type="submit">
                            {t('modals.UserSettingsForm.saveBtn')}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UserSettingsModal;
