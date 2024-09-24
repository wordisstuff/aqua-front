import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import css from './AddWaterDetailInfoBtn.module.css';
import Context from '../../../../context/Context';
import { icons } from '../../../../utils/icons';
import WaterModal from '../../../Modals/WaterModal/WaterModal';

const AddWaterDetailInfoBtn = () => {
    const { openModal } = useContext(Context);
    const { t } = useTranslation();

    return (
        <div className={css.waterBtnWrapper}>
            <button
                className={css.waterBtn}
                onClick={() => openModal(<WaterModal operationType={'add'} />)}
            >
                <svg className={css.svgAdd}>
                    <use
                        className={css.plus}
                        xlinkHref={`${icons}#plus-add-water`}
                    />
                </svg>
                <span className={css.btnText}>
                    {t('AddWaterDetailInfoBtn.add')}
                </span>
            </button>
        </div>
    );
};

export default AddWaterDetailInfoBtn;
