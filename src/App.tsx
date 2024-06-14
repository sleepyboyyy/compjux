import './App.css';

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
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
import AdminStorage from "./developer_pages/adminStorage/AdminStorage";


import {useAuthContext} from "./hooks/useAuthContext";
import ProtectedRoute from "./components/developer_components/ProtectedRoute";

function App() {
    const { state } = useAuthContext();


    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                    {/*TODO: create "admin only" protected wrapper component*/}
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
                            <ProtectedRoute>
                                <AdminDashboard/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="admin_storage"
                        element={ <AdminStorage/> }
                    />

                    <Route path="/" element={<Rootlayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="signup" element={<Signup/>}/>
                        <Route
                            path="account_settings"
                            element={ <ClientDashboard /> }
                        />
                    </Route>

            </>
        )
    )

    return (
        <div className="App">
            { state.authIsReady ? <RouterProvider router={router} /> : <div>Loading...</div> }
        </div>
    );
}

export default App;
