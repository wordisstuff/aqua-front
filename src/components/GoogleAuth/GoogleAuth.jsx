import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../../redux/auth/operation';
import { useParams } from 'react-router-dom';

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const { code } = useParams();
    console.log(code);
    useEffect(() => {
        dispatch(googleLogin(code));
    }, []);
    return <div>GoogleAuth</div>;
};

export default GoogleAuth;
