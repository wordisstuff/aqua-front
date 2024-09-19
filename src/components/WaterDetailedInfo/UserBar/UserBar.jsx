import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import css from './UserBar.module.css';
import { icons as sprite } from '../../../utils/icons/index';
import Context from '../../../context/Context';
import LogOut from '../../Modals/LogOut/LogOut';
import UserSettings from '../../Modals/UserSettings/UserSettings';
// import { refreshUser } from '../../../redux/auth/operation';
import { selectUser } from '../../../redux/auth/selectors';
import { useAuth } from '../../../helpers/useHooks/useAuth';
import { currentUser } from '../../../redux/users/operation';

const UserBar = () => {
    const { t } = useTranslation();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const { openModal } = useContext(Context);
    const dispatch = useDispatch();
    const { user } = useAuth();
    const userMainInfo = useSelector(selectUser);
    const [isUserRefreshed, setIsUserRefreshed] = useState(false);

    useEffect(() => {
        if (!user) {
            dispatch(currentUser());
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (isUserRefreshed) {
            dispatch(currentUser());
            setIsUserRefreshed(false);
        }
    }, [dispatch, isUserRefreshed]);

    const togglePopover = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    const getFirstName = fullName => {
        return fullName ? fullName.split(' ')[0] : t('UserBar.user');
    };

    return (
        <div className={css.userBarWrapper}>
            <h2 className={css.userWelcome}>
                {t('UserBar.welkome')}
                <span className={css.name}>
                    , {getFirstName(userMainInfo?.name)}!
                </span>
            </h2>
            <div className={css.userBarPanel} data-tour="step-7">
                <button className={css.userBarBtn} onClick={togglePopover}>
                    {getFirstName(userMainInfo?.name)}
                    {userMainInfo?.avatar ? (
                        <img
                            src={userMainInfo.avatar}
                            alt="User's Avatar"
                            className={css.avatar}
                        />
                    ) : (
                        <span className={css.avatarData}>.</span>
                    )}
                    <svg
                        className={`${css.chevron} ${
                            isPopoverOpen ? css.open : ''
                        }`}
                    >
                        <use xlinkHref={`${sprite}#arrow-down`} />
                    </svg>
                </button>
                {isPopoverOpen && (
                    <div className={css.userBarOpenPanel}>
                        <ul className={css.wrapperModal}>
                            <li>
                                <a
                                    onClick={() =>
                                        openModal(
                                            <UserSettings
                                                setIsUserRefreshed={
                                                    setIsUserRefreshed
                                                }
                                            />,
                                        )
                                    }
                                    className={css.userBarModal}
                                    href="#settings"
                                >
                                    <svg width="16" height="16">
                                        <use xlinkHref={`${sprite}#settings`} />
                                    </svg>
                                    {t('UserBar.settings')}
                                </a>
                            </li>
                            <li>
                                <a
                                    className={css.userBarModal}
                                    onClick={() => openModal(<LogOut />)}
                                >
                                    <svg width="16" height="16">
                                        <use xlinkHref={`${sprite}#log-out`} />
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

export default UserBar;
