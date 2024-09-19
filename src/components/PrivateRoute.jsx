import { Navigate, redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';

export const PrivateRoute = ({ element, redirectTo }) => {
    // const isLoggedIn = useSelector(selectIsLoggedIn);
    const isLoggedIn = true;
    return isLoggedIn ? element : <Navigate to={redirectTo} />;
};
