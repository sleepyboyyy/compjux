// styles
import './Signup.css'

// hooks
import { useContext, useEffect, useState } from "react";
import { registerData, useSignUp } from "../../hooks/useSignUp";
import { AuthContext } from "../../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";

// Client data interface
export interface ClientData {
    username: string,
    email: string,
    password: string,
    role: "client"
}

function Signup() {
    // destructured components
    //const { state } = useContext(AuthContext);
    const { signUserUp } = useSignUp();

    // state & navigate
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Event Handlers
    // Handle submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // client data objectified
        const clientData: ClientData = {
            username,
            email,
            password,
            role: "client"
        }

        // data object for sign up
        const dataObject: registerData = {
            type: "Client",
            data: clientData
        }

        await signUserUp(dataObject);
    }

    return (
        <div className="container-fluid w-25">
            <h2 className="mb-5 mt-5">Sign Up</h2>
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
                    <label htmlFor="email" className="form-label ">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
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
                <Typography variant="body2" color="textSecondary">Already have an account?
                    <Button
                        component={Link} to='/login'
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
                        Sign in
                    </Button>
                </Typography>
            </Box>
        </div>
    );
}

export default Signup;