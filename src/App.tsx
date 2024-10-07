import './App.css';

import {
    createBrowserRouter,
    createRoutesFromElements, Navigate,
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
import AdministratorLogin from "./pages/administratorLogin/AdministratorLogin";
import CreateAdministrator from "./pages/createAdministrator/CreateAdministrator";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";

// components
import AdminStorage from "./pages/adminStorage/AdminStorage";


import {useAuthContext} from "./hooks/useAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLoginProtection from "./components/AdminLoginProtection";
import ValidateClient from "./components/ValidateClient";
import AdminStorageItemDetails from "./pages/adminStorageItemDetails/AdminStorageItemDetails";
import AdminStorageAddItem from "./pages/adminStorageAddItem/AdminStorageAddItem";

function App() {
    const { state } = useAuthContext();


    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path="administrator-login"
                    element={
                        <AdminLoginProtection>
                            <AdministratorLogin />
                        </AdminLoginProtection>
                    }
                />
                <Route
                    path="create-admin"
                    element={<CreateAdministrator/>}
                />
                <Route
                    path="admin-dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="admin-storage"
                    element={
                    <ProtectedRoute>
                        <AdminStorage/>
                    </ProtectedRoute>
                    }
                />

                <Route
                    path="admin-storage/item/:collection/:id"
                    element={
                        <ProtectedRoute>
                            <AdminStorageItemDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="admin-storage/addItem"
                    element={
                        <ProtectedRoute>
                            <AdminStorageAddItem />
                        </ProtectedRoute>
                    }
                />

                <Route path="/" element={<Rootlayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="login" element={ state.user ? <Navigate to="/account-settings" replace /> : <Login/> }/>
                    <Route path="signup" element={ state.user ? <Navigate to="/account-settings" replace /> : <Signup/> }/>
                    <Route
                        path="account-settings"
                        element={
                        <ValidateClient>
                            <ClientDashboard />
                        </ValidateClient>
                        }
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
