import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import css from './AddWaterDetailInfoBtn.module.css';
import Context from '../../../../context/Context';
import WaterForm from '../../../WaterForm/WaterForm';
import { icons as sprite } from '../../../../utils/icons/index';

const AddWaterDetailInfoBtn = () => {
    const { openModal } = useContext(Context);
    const { t } = useTranslation;

    return (
        <div className={css.waterBtnWrapper}>
            <button
                className={css.waterBtn}
                onClick={() => openModal(<WaterForm operationType={'add'} />)}
            >
                <svg className={css.svg}>
                    <use xlinkHref={`${sprite}#plus-add-water`} />
                </svg>
            </button>
            <p className={css.btnText}>{t('waterDetailInfoBtn')}</p>
        </div>
    );
};

export default AddWaterDetailInfoBtn;
