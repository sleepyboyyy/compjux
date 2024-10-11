import React, {useState} from 'react';
import AdminNavigation from "../../components/AdminNavigation";
import {
    Box,
    IconButton,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import AdminProductBuilderTable from "../../components/AdminProductBuilderTable";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {useNavigate} from "react-router-dom";
import {ComponentKey, usePCComponentsContext} from "../../context/PCComponentsContext";

function AdminProductBuilder() {
    const navigate = useNavigate();
    const { selectedComponents, onUpdateComponent } = usePCComponentsContext();

    let isEverythingSelected = helperCheckComponentsState(selectedComponents);

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
                    {isEverythingSelected && <Button sx={{
                        width: '100%',
                        padding: '18px 0',
                        backgroundColor: 'var(--secondary-color)',
                        color: 'var(--softWhite-color)',
                        '&:hover': {opacity: 1, backgroundColor: "var(--primary-color)"}
                    }}>
                        Build Product
                    </Button>}

                    {!isEverythingSelected && <Button
                        disabled
                        sx={{
                            width: '100%',
                            padding: '18px 0',
                            backgroundColor: 'var(--softGray-color)',
                            color: 'var(--softWhite-color)',
                            '&:hover': {opacity: 1, backgroundColor: "var(--primary-color)"}
                        }}>
                        Build Product
                    </Button>}
                </Box>
            </Box>
        </AdminNavigation>
    );
}

export default AdminProductBuilder;

const helperCheckComponentsState = (components: Record<ComponentKey, any>): boolean => {
    return Object.values(components).every(component => component !== null);
};