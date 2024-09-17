import { Route, Routes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from '../ShareComponents/Layout/Layout';

import { lazy, Suspense, useEffect } from 'react';
import Loader from '../Loader/Loader.jsx';
import RestrictRoute from '../RestrictedRoute.jsx';
import { PrivateRoute } from '../PrivateRoute.jsx';
import VerifyEmail from '../VerifyEmail/VerifyEmail.jsx';
// import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage.jsx';
const SignUpPage = lazy(() => import('../../pages/su/SignUpPage.jsx'));
const SignInPage = lazy(() => import('../../pages/si/SignInPage.jsx'));
const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const TrackerPage = lazy(
    () => import('../../pages/TrackerPage/TrackerPage.jsx'),
);

const App = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    console.log('APPPP');
    return (
        <>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Layout />} />
                    <Route index element={<HomePage />} />
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
