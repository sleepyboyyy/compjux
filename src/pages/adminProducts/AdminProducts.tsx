import React from 'react';
import AdminNavigation from "../../components/AdminNavigation";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

function AdminProducts() {
    const navigate = useNavigate();

    return (
        <AdminNavigation page="PRODUCTS">
            <>
                <h1>Products</h1>
                <Button onClick={() => navigate("product-builder")}>Build a product</Button>
            </>
        </AdminNavigation>
    );
}

export default AdminProducts;