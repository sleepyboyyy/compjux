import React from 'react';
import {useAuthContext} from "../../hooks/useAuthContext";
import {useValidate} from "../../hooks/useValidate";
import {Navigate} from "react-router-dom";

function AdminLoginProtection({ children } : { children:JSX.Element }) {
    const { state } = useAuthContext();
    const { document, isLoading } = useValidate('users', state.user?.uid);

    if (state.user) {
        if (isLoading) {
            return (<div>Loading...</div>);
        }

        if (document) {
            if (document.role === "admin") {
                return (<Navigate to="/adminDashboard" replace />);
            } else {
                return (<Navigate to="/" replace />);
            }
        }
    }

    return (children);
}

export default AdminLoginProtection;