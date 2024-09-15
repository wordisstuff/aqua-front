import getRandomColor from '../../services/getRandomColor';
import CSS from './Loader.module.css';
import { Vortex } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className={CSS.loader}>
            <Vortex
                visible={true}
                height="500"
                width="500"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                color={getRandomColor()}
                // colors ={['#F0EFF4', '#9BE1A0', '#B5B4BF']}
            />
        </div>
    );
};

export default Loader;
