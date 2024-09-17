import css from './AddWaterBtn.module.css';
import { icons } from '../../../utils/icons';

export default function AddWaterButton({ openModal }) {
    return (
        <button type="button" className={css.btnbox} onClick={openModal}>
            <svg className={css.btnicon} width={16} height={16}>
                <use
                    className={css.btniconUse}
                    href={`${icons}#icon-plus`}
                ></use>
            </svg>
            <p className={css.btntext}>Add water</p>
        </button>
    );
}
