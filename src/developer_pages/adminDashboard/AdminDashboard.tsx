import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";

function AdminDashboard() {
    const { signOut, currentUser } = useContext(AuthContext);

    // Handlers
    // handleLogout
    const handleLogout = () => {
        signOut();
    }

    return (
        <div>
            <h2>Welcome {currentUser?.displayName}</h2>
            <button onClick={handleLogout} className="btn btn-dark">Logout</button>
        </div>
    );
}

export default AdminDashboard;