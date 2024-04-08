import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const isLoading = useSelector((state: RootState) => state.user.status === 'loading');
  const isInitializing = useSelector((state: RootState) => state.user.isInitializing);
  const location = useLocation();

  if (isLoading || isInitializing) {
    return <div>Loading...</div>; // Если данные о пользователе загружаются, отображается индикатор загрузки
  }

  if (!userInfo) {
    // Если userInfo отсутствует, пользователя перенаправляют на страницу входа
    return <Navigate to="/log" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
