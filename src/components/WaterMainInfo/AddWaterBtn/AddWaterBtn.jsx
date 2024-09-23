import css from './AddWaterBtn.module.css';
import { icons } from '../../../utils/icons';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Context from '../../../context/Context';
import WaterForm from '../../WaterForm/WaterForm';



const AddWaterDetailInfoBtn = () => {
    const { openModal } = useContext(Context);
    const { t } = useTranslation();


    return (
        <button type="button" className={css.btnbox}
            onClick={() => openModal(<WaterForm operationType={'add'} />)}>
            
            <svg className={css.btnicon} width={16} height={16}>
                <use
                    className={css.btniconUse}
                    href={`${icons}#plus-add-water`}
                ></use>
            </svg>
            <p className={css.btntext}>Add water</p>
        </button>
    );
}


export default AddWaterDetailInfoBtn;