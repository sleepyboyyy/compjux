import {useContext, useEffect} from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function RequiredAuth({ children }: { children:JSX.Element }) {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/administratorLogin');
        }
    }, [currentUser]);

    return (children);
}

export default RequiredAuth;