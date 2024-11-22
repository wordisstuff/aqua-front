import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { currentUser, googleLogin } from '../../redux/auth/operation';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../helpers/useHooks/useAuth';
import Loader from '../Loader/Loader';

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    console.log(code);
    console.log('GoogleAuth');
    useEffect(() => {
        if (code) {
            dispatch(googleLogin(code));
            // dispatch(currentUser())
        }
    }, [dispatch]);
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/water');
        }
    }, [isLoggedIn, navigate]);
    return <Loader />;
};

export default GoogleAuth;
