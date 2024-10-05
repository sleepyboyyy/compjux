import React, {useEffect, useState} from 'react';
import AdminNavigation from "../../components/developer_components/AdminNavigation/AdminNavigation";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/material";
import TableManipulators from "../../components/developer_components/AdminStorage_Components/TableManipulators";
import StorageTable from "../../components/developer_components/AdminStorage_Components/StorageTable";
import StorageTablePagination
    from "../../components/developer_components/AdminStorage_Components/StorageTablePagination";
import {useCollection} from "../../hooks/useCollection";

function AdminStorage() {
    const [selectedCollection, setSelectedCollection] = useState('gpu');
    const [sortType, setSortType] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">('asc');
    const [page, setPage] = useState(1);
    const rowsPerPage = 6;

    // hooks
    const navigate = useNavigate();
    const { documents } = useCollection(selectedCollection, sortType, sortDirection);

    if (!documents) {
        return <div>Loading...</div>;
    }

    // calculate current data
    const paginatedData = documents.slice((page-1) * rowsPerPage, page * rowsPerPage);

    // calculate total pages
    const totalPages = Math.ceil(documents.length / rowsPerPage);

    // handlers
    // add item handler
    const handleAddItem = () => {
        navigate("addItem");
    }

    // Function to handle when the child updates the collection
    const handleSelectedCollectionChange = (collection: string) => {
        setSelectedCollection(collection); // Update parent's state
    };

    // Function to handle sort type change
    const handleSortChange = (sortOption: string | null, direction: "asc" | "desc") => {
        setSortType(sortOption); // Update sort type
        setSortDirection(direction);
    };

    // handle page change
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number ) => {
        setPage(value);
    }

    return (
        <div>
            <AdminNavigation page="STORAGE">
                <>
                    <Box sx={{ margin: "32px 0" }}>
                        <TableManipulators
                            onCollectionChange={handleSelectedCollectionChange}
                            handleAddItem={handleAddItem}
                            onSortChange={handleSortChange}
                        />
                        <StorageTable  data={paginatedData}/>
                        <StorageTablePagination
                            page={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </Box>
                </>
            </AdminNavigation>
        </div>
    );
}

export default AdminStorage;