// styles
import './ClientDashboard.css'

// hooks
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {useSignOut} from "../../hooks/useSignOut";

function ClientDashboard() {
    // destructured components
    // current user context
    const { state} = useContext(AuthContext);
    const { signUserOut } = useSignOut();

    // Handlers
    // Handle Signout Click
    const handleSignoutClick = async () => {
        await signUserOut();
    }

    return (
        <div>
            <h1>Dashboard of user {state.user?.displayName}</h1>
            <button className="btn btn-dark" onClick={handleSignoutClick}>Sign Out</button>
        </div>
    );
}

export default ClientDashboard;