import React from 'react';
import { Box, Typography } from '@mui/material';
import {useCollection} from "../../hooks/useCollection";
import {useAuthContext} from "../../hooks/useAuthContext";

function AccountOrders() {
    const { documents } = useCollection('orders', null, 'asc');
    const { state } = useAuthContext();

    if (!documents) {
        return <p>Loading...</p>
    }

    const filterByUid = documents.filter((document: any) => document.uid === state.user!.uid);

    return (
        <Box>
            <Typography variant="h5" style={{ color: 'var(--primary-color)' }}>
                My Orders
            </Typography>
            <Typography variant="body1" style={{ color: 'var(--secondary-color)' }}>
                Here, you can view all your past orders.
            </Typography>
            {/* Display each filtered order */}
            <Box mt={3}>
                {filterByUid.map((document: any) => (
                    <Box
                        key={document.id}
                        sx={{
                            border: '1px solid var(--softGray-color)',
                            borderRadius: '8px',
                            padding: '16px',
                            marginBottom: '16px',
                        }}
                    >
                        <Typography variant="body1" style={{color: 'var(--primary-color)'}}>
                            <strong>Order Status:</strong> <span style={{color: 'var(--secondary-color)', textTransform: 'uppercase'}}>{document.order_status}</span>
                            <br/> <strong>Order ID:</strong> {document.id.substring(0, 6)}
                        </Typography>
                        <Typography variant="body1" style={{color: 'var(--secondary-color)', marginTop: '8px'}}>
                            <strong>Order Items:</strong> {document.items_ordered.join(', ')}
                        </Typography>
                        <Typography variant="body1" style={{ color: 'var(--secondary-color)', marginTop: '8px' }}>
                            <strong>Order Price:</strong> <span style={{color: 'var(--priceGreen-color)'}}>{document.items_total_price}$</span>
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default AccountOrders;
