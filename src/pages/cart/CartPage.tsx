import React, {useEffect, useMemo, useState} from 'react';
import {Box, Button, IconButton, Typography} from "@mui/material";
import {useCartContext} from "../../hooks/useCartContext";
import productImage from '../../assets/productImages/5.png'
import useMultipleDocuments from "../../hooks/useMultipleDocuments";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {useNavigate} from "react-router-dom";
import FooterSection from "../../components/FooterSection";
import CopyrightSection from "../../components/CopyrightSection";

function CartPage() {
    const { cartItems } = useCartContext();
    const { documents: cartDetails, loading, error } = useMultipleDocuments("products", cartItems);
    const navigate = useNavigate();

    const totalCartPrice = useMemo(() => {
        return cartDetails.reduce((sum, cartDetail) => sum + (cartDetail.total_price || 0), 0);
    }, [cartDetails]);

    // handle checkout
    const handleCheckout = () => {
        navigate('/checkout');
    }

    return (
        <Box>
            <Box>
                <Typography sx={{textAlign: 'center', my: '32px'}} variant="h2">Shopping Cart</Typography>
            </Box>
            {loading && <Typography variant="body1">Loading...</Typography>}
            {error && <Typography variant="body1" color="error">Error loading cart items</Typography>}
            {!loading && !error && cartDetails.length === 0 && <Typography variant="body1">Your cart is empty</Typography>}
            {!loading && cartDetails.length > 0 && cartDetails.map((document) => (
                <Box
                    display="flex"
                    sx={{ width: '50%', margin: '8px auto', justifyContent: 'flex-start', alignItems: 'center', border: '2px solid black', position: 'relative' }}
                >
                    <Box sx={{ width: '20%'}}>
                        <img src={productImage} alt="productImage" style={{ width: '100%', marginRight: '12px' }} />
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '24px' }}>{document.product_name} - <span style={{ color: 'var(--priceGreen-color)' }}>{document.total_price}$</span></Typography>
                    </Box>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            right: '1%'
                        }}
                    >
                        <CloseRoundedIcon sx={{ fontSize: '32px' }}/>
                    </IconButton>
                </Box>
            ))}
            {cartDetails.length > 0 && <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    width: '30%',
                    margin: '32px auto'
                }}
            >
                <Typography variant="body1" sx={{mb: 1, fontSize: '24px'}}>Estimated total: <span
                    style={{color: 'var(--priceGreen-color)'}}>{totalCartPrice}$</span></Typography>
                <Button
                    variant="outlined"
                    onClick={handleCheckout}
                    sx={{
                        fontSize: '24px',
                        borderColor: 'var(--primary-color)',
                        color: 'var(--primary-color)',
                        '&:hover': {
                            borderColor: 'var(--secondary-color)',
                            backgroundColor: '#F7EFEF',
                            color: 'var(--secondary-color)'
                        }
                    }}
                >
                    Proceed to Checkout
                </Button>
            </Box>}

            <FooterSection />
            <CopyrightSection />
        </Box>
    );
}

export default CartPage;