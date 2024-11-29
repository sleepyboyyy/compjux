import React, {useState} from 'react';
import AdminNavigation from "../../components/admin-navigation-components/AdminNavigation";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/material";
import ProductTableManipulators from "../../components/admin-product-components/ProductTableManipulators";
import ProductsTable from "../../components/admin-product-components/ProductsTable";
import {useCollection} from "../../hooks/useCollection";
import AdminTablePagination from "../../components/misc-components/AdminTablePagination";

function AdminProducts() {
    // State
    const [sortType, setSortType] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">('asc');
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const rowsPerPage = 7;

    const navigate = useNavigate();
    const { documents } = useCollection('products', sortType, sortDirection);

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

    // handle search change
    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    }

    // handle add item
    const handleAddItem = () => {
        navigate("product-builder");
    }

    // Function to handle sort type change
    const handleSortChange = (sortOption: string | null, direction: "asc" | "desc") => {
        setSortType(sortOption); // Update sort type
        setSortDirection(direction);
    };

    return (
        <AdminNavigation page="PRODUCTS">
            <Box sx={{ margin: '32px 0' }}>
                <ProductTableManipulators
                    handleAddItem={handleAddItem}
                    onSortChange={handleSortChange}
                    onSearchChange={handleSearchChange}
                />
                <ProductsTable
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

export default AdminProducts;