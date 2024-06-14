import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";

function ProtectedRoute({children}: { children:JSX.Element ; }) {
    const { state } = useContext(AuthContext);
    const { document, isLoading } = useDocument('users', state.user?.uid)

    if (state.user) {
        // Wait for document to load
        if (isLoading) {
            return (<div>Loading...</div>);
        }

        // Navigate depending on role logic
        if (document) {
            if (document.role === "admin") {
                return children;
            } else {
                return <Navigate to="/" replace />;
            }
        } else {
            return <Navigate to="/" replace />;
        }
    }

    // If user doesn't exist go to homepage
    return <Navigate to="/" replace />;
}

export default ProtectedRoute;