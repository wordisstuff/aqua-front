import { Helmet } from 'react-helmet-async';
import Home from './../../components/Home/Home.jsx';
const HomePage = () => {
    return (
        <>
            <Helmet>
                <title>AquaTrack</title>
            </Helmet>
            <Home />
        </>
    );
};

export default HomePage;
