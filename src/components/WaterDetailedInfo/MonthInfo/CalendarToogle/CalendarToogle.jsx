import css from './CalendsrToogle.module.css';
import { icons as sprite } from '../../../../utils/icons/index';

const CalendarToggle = ({ isActive, setIsActive }) => {
    const toggleClass = () => {
        setIsActive(!isActive);
    };

    return (
        <button className={isActive ? css.active : ''} onClick={toggleClass}>
            <svg className={css.svg}>
                <use xlinkHref={`${sprite}#pie-chart-02-1`} />
            </svg>
        </button>
    );
};

export default CalendarToggle;
