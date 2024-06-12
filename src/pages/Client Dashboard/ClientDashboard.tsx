// styles
import './ClientDashboard.css'

// hooks
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ClientDashboard() {
    // destructured components
    // current user context
    const {currentUser, signOut} = useContext(AuthContext);

    // Handlers
    // Handle Signout Click
    const handleSignoutClick = () => {
        signOut();
    }

    return (
        <div>
            <h1>Dashboard of user {currentUser?.displayName}</h1>
            <button className="btn btn-dark" onClick={handleSignoutClick}>Sign Out</button>
        </div>
    );
}

export default ClientDashboard;