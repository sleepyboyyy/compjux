import { useContext, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import {Navigate, Outlet, Route, useNavigate} from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";

// Todo: create "admin only" protected wrapper component

function ProtectedRoute({children}: { children:JSX.Element ; }) {
    const { state } = useContext(AuthContext);
    const { document } = useDocument('users', state.user?.uid);
    const navigate = useNavigate();

    useEffect(() => {
        if (state.user) {
            if (document) {
                if (document.role !== "admin") {
                    navigate("/");
                    return;
                }
            }
        }
    }, [state.user, document])

    return (children);
}

export default ProtectedRoute;