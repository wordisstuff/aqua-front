import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../../redux/auth/operation';
import { useLocation, useParams } from 'react-router-dom';

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    console.log(code);
    console.log('GoogleAuth');
    useEffect(() => {
        dispatch(googleLogin(code));
    }, [dispatch]);
    return <div>GoogleAuth</div>;
};

export default GoogleAuth;
