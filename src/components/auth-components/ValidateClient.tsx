import { useContext } from 'react';
import { AuthContext} from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

function ValidateClient({ children }: { children:JSX.Element }) {
    const { state } = useContext(AuthContext);

    return state.user ? children : <Navigate to="/login" replace />;
}

export default ValidateClient;