import React from 'react';
import {Box, Button, Drawer, IconButton, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useCartContext} from "../hooks/useCartContext";
import useMultipleDocuments from "../hooks/useMultipleDocuments";

interface CartDrawerComponentProps {
    isOpen: boolean,
    toggleDrawer: (open: boolean) => void
}

function CartDrawerComponent({ isOpen, toggleDrawer }: CartDrawerComponentProps) {
    const { cartItems, removeFromCart, clearCart } = useCartContext();
    const { documents: cartDetails, loading, error } = useMultipleDocuments('products', cartItems);

    return (
        <Drawer anchor="right" open={isOpen} onClose={() => toggleDrawer(false)}>
            <Box sx={{ width: 300, padding: 2 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Cart Items</Typography>
                    <IconButton onClick={() => toggleDrawer(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Cart Items */}
                <Box sx={{ marginTop: 2 }}>
                    {loading && <Typography variant="body1">Loading...</Typography>}
                    {error && <Typography variant="body1" color="error">Error loading cart items</Typography>}
                    {!loading && !error && cartDetails.length === 0 && <Typography variant="body1">Your cart is empty</Typography>}
                    {!loading && !error && cartDetails.length > 0 && cartDetails.map((document) => (
                        <Box key={document.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                            <img src={document.image} alt={document.product_name} width={50} height={50} style={{ marginRight: 8 }} />
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="body1">
                                    {document.product_name} - ${document.total_price}
                                </Typography>
                            </Box>
                            <IconButton onClick={() => removeFromCart(document.id)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Box>

                {/* Cart Actions */}
                {cartDetails.length > 0 && (
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6">
                            Total Price: ${cartDetails.reduce((sum, document) => sum + document.total_price, 0)}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            component="a"
                            href="/cart"
                            sx={{ width: '100%', marginTop: 2 }}
                        >
                            View Cart
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={clearCart}
                            sx={{ width: '100%', marginTop: 1 }}
                        >
                            Clear Cart
                        </Button>
                    </Box>
                )}
            </Box>
        </Drawer>
    );
}

export default CartDrawerComponent;