import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';

const RestrictedRoute = ({ element, redirectTo }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    console.log(isLoggedIn);
    return isLoggedIn ? <Navigate to={redirectTo} /> : element;
};
export default RestrictedRoute;
