import React, {useState} from 'react';
import AdminNavigation from "../../components/AdminNavigation";
import {
    Box,
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
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Button from "@mui/material/Button";
import AdminProductBuilderTable from "../../components/AdminProductBuilderTable";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {useNavigate} from "react-router-dom";

function AdminProductBuilder() {
    // Components state
    const [cpu, setCpu] = useState("");
    const [gpu, setGpu] = useState("");
    const [ram, setRam] = useState("");
    const [storage, setStorage] = useState("");
    const [psu, setPsu] = useState("");
    const [pcCase, setPcCase] = useState("");
    const [cooler, setCooler] = useState("");
    const [motherboard, setMotherboard] = useState("");

    const navigate = useNavigate();

    return (
        <AdminNavigation page="PRODUCTS">
            <Box
                sx={{
                    width: '90%',
                    margin: '64px auto',
                    position: 'relative',
                    padding: '64px 0',
                    borderRadius: '8px',
                    backgroundColor: 'var(--softWhite-color)'
                }}
            >
                <IconButton
                    onClick={() => navigate('/admin-products')}
                    sx={{
                        position: 'absolute',
                        right: 5,
                        top: 5,
                        color: 'var(--primary-color)',
                    }}
                >
                    <ArrowBackRoundedIcon sx={{ fontSize: 35 }} />
                </IconButton>

                <Box sx={{ marginBottom: '16px' }}>
                    <Typography variant="h3" sx={{ textAlign: 'center' }}>Select PC Parts</Typography>
                </Box>

                <Box>
                    <AdminProductBuilderTable />
                </Box>

                <Box sx={{
                    width: '65%',
                    margin: '16px auto 0 auto'
                }}>
                    <Button sx={{ width: '100%', padding: '18px 0', backgroundColor: 'var(--secondary-color)', color: 'var(--softWhite-color)' }}>
                        Build Product
                    </Button>
                </Box>
            </Box>
        </AdminNavigation>
    );
}

export default AdminProductBuilder;