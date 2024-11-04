import React, {useState} from 'react';
import AdminNavigation from "../../components/AdminNavigation";
import {Box} from "@mui/material";
import {useCollection} from "../../hooks/useCollection";
import OrdersTable from "../../components/OrdersTable";
import AdminTablePagination from "../../components/AdminTablePagination";
import OrdersTableManipulators from "../../components/HomeStyles/OrdersTableManipulators";

function AdminOrders() {
    const [sortType, setSortType] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const { documents } = useCollection('orders', sortType, sortDirection);
    const rowsPerPage = 7;

    if (!documents) {
        return <p>Loading...</p>;
    }

    // Filter documents based on search query
    const filteredData = documents.filter((doc: any) => checkNestedProperties(doc, searchQuery));

    // calculate current data
    const paginatedData = filteredData.slice((page-1) * rowsPerPage, page * rowsPerPage);

    // calculate total pages
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // handle page change
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number ) => {
        setPage(value);
    }

    // Function to handle sort type change
    const handleSortChange = (sortOption: string | null, direction: "asc" | "desc") => {
        setSortType(sortOption); // Update sort type
        setSortDirection(direction);
    };

    // handle search change
    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    }

    return (
        <AdminNavigation page="ORDERS">
            <Box sx={{ margin: '32px 0' }}>
                <OrdersTableManipulators
                    onSortChange={handleSortChange}
                    onSearchChange={handleSearchChange}
                />
                <OrdersTable
                    data={paginatedData}
                />
                <AdminTablePagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </Box>
        </AdminNavigation>
    );
}

// TODO: Learn how logic works
const checkNestedProperties = (obj: any, searchTerm: string): boolean => {
    // Loop through all properties in the object
    for (let key in obj) {
        // If the current property is an object itself, recursively check its properties
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (checkNestedProperties(obj[key], searchTerm)) {
                return true;
            }
        }
        // If the property is a string, check if it contains the search term
        else if (typeof obj[key] === 'string' && obj[key].toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
        }
    }
    return false;
};

export default AdminOrders;