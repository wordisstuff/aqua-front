import { NavLink } from 'react-router-dom';
import CSS from './Logo.module.css';

const Logo = ({ className }) => {
    return (
        <>
            <NavLink to="/" className={`${CSS.logo} ${className}`}>
                AquaTrack
            </NavLink>
        </>
    );
};

export default Logo;
