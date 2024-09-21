import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import { Toaster } from 'react-hot-toast';
import Languages from '../Languages/Languages';
import Container from '../Container/Container';
import CSS from './Layout.module.css';

const Layout = () => {
    return (
        <>
            <Suspense fallback={<Loader />}>
                <header>
                    <Container className={CSS.container}>
                        <Languages />
                    </Container>
                </header>
                <main>
                    <Outlet />
                </main>
            </Suspense>
            <Toaster position="top-right" reverseOrder={true} />
        </>
    );
};

export default Layout;
