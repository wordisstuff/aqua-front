import Slider from '@mui/material/Slider';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import css from './WaterProgressBar.module.css';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectDate,
    selectPercentPerDay,
} from '../../../redux/water/selectors.js/';
import { useEffect } from 'react';
import { apiGetWaterDay } from '../../../redux/water/operation';
import { useTranslation } from 'react-i18next';

const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#323f47',
        color: '#ffffff',
        fontSize: '12px',
        borderRadius: '8px',
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: '#323f47',
    },
});
function ValueLabelComponent(props) {
    const { children, value, open } = props;
    return (
        <CustomTooltip
            open={open}
            enterTouchDelay={0}
            placement="top"
            title={`${Math.min(value, 100).toFixed(0)}%`}
            arrow
        >
            {children}
        </CustomTooltip>
    );
}
const WaterProgressBar = () => {
    const { t } = useTranslation();
    const selectedDate = useSelector(selectDate);
    const percentDay = useSelector(selectPercentPerDay);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(apiGetWaterDay(selectedDate));
    }, [selectedDate, dispatch]);

    const percent = percentDay || 0;

    const formatDate = date => {
        if (date === new Date().toISOString().split('T')[0]) {
            return t('ChooseDate.today');
        } else {
            const day = new Date(date).getUTCDate();
            const m = new Date()
                .toLocaleString('en-US', { month: 'long' })
                .toLowerCase();
            return `${day}, ${t(`ChooseDate.${m}`)}`;
        }
    };

    return (
        <div className={css.container} data-tour="step-3">
            <div className={css.title}>{formatDate(selectedDate)}</div>

            <Box sx={{ width: '100%', m: 0, p: 0 }}>
                <Slider
                    value={percent}
                    valueLabelDisplay="auto"
                    components={{ ValueLabel: ValueLabelComponent }}
                    onChange={() => {}}
                    sx={{
                        m: 0,
                        p: 0,
                        color: 'var(--accent)',
                        '@media (pointer: coarse)': {
                            p: '0 !important',
                        },
                        '& .MuiSlider-thumb': {
                            borderRadius: '16px',
                            width: '12px',
                            height: '12px',
                            color: 'white',
                            border: '1px solid var(--accent)',
                        },
                        '& .MuiSlider-rail': {
                            color: 'var(--light-gray)',
                            backgroundColor: 'var(--light-gray)',
                        },
                        '& .MuiSlider-valueLabel': {
                            backgroundColor: 'var(--accent)',
                            color: 'white',
                            borderRadius: '8px',
                            padding: '4px 4px',
                        },
                    }}
                />
                <div className={css.percentBar}>
                    <a>0%</a>
                    <a className={css.fifty}>50%</a>
                    <a>100%</a>
                </div>
            </Box>
        </div>
    );
};
export default WaterProgressBar;
