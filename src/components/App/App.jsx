import { Route, Routes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from '../ShareComponents/Layout/Layout';

import { lazy, Suspense, useEffect } from 'react';
import Loader from '../Loader/Loader.jsx';
import { RestrictedRoute } from '../RestrictedRoute.jsx';
import { PrivateRoute } from '../PrivateRoute.jsx';
const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));

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
{/*                     <Route
                        path="/register"
                        element={
                            <RestrictedRoute
                                redirectTo="/water"
                                component={<SignupPage />}
                            />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <RestrictedRoute
                                redirectTo="/water"
                                component={<SigninPage />}
                            />
                        }
                    />
                    <Route
                        path="/water"
                        element={
                            <PrivateRoute
                                redirectTo="/login"
                                component={<HomePage />}
                            />
                        }
                    /> */}
                </Routes>
            </Suspense>
        </>
    );
};

export default App;
