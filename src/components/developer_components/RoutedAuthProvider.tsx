import React from 'react';
import {Outlet} from "react-router-dom";
import {AuthProvider} from "../../context/AuthContext";

function RoutedAuthProvider() {
    return (
        <AuthProvider>
            <Outlet/>
        </AuthProvider>
    );
}

export default RoutedAuthProvider;