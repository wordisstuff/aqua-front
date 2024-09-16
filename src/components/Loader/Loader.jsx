import getRandomColor from '../../services/getRandomColor';
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
                colors = {['#ffffff', '#9BE1A0','#51B687', '#D5F0D9', '#296248']}
                // color={getRandomColor()}
            />
        </div>
    );
};

export default Loader;
