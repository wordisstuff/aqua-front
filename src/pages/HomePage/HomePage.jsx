
import { Helmet } from 'react-helmet-async';
import Home from './../../components/Home/Home';//<= Гена тут разва не та в компоненті з якого імпорт був (Hame.jsx!!) 
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
