import getRandomColor from '../../services/getRandomColor';
import CSS from './Loader.module.css';
import { Vortex } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className={CSS.loader}>
            <Vortex
                visible={true}
                height="500"
                width="550"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                color={getRandomColor()}
            />
        </div>
    );
};

export default Loader;
