import Container from '../ShareComponents/Container/Container';
import Additional from './Additional';
import CSS from './Home.module.css';
import Welcome from './Welcome';

const Home = () => {
    console.log('GGGGGGGG');
    return (
        <>
            <Container>
                <div className={CSS.wrapSt}>
                    <div className={CSS.wrapHome}>
                        <Welcome />
                        <Additional />
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Home;
