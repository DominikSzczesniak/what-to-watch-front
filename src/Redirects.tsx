import { Navigate } from "react-router-dom";
import {UserContext} from "./AppContext";
import {useContext} from "react";

export const Redirects = () => {
    const { userId } = useContext(UserContext);

    return userId ? <Navigate to="/main" replace /> : <Navigate to="/login" replace />;
};