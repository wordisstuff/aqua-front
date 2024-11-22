import { useDispatch, useSelector } from 'react-redux';
import { googleRedirect } from '../../../redux/auth/operation';
import CSS from './GoogleButton.module.css';
import { icons } from '../../../utils/icons/index';
import { selectGoogleUrl } from '../../../redux/auth/selectors';
import { useEffect } from 'react';

export const GoogleButton = () => {
    const selectedGoogleUrl = useSelector(selectGoogleUrl);

    const dispatch = useDispatch();
    useEffect(() => {
        if (selectedGoogleUrl) {
            window.location.href = selectedGoogleUrl;
        }
    }, [selectedGoogleUrl]);
    const handleGoogleAuth = () => {
        dispatch(googleRedirect());
    };

    return (
        <div className={CSS.googleBox}>
            <button
                className={CSS.googleBtn}
                type="button"
                onClick={handleGoogleAuth}
            >
                <svg className={CSS.googleSvg}>
                    <use xlinkHref={`${icons}#google`}></use>
                </svg>
            </button>
        </div>
    );
};
