import React from 'react';
import {Box, Button, Divider, Typography, useMediaQuery, useTheme} from "@mui/material";

import HandshakeIcon from '@mui/icons-material/Handshake';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';

function HomeWhatWeOfferSection() {
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box
            display="flex"
            sx={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: {xs: 'column', md: 'row'},
                gap: 4,
                my: '64px',
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                sx={{
                    width: {md: '650px', xs: '375px'},
                    alignItems: "center",
                }}
            >
                <HandshakeIcon sx={{ fontSize: '72px', color: 'var(--primary-color)' }} />
                <Box sx={{ height: '200px' }}>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{
                            textAlign: 'center',
                            color: 'var(--secondary-color)'
                        }}
                    >
                        AFFILIATES
                    </Typography>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            mb: '16px',
                            textAlign: 'center',
                            color: 'var(--primary-color)'
                        }}
                    >
                        Join The Best
                    </Typography>
                    <Typography
                        variant="body2"
                        component="div"
                        sx={{
                            width: '286px',
                            textAlign: 'center',
                            color: 'var(--hardGray-color)'
                        }}
                    >
                        Partner up with the best custom PC system builder in the world and earn extra cash! Become An Official COMPJUX Affiliate Today!
                    </Typography>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'var(--secondary-color)',
                            '&:hover': {
                                backgroundColor: 'var(--primary-color)'
                            }
                        }}
                    >
                        Join
                    </Button>
                </Box>
            </Box>

            <Divider orientation={isMdUp ? "vertical" : "horizontal" } flexItem />

            <Box
                display="flex"
                flexDirection="column"
                sx={{
                    width: {md: '650px', xs: '375px'},
                    alignItems: "center",
                }}
            >
                <SupportAgentRoundedIcon sx={{ fontSize: '72px', color: 'var(--primary-color)' }} />
                <Box sx={{ height: '200px' }}>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{
                            textAlign: 'center',
                            color: 'var(--secondary-color)'
                        }}
                    >
                        SUPPORT
                    </Typography>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            mb: '16px',
                            textAlign: 'center',
                            color: 'var(--primary-color)'
                        }}
                    >
                        EU Based Support
                    </Typography>
                    <Typography
                        variant="body2"
                        component="div"
                        sx={{
                            width: '286px',
                            textAlign: 'center',
                            color: 'var(--hardGray-color)'
                        }}
                    >
                        Once you join us, we will have you covered. With every system, COMPJUX provides a free phone and online lifetime service guarantee. Available from 6am - 8pm PST.
                    </Typography>
                </Box>

                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'var(--secondary-color)',
                            '&:hover': {
                                backgroundColor: 'var(--primary-color)'
                            }
                        }}
                    >
                        Learn More
                    </Button>
                </Box>
            </Box>

        </Box>
    );
}

export default HomeWhatWeOfferSection;