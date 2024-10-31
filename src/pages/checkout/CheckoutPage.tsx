import React, {useState} from 'react';
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Tooltip,
    IconButton,
    Snackbar, Alert
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { styled } from '@mui/system';
import {useFirestore} from "../../hooks/useFirestore";
import {useNavigate} from "react-router-dom";
import {useCartContext} from "../../hooks/useCartContext";
import useMultipleDocuments from "../../hooks/useMultipleDocuments";

const StyledTextField = styled(TextField)({
    '& .MuiInputBase-root': {
        color: 'var(--secondary-color)',
    },
    '& .MuiInputLabel-root': {
        color: 'var(--secondary-color)',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'var(--primary-color)',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'var(--secondary-color)',
        },
        '&:hover fieldset': {
            borderColor: 'var(--secondary-color)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'var(--primary-color)',
        },
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiInputBase-input': {
        color: 'var(--primary-color)',
    },
});

const StyledButton = styled(Button)({
    backgroundColor: 'var(--secondary-color)',
    color: 'var(--softWhite-color)',
    '&:hover': {
        backgroundColor: 'var(--primary-color)', // Adjust to a darker version of primary color
    },
    transition: 'background-color 0.3s',
});

const StyledRadio = styled(Radio)({
    '&.MuiRadio-root': {
        color: 'var(--secondary-color)',
    },
    '&.Mui-checked': {
        color: 'var(--primary-color)',
    },
    '&:hover': {
        backgroundColor: 'rgba(0, 123, 255, 0.08)', // Light background on hover, adjust color if needed
    },
});

function CheckoutPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        city: '',
        address: '',
        zipCode: '',
        phone: '',
        cardType: 'visa',
        cardNumber: '',
        expirationDate: '',
        securityCode: '',
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { addDocument } = useFirestore('orders');
    const {cartItems, clearCart} = useCartContext();
    const {documents: cartDetails} = useMultipleDocuments('products', cartItems);
    const navigate = useNavigate();

    // handlers

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if all required fields are filled
        const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '');

        if (allFieldsFilled) {
            // Create items_ordered and items_total_price from cartDetails
            const itemsOrdered = cartDetails.map((item) => item.product_name);
            const itemsTotalPrice = cartDetails.reduce((sum, item) => sum + (item.total_price || 0), 0);

            // Create the order object with the additional properties
            const orderDetails = {
                ...formData,
                order_status: 'processing order',
                items_ordered: itemsOrdered,
                items_total_price: itemsTotalPrice,
            };

            await addDocument(orderDetails);

            // Clear cart
            clearCart();

            // Show the success popup
            setSnackbarOpen(true);

            // Navigate to the homepage after a short delay (to allow the user to see the popup)
            setTimeout(() => {
                navigate('/');
            }, 3000); // Adjust the delay as needed
        } else {
            alert('Please fill out all required fields.');
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} p={3} sx={{ width: '45%', margin: '0 auto' }}>
            <Typography variant="h5" gutterBottom>
                Shipping Address
            </Typography>
            <Grid container spacing={2}>
                {/* First Name and Last Name */}
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        required
                    />
                </Grid>

                {/* Email */}
                <Grid item xs={12}>
                    <StyledTextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        required
                    />
                </Grid>

                {/* Country and City */}
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        required
                    />
                </Grid>

                {/* Address */}
                <Grid item xs={12}>
                    <StyledTextField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        required
                    />
                </Grid>

                {/* Zip Code */}
                <Grid item xs={12}>
                    <StyledTextField
                        label="Zip Code"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        required
                    />
                </Grid>

                {/* Phone */}
                <Grid item xs={12}>
                    <StyledTextField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        required
                    />
                </Grid>
            </Grid>

            <Typography variant="h5" gutterBottom mt={3}>
                Payment
            </Typography>
            <FormControl component="fieldset">
                <Typography variant="body1" sx={{color: 'var(--primary-color)'}}>Select card type</Typography>
                <RadioGroup
                    row
                    name="cardType"
                    value={formData.cardType}
                    onChange={handleChange}
                >
                    <FormControlLabel value="visa" control={<StyledRadio />} label="Visa" />
                    <FormControlLabel value="mastercard" control={<StyledRadio />} label="Mastercard" />
                </RadioGroup>
            </FormControl>

            <Grid container spacing={2} mt={2}>
                {/* Card Number */}
                <Grid item xs={12}>
                    <StyledTextField
                        label="Card Number"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        required
                    />
                </Grid>

                {/* Expiration Date and Security Code */}
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        label="Expiration Date"
                        name="expirationDate"
                        value={formData.expirationDate}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6} style={{ position: 'relative' }}>
                    <StyledTextField
                        label="Security Code"
                        name="securityCode"
                        value={formData.securityCode}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        required
                    />
                    <Tooltip title="The 3-digit number on the back of your card.">
                        <IconButton style={{ position: 'absolute', right: -40, top: '50%', transform: 'translateY(-50%)' }}>
                            <HelpOutlineIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>

            <StyledButton type="submit" size="large" fullWidth sx={{ mt: 3 }}>
                Place Order
            </StyledButton>

            {/* Snackbar for success message */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{boxShadow: 4}}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Order placed successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default CheckoutPage;