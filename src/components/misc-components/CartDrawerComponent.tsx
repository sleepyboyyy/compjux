import React, {useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Drawer,
    IconButton,
    Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useCartContext} from "../../hooks/useCartContext";
import useMultipleDocuments from "../../hooks/useMultipleDocuments";
import pcImage from '../../assets/productImages/5.png'
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../../hooks/useAuthContext";

interface CartDrawerComponentProps {
    isOpen: boolean,
    toggleDrawer: (open: boolean) => void
}

function CartDrawerComponent({ isOpen, toggleDrawer }: CartDrawerComponentProps) {
    const { cartItems, removeFromCart, clearCart } = useCartContext();
    const { documents: cartDetails, loading, error } = useMultipleDocuments('products', cartItems);
    const { state } = useAuthContext();
    const navigate = useNavigate();
    // Dialog component
    const [loginReqOpen, setLoginReqOpen] = useState(false);

    // Handler to open the dialog
    const handleOpen = () => {
        setLoginReqOpen(true);
    };

    // Handler to close the dialog
    const handleClose = () => {
        setLoginReqOpen(false);
    };

    // Handler for navigating to login
    const handleSignIn = () => {
        navigate('/login');
        setLoginReqOpen(false);
        toggleDrawer(false);
    };

    // handler view cart
    const handleViewCart = () => {
        if (!state.user) {
            handleOpen();
        } else {
            toggleDrawer(false);
            navigate('/cart');
        }
    }

    return (
        <>
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
                                <img src={pcImage} alt={document.product_name} width={50} height={50} style={{ marginRight: 8 }} />
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
                                component="a"
                                onClick={handleViewCart}
                                sx={{
                                    width: '100%',
                                    marginTop: 2 ,
                                    backgroundColor: 'var(--primary-color)',
                                    '&:hover': {backgroundColor: 'var(--secondary-color)'}
                                }}
                            >
                                View Cart
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={clearCart}
                                sx={{
                                    width: '100%',
                                    marginTop: 1,
                                    border: '1px solid var(--secondary-color)',
                                    color: 'var(--secondary-color)',
                                    '&:hover': {
                                        color: 'var(--primary-color)',
                                        border: '1px solid var(--primary-color)',
                                        backgroundColor: '#F7EFEF',
                                    }
                                }}
                            >
                                Clear Cart
                            </Button>
                        </Box>
                    )}
                </Box>
            </Drawer>

            {/* Dialog Popup */}
            <Dialog open={loginReqOpen} onClose={handleClose}>
                <DialogTitle>You seem to not be logged in</DialogTitle>
                <DialogContent>
                    <Typography>
                        Please sign in or make an account before you try to make a purchase.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleSignIn}
                        variant="contained"
                        sx={{
                            color: 'var(--softWhite-color)',
                            backgroundColor: 'var(--secondary-color)',
                            '&:hover': { backgroundColor: 'var(--primary-color)' },
                        }}
                    >
                        Sign in
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CartDrawerComponent;