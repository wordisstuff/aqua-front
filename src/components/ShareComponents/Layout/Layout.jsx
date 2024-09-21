import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
    return (
        <>
            <Suspense fallback={<Loader />}>
                <main>
                    <Outlet />
                </main>
            </Suspense>
        </>
    );
};

export default Layout;
