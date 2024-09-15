import { Helmet } from 'react-helmet-async';
import Home from './../../components/Home/Hame';//<= Гена тут разва не та (Hame.jsx!!) 

const HomePage = () => {
    return (
        <>
        <Helmet>
                <title>HomePage</title>
            </Helmet>
            <Home/>
        </>
    );
};

export default HomePage;
