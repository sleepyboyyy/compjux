import {useContext, useEffect} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

function ValidateClient({ children }: { children:JSX.Element }) {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // If client doesn't exist, block route
    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser]);

    return (children);
}

export default ValidateClient;