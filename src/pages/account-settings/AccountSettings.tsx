import React, {useContext, useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography} from "@mui/material";
import {AuthContext} from "../../context/AuthContext";
import {useSignOut} from "../../hooks/useSignOut";
import {useDocument} from "../../hooks/useDocument";

function AccountSettings() {
    const { state } = useContext(AuthContext);
    const { signUserOut } = useSignOut();
    const { document } = useDocument('users', state.user!.uid);

    // Handlers
    // State for dialog control
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // Handlers
    const handleSignoutClick = async () => {
        await signUserOut();
    };

    const handleDeleteAccountClick = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setIsDeleteDialogOpen(false);
    };

    const handleConfirmDelete = () => {
        // Add logic for account deletion here
        console.log('Account deletion confirmed.');
        setIsDeleteDialogOpen(false);
    };

    return (
        <>
            {document ? (
                    <>
                        <Typography variant="h5" style={{ color: 'var(--primary-color)' }}>
                            Account Settings
                        </Typography>
                        <Box mt={2}>
                            <Typography variant="h6" style={{ color: 'var(--secondary-color)' }}>
                                Username
                            </Typography>
                            <Typography>Your username is: {state.user?.displayName}</Typography>
                        </Box>
                        <Box mt={2}>
                            <Typography variant="h6" style={{ color: 'var(--secondary-color)' }}>
                                Email Address
                            </Typography>
                            <Typography>Your email address is: {document.email}</Typography>
                        </Box>
                        <Divider style={{ margin: '20px 0', backgroundColor: 'var(--secondary-color)', width: '112px' }} />
                        <Box>
                            <Typography variant="h6" style={{ color: 'var(--secondary-color)' }}>
                                Delete Account
                            </Typography>
                            <Typography>Would you like to delete your account?</Typography>
                            <Button
                                onClick={handleDeleteAccountClick}
                                style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}
                            >
                                I want to delete my account
                            </Button>
                        </Box>

                        {/* Dialog for account deletion */}
                        <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogClose}>
                            <DialogTitle style={{ color: 'var(--primary-color)' }}>
                                Are you sure you want to delete your account?
                            </DialogTitle>
                            <DialogContent>
                                <Typography>This action will delete all data related to this account.</Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={handleDeleteDialogClose}
                                    style={{ backgroundColor: 'var(--priceGreen-color)', color: 'var(--softWhite-color)' }}
                                >
                                    Cancel Action
                                </Button>
                                <Button
                                    onClick={handleConfirmDelete}
                                    variant="outlined"
                                    style={{ borderColor: 'var(--hardGray-color)', color: 'var(--hardGray-color)' }}
                                >
                                    Delete my account
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                ) : (
                    <Typography variant="h6" style={{ color: 'var(--secondary-color)' }}>
                        Loading account details...
                    </Typography>
                )}
        </>
    );
}

export default AccountSettings;