import React from 'react';
import { Box, Typography } from '@mui/material';

function AccountOrders() {
    return (
        <Box>
            <Typography variant="h5" style={{ color: 'var(--primary-color)' }}>
                My Orders
            </Typography>
            <Typography variant="body1" style={{ color: 'var(--secondary-color)' }}>
                Here, you can view all your past orders.
            </Typography>
            {/* Add logic here to display user orders */}
        </Box>
    );
}

export default AccountOrders;
