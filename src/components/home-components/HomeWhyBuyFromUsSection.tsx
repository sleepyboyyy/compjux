import React from 'react';
import {Box, Button, Typography} from "@mui/material";

function HomeWhyBuyFromUsSection() {
    return (
        <Box
            sx={{
                width: "100%",
                backgroundColor: "#152A2E",
            }}
        >
            <Box
                sx={{
                    py: '32px',
                    width: '80%',
                    margin: '0 auto',
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: "32px",
                        color: 'var(--primary-color)',
                        mb: '16px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                    }}
                >
                    Why buy from Compjux?
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mb: '32px',
                        color: 'var(--softGray-color)',
                        letterSpacing: "2px",
                    }}
                >
                    If you’re searching for the cheapest Gaming PC made with inferior products and questionable quality, you might as well leave now. <strong style={{ color: 'var(--primary-color)' }}>Compjux</strong> only uses the highest quality performance Gaming PC components available. Every single <strong style={{ color: 'var(--primary-color)' }}>customized Gaming PC</strong> is assembled right here in Macedonia by highly trained and incredibly skilled technicians and assembly engineers. Sure, we can assemble our award-winning Gaming PCs overseas for less. In fact, that’s what most of our competitors do. However, we choose to assemble all our Gaming PCs right here in Macedonia because it gives us the best control over manufacturing, performance, and overall quality. And we’re thrilled to hire only the best PC Builders in the country.
                </Typography>
                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            fontWeight: '600',
                            backgroundColor: 'var(--softWhite-color)',
                            color: 'var(--primary-color)',
                            '&:hover': {
                                backgroundColor: 'var(--primary-color)',
                                color: 'var(--softWhite-color)'
                            }
                        }}
                    >
                        Read More
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default HomeWhyBuyFromUsSection;