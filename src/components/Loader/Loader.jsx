// import getRandomColor from '../../services/getRandomColor';
import CSS from './Loader.module.css';
// import { Triangle } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className={CSS.loader}>
            <span class="loader"></span>
            {/* <Triangle
                visible={true}
                height="80"
                width="80"
                color={getRandomColor()}
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
            /> */}
        </div>
    );
};

export default Loader;
