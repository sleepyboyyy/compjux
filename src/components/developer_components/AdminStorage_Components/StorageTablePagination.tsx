import React from 'react';
import {Box, Pagination, Typography} from "@mui/material";

function StorageTablePagination() {
    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

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
                Showing <span style={{fontWeight: '700'}}>{page}</span> of 10 pages
            </Typography>

            <Pagination
                count={10}
                variant="outlined"
                page={page}
                onChange={handleChange}
                shape="rounded"
            />
        </Box>
    );
}

export default StorageTablePagination;