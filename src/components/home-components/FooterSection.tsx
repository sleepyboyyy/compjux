import React, {useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";

function FooterSection() {
    const [isDialogOpen, setDialog] = useState(false);


    // Dialog handlers
    const handleDialogOpen = () => {
        setDialog(true);
    };

    const handleDialogClose = () => {
        setDialog(false);
    };

    return (
        <Box
            display="flex"
            sx={{
                width: '100%',
                justifyContent: 'space-around',
                py: '64px',
                backgroundColor: 'var(--secondary-color)',
                flexDirection: {xs: 'column', md: 'row'},
                gap: {xs: '32px', md: '0px'}
            }}
        >
            <Box
                display="flex"
                sx={{
                    flexDirection: {xs: 'column', md: 'row'},
                    gap: {xs: '32px', md:'128px'},
                    alignItems: {xs: 'center', md: 'baseline'},
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'var(--softWhite-color)',
                            mb: '8px',
                            textAlign: {xs: 'center', md: 'left'},
                        }}
                    >
                        Company
                    </Typography>
                    {["About", "Contact", "Terms of Use", "Privacy Policy", "Cookies Settings"].map((value, index) => (
                        <Typography
                            key={index}
                            variant="body1"
                            sx={{
                                color: 'var(--softGray-color)',
                                cursor: 'pointer',
                                mb: '4px',
                                textAlign: {xs: 'center', md: 'left'},
                            }}
                        >
                            {value}
                        </Typography>
                    ))}
                </Box>
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'var(--softWhite-color)',
                            mb: '8px',
                            textAlign: {xs: 'center', md: 'left'},
                        }}
                    >
                        Support
                    </Typography>
                    {["Customer Service", "FAQs", "Shipping Details", "Order Status"].map((value, index) => (
                        <Typography
                            key={index}
                            variant="body1"
                            sx={{
                                color: 'var(--softGray-color)',
                                cursor: 'pointer',
                                mb: '4px',
                                textAlign: {xs: 'center', md: 'left'},
                            }}
                        >
                            {value}
                        </Typography>
                    ))}
                </Box>
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'var(--softWhite-color)',
                            cursor: 'pointer',
                            textAlign: {xs: 'center', md: 'left'},
                        }}
                    >
                        Shop
                    </Typography>
                </Box>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                alignItems='center'
                justifyContent='center'
            >
                <Typography
                    variant="h4"
                    sx={{
                        color: 'var(--primary-color)',
                        mb: '8px',
                    }}

                >
                    Newsletter
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'var(--softWhite-color)',
                        mb: '16px'
                    }}
                >
                    Get access to exclusive offers!
                </Typography>
                <Box>
                    <Button
                        variant="contained"
                        onClick={handleDialogOpen}
                        sx={{
                            backgroundColor: 'var(--primary-color)',
                            color: 'var(--softWhite-color)',
                            '&:hover': {
                                backgroundColor: 'var(--softWhite-color)',
                                color: 'var(--primary-color)',
                            }
                        }}
                    >
                        Subscribe
                    </Button>
                </Box>
            </Box>

            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Get the latest Compjux news, announcements, deals, and giveaways when you sign up to the Newsletter! You'll be the first to know about the latest hardware announcements from Compjux, as well as any special offers we're currently running! Sign up today!*
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="newsletter-email"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleDialogClose}
                        sx={{
                            color: 'var(--secondary-color)',
                            '&:hover': {
                                backgroundColor: 'var(--secondary-color)',
                                color: 'var(--softWhite-color)'
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        sx={{
                            color: 'var(--primary-color)',
                            '&:hover': {
                                backgroundColor: 'var(--primary-color)',
                                color: 'var(--softWhite-color)'
                            }
                        }}
                    >
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default FooterSection;