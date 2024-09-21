import { useEffect } from 'react';
import Loader from '../Loader/Loader';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../helpers/useHooks/useAuth';
import { setToken } from '../../redux/auth/slice';
import { currentUser } from '../../redux/auth/operation';

const VerifyEmail = () => {
    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    console.log('TOKEN', token);
    console.log(isLoggedIn);
    useEffect(() => {
        if (token) {
            dispatch(setToken({ token }));
            // dispatch(currentUser());
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/water');
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            <Loader />
        </>
    );
};

export default VerifyEmail;
