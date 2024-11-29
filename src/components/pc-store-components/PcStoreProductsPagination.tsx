import React, {useState} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent} from "@mui/material";

function PcStoreProductsPagination() {
    const [selectedFilter, setSelectedFilter] = useState("");

    // handlers
    // select box filter change handler
    const handleFilterChange = (e: SelectChangeEvent) => {
        setSelectedFilter(e.target.value);
    }

    return (
        <Box
            display="flex"
            sx={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
                margin: '0 auto',
                gap: 6,
                border: '1px solid var(--softGray-color)',
                borderRadius: '12px',
                p: '12px',
            }}
        >
            {/* Filter Box */}
            <Box>
                <FormControl fullWidth sx={{minWidth: 120}}>
                    <InputLabel id="filter-box-label">Sort By:</InputLabel>
                    <Select
                        labelId="filter-box-label"
                        id="filter-box-select"
                        variant="outlined"
                        value={selectedFilter}
                        label="Sort By:"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="price-asc">Sort By: Price Low-High</MenuItem>
                        <MenuItem value="price-desc">Sort By: Price High-Low</MenuItem>
                        <MenuItem value="product-name-asc">Sort By: Name A-Z</MenuItem>
                        <MenuItem value="product-name-desc">Sort By: Name Z-A</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Pagination count={3} />
        </Box>
    );
}

export default PcStoreProductsPagination;