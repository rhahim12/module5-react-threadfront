import { Children } from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    let auth = !!localStorage.getItem("prénom")
    return(
        auth ? <Outlet/> : <Navigate to="/login"/>

    )

}
export default PrivateRoutes