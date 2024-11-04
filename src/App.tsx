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
import HomeHeroImageComponent from "./components/HomeHeroImageComponent";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Settings from "./pages/account-settings/Settings";

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
import AdminProducts from "./pages/adminProducts/AdminProducts";
import AdminProductBuilder from "./pages/adminProductBuilder/AdminProductBuilder";
import ProductBuilderSelectionItemsTable
    from "./pages/productBuilderSelectionItemsTable/ProductBuilderSelectionItemsTable";
import {PCComponentsProvider} from "./context/PCComponentsContext";
import AdminProductsItemDetails from "./pages/adminProductsItemDetails/AdminProductsItemDetails";
import Home from "./pages/home/Home";
import PcStore from "./pages/pc-store/PcStore";
import {CartProvider} from "./context/CartContext";
import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import AdminOrders from "./pages/admin-orders/AdminOrders";
import OrdersDetailsPage from "./pages/admin-orders-order-details/OrdersDetailsPage";
import AccountSettings from "./pages/account-settings/AccountSettings";
import AccountOrders from "./pages/account-settings/AccountOrders";

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

                <Route
                    path="admin-products"
                    element={
                        <ProtectedRoute>
                            <AdminProducts />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="admin-products/product-builder"
                    element={
                        <ProtectedRoute>
                            <AdminProductBuilder />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="admin-products/product-builder/select/:componentType"
                    element={
                        <ProtectedRoute>
                            <ProductBuilderSelectionItemsTable />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="admin-products/product-details/:id"
                    element={
                        <ProtectedRoute>
                            <AdminProductsItemDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="admin-orders"
                    element={
                        <ProtectedRoute>
                            <AdminOrders />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="admin-orders/order-details/:id"
                    element={
                        <ProtectedRoute>
                            <OrdersDetailsPage />
                        </ProtectedRoute>
                    }
                />

                <Route path="/" element={<Rootlayout/>}>
                    <Route index element={<Home />}/>
                    <Route path="pc-store" element={<PcStore />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route path="login" element={ state.user ? <Navigate to="/settings" replace /> : <Login/> }/>
                    <Route path="signup" element={ state.user ? <Navigate to="/settings" replace /> : <Signup/> }/>
                    <Route
                        path="settings"
                        element={
                        <ValidateClient>
                            <Settings />
                        </ValidateClient>
                        }
                    >
                        <Route index element={<Navigate to="/settings/account-settings" replace />} />
                        <Route path="account-settings" element={<AccountSettings />} />
                        <Route path="account-orders" element={<AccountOrders />} />
                    </Route>
                </Route>
            </>
        )
    )

    return (
        <PCComponentsProvider>
            <CartProvider>
                <div className="App">
                    { state.authIsReady ? <RouterProvider router={router} /> : <div>Loading...</div> }
                </div>
            </CartProvider>
        </PCComponentsProvider>
    );
}

export default App;
