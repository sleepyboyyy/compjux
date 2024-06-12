import './App.css';

import {
    createBrowserRouter,
    createRoutesFromElements, Navigate,
    Route,
    RouterProvider, Routes, useNavigate
} from 'react-router-dom'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// layouts
import Rootlayout from "./layouts/Rootlayout/Rootlayout";

// client pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ClientDashboard from "./pages/Client Dashboard/ClientDashboard";

// admin pages
import AdministratorLogin from "./developer_pages/administratorLogin/AdministratorLogin";
import CreateAdministrator from "./developer_pages/createAdministrator/CreateAdministrator";
import AdminDashboard from "./developer_pages/adminDashboard/AdminDashboard";

// components
import RoutedAuthProvider from "./components/developer_components/RoutedAuthProvider";
import RequiredAuth from "./components/developer_components/RequiredAuth";
import ValidateClient from "./components/client_components/ValidateClient";
import AdminStorage from "./developer_pages/adminStorage/AdminStorage";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route element={<RoutedAuthProvider />}>
                    <Route
                        path="administratorLogin"
                        element={ <AdministratorLogin /> }
                    />
                    <Route
                        path="createAdmin"
                        element={<CreateAdministrator/>}
                    />
                    <Route
                        path="adminDashboard"
                        element={
                            <RequiredAuth>
                                <AdminDashboard/>
                            </RequiredAuth>
                        }
                    />
                    <Route
                        path="admin_storage"
                        element={
                            <RequiredAuth>
                                <AdminStorage/>
                            </RequiredAuth>
                        }
                    />
                </Route>

                <Route element={<RoutedAuthProvider />}>
                    <Route path="/" element={<Rootlayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="signup" element={<Signup/>}/>
                        <Route
                            path="account_settings"
                            element={
                                <ValidateClient>
                                    <ClientDashboard />
                                </ValidateClient>
                            }
                        />
                    </Route>
                </Route>
            </>
        )
    )

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
