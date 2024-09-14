import { Helmet } from 'react-helmet';
import Home from '../../components/Home/Home';

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
