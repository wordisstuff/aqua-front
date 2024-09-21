import { Navigate, redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../redux/auth/selectors';
import toast from 'react-hot-toast';

export const PrivateRoute = ({ element, redirectTo }) => {
    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    if (isLoggedIn && !user.verifyByEmail) {
        toast.success('please verify your email!!!');
        return <Navigate to={'/'} />;
    }
    return isLoggedIn ? element : <Navigate to={redirectTo} />;
};
