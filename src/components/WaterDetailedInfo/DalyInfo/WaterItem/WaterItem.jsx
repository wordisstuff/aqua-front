import { useModalContext } from '../../../context/useContext.jsx';
import { icons } from '../../../utils/icons/index.js';

import { format, parseISO, subHours } from 'date-fns';
import { useTranslation } from 'react-i18next';

import css from './WaterItem.module.css';
import WaterForm from '../../WaterForm/WaterForm.jsx';
import DeleteWater from '../../Modals/DeleteWater/DeleteWater.jsx';

function WaterItem({ data }) {
    const { t } = useTranslation();
    const { openModal } = useModalContext();

    const { _id: id, amount, date } = data;

    const formatAmount = amount => {
        const mlAmount = amount * 1000;
        return `${mlAmount} ${t('DailyInfo.ml')}`;
    };

    const formatTime = isoString => {
        const date = subHours(parseISO(isoString), 3);
        return format(date, 'hh:mm a');
    };

    return (
        <div className={css.item} id={id}>
            <svg className={css.svg_glass}>
                <use xlinkHref={`${icons}#water-glass`} />
            </svg>
            <div className={css.info}>
                <p className={css.info_ml}>{formatAmount(amount)}</p>
                <p className={css.info_time}>{formatTime(date)}</p>
            </div>
            <div className={css.btns}>
                <button
                    className={css.btn}
                    onClick={() => {
                        openModal(
                            <WaterForm
                                operationType={'edit'}
                                recordId={id}
                                initialData={{ amount, date }}
                            />,
                        );
                    }}
                >
                    <svg className={css.svg_edit}>
                        <use xlinkHref={`${icons}#edit`} />
                    </svg>
                </button>
                <button
                    className={css.btn}
                    onClick={() => {
                        openModal(<DeleteWater onDelete={id} />);
                    }}
                >
                    <svg className={css.svg_trash}>
                        <use xlinkHref={`${icons}#trash`} />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default WaterItem;
