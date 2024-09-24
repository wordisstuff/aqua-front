import { useTranslation } from 'react-i18next';
import { useModalContext } from '../../../context/useContext.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate } from '../../../redux/water/selectors.js';
import {
    apiDeleteWater,
    apiGetWaterDay,
    // apiGetWaterMonth,
} from '../../../redux/water/operation.js';
import toast from 'react-hot-toast';
import css from './DeleteWater.module.css';

const DeleteWater = ({ idForDel }) => {
    console.log('id', idForDel);
    const { t } = useTranslation();
    const { closeModal } = useModalContext();
    const dispatch = useDispatch();
    const selectedDate = useSelector(selectDate);
    // const loading = useSelector(selectLoading);
    console.log(selectedDate);

    const handleDelete = async () => {
        try {
            dispatch(apiDeleteWater(idForDel));
            closeModal();
            toast.success(t('modals.delete.success'));
            dispatch(apiGetWaterDay(selectedDate));
        } catch (error) {
            toast.error(t('modals.delete.error'));
        }
    };

    return (
        <div className={css.deleteWaterModal}>
            <p className={css.text}>{t('modals.delete.text')}</p>
            <h2 className={css.title}>{t('modals.delete.title')}</h2>
            <div className={css.buttons}>
                <button
                    className={css.btnDelete}
                    onClick={handleDelete}
                    type="button"
                >
                    {t('modals.delete.delete')}
                </button>
                <button
                    className={css.btnCancel}
                    onClick={closeModal}
                    type="button"
                >
                    {t('modals.delete.cancel')}
                </button>
            </div>
        </div>
    );
};

export default DeleteWater;
