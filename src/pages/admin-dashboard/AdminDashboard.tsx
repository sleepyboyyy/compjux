import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useSignOut} from "../../hooks/useSignOut";
import AdminNavigation from "../../components/admin-navigation-components/AdminNavigation";

function AdminDashboard() {
    const { state } = useContext(AuthContext);
    const { signUserOut } = useSignOut();

    // Handlers
    // handleLogout
    const handleLogout = async () => {
        await signUserOut();
    }

    return (
        <AdminNavigation page="DASHBOARD">
            <button onClick={handleLogout} className="btn btn-dark mb-2">Logout</button>
        </AdminNavigation>
    );
}

export default AdminDashboard;