import { Route, Routes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from '../ShareComponents/Layout/Layout';

import { lazy, Suspense, useEffect } from 'react';
import Loader from '../Loader/Loader.jsx';
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
                </Routes>
            </Suspense>
        </>
    );
};

export default App;
