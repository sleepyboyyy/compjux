import React from 'react';
import {Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {useNavigate} from "react-router-dom";

interface OrdersTableProps {
    data: any[]
}

function OrdersTable({ data }: OrdersTableProps) {
    const navigate = useNavigate();

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
                                Order ID
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid #D2D2D2' }}>
                                Order Date
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid #D2D2D2' }}>
                                Order Address
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid #D2D2D2' }}>
                                Order Status
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid #D2D2D2' }}>
                                Order Total Price
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid #D2D2D2' }}>
                                Order Details
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid #D2D2D2' }}>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {/* Table Body */}
                    <TableBody>
                        {/* Replace these rows with "example" text */}
                        {data.length === 0 && <p>No data found for that collection</p>}
                        {data.map((singleData) => (
                            <TableRow key={singleData.id}>
                                <TableCell align="center" sx={{ borderBottom: '1px solid #D2D2D2', color: 'var(--secondary-color)' }}>

                                </TableCell>
                                <TableCell align="center" sx={{ width: '120px', borderBottom: '1px solid #D2D2D2', color: 'var(--secondary-color)' }}>
                                    #{singleData.id.substring(0, 4).toUpperCase()}
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: '1px solid #D2D2D2', color: 'var(--secondary-color)' }}>
                                    {new Date(singleData.createdAt.seconds * 1000).toLocaleDateString('en-GB')}
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: '1px solid #D2D2D2', color: 'var(--secondary-color)' }}>
                                    {singleData.address}
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: '1px solid #D2D2D2', color: 'var(--secondary-color)' }}>
                                    {singleData.order_status}
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: '1px solid #D2D2D2', color: 'var(--priceGreen-color)' }}>
                                    ${singleData.items_total_price}
                                </TableCell>
                                <TableCell align="center" sx={{ width: '140px', borderBottom: '1px solid #D2D2D2' }}>
                                    <IconButton aria-label="edit" size="small" onClick={() => navigate(``)} >
                                        <BorderColorIcon sx={{ color: 'var(--secondary-color)' }} />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: '1px solid #D2D2D2', color: 'var(--secondary-color)' }}>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default OrdersTable;