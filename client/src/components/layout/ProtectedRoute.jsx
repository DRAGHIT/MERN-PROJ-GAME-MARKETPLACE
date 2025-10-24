import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Spinner from '../common/Spinner';

const ProtectedRoute = ({ children }) => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner fullScreen />;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
