import React from 'react';
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function AdminProductBuilderTable() {
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
                    <TableRow sx={{ backgroundColor: 'var(--softWhite-color)' }}>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '140px' }}>
                            GPU
                        </TableCell>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '250px' }}>
                            + Choose a GPU
                        </TableCell>
                        <TableCell align='left' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                            NVidia GeForce RTX 4090 32GB 2520GHz
                        </TableCell>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                            <IconButton aria-label="edit" size="small">
                                <CloseRoundedIcon sx={{ color: 'var(--secondary-color)' }} />
                            </IconButton>
                        </TableCell>
                    </TableRow>

                    <TableRow sx={{ backgroundColor: 'var(--softWhite-color)' }}>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '140px' }}>
                            GPU
                        </TableCell>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '250px' }}>
                            + Choose a GPU
                        </TableCell>
                        <TableCell align='left' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                            NVidia GeForce RTX 4090 32GB 2520GHz
                        </TableCell>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                            <IconButton aria-label="edit" size="small">
                                <CloseRoundedIcon sx={{ color: 'var(--secondary-color)' }} />
                            </IconButton>
                        </TableCell>
                    </TableRow>

                    <TableRow sx={{ backgroundColor: 'var(--softWhite-color)' }}>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '140px' }}>
                            GPU
                        </TableCell>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '250px' }}>
                            + Choose a GPU
                        </TableCell>
                        <TableCell align='left' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                            NVidia GeForce RTX 4090 32GB 2520GHz
                        </TableCell>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                            <IconButton aria-label="edit" size="small">
                                <CloseRoundedIcon sx={{ color: 'var(--secondary-color)' }} />
                            </IconButton>
                        </TableCell>
                    </TableRow>

                    <TableRow sx={{ backgroundColor: 'var(--softWhite-color)' }}>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '140px' }}>
                            GPU
                        </TableCell>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '250px' }}>
                            + Choose a GPU
                        </TableCell>
                        <TableCell align='left' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                            NVidia GeForce RTX 4090 32GB 2520GHz
                        </TableCell>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                            <IconButton aria-label="edit" size="small">
                                <CloseRoundedIcon sx={{ color: 'var(--secondary-color)' }} />
                            </IconButton>
                        </TableCell>
                    </TableRow>

                    <TableRow sx={{ backgroundColor: 'var(--softWhite-color)' }}>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '140px' }}>
                            GPU
                        </TableCell>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '250px' }}>
                            + Choose a GPU
                        </TableCell>
                        <TableCell align='left' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                            NVidia GeForce RTX 4090 32GB 2520GHz
                        </TableCell>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                            <IconButton aria-label="edit" size="small">
                                <CloseRoundedIcon sx={{ color: 'var(--secondary-color)' }} />
                            </IconButton>
                        </TableCell>
                    </TableRow>

                    <TableRow sx={{ backgroundColor: 'var(--softWhite-color)' }}>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '140px' }}>
                            GPU
                        </TableCell>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '250px' }}>
                            + Choose a GPU
                        </TableCell>
                        <TableCell align='left' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                            NVidia GeForce RTX 4090 32GB 2520GHz
                        </TableCell>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                            <IconButton aria-label="edit" size="small">
                                <CloseRoundedIcon sx={{ color: 'var(--secondary-color)' }} />
                            </IconButton>
                        </TableCell>
                    </TableRow>

                    <TableRow sx={{ backgroundColor: 'var(--softWhite-color)' }}>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '140px' }}>
                            GPU
                        </TableCell>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '250px' }}>
                            + Choose a GPU
                        </TableCell>
                        <TableCell align='left' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                            NVidia GeForce RTX 4090 32GB 2520GHz
                        </TableCell>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                            <IconButton aria-label="edit" size="small">
                                <CloseRoundedIcon sx={{ color: 'var(--secondary-color)' }} />
                            </IconButton>
                        </TableCell>
                    </TableRow>

                    <TableRow sx={{ backgroundColor: 'var(--softWhite-color)' }}>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '140px' }}>
                            GPU
                        </TableCell>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)', width: '250px' }}>
                            + Choose a GPU
                        </TableCell>
                        <TableCell align='left' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                            NVidia GeForce RTX 4090 32GB 2520GHz
                        </TableCell>
                        <TableCell align='center' sx={{ borderBottom: '2px solid var(--secondary-color)' }}>
                            <IconButton aria-label="edit" size="small">
                                <CloseRoundedIcon sx={{ color: 'var(--secondary-color)' }} />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AdminProductBuilderTable;