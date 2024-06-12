import {FormEvent, useContext, useEffect, useRef, useState} from "react";
import {useSignIn} from "../../hooks/useSignIn";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useDocument} from "../../hooks/useDocument";


function AdministratorLogin() {
    //const { state } = useContext(AuthContext);
    //

    // State Management
    const [devEmail, setDevEmail] = useState("");
    const [devPassword, setDevPassword] = useState("");

    // Destructure login
    const { signUserIn } = useSignIn();

    // Event Handlers
    // submit handler
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signUserIn(devEmail, devPassword);
    }

    return (
        <div className="container-fluid w-100 vh-100 d-flex justify-content-center align-items-center">
            <h2 className="me-5">Administrator Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="devEmail" className="form-label">Admin E-Mail</label>
                    <input
                        type="email"
                        className="form-control"
                        id="devEmail"
                        aria-describedby="emailHelp"
                        onChange={(e) => setDevEmail(e.target.value)}
                        value={devEmail}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="devPassword" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="devPassword"
                        onChange={(e) => setDevPassword(e.target.value)}
                        value={devPassword}
                    />
                </div>
                <button className="btn btn-dark">Submit</button>
            </form>
        </div>
    );
}

export default AdministratorLogin;