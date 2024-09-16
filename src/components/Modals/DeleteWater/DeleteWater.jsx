import { useTranslation } from 'react-i18next';
import { useContext } from '../../../context/useContext.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate } from '../../../redux/water/selectors.js';

const DeleteWater = ({ onDelete }) => {
    const { t } = useTranslation();
    const { closeModal } = useContext();
    const dispatch = useDispatch();
    const selectedDate = useSelector(selectDate);

    return <div>DeleteWater</div>;
};

export default DeleteWater;
