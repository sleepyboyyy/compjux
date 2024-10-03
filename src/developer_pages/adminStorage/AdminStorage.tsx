import React, {useState} from 'react';
import AdminNavigation from "../../components/developer_components/AdminNavigation/AdminNavigation";
import {Navigate, useNavigate} from "react-router-dom";
import {Box, FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, Typography} from "@mui/material";
import TableManipulators from "../../components/developer_components/AdminStorage_Components/TableManipulators";
import StorageTable from "../../components/developer_components/AdminStorage_Components/StorageTable";
import StorageTablePagination
    from "../../components/developer_components/AdminStorage_Components/StorageTablePagination";
import {useCollection} from "../../hooks/useCollection";

function AdminStorage() {
    const [selectedCollection, setSelectedCollection] = useState('gpu');


    // hooks
    const navigate = useNavigate();
    const { documents } = useCollection(selectedCollection);

    if (!documents) {
        return <div>Loading...</div>;
    }

    console.log(documents);
    // handlers
    // add item handler
    const handleAddItem = () => {
        navigate("addItem");
    }

    // Function to handle when the child updates the collection
    const handleSelectedCollectionChange = (collection: string) => {
        setSelectedCollection(collection); // Update parent's state
    };

    return (
        <div>
            <AdminNavigation page="STORAGE">
                <>
                    <Box sx={{ marginTop: "32px" }}>
                        <TableManipulators onCollectionChange={handleSelectedCollectionChange} handleAddItem={handleAddItem}/>
                        <StorageTable  data={documents}/>
                        <StorageTablePagination />
                    </Box>
                </>
            </AdminNavigation>
        </div>
    );
}

export default AdminStorage;