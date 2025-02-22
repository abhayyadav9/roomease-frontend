import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const RoleProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useSelector((state) => state.auth?.user);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Uncomment below for role-based route protection
  // if (allowedRoles && !allowedRoles.includes(user.role)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return <Outlet />;
};

export default RoleProtectedRoute;



// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const ProtectedUser = ({ children }) => {
//     const { user } = useSelector((store) => store.auth);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (user === null) {
//             navigate('/login');
//         }
//     }, [user, navigate]); // Include `user` and `navigate` in the dependency array

//     // Render nothing if the user is not authenticated yet to avoid flashing content
//     if (user === null) {
//         return null; 
//     }

//     return <>{children}</>;
// };

// export default ProtectedUser;
