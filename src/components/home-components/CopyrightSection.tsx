import React from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';

function CopyrightSection() {
    return (
        <Box
            display="flex"
            sx={{
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: '#152A2E',
                width: '100%',
                py: '16px',
                px: '8px',
                flexDirection: {xs: 'column', md: 'row'},
                gap: {xs: '12px', md: '0px'},
            }}
        >
            {/*  Socials  */}
            <Box
                display="flex"
                sx={{
                    gap: "8px"
                }}
            >
                <IconButton>
                    <FacebookIcon sx={{ fontSize: '36px', color: 'var(--softWhite-color)' }} />
                </IconButton>
                <IconButton>
                    <InstagramIcon sx={{ fontSize: '36px', color: 'var(--softWhite-color)' }} />
                </IconButton>
                <IconButton>
                    <XIcon sx={{ fontSize: '36px', color: 'var(--softWhite-color)' }} />
                </IconButton>
                <IconButton>
                    <YouTubeIcon sx={{ fontSize: '36px', color: 'var(--softWhite-color)' }} />
                </IconButton>
            </Box>
            {/*  Logo  */}
            <Box>
                <Typography
                    variant="h5"
                    sx={{
                        color: 'var(--primary-color)',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                    }}
                >
                    Compjux
                </Typography>
            </Box>
            {/*  Rights reserved  */}
            <Box>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'var(--softWhite-color)',
                        textAlign: 'center',
                    }}
                >
                    © 2024 ORIGIN PC Corporation. All Rights Reserved.
                </Typography>
            </Box>
        </Box>
    );
}

export default CopyrightSection;