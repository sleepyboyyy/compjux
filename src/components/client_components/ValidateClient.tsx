import {useContext, useEffect} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

function ValidateClient({ children }: { children:JSX.Element }) {
    const { state } = useContext(AuthContext);
    const navigate = useNavigate();



    return (children);
}

export default ValidateClient;