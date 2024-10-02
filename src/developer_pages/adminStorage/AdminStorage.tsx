import React, {useState} from 'react';
import AdminNavigation from "../../components/developer_components/AdminNavigation/AdminNavigation";
import {Navigate, useNavigate} from "react-router-dom";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import TableManipulators from "../../components/developer_components/AdminStorage_Components/TableManipulators";
import StorageTable from "../../components/developer_components/AdminStorage_Components/StorageTable";

function AdminStorage() {

    // hooks
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
                    <Box sx={{ marginTop: "32px" }}>
                        <TableManipulators  handleAddItem={handleAddItem}/>
                        <StorageTable />
                    </Box>
                </>
            </AdminNavigation>
        </div>
    );
}

export default AdminStorage;