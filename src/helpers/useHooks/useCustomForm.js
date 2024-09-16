import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const useCustomForm = (value, schema) => {
    return useForm({
        defaultValues: value,
        resolver: yupResolver(schema),
        mode: 'onTouched',
    });
};

export default useCustomForm;
