import { Route, Routes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from '../ShareComponents/Layout/Layout';

import { lazy, Suspense, useEffect } from 'react';
import Loader from '../Loader/Loader.jsx';
import RestrictRoute from '../RestrictedRoute.jsx';
import { PrivateRoute } from '../PrivateRoute.jsx';
import VerifyEmail from '../VerifyEmail/VerifyEmail.jsx';
import { useDispatch } from 'react-redux';
import { currentUser } from '../../redux/users/operation.js';
// import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage.jsx';
const ForgotPage = lazy(() => import('../../pages/ForgotPage/ForgotPage.jsx'));
const SignUpPage = lazy(() => import('../../pages/SignUpPage/SignUpPage.jsx'));
const SignInPage = lazy(() => import('../../pages/SignInPage/SignInPage.jsx'));
const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const TrackerPage = lazy(
    () => import('../../pages/TrackerPage/TrackerPage.jsx'),
);

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        AOS.init();
    }, []);
    console.log('APPPP');

    useEffect(() => {
        dispatch(currentUser());
    }, [dispatch]);

    return (
        <>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Layout />} />
                    <Route index element={<HomePage />} />
                    <Route path="/forgotPassword" element={<ForgotPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route
                        path="/signin"
                        element={
                            <RestrictRoute
                                redirectTo="/water"
                                element={<SignInPage />}
                            />
                        }
                    />
                    <Route path="/verify/:token" element={<VerifyEmail />} />
                    <Route
                        path="/water"
                        element={
                            <PrivateRoute
                                redirectTo="/signin"
                                element={<TrackerPage />}
                            />
                        }
                    />{' '}
                    {/* <Route path="*" element={<NotFoundPage />} /> */}
                </Routes>
            </Suspense>
        </>
    );
};

export default App;
