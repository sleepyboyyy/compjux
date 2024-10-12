import React from 'react';
import {Box, Pagination, Typography} from "@mui/material";

interface StorageTablePaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

function AdminTablePagination({ page, totalPages, onPageChange }: StorageTablePaginationProps) {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
                width: '95%',
                margin: '0 auto',
                backgroundColor: 'white',
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
                boxShadow: 3,
                padding: '16px 24px'
            }}
        >
            <Typography sx={{color: 'var(--secondary-color)', opacity: 0.5}}>
                Showing <span style={{fontWeight: '700'}}>{page}</span> of {totalPages} pages
            </Typography>

            <Pagination
                count={totalPages}
                variant="outlined"
                page={page}
                onChange={onPageChange}
                shape="rounded"
            />
        </Box>
    );
}

export default AdminTablePagination;