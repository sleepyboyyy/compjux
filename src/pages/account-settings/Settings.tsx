// hooks
import React, {useContext, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import {useSignOut} from "../../hooks/useSignOut";
import {useDocument} from "../../hooks/useDocument";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography} from '@mui/material';
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import FooterSection from "../../components/home-components/FooterSection";
import CopyrightSection from "../../components/home-components/CopyrightSection";

function Settings() {
    // destructured components
    // current user context
    const { state } = useContext(AuthContext);
    const { signUserOut } = useSignOut();
    const { document } = useDocument('users', state.user!.uid);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signUserOut();
        navigate('/');
    }

    return (
        <Box display="flex" justifyContent="center" gap={6}>
            {/* Side navigation */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '264px',
                    height: '282px',
                    borderRight: '1px solid var(--softGray-color)',
                    mt: '64px',
                    padding: '20px',
                }}
            >
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <Typography variant="h4" style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>
                    Settings
                </Typography>
                <Box display="flex" flexDirection="column" sx={{width: '200px'}}>
                    <NavLink
                        to="/settings/account-settings"
                        style={({ isActive }) => ({
                            textDecoration: 'none',
                            marginBottom: '12px',
                        })}
                    >
                        {({ isActive }) => (
                            <Button
                                variant={isActive ? 'contained' : 'text'}
                                sx={{
                                    backgroundColor: isActive ? 'var(--primary-color)' : 'transparent',
                                    color: isActive ? 'var(--softWhite-color)' : 'var(--secondary-color)',
                                    '&:hover': {
                                        backgroundColor: isActive ? 'var(--primary-color)' : '#F7EFEF',
                                    },
                                }}
                            >
                                Account Settings
                            </Button>
                        )}
                    </NavLink>
                    <NavLink
                        to="/settings/account-orders"
                        style={({ isActive }) => ({
                            textDecoration: 'none',
                        })}
                    >
                        {({ isActive }) => (
                            <Button
                                variant={isActive ? 'contained' : 'text'}
                                sx={{
                                    backgroundColor: isActive ? 'var(--primary-color)' : 'transparent',
                                    color: isActive ? 'var(--softWhite-color)' : 'var(--secondary-color)',
                                    '&:hover': {
                                        backgroundColor: isActive ? 'var(--primary-color)' : '#F7EFEF',
                                    },
                                }}
                            >
                                My Orders
                            </Button>
                        )}
                    </NavLink>
                    <Divider flexItem sx={{my: 2}} />
                    <Box>
                        <Button
                            onClick={handleSignOut}
                            variant="outlined"
                            sx={{
                                color: 'var(--secondary-color)',
                                borderColor: 'var(--secondary-color)',
                                '&:hover': {
                                    color: 'var(--primary-color)',
                                    borderColor: 'var(--primary-color)',
                                    backgroundColor: '#F7EFEF'
                                }
                            }}
                        >
                            Sign out
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Main content */}
            <Box
                display="flex"
                flexDirection="column"
                sx={{
                    padding: '20px',
                    mt: '64px',
                    width: '464px'
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}

export default Settings;