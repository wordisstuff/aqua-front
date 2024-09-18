import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, subHours } from 'date-fns';
import Loader from '../../components/Loader/Loader';
import { useTranslation } from 'react-i18next';
<<<<<<< HEAD
import { Context } from '../../context/Context';
import { icons as sprite } from '../../utils/icons/sprite';
=======
import { icons } from '../../utils/icons';
>>>>>>> f96dd8b9e8400401e29c8aa7ab17e29eb384c005
import { waterSchema } from './WaterSchema';
import style from './WaterForm.module.css';
import toast from 'react-hot-toast';

<<<<<<< HEAD
import {
    addWater,
    updateWaterAmount,
    apiGetWaterMonth,
    apiGetWaterDay,
} from '../../redux/water/operation'; 
import {
    selectDate,
    selectMonth,
} from '../../redux/water/selectors'; 
import {
    selectLoading
} from '../../redux/global/selectors';
=======
import { addWater } from '../../redux/water/operation'; // operation.js - добавить импорт фаилов
import { selectDate } from '../../redux/water/selectors'; // selectors.js - добавить импорт фаилов
import { useModalContext } from '../../context/useContext';
>>>>>>> f96dd8b9e8400401e29c8aa7ab17e29eb384c005

const WaterForm = ({ operationType, waterId, initialData }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { closeModal } = useModalContext();
    const loading = useSelector(selectLoading);
    const selectedDate = useSelector(selectDate);
    const currentMonth = useSelector(selectMonth);

    const defaultTime = () => {
        const currentTime = new Date();
        const hours = String(currentTime.getHours()).padStart(2, '0');
        const minutes = String(currentTime.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const formatTime = isoString => {
        const date = subHours(parseISO(isoString), 3);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };
    //********************************************************************************/
    const {
        handleSubmit,
        formState: { errors, isValid },
        getValues,
        setValue,
        register,
    } = useForm({
        resolver: yupResolver(waterSchema),
        defaultValues: {
            waterAmount: initialData ? initialData.amount * 1000 : 50,
            time:
                operationType === 'edit' && initialData
                    ? formatTime(initialData.date)
                    : defaultTime(),
            keyboardAmount: initialData ? initialData.amount * 1000 : 50,
        },
    });

    //********************************************************************************/

    const mlToDecimal = ml => {
        return parseFloat((ml / 1000).toFixed(3));
    };

    //********************************************************************************/

    const onSubmit = async data => {
        try {
            await waterSchema.validate(data, { abortEarly: false });

            const [hours, minutes] = data.time.split(':');
            const fullDateTime = `${selectedDate}T${hours}:${minutes}:00.000Z`;

            const newEntry = {
                amount: mlToDecimal(data.waterAmount),
                date: new Date(fullDateTime).toISOString(),
            };

            if (operationType === 'add') {
                dispatch(addWater(newEntry));
                closeModal();
                toast.success(t('modals.addEdit.successAdd'));
            } else if (operationType === 'edit' && waterId) {
                dispatch(
                    updateWaterAmount({
                        id: waterId,
                        amount: mlToDecimal(data.waterAmount),
                        date: new Date(fullDateTime).toISOString(),
                    }),
                );
                closeModal();
                toast.success(t('modals.addEdit.successEdit'));
            }

            dispatch(apiGetWaterDay(selectedDate));

            if (
                Number(selectedDate.split('-')[0]) === currentMonth.year &&
                Number(selectedDate.split('-')[1]) === currentMonth.month
            ) {
                dispatch(apiGetWaterMonth(currentMonth));
            }
        } catch (error) {
            toast.error(t('modals.addEdit.error'));
        }
    };

    //********************************************************************************/

    const handleWaterChange = newValue => {
        setValue('waterAmount', newValue);
        setValue('keyboardAmount', newValue);
    };

    //********************************************************************************/

    const incrementWater = () => {
        const currentAmount = Number(getValues('waterAmount'));
        const newValue = currentAmount + 50;
        if (newValue <= 500) {
            handleWaterChange(newValue);
            setValue('waterAmount', newValue);
        }
    };

    //********************************************************************************/

    const decrementWater = () => {
        const currentAmount = Number(getValues('waterAmount'));
        if (currentAmount >= 50) {
            const newValue = currentAmount - 50;
            handleWaterChange(newValue);
            setValue('waterAmount', newValue);
        }
    };

    //********************************************************************************/

    const handleKeyboardAmountChange = e => {
        const newValue = Number(e.target.value);
        if (e.target.value.length <= 3 && newValue >= 0 && newValue <= 500) {
            handleWaterChange(newValue);
        }
    };

    //********************************************************************************/

    // html макет для Формы

    return (
        <div>
            {loading && <Loader />}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.addWaterForm}>
                    <label className={style.itemWaterForm}>
                        <span className={style.spanFormWater}>
                            {t('modals.addEdit.amount')}
                        </span>
                        <div className={style.waterAmountInputContainer}>
                            <div className={style.btnWater}>
                                <svg
                                    className={style.iconOperator}
                                    onClick={decrementWater}
                                >
                                    <use
                                        className={style.icon}
                                        xlinkHref={`${icons}#minus`}
                                    />
                                </svg>
                            </div>
                            <div className={style.wrapperInput}>
                                <input
                                    className={style.inputAddWater}
                                    type="number"
                                    {...register('waterAmount', {
                                        required: true,
                                    })}
                                    value={getValues('waterAmount')}
                                    readOnly
                                />
                            </div>
                            <div className={style.btnWater}>
                                <svg
                                    className={style.iconOperator}
                                    onClick={incrementWater}
                                >
                                    <use
                                        className={style.icon}
                                        xlinkHref={`${icons}#plus`}
                                    />
                                </svg>
                            </div>
                        </div>
                    </label>
                    <p>{errors.waterAmount?.message}</p>
                </div>

                <div className={style.timeWaterForm}>
                    <label>
                        <span className={style.spanFormWater}>
                            {t('modals.addEdit.time')}
                        </span>
                        <input
                            className={style.inputWaterForm}
                            type="time"
                            {...register('time', { required: true })}
                            defaultValue={defaultTime()}
                            onChange={e => setValue('time', e.target.value)}
                        />
                    </label>
                    <p>{errors.time?.message}</p>
                </div>

                <div className={style.enterWaterForm}>
                    <label>
                        <span className={style.spanFormWater}>
                            {t('modals.addEdit.value')}
                        </span>
                        <input
                            className={style.inputWaterForm}
                            type="number"
                            {...register('keyboardAmount', { required: true })}
                            onChange={handleKeyboardAmountChange}
                        />
                    </label>
                    <p>{errors.keyboardAmount?.message}</p>
                </div>
                <button
                    className={style.btnWaterForm}
                    type="submit"
                    disabled={!isValid}
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default WaterForm;
