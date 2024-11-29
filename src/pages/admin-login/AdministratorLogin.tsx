import {FormEvent, useState} from "react";
import {useSignIn} from "../../hooks/useSignIn";
import {IconButton, Tooltip} from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


function AdministratorLogin() {
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
            <h2 className="me-2">Administrator Login</h2>
            <Tooltip
                title={
                    <div>
                        <p>Email: <strong>test@dev.test</strong></p>
                        <p>Pass: <strong>test123</strong></p>
                    </div>
                }
                arrow
            >
                <IconButton>
                    <InfoOutlinedIcon style={{ color: "var(--primary-color)" }} />
                </IconButton>
            </Tooltip>
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