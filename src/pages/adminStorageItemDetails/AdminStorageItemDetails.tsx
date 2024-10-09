import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDocument} from "../../hooks/useDocument";
import {
    Box, Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Divider,
    IconButton,
    Typography
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DeleteIcon from '@mui/icons-material/Delete';
import {useFirestore} from "../../hooks/useFirestore";

function AdminStorageItemDetails() {
    // State
    const [openDialog, setOpenDialog] = useState(false);

    // Hooks
    const { id, collection } = useParams();
    const navigate = useNavigate();

    const { document } = useDocument(collection!, id!);
    const { deleteDocument } = useFirestore(collection!);

    if (!document) {
        return <p>Loading...</p>;
    }

    // Handlers
    // handle delete button click
    const handleDeleteDialogOpen = () => {
        setOpenDialog(true); // Open dialog
    }

    const handleDeleteDialogClose = () => {
        setOpenDialog(false); // Close dialog
    }

    const handleDeleteDialogConfirm = async () => {
        await deleteDocument(id!); // Delete document and navigate to storage
        navigate('/admin-storage');
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ margin: "64px 0" }}
        >
            <Box
                display="flex"
                gap={1}
                sx={{
                    position: 'absolute',
                    right: "1%",
                    top: "1%"
                }}
            >
                <IconButton
                    onClick={() => navigate('/admin-storage')}
                    sx={{
                        color: 'var(--primary-color)',
                    }}
                >
                    <ArrowBackRoundedIcon sx={{ fontSize: 35 }} />
                </IconButton>

                <IconButton
                    onClick={handleDeleteDialogOpen}
                    sx={{
                        color: 'var(--primary-color)',
                    }}
                >
                    <DeleteIcon sx={{ fontSize: 35 }} />
                </IconButton>
            </Box>


            <Typography variant="h4" sx={{marginBottom: '16px', color: 'var(--secondary-color)'}}>
                {document.brand} - {document.model}
            </Typography>
            <Typography variant="h6" sx={{marginBottom: '16px', color: 'var(--secondary-color)', textAlign: 'center'}}>
                <strong>{document.price}$</strong><br/>
                Created at: {new Date(document.createdAt.seconds * 1000).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}
            </Typography>
            <Divider sx={{ width: '35%', mx: 'auto', mb: 2, backgroundColor: "var(--secondary-color)" }} />
            <Box>
                {renderProperties(document)}
            </Box>

            <Dialog open={openDialog} onClose={handleDeleteDialogClose}>
                <DialogTitle sx={{ color: 'var(--secondary-color)' }}>Are you sure you want to delete this item?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} sx={{ color: 'var(--secondary-color)', marginRight: "8px" }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteDialogConfirm}
                        sx={{
                            backgroundColor: '#25A933',
                            color: 'var(--softWhite-color)',
                            '&:hover': { opacity: 0.7, backgroundColor: "#25A933" }, // Adjust hover opacity
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

// Helper function to recursively render nested properties
const renderProperties = (obj: any, level: number = 0) => {
    return Object.entries(obj)
        .filter(([key]) => key !== 'id' && key !== 'createdAt' && key !== 'brand' && key !== 'model' && key !== 'price')
        .map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
            // Recursively render child properties
            return (
                <Box key={key} sx={{marginLeft: `${level * 16}px`, marginBottom: '8px'}}>
                    <Typography variant="h5"
                                sx={{color: 'var(--secondary-color)', display: 'inline-flex', alignItems: 'center'}}>
                        <strong>{key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}: </strong>
                    </Typography>
                    {renderProperties(value, level + 1)}
                </Box>
            );
        } else {
            // Render main property
            return (
                <Box key={key} sx={{ marginLeft: `${level * 16}px`, display: 'flex', alignItems: 'center' }}>
                    <Typography
                        variant="h5"
                        sx={{
                            color: level === 0 ? 'var(--secondary-color)' : 'grey',
                            display: 'flex', // Use flex to align items properly
                            alignItems: 'center' // Center the items vertically
                        }}
                    >
                        <strong>
                            {`${key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}: `}
                        </strong>
                        <span>
                            &nbsp;
                            {typeof value === 'object'
                                ? JSON.stringify(value)
                                : String(value) // Ensure value is converted to a string
                            }
                        </span>
                    </Typography>
                </Box>
            );
        }
    });
};

export default AdminStorageItemDetails;