import React from 'react';
import {Box, Button, Typography} from "@mui/material";

type HomeFillerSectionComponentProps = {
    imagePath: string;
    isReversed?: boolean;
    displayData: any;
    bgColor: string;
}

function HomeFillerSectionComponent({ imagePath, isReversed = false, bgColor, displayData }: HomeFillerSectionComponentProps) {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
                width: '100%',
                overflow: 'hidden',
                gap: {xs: 2, lg: 4},
                backgroundColor: bgColor,
                py: '32px',
                flexDirection: {
                    md: isReversed ? "row-reverse" : "row",
                    xs: 'column-reverse',
                },
            }}
        >
            {/*  Image Container  */}
            <Box sx={{ width: {lg: '525px', xs: '375px'} }}>
                <img src={imagePath} alt="computer" style={{ width: '100%' }} />
            </Box>

            <Box sx={{ maxWidth: {lg: '525px', xs: '350px'} }}>
                <Typography
                    variant="h2"
                    sx={{
                        color: 'var(--softWhite-color)',
                        mb: "12px",
                        fontSize: {xs: '36px', lg: '48px'},
                        textAlign: {xs: 'center', md: 'left'}
                    }}
                >
                    { displayData.title }
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'var(--softGray-color)',
                        mb: "24px",
                        textAlign: {xs: 'center', md: 'left'},
                    }}
                >
                    { displayData.description }
                </Typography>
                <Box display="flex" sx={{ width: '100%', justifyContent: {xs: 'center', md: 'flex-start'} }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'var(--softWhite-color)',
                            color: 'var(--primary-color)',
                            fontWeight: '600',
                            '&:hover': {
                                backgroundColor: 'var(--hardGray-color)',
                                color: 'var(--softWhite-color)'
                            }
                        }}
                    >
                        {displayData.buttonValue}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default HomeFillerSectionComponent;