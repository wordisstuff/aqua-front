import clsx from 'clsx';
import CSS from './Container.module.css';

const Container = ({ className, children }) => {
    return (
        <div className={clsx(CSS.container, className && className)}>
            {children}
        </div>
    );
};

export default Container;
