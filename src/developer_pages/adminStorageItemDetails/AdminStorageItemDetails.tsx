import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDocument} from "../../hooks/useDocument";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
    Box, Button, Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    Grid,
    IconButton, Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DeleteIcon from '@mui/icons-material/Delete';
import {useFirestore} from "../../hooks/useFirestore";

function AdminStorageItemDetails() {
    const [openDialog, setOpenDialog] = useState(false);

    const { id, collection } = useParams();
    const navigate = useNavigate();

    const { document } = useDocument(collection!, id!);
    const { deleteDocument } = useFirestore(collection!);

    if (!document) {
        return <p>Loading...</p>;
    }

    // handle delete button click
    const handleDeleteDialogOpen = () => {
        setOpenDialog(true);
    }

    const handleDeleteDialogClose = () => {
        setOpenDialog(false);
    }

    const handleDeleteDialogConfirm = async () => {
        await deleteDocument(id!);
        navigate('/admin_storage');
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
                gap={2}
                sx={{
                    position: 'absolute',
                    right: "1%",
                    top: "1%"
                }}
            >
                <IconButton
                    onClick={() => navigate('/admin_storage')}
                    sx={{
                        color: 'var(--primary-color)',
                    }}
                >
                    <ArrowBackRoundedIcon sx={{ fontSize: 60 }} />
                </IconButton>

                <IconButton
                    onClick={handleDeleteDialogOpen}
                    sx={{
                        color: 'var(--primary-color)',
                    }}
                >
                    <DeleteIcon sx={{ fontSize: 60 }} />
                </IconButton>
            </Box>


            <Typography variant="h4" sx={{marginBottom: '16px', color: 'var(--secondary-color)'}}>
                {document.brand} - {document.model}
            </Typography>
            <Typography variant="h6" sx={{marginBottom: '16px', color: 'var(--secondary-color)'}}>
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
        .filter(([key]) => key !== 'id' && key !== 'createdAt' && key !== 'brand' && key !== 'model')
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