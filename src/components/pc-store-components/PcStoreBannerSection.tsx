import React from 'react';
import {Box, Typography} from "@mui/material";

import bannerImage from '../../assets/store images/Transparent images/BannerImage_JPG-removebg.png'
import bannerBackground from '../../assets/store images/Normal imgaes/banner-background.webp'

function PcStoreBannerSection() {
    return (
        <Box
            display="flex"
            sx={{
                position: 'relative',
                width: '100%',
                backgroundImage: `url(${bannerBackground})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '788px',
                justifyContent: 'flex-start',
                pl: '128px',
                alignItems: 'center',
                zIndex: 1,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    zIndex: '-1',
                }
            }}
        >
            <Box>
                <Typography
                    variant="h1"
                    sx={{
                        position: 'static',
                        color: 'var(--softWhite-color)',
                        zIndex: '2',
                        mb: '12px',
                        textShadow: "4px 4px 11px rgba(0,0,0,0.6);",
                    }}
                >
                    Gaming PCs
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        position: 'static',
                        zIndex: '2',
                        color: 'var(--softGray-color)',
                    }}
                >
                    The best custom built PCs you can find!
                </Typography>
            </Box>
        </Box>
    );
}

export default PcStoreBannerSection;