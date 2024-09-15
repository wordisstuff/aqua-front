import css from './AddWaterBtn.module.css'
import myIcon from '../../utils/icons/homeScreenPage/sprite.svg'

export default function AddWaterButton({openModal}) {



    return (
        <button type='button' className={css.btnbox} onClick={openModal}>
            <svg className={css.btnicon} width={16} height={16}>
                <use className={css.btniconUse} href={`${myIcon}#icon-plus`}></use>
            </svg>
            <p className={css.btntext}>Add water</p>
        </button>
    );
} 