import React, {useEffect, useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogTitle, IconButton, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useDocument} from "../../../hooks/useDocument";
import {doc, getDoc} from "firebase/firestore";
import {projectFirestore} from "../../../firebase/firebase";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import {useFirestore} from "../../../hooks/useFirestore";

function AdminProductsItemDetails() {
    const {id} = useParams();
    const {document} = useDocument("products", id!);
    const { deleteDocument } = useFirestore("products");
    const navigate = useNavigate();
    const [componentsData, setComponentsData] = useState<Record<string, any>>({});
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        if (document) {
            const fetchComponentsData = async () => {
                const componentsKeys = ["gpu", "cpu", "psu", "motherboard", "ram", "storage", "case", "cooling_system"];
                const fetchedData: Record<string, any> = {};

                for (const key of componentsKeys) {
                    try {
                        const docRef = doc(projectFirestore, key, document[key]);
                        const componentDoc = await getDoc(docRef);
                        if (componentDoc.exists()) {
                            fetchedData[key] = componentDoc.data();
                        } else {
                            console.error(`No document found for ${key}`);
                        }
                    } catch (err) {
                        console.error(`Error fetching document from ${key}:`, err);
                    }
                }

                setComponentsData(fetchedData);
            };

            fetchComponentsData();
        }
    }, [document]);

    if (!document || Object.keys(componentsData).length === 0) {
        return <p>Loading...</p>;
    }

    const formatPropertyName = (propertyPath: string) => {
        const propertyParts = propertyPath.split('.');
        return propertyParts[propertyParts.length - 1].replace(/_/g, ' ').replace(/^\w/, char => char.toUpperCase());
    };

    const renderProperties = (componentKey: string, properties: string[]) => {
        return properties.map((propertyPath) => {
            const value = propertyPath.split('.').reduce((acc, key) => acc && acc[key], componentsData[componentKey]);
            return (
                <Typography key={propertyPath} sx={{ marginBottom: '4px' }}>
                    <strong style={{ color: 'var(--secondary-color)'}} >{formatPropertyName(propertyPath)}:</strong> {value}
                </Typography>
            );
        });
    };

    // Delete dialog handlers
    const handleDeleteDialogOpen = () => {
        setOpenDialog(true);
    }

    const handleDeleteDialogClose = () => {
        setOpenDialog(false);
    }

    const handleDeleteDialogConfirm = async () => {
        await deleteDocument(document.id);
        setOpenDialog(false);
        navigate('/admin-products');
    }

    return (
        <Box sx={{width: '90%', margin: '32px auto'}}>
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
                    onClick={() => navigate('/admin-products')}
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

            <Box sx={{textAlign: 'center'}}>
                <Typography variant="h2" sx={{ color: 'var(--secondary-color)'}}>{document.product_name} - <strong style={{color: '#25A933'}}>{document.total_price}$</strong></Typography>
            </Box>

            {/* Data Container */}
            <Box
                display="flex"
                justifyContent="center"
                gap={8}
                sx={{ marginTop: '32px' }}
            >
                {/* Left Container */}
                <Box>
                    <Box sx={{ marginTop: '16px' }}>
                        <Typography variant="h3" sx={{ fontSize: '32px', marginBottom: '8px', color: 'var(--primary-color)', fontWeight: '600' }}>GPU:</Typography>
                        <Box>
                            {renderProperties("gpu", ["brand", "model", "core_clock_speed.base", "core_clock_speed.boost", "memory.size", "memory.type"])}
                        </Box>
                    </Box>

                    <Box sx={{ marginTop: '16px' }}>
                        <Typography variant="h3" sx={{ fontSize: '32px', marginBottom: '8px', color: 'var(--primary-color)', fontWeight: '600' }}>CPU:</Typography>
                        <Box>
                            {renderProperties("cpu", ["brand", "model", "core_clock_speed.base", "core_clock_speed.boost", "cores_and_threads.cores", "cores_and_threads.threads", "cache.l3_cache", "integrated_graphics.model", "memory_support.max_size", "memory_support.type", "memory_support.speed", "power.tdp", "power.max_turbo_power"])}
                        </Box>
                    </Box>

                    <Box sx={{ marginTop: '16px' }}>
                        <Typography variant="h3" sx={{ fontSize: '32px', marginBottom: '8px', color: 'var(--primary-color)', fontWeight: '600' }}>PSU:</Typography>
                        <Box>
                            {renderProperties("psu", ["brand", "model", "form_factor", "power_output"])}
                        </Box>
                    </Box>

                    <Box sx={{ marginTop: '16px' }}>
                        <Typography variant="h3" sx={{ fontSize: '32px', marginBottom: '8px', color: 'var(--primary-color)', fontWeight: '600' }}>RAM:</Typography>
                        <Box>
                            {renderProperties("ram", ["brand", "model", "capacity.total_capacity", "form_factor", "memory_type", "speed.base", "speed.max", "voltage"])}
                        </Box>
                    </Box>
                </Box>

                {/* Right Container */}
                <Box>
                    <Box sx={{ marginTop: '16px' }}>
                        <Typography variant="h3" sx={{ fontSize: '32px', marginBottom: '8px', color: 'var(--primary-color)', fontWeight: '600' }}>Motherboard:</Typography>
                        <Box>
                            {renderProperties("motherboard", ["brand", "model", "chipset", "bios.type", "form_factor", "memory.max_size", "memory.max_speed", "memory.slots", "memory.type", "socket"])}
                        </Box>
                    </Box>

                    <Box sx={{ marginTop: '16px' }}>
                        <Typography variant="h3" sx={{ fontSize: '32px', marginBottom: '8px', color: 'var(--primary-color)', fontWeight: '600' }}>Case:</Typography>
                        <Box>
                            {renderProperties("case", ["brand", "model", "expansion_slots", "form_factor"])}
                        </Box>
                    </Box>

                    <Box sx={{ marginTop: '16px' }}>
                        <Typography variant="h3" sx={{ fontSize: '32px', marginBottom: '8px', color: 'var(--primary-color)', fontWeight: '600' }}>Cooling System:</Typography>
                        <Box>
                            {renderProperties("cooling_system", ["brand", "model", "airflow", "fan_size", "noise_level", "type"])}
                        </Box>
                    </Box>

                    <Box sx={{ marginTop: '16px' }}>
                        <Typography variant="h3" sx={{ fontSize: '32px', marginBottom: '8px', color: 'var(--primary-color)', fontWeight: '600' }}>Storage:</Typography>
                        <Box>
                            {renderProperties("storage", ["brand", "model", "capacity", "endurance", "form_factor", "read_speed", "write_speed", "type"])}
                        </Box>
                    </Box>
                </Box>
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

export default AdminProductsItemDetails;
