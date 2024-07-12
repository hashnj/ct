import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import auth from "../hooks/auth";

export const RequireAuth = ({ allowedRoles }) => {
    const nav=useNavigate();
    try{
    const isAuthenticated = auth();
    // const location = useLocation();
    console.log(isAuthenticated.role);
    const hasRequiredRole = isAuthenticated?.role?.some(role => allowedRoles?.includes(role));

    if (hasRequiredRole) {
        return <Outlet />;
    } else if (isAuthenticated) {
        return <Navigate to="/unauthorized" state={{ from: nav(-1) }} replace />;
    } else {
        return <Navigate to="/auth/login" state={{ from: nav(-1) }} replace />;
    }
}
catch(e){
    console.log(e);
    // location.reload();
}

};
