import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useSignOut} from "../../hooks/useSignOut";

function AdminDashboard() {
    const { state } = useContext(AuthContext);
    const { signUserOut } = useSignOut();

    // Handlers
    // handleLogout
    const handleLogout = async () => {
        await signUserOut();
    }

    return (
        <div>
            <h2>Welcome {state.user?.displayName}</h2>
            <button onClick={handleLogout} className="btn btn-dark">Logout</button>
        </div>
    );
}

export default AdminDashboard;