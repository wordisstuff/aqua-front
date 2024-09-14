import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Loader from '../../Loader/Loader';

const Layout = () => {
    return (
        <>
            <Suspense fallback={<Loader />}>
                <main>
                    <Outlet />
                </main>
            </Suspense>
            <Toaster reverseOrder={true} position="top" />
        </>
    );
};

export default Layout;
