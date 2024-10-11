import React from 'react';
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Button from "@mui/material/Button";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {useNavigate} from "react-router-dom";

function AdminProductBuilderTable() {
    const navigate = useNavigate();

    // handlers
    // handle add click
    const handleAddClick = (componentType:string) => {
        navigate(`select/${componentType}`);
    };

    return (
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
                    {["GPU", "CPU", "Motherboard", "PSU", "Storage", "RAM", "Case", "Cooling System"].map((component) => (
                        <TableRow key={component} sx={{ backgroundColor: 'var(--softWhite-color)' }}>
                            <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '140px' }}>
                                {component}
                            </TableCell>
                            <TableCell align='left' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '300px', padding: '0 16px' }}>
                                <Button
                                    variant="contained"
                                    startIcon={<AddRoundedIcon />}
                                    sx={{
                                        backgroundColor: 'var(--secondary-color)',
                                        color: 'var(--softWhite-color)',
                                        borderRadius: '8px',
                                        width: '100%',
                                    }}
                                    onClick={() => handleAddClick(component.toLowerCase())}
                                >
                                    Choose a {component}
                                </Button>
                            </TableCell>
                            <TableCell align='left' sx={{ borderBottom: '2px solid var(--secondary-color)' }} />
                            <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                                <IconButton aria-label="edit" size="small">
                                    <CloseRoundedIcon sx={{ color: 'var(--secondary-color)' }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AdminProductBuilderTable;