import UserBar from './UserBar/UserBar';
import DailyInfo from './DailyInfo/DailyInfo';
import MonthInfo from './MonthInfo/MonthInfo';
import css from './WaterDetailedInfo.module.css';

const WaterDetailedInfo = () => {
    return (
        <div className={css.waterDetailedInfoWrapper}>
            <UserBar />
            <DailyInfo />
            <MonthInfo />
        </div>
    );
};

export default WaterDetailedInfo;
