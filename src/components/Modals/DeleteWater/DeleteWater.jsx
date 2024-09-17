import { useTranslation } from 'react-i18next';
import { useModalContext } from '../../../context/useContext.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate, selectMonth } from '../../../redux/water/selectors.js';
import {
    apiDeleteWater,
    apiGetWaterDay,
    apiGetWaterMonth,
} from '../../../redux/water/operation.js';
import toast from 'react-hot-toast';
import css from './DeleteWater.module.css';

const DeleteWater = ({ onDelete }) => {
    const { t } = useTranslation();
    const { closeModal } = useModalContext();
    const dispatch = useDispatch();
    const selectedDate = useSelector(selectDate);
    const currentMonth = useSelector(selectMonth);

    const handleDelete = async () => {
        try {
            await dispatch(apiDeleteWater(onDelete));
            closeModal();
            toast.success(t('modals.delete.success'));

            dispatch(apiGetWaterDay(selectedDate));

            if (
                Number(selectedDate.split('-')[0]) === currentMonth.year &&
                Number(selectedDate.split('-')[1]) === currentMonth.month
            ) {
                dispatch(apiGetWaterMonth(currentMonth));
            }
        } catch (error) {
            toast.error(t('modals.delete.error'));
        }
    };

    return (
        <div className={css.deleteWaterModal}>
            <h2 className={css.title}>{t('modals.delete.title')}</h2>
            <p className={css.text}>{t('modals.delete.text')}</p>
            <div className={css.buttons}>
                <button
                    className={css.btnDelete}
                    onClick={handleDelete}
                    type="button"
                >
                    {t('modals.delete.cancel')}
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
