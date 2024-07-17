import React from 'react';
import AdminNavigation from "../../components/developer_components/AdminNavigation/AdminNavigation";
import {Navigate, useNavigate} from "react-router-dom";

function AdminStorage() {
    const navigate = useNavigate();
    // handlers
    // add item handler
    const handleAddItem = () => {
        navigate("addItem");
    }

    return (
        <div>
            <AdminNavigation page="STORAGE">
                <>
                    <button className="btn btn-dark" onClick={handleAddItem}>Add Item</button>
                </>
            </AdminNavigation>
        </div>
    );
}

export default AdminStorage;