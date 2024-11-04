import React, {useState} from 'react';
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControlLabel, IconButton,
    Paper, Radio, RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@mui/material";
import {useDocument} from "../../hooks/useDocument";
import {useNavigate, useParams} from "react-router-dom";
import {useFirestore} from "../../hooks/useFirestore";
import EditIcon from '@mui/icons-material/Edit';
import AdminNavigation from "../../components/AdminNavigation";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

function OrdersDetailsPage() {
    const { id } = useParams();
    const { document } = useDocument('orders', id!);
    const { updateDocument } = useFirestore('orders');
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string>(document?.order_status || '');

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedStatus(event.target.value);
    };

    const handleConfirm = async () => {
        await updateDocument(id!, { order_status: selectedStatus });
        setOpenDialog(false);
    };

    return (
        <AdminNavigation page="ORDERS">
            <Box
                sx={{
                    position: 'relative',
                    backgroundColor: 'var(--softWhite-color)',
                    margin: '32px auto',
                    width: '35%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '32px',
                    borderRadius: '8px'
                }}
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
                        onClick={() => navigate('/admin-orders')}
                        sx={{
                            color: 'var(--primary-color)',
                        }}
                    >
                        <ArrowBackRoundedIcon sx={{ fontSize: 35 }} />
                    </IconButton>
                </Box>
                {document ? (
                    <>
                        <Box my={2} display="flex" alignItems="center" justifyContent="center" sx={{ border: '1px solid var(--softGray-color)', width: '342px', borderRadius: '8px' }}>
                            <Typography variant="h6" style={{ color: 'var(--primary-color)', marginRight: '10px' }}>
                                Order Status:
                            </Typography>
                            <Typography style={{ color: 'var(--secondary-color)', marginRight: '10px' }}>{document.order_status}</Typography>
                            <IconButton onClick={handleDialogOpen} style={{ color: 'var(--secondary-color)' }}>
                                <EditIcon />
                            </IconButton>
                        </Box>

                        <Typography variant="h5" mb={3} style={{ color: 'var(--secondary-color)' }}>
                            Order Details
                        </Typography>

                        <Typography variant="h6" style={{ color: 'var(--secondary-color)' }}>
                            Items Ordered:
                        </Typography>
                        <Box mt={1} style={{ color: 'var(--primary-color)' }}>
                            {document.items_ordered.map((item:any, index:number) => (
                                <Typography key={index}>{item}</Typography>
                            ))}
                        </Box>

                        <Typography variant="h6" style={{ marginTop: '20px', color: 'var(--secondary-color)' }}>
                            Total Price: <span style={{ color: 'var(--priceGreen-color)' }}>${document.items_total_price.toFixed(2)}</span>
                        </Typography>

                        <Typography variant="h6" style={{ color: 'var(--secondary-color)', marginTop: '20px' }}>
                            Billing Address
                        </Typography>
                        <TableContainer component={Paper} style={{ marginTop: '10px', width: '75%' }}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={{ color: 'var(--secondary-color)', fontWeight: 'bold', borderRight: '1px solid rgba(224, 224, 224, 1)' }}>First Name</TableCell>
                                        <TableCell>{document.firstName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ color: 'var(--secondary-color)', fontWeight: 'bold', borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Last Name</TableCell>
                                        <TableCell>{document.lastName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ color: 'var(--secondary-color)', fontWeight: 'bold', borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Address</TableCell>
                                        <TableCell>{document.address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ color: 'var(--secondary-color)', fontWeight: 'bold', borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Country and City</TableCell>
                                        <TableCell>{`${document.country}, ${document.city}`}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Dialog for status update */}
                        <Dialog open={openDialog} onClose={handleDialogClose}>
                            <DialogTitle style={{ color: 'var(--primary-color)' }}>Update Order Status</DialogTitle>
                            <DialogContent>
                                <RadioGroup value={selectedStatus} onChange={handleStatusChange}>
                                    <FormControlLabel value="processing order" control={<Radio />} label="Processing" />
                                    <FormControlLabel value="order confirmed" control={<Radio />} label="Order Confirmed" />
                                    <FormControlLabel value="shipped" control={<Radio />} label="Shipped" />
                                    <FormControlLabel value="order completed" control={<Radio />} label="Order Completed" />
                                </RadioGroup>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={handleDialogClose}
                                    style={{ backgroundColor: 'var(--hardGray-color)', color: 'var(--softWhite-color)' }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleConfirm}
                                    style={{ backgroundColor: 'var(--primary-color)', color: 'var(--softWhite-color)' }}
                                >
                                    Confirm
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                ) : (
                    <Typography variant="h6" style={{ color: 'var(--secondary-color)' }}>
                        Loading order details...
                    </Typography>
                )}
            </Box>
        </AdminNavigation>
    );
}

export default OrdersDetailsPage;