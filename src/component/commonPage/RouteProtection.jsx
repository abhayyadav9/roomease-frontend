import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const RoleProtectedRoute = ({ allowedRoles }) => {
  // Correctly destructure user and loading from state.auth
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Show spinner while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
      </div>
    );
  }

  // Redirect to login if no user is authenticated
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If allowedRoles are provided, check if the user's role is permitted
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the child routes if the user is authenticated (and authorized, if roles are checked)
  return <Outlet />;
};

export default RoleProtectedRoute;
