import React, {useState} from 'react';
import {
    Dialog, DialogActions, DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Button from "@mui/material/Button";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {useNavigate} from "react-router-dom";
import {ComponentKey, usePCComponentsContext} from "../../context/PCComponentsContext";

function AdminProductBuilderTable() {
    const navigate = useNavigate();
    const { selectedComponents, onUpdateComponent } = usePCComponentsContext();

    // State for managing the confirmation dialog for item removal
    const [isRemoveDialogOpen, setRemoveDialogOpen] = useState(false);
    const [selectedComponentTypeToRemove, setSelectedComponentTypeToRemove] = useState<ComponentKey | null>(null);

    // handlers
    // handle add click
    const handleAddClick = (componentType: ComponentKey) => {
        navigate(`select/${componentType}`);
    };

    const handleRemoveClick = (componentType: ComponentKey) => {
        setSelectedComponentTypeToRemove(componentType);
        setRemoveDialogOpen(true);
    };

    const handleRemoveDialogClose = () => {
        setRemoveDialogOpen(false);
    };

    const handleRemoveConfirm = () => {
        if (selectedComponentTypeToRemove) {
            onUpdateComponent(selectedComponentTypeToRemove, null);
        }
        setRemoveDialogOpen(false);
    };

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    boxShadow: 0,
                    width: '65%',
                    margin: '0 auto'
                }}
            >
                <Table sx={{ minWidth: '650px' }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'var(--softWhite-color)' }}>
                            <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '140px' }}>
                                Component
                            </TableCell>
                            <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '250px' }}>
                                Selection
                            </TableCell>
                            <TableCell align='left' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                                Component Details
                            </TableCell>
                            <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '80px' }}>

                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {["gpu", "cpu", "motherboard", "psu", "storage", "ram", "case", "cooling_system"].map((component) => {
                            const componentKey = component as ComponentKey;
                            const selectedComponent = selectedComponents[componentKey];

                            return (
                                <TableRow key={component} sx={{ backgroundColor: 'var(--softWhite-color)' }}>
                                    <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '140px' }}>
                                        {component}
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '320px', padding: '0 16px' }}>
                                        {!selectedComponent && (
                                            <Button
                                                variant="contained"
                                                startIcon={<AddRoundedIcon />}
                                                sx={{
                                                    backgroundColor: 'var(--secondary-color)',
                                                    color: 'var(--softWhite-color)',
                                                    borderRadius: '8px',
                                                    width: '100%',
                                                    '&:hover': { opacity: 1, backgroundColor: "var(--primary-color)" }
                                                }}
                                                onClick={() => handleAddClick(componentKey)}
                                            >
                                                Choose a {component}
                                            </Button>
                                        )}
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                                        {selectedComponent ? (
                                            <>
                                                <Typography><strong>Model:</strong> {selectedComponent.model}</Typography>
                                                <Typography><strong>Brand:</strong> {selectedComponent.brand}</Typography>
                                                <Typography><strong>Price:</strong> ${selectedComponent.price}</Typography>
                                            </>
                                        ) : (
                                            <Typography>Not Selected</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                                        {selectedComponent && (
                                            <IconButton
                                                aria-label="remove"
                                                size="small"
                                                onClick={() => handleRemoveClick(componentKey)}
                                            >
                                                <CloseRoundedIcon sx={{ color: 'var(--secondary-color)' }} />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Remove Item Dialog */}
            <Dialog open={isRemoveDialogOpen} onClose={handleRemoveDialogClose}>
                {selectedComponentTypeToRemove && selectedComponents[selectedComponentTypeToRemove] && (
                    <DialogTitle sx={{ color: 'var(--secondary-color)' }}>
                        Are you sure you want to remove the selected {selectedComponents[selectedComponentTypeToRemove]?.brand} {selectedComponents[selectedComponentTypeToRemove]?.model}?
                    </DialogTitle>
                )}
                <DialogActions>
                    <Button onClick={handleRemoveDialogClose} sx={{ color: 'var(--secondary-color)', marginRight: "8px" }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleRemoveConfirm}
                        sx={{
                            backgroundColor: '#25A933',
                            color: 'var(--softWhite-color)',
                            '&:hover': { opacity: 0.7, backgroundColor: "#25A933" },
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AdminProductBuilderTable;