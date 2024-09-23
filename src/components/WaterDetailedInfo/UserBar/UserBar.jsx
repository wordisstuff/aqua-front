import { useEffect, useState } from 'react';
import css from './UserBar.module.css';
import { icons } from '../../../utils/icons';
import { useModalContext } from '../../../context/useContext.jsx';
import UserSettingsModal from '../../Modals/UserSettingsModal/UserSettingsModal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../../../redux/auth/operation.js';
import { selectUser } from '../../../redux/auth/selectors.js';
import { useTranslation } from 'react-i18next';
import LogOutModalWind from '../../Modals/LogOut/LogOut.jsx';
import { FaRegUserCircle } from 'react-icons/fa';
import { useAuth } from '../../../helpers/useHooks/useAuth.js';

const Userbar = () => {
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const { user } = useAuth();
    const { openModal } = useModalContext();
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUser);
    const [isUserUpdated, setIsUserUpdated] = useState(false);

    useEffect(() => {
        if (!user) {
            dispatch(refreshUser());
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (isUserUpdated) {
            dispatch(refreshUser());
            setIsUserUpdated(false);
        }
    }, [dispatch, isUserUpdated]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const getFirstName = fullName => {
        return fullName ? fullName.split(' ')[0] : t('UserBar.users');
    };

    return (
        <div className={css.userBarWrapper}>
            <h2 className={css.welcome}>
                {t('UserBar.welkome')}
                <span className={css.name}>
                    , {getFirstName(userInfo?.name)}!
                </span>
            </h2>
            <div className={css.userBarMenu}>
                <button className={css.userBarBtn} onClick={toggleMenu}>
                    {getFirstName(userInfo?.name)}
                    {userInfo?.avatar ? (
                        <img
                            src={userInfo.avatar}
                            alt="User Avatar"
                            className={css.avatar}
                        />
                    ) : (
                        <span className={css.avatarPlaceholder}>
                            <FaRegUserCircle />
                        </span>
                    )}
                    <svg
                        className={`${css.chevron} ${menuOpen ? css.open : ''}`}
                    >
                        <use xlinkHref={`${icons}#arrow-down`} />
                    </svg>
                </button>
                {menuOpen && (
                    <div className={css.userBarOpenMenu}>
                        <ul className={css.wrapperLink}>
                            <li>
                                <a
                                    onClick={() =>
                                        openModal(
                                            <UserSettingsModal
                                                setIsUserUpdated={
                                                    setIsUserUpdated
                                                }
                                            />,
                                        )
                                    }
                                    className={css.userBarLink}
                                    href="#settings"
                                >
                                    <svg width="16" height="16">
                                        <use xlinkHref={`${icons}#settings`} />
                                    </svg>
                                    {t('UserBar.settings')}
                                </a>
                            </li>
                            <li>
                                <a
                                    className={css.userBarLink}
                                    onClick={() =>
                                        openModal(<LogOutModalWind />)
                                    }
                                >
                                    <svg width="16" height="16">
                                        <use xlinkHref={`${icons}#log-out`} />
                                    </svg>
                                    {t('UserBar.logOut')}
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Userbar;
