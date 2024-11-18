import { Route, Routes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from '../ShareComponents/Layout/Layout';
import { Toaster } from 'react-hot-toast';

import { lazy, Suspense, useEffect } from 'react';
import Loader from '../Loader/Loader.jsx';
import RestrictRoute from '../RestrictedRoute.jsx';
import { PrivateRoute } from '../PrivateRoute.jsx';
import VerifyEmail from '../VerifyEmail/VerifyEmail.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../redux/auth/operation.js';
import { selectIsRefreshing } from '../../redux/auth/selectors.js';
import GoogleAuth from '../GoogleAuth/GoogleAuth.jsx';
// import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage.jsx';
const ForgotPage = lazy(() => import('../../pages/ForgotPage/ForgotPage.jsx'));
const SignUpPage = lazy(() => import('../../pages/SignUpPage/SignUpPage.jsx'));
const SignInPage = lazy(() => import('../../pages/SignInPage/SignInPage.jsx'));
const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const TrackerPage = lazy(
    () => import('../../pages/TrackerPage/TrackerPage.jsx'),
);

const App = () => {
    const isRefreshing = useSelector(selectIsRefreshing);
    const dispatch = useDispatch();
    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        dispatch(currentUser());
    }, [dispatch]);
    if (isRefreshing) return null;
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route
                        path="/forgotPassword"
                        element={
                            <RestrictRoute
                                redirectTo="/water"
                                element={<ForgotPage />}
                            />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <RestrictRoute
                                redirectTo="/water"
                                element={<SignUpPage />}
                            />
                        }
                    />
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
                    <Route path="/google/:code" element={<GoogleAuth />} />
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
                </Route>
            </Routes>
        </>
    );
};

export default App;
