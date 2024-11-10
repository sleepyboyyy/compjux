import React, {useState} from 'react';
import {Box, Dialog, DialogContent, Divider, Grid, Typography} from "@mui/material";

import designImage1 from '../../assets/design-images/Admin Dashboard.png';
import designImage2 from '../../assets/design-images/Admin Orders.png';
import designImage3 from '../../assets/design-images/Admin Products.png';
import designImage4 from '../../assets/design-images/Admin Storage.png';
import designImage5 from '../../assets/design-images/Admin Add Item.png';
import designImage6 from '../../assets/design-images/Admin Build a Product.png';
import designImage7 from '../../assets/design-images/Admin Select Component.png';
import {Link} from "react-router-dom";

function DocumentationPage() {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Array of image URLs for the Figma designs
    const figmaImages = [
        designImage1,
        designImage2,
        designImage3,
        designImage4,
        designImage6,
        designImage7,
        designImage5,
    ];

    const handleClickOpen = (image: string) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage(null);
    };

    return (
        <Box p={4} sx={{ color: 'var(--secondary-color)', width: '75%', margin: '0 auto' }}>
            {/* Title */}
            <Typography variant="h4" sx={{ color: 'var(--primary-color)', mb: 2 }}>
                Welcome to the Compjux Documentation
            </Typography>

            {/* Introduction */}
            <Typography paragraph>
                In this documentation, you’ll find details about the current state of Compjux, including what’s working, what’s not, the project’s primary goals, and how you can interact with it.
            </Typography>

            {/* Technologies Used */}
            <Typography variant="h5" sx={{ color: 'var(--primary-color)', mt: 4 }}>
                Technologies Used
            </Typography>
            <Typography paragraph>
                - <strong>Frontend</strong>: React, React Router, TypeScript, Material UI
                <br />
                - <strong>Backend and Hosting</strong>: Firestore, Firebase Auth, Firebase Hosting
                <br />
                - <strong>Design</strong>: Figma
            </Typography>

            <Divider sx={{ my: 4 }} />

            {/* Project Goal */}
            <Typography variant="h5" sx={{ color: 'var(--primary-color)', mt: 4 }}>
                Project Goal
            </Typography>
            <Typography paragraph>
                This project aimed to challenge myself to deepen my skills with this tech stack, from initial idea to production. I handled all aspects of the project independently, and I’ve learned a lot along the way, sharpening my coding skills and understanding of full-stack development.
            </Typography>

            <Divider sx={{ my: 4 }} />

            {/* About the Project */}
            <Typography variant="h5" sx={{ color: 'var(--primary-color)', mt: 4 }}>
                About the Project
            </Typography>
            <Typography paragraph>
                Compjux is a fictional company aiming to sell pre-built gaming PCs online. They needed a system to manage orders, stock, and products – so I built this project to meet those needs.
            </Typography>
            <Typography>
                <strong>Project Structure:</strong>
            </Typography>
            <Typography paragraph>
                - <strong>Client Side</strong>: Represents what a customer sees when they visit the Compjux website to purchase a gaming PC.
                <br />
                - <strong>Admin Side</strong>: Allows the admin to manage PC components, stock, products, and orders. This includes creating new products and updating order statuses.
            </Typography>

            <Divider sx={{ my: 4 }} />

            {/* Challenges */}
            <Typography variant="h5" sx={{ color: 'var(--primary-color)', mt: 4 }}>
                Why Some Features Are Incomplete
            </Typography>
            <Typography paragraph>
                I took on this project alongside my bachelor’s studies, intending to learn by building and solving challenges. While it was engaging, there came a point where the project required more time and repetitive tasks rather than providing new learning. So, I decided to simplify some parts and focus on the core features I wanted to learn.
            </Typography>

            <Divider sx={{ my: 4 }} />

            {/* Initial Plan vs. Current State */}
            <Typography variant="h5" sx={{ color: 'var(--primary-color)', mt: 4 }}>
                Original Plan vs. Current State
            </Typography>
            <Typography paragraph>
                - <strong>Dynamic PC Builder</strong>: Initially, I planned a dynamic PC builder for both clients and admins. This builder would verify if selected components were compatible. While I didn’t implement it fully, each component still has the necessary data properties for compatibility checks, so this feature could be added in the future.
            </Typography>
            <Typography paragraph>
                - <strong>Admin Dashboard & Statistics</strong>: The dashboard and statistics pages were initially intended to display comprehensive data on products and orders. I opted not to implement this due to the time required to generate the data as envisioned, but I’ve included designs below to show my vision for these features.
            </Typography>
            <Typography paragraph>
                - <strong>Informational Pages</strong>: Some buttons on the homepage (e.g., Contact, Support, Learn More) currently serve as placeholders and do not link to dedicated pages. These pages were deprioritized to focus on the project’s core functionality.
            </Typography>

            <Divider sx={{ my: 4 }} />

            {/* Interaction Instructions */}
            <Typography variant="h5" sx={{ color: 'var(--primary-color)', mt: 4 }}>
                How to Interact with This Project
            </Typography>
            <Typography paragraph>
                To try out the project as a client, you can create a client account and place orders. To explore the admin side, you’ll need to use the provided admin credentials:
            </Typography>
            <Typography>
                <strong>Admin Login</strong>: <Link to="/administrator-login">compjux.web.app/administrator-login</Link>
                <br />
                <strong>Email</strong>: test@dev.test
                <br />
                <strong>Password</strong>: test123
            </Typography>

            <Divider sx={{ my: 4 }} />

            {/* Figma Designs */}
            <Typography variant="h5" sx={{ color: 'var(--primary-color)', mt: 4, mb: 2 }}>
                Figma Designs
            </Typography>
            <Typography paragraph>
                Below are initial designs for the admin side of the project, which I created myself. I researched similar systems to design a user-friendly layout. The client-side design combines inspiration from popular PC-selling websites like iBUYPOWER and Origin PC.
            </Typography>

            {/* 3-column grid of Figma images */}
            <Grid container spacing={2}>
                {figmaImages.map((image, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box
                            component="img"
                            src={image}
                            alt={`Figma design ${index + 1}`}
                            onClick={() => handleClickOpen(image)}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                border: '1px solid var(--softGray-color)',
                            }}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* Dialog for enlarged image */}
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    {selectedImage && (
                        <Box
                            component="img"
                            src={selectedImage}
                            alt="Enlarged Figma design"
                            sx={{ width: '100%', height: 'auto' }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default DocumentationPage;