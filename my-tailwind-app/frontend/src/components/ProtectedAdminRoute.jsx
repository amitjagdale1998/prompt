import { Navigate, useLocation } from 'react-router-dom';
import { Alert, Spin } from 'antd';
import { useAuth } from '../context/AuthContext';

export default function ProtectedAdminRoute({ children }) {
  const { user, authReady } = useAuth();
  const location = useLocation();

  if (!authReady) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (user.role !== 'admin') {
    return (
      <div className="mx-auto max-w-xl">
        <Alert
          type="error"
          showIcon
          message="Admin access only"
          description="Your account does not have admin privileges."
        />
      </div>
    );
  }

  return children;
}
