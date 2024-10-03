import {Box, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import React from 'react';

interface StorageTableProps {
    data: any[];  // Adjust the type based on your actual data structure
}

function StorageTable({ data }: StorageTableProps) {

    console.log(data);

    return (
        <Box>
            <TableContainer
                component={Paper}
                sx={{
                    boxShadow: 3,
                    width: '95%',
                    margin: "0 auto",
                    borderRadius: '0px'
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
                        {data.length === 0 && <p>No data found for that collection</p>}
                        {data.map((singleData) => (
                            <TableRow key={singleData.id}>
                                <TableCell align="center" sx={{ width: '50px', borderBottom: '1px solid #D2D2D2' }}>
                                    <Checkbox />
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: '1px solid #D2D2D2', color: 'var(--secondary-color)' }}>
                                    #{singleData.id.substring(0, 4).toUpperCase()}
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: '1px solid #D2D2D2', color: 'var(--secondary-color)' }}>
                                    {singleData.brand}
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: '1px solid #D2D2D2', color: 'var(--secondary-color)' }}>
                                    {singleData.model}
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: '1px solid #D2D2D2', color: '#25A933' }}>
                                    {singleData.price}$
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: '1px solid #D2D2D2', color: 'var(--secondary-color)' }}>
                                    {singleData.quantity}
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