import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { format, parseISO, subHours } from 'date-fns';
import css from './WaterItem.module.css';
import { icons as sprite } from '../../../../utils/icons/index';
import Context from '../../../../../context/Context';
import WaterModal from 'WATERMODALCOMPONENT';
import DeleteWater from '../../../Modals/DeleteWater/DeleteWater';

function WaterItem({ data }) {
    const { t } = useTranslation();
    const { openModal } = useContext(Context);
    const { _id: id, count, date } = data;

    const formatWaterCount = count => {
        const mlCount = count * 1000;
        return `${mlCount} ${t('DailyInfo.ml')}`;
    };
    const formatTime = isoString => {
        const date = subHours(parseISO(isoString), 3);
        return format(date, 'hh:mm a');
    };
    return (
        <div data-tour="step-6" className={css.waterItemWrapper} id={id}>
            <svg className={css.svgCup}>
                <use xlinkHref={`${sprite}#water-glass`} />
            </svg>
            <div className={css.dataFormat}>
                <p className={css.dataMl}>{formatWaterCount(count)}</p>
                <p className={css.dataHours}>{formatTime(date)}</p>
            </div>
            <div className={css.btnsWrapper}>
                <button
                    className={css.btn}
                    onClick={() => {
                        openModal(
                            <WaterModal
                                operationType={'edit'}
                                recordId={id}
                                initialData={{ count, date }}
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
                        openModal(<DeleteWater onDelete={id} />);
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
