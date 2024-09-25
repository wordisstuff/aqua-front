import { useModalContext } from '../../../../context/useContext';
import { useTranslation } from 'react-i18next';
import { format, parseISO, subHours } from 'date-fns';
import css from './WaterItem.module.css';
import { icons as sprite } from '../../../../utils/icons/index';
import DeleteWater from '../../../Modals/DeleteWater/DeleteWater';
import WaterModal from '../../../Modals/WaterModal/WaterModal';

function WaterItem({ data }) {
    const { t } = useTranslation();
    const { openModal } = useModalContext();
    // const { _id: id, count, date } = data;
    // console.log(data);
    const formatWaterCount = count => {
        const mlCount = count * 1000;
        return `${mlCount} ${t('DailyInfo.ml')}`;
    };
    const formatTime = isoString => {
        const date = subHours(parseISO(isoString), 3);
        return format(date, 'hh:mm a');
    };
    return (
        <div className={css.waterItemWrapper} id={data._id}>
            <svg className={css.svgCup}>
                <use xlinkHref={`${sprite}#water-glass`} />
            </svg>
            <div className={css.dataFormat}>
                <p className={css.dataMl}>{formatWaterCount(data.amount)}</p>
                <p className={css.dataHours}>{formatTime(data.date)}</p>
            </div>
            <div className={css.btnsWrapper}>
                <button
                    className={css.btn}
                    onClick={() => {
                        console.log(1);
                        openModal(
                            <WaterModal
                                operationType={'edit'}
                                recordId={data._id}
                                initialData={{
                                    amount: data.amount,
                                    date: data.date,
                                }}
                            />,
                        );
                    }}
                >
                    <svg className={css.svgEdit}>
                        <use xlinkHref={`${sprite}#edit`} />
                    </svg>
                </button>
                <button
                    className={css.btn}
                    onClick={() => {
                        openModal(<DeleteWater idForDel={data._id} />);
                    }}
                >
                    <svg className={css.svgBin}>
                        <use xlinkHref={`${sprite}#trash`} />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default WaterItem;
