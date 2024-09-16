// import getRandomColor from '../../services/getRandomColor';
import CSS from './Loader.module.css';
import { Vortex } from 'react-loader-spinner';


const Loader = () => {
    return (
        <div className={CSS.loader}>
            <Vortex
                visible={true}
                height="550"
                width="550"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />
        </div>
    );
};

export default Loader;
