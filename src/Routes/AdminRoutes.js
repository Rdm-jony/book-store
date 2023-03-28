import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAdminToken from '../useToken/useAdminToken';

const AdminRoutes = ({ children }) => {
    const { user, loader } = useContext(AuthContext)
    const [isAdmin, adminLoader] = useAdminToken(user?.email)
    console.log(isAdmin, adminLoader)
    const location = useLocation()
    if (loader || adminLoader) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="../signIn" state={{ from: location }} replace></Navigate>
};

export default AdminRoutes;