import { Modal } from '@mui/material';
import WaterForm from '../../WaterForm/WaterForm';
import CSS from './WaterModal.module.css';
import { useTranslation } from 'react-i18next';

const WaterModal = ({ operationType, recordId, initialData }) => {
    console.log('Modal');
    const { t } = useTranslation();
    const title =
        operationType === 'add'
            ? t('modals.addEdit.add')
            : t('modals.addEdit.edit');
    const subTitle =
        operationType === 'edit'
            ? t('modals.addEdit.choose')
            : t('modals.addEdit.correct');
    return (
        <div className={CSS.modalWater}>
            <h2 className={CSS.titleWaterModal}>{title}</h2>
            <p className={CSS.subTitleWaterModal}>{subTitle}</p>
            <WaterForm
                operationType={operationType}
                waterId={recordId}
                initialData={initialData}
            />
        </div>
    );
};

export default WaterModal;
