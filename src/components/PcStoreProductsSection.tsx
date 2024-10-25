import React from 'react';
import {Box, Typography} from "@mui/material";
import PcStoreProductsFilters from "./PcStoreProductsFilters";
import PcStoreProductsPagination from "./PcStoreProductsPagination";
import PcStoreProductsDisplay from "./PcStoreProductsDisplay";

function PcStoreProductsSection() {
    return (
        <Box>
            <Box sx={{ margin: '64px 0' }}>
                <Typography variant="h2" sx={{ textAlign: 'center' }}>Gaming PCs Store</Typography>
            </Box>
            <Box
                display="flex"
                sx={{
                    width: '100%',
                    justifyContent: 'space-around',
                }}
            >
                <Box sx={{
                    width: '20%'
                }}>
                    <PcStoreProductsFilters />
                </Box>

                <Box sx={{
                    width: '65%'
                }}>
                    <PcStoreProductsPagination />
                    <PcStoreProductsDisplay />
                </Box>
            </Box>
        </Box>
    );
}

export default PcStoreProductsSection;