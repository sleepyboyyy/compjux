// styles
import './Login.css'

// hooks
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useSignIn } from "../../hooks/useSignIn";
import {Box, Button, Typography} from "@mui/material";

function Login() {
    // destructured components
    //const {state} = useContext(AuthContext);
    const { signUserIn } = useSignIn();
    const navigate = useNavigate();

    // state & navigate
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Event Handlers
    // Handle submit

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Sign in user using useSignIn hook
        await signUserIn(username, password);
        navigate('/');
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
            <Box sx={{mt: 2}}>
                <Typography variant="body2" color="textSecondary">Don't have an account?
                    <Button
                        component={Link} to='/signup'
                        variant="text"
                        sx={{
                            ml: 1,
                            textDecoration: 'underline',
                            color: 'var(--primary-color)',
                            '&:hover': {
                                backgroundColor: '#F7EFEF',
                                textDecoration: 'underline',
                                color: '#7C1615',
                            }
                        }}
                    >
                        Create an account
                    </Button>
                </Typography>
            </Box>
        </div>
    );
}

export default Login;