import {Box, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import React from 'react';

function StorageTable() {
    return (
        <Box sx={{  }}>
            <TableContainer
                component={Paper}
                sx={{
                    borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px',
                    boxShadow: 3,
                    width: '95%',
                    margin: "0 auto"
                }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    {/* Table Header */}
                    <TableHead >
                        <TableRow sx={{ backgroundColor: "#DEE0E1" }}>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid #D2D2D2' }}>

                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid #D2D2D2' }}>
                                #
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid #D2D2D2' }}>
                                Item Brand
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid #D2D2D2' }}>
                                Item Model
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid #D2D2D2' }}>
                                Item Price
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid #D2D2D2' }}>
                                Item Quantity
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid #D2D2D2' }}>
                                Item Details
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {/* Table Body */}
                    <TableBody>
                        {/* Replace these rows with "example" text */}
                        {Array.from({ length: 6 }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell align="center" sx={{ width: '50px', borderBottom: '1px solid #D2D2D2' }}>
                                    <Checkbox />
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: '1px solid #D2D2D2', color: 'var(--secondary-color)' }}>
                                    #Code
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: '1px solid #D2D2D2', color: 'var(--secondary-color)' }}>
                                    Example Data 1
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: '1px solid #D2D2D2', color: 'var(--secondary-color)' }}>
                                    Example Data 2
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: '1px solid #D2D2D2', color: '#25A933' }}>
                                    #DataCost
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: '1px solid #D2D2D2', color: 'var(--secondary-color)' }}>
                                    0
                                </TableCell>
                                <TableCell align="center" sx={{ width: '120px', borderBottom: '1px solid #D2D2D2' }}>
                                    <BorderColorIcon sx={{ color: 'var(--secondary-color)' }} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default StorageTable;