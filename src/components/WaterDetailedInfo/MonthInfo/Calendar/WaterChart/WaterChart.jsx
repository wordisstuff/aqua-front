import {
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    ReferenceLine,
} from 'recharts';
import CSS from './WaterChart.module.css';
import { useSelector } from 'react-redux';
import { selectMonthData } from '../../../../../redux/water/selectors.js';
import { useTranslation } from 'react-i18next';
import { selectUser } from '../../../../../redux/auth/selectors.js';

const formatDate = dateString => {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}`;
};

const CustomTooltip = ({ active, payload, coordinate }) => {
    const { t } = useTranslation();
    if (active && payload && payload.length) {
        const tooltipStyle = {
            backgroundColor: 'white',
            border: '1px solid white',
            padding: '10px',
            borderRadius: '10px',
            position: 'absolute',
            transform: 'translate(-50%, -100%)',
            left: `${coordinate.x}px`,
            top: `${coordinate.y}px`,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
        };

        const labelStyle = {
            fontSize: '12px',
            fontWeight: 'bold',
        };

        return (
            <div className="custom-tooltip" style={tooltipStyle}>
                <p style={labelStyle}>
                    {t('waterChart.tooltip', { amount: payload[0].value })}
                </p>
            </div>
        );
    }
    return null;
};

const WaterChart = () => {
    const { t } = useTranslation();
    const waterData = useSelector(selectMonthData) || { daysInMonth: [] };
    const user = useSelector(selectUser);
    const dailyUserGoal = user.recommendedWater;

    const formattedData = waterData.daysInMonth
        .filter(item => item.totalAmount > 0)
        .map(item => ({
            date: formatDate(item.day),
            day: Number(item.day.split('-')[2]),
            originalAmount: parseFloat(item.totalAmount),
        }))
        .sort((a, b) => a.day - b.day);

    const totalAmount = formattedData.reduce(
        (acc, obj) => acc + obj.originalAmount,
        0,
    );

    const yAxisTicks = Array.from({ length: 8 }, (_, i) =>
        (i * 0.5).toFixed(1),
    );

    return (
        <div className={CSS.graphContainer}>
            {totalAmount > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={formattedData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 10,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="colorUv"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#9BE1A0"
                                    stopOpacity={1}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#9BE1A0"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickMargin={21}
                        />
                        <YAxis
                            domain={[0, 3.5]}
                            ticks={yAxisTicks}
                            tickCount={8}
                            label={{ angle: -90, position: 'insideLeft' }}
                            tickLine={false}
                            tickMargin={53}
                            tick={{ textAnchor: 'start' }}
                        />

                        <Tooltip
                            cursor={false}
                            position={{ y: -30 }}
                            content={<CustomTooltip />}
                        />
                        <Area
                            type="monotone"
                            dataKey="originalAmount"
                            stroke="#87D28D"
                            fill="url(#colorUv)"
                            dot={{
                                fill: '#fff',
                                stroke: '#87D28D',
                                strokeWidth: 2,
                                r: 8,
                                fillOpacity: 1,
                            }}
                        />
                        <ReferenceLine
                            y={dailyUserGoal}
                            stroke="#87D28D"
                            label={{
                                value: 'Daily Norm',
                                position: 'top',
                                fill: '#87D28D',
                                fontSize: 12,
                                fontWeight: 'bold',
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            ) : (
                <p className={CSS.nodata}>{t('waterChart.noData')}</p>
            )}
        </div>
    );
};

export default WaterChart;
