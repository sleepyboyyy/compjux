// styles
import './Login.css'

// hooks
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "../../hooks/useSignIn";

function Login() {
    // destructured components
    const {currentUser} = useContext(AuthContext);
    const { signUserIn } = useSignIn();

    // state & navigate
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Check to see if user exists
    useEffect(() => {
        if (currentUser) {
            navigate('/account_settings');
        }
    }, [currentUser]);

    // Event Handlers
    // Handle submit

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Sign in user using useSignIn hook
        await signUserIn(username, password);
    }

    return (
        <div className="container-fluid w-25">
            <h2 className="mb-5 mt-5">Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label ">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        aria-describedby="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <button className="btn btn-dark w-100">Submit</button>
            </form>
        </div>
    );
}

export default Login;