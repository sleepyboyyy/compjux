// React
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

// Styles
import './CreateAdministrator.css'
import {registerData, useSignUp} from "../../hooks/useSignUp";

export interface AdminData {
    firstName: string,
    lastName: string,
    embg: string,
    email: string,
    password: string,
    role: string
}

function CreateAdministrator() {
    // State Management
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [embg, setEmbg] = useState("");
    const [devEmail, setDevEmail] = useState("");
    const [devPassword, setDevPassword] = useState("");
    const [devConfirmPassword, setDevConfirmPassword] = useState("");
    const navigate = useNavigate();

    // Destructure useSignup
    const { signUserUp } = useSignUp();

    // Handlers
    // handleSubmit
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Create Admin Type object
        const adminData: AdminData  = {
            firstName,
            lastName,
            embg,
            email: devEmail,
            password: devPassword,
            role: "admin"
        }

        // Create Signup type object
        const dataObject: registerData = {
            type: "Admin",
            data: adminData
        }

        // Signup user
        await signUserUp(dataObject);

        // Redirect to admin login
        navigate("/administrator-login");
    }


    return (
        <div className="container-fluid w-100 vh-100 d-flex justify-content-center align-items-center">
            <h2 className="me-5">Create an Admin</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        aria-describedby="firstName"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        aria-describedby="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="embg" className="form-label">EMBG</label>
                    <input
                        type="text"
                        className="form-control"
                        id="embg"
                        aria-describedby="embg"
                        onChange={(e) => setEmbg(e.target.value)}
                        value={embg}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="devEmail" className="form-label">E-Mail</label>
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
                <div className="mb-3">
                    <label htmlFor="devConfirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="devConfirmPassword"
                        onChange={(e) => setDevConfirmPassword(e.target.value)}
                        value={devConfirmPassword}
                    />
                </div>
                <button className="btn btn-dark w-100">Submit</button>
            </form>
        </div>
    );
}

export default CreateAdministrator;