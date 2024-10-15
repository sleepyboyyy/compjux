import {doc, updateDoc} from "firebase/firestore";
import AdminNavigation from "../../components/AdminNavigation";
import {
    Box, Dialog, DialogActions, DialogTitle,
    IconButton, TextField,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import AdminProductBuilderTable from "../../components/AdminProductBuilderTable";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {useNavigate} from "react-router-dom";
import {ComponentKey, usePCComponentsContext} from "../../context/PCComponentsContext";
import {useFirestore} from "../../hooks/useFirestore";
import {projectFirestore} from "../../firebase/firebase";
import React, {useState} from "react";

function AdminProductBuilder() {
    // Text field state
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [isAddProductDialogOpen, setAddProductDialogOpen] = useState(false);

    const navigate = useNavigate();
    const { selectedComponents, resetComponents } = usePCComponentsContext();
    const { addDocument } = useFirestore("products");

    let isEverythingSelected = helperCheckComponentsState(selectedComponents);

    // handlers
    const handleBuildProduct = async () => {
        // Calculate product total price
        const totalPrice = Object.values(selectedComponents).reduce((sum, component) => {
            return sum + component.price;
        }, 0);

        const productData = {
            gpu: selectedComponents.gpu.id,
            cpu: selectedComponents.cpu.id,
            psu: selectedComponents.psu.id,
            ram: selectedComponents.ram.id,
            case: selectedComponents.case.id,
            storage: selectedComponents.storage.id,
            cooling_system: selectedComponents.cooling_system.id,
            motherboard: selectedComponents.motherboard.id,
            total_price: totalPrice,
            product_name: productName,
            quantity: quantity
        };

        try {
            // Add product to 'products' collection
            await addDocument(productData);

            // Update components
            for (const key in selectedComponents) {
                const component = selectedComponents[key as ComponentKey];
                const currentDoc = doc(projectFirestore, key, component.id);
                const updates = {
                    quantity: component.quantity - 1,
                };
                await updateDoc(currentDoc, updates);
            }

            // Reset selected components and navigate back
            resetComponents();
            navigate('/admin-products');
        } catch (e) {
            console.error("Error adding product: ", e);
        }
    }

    const handleAddProductDialogOpen = () => {
        setAddProductDialogOpen(true);
    }

    const handleAddProductDialogClose = () => {
        setAddProductDialogOpen(false);
    }

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

                <Box
                    display="flex"
                    justifyContent="center"
                    gap={2}
                    sx={{
                        width: '65%',
                        margin: '16px auto 0 auto',
                    }}
                >
                    <TextField
                        required
                        onChange={(e) => setProductName(e.target.value)}
                        id="outlined-required"
                        label="Product Name"
                        defaultValue=""
                        sx={{ width: '50%' }}
                    />

                    <TextField
                        required
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        id="outlined-required"
                        label="Quantity"
                        defaultValue=""
                        sx={{ width: '50%' }}
                    />
                </Box>

                <Box sx={{
                    width: '65%',
                    margin: '24px auto 0 auto'
                }}>
                    {isEverythingSelected && <Button
                        onClick={handleAddProductDialogOpen}
                        sx={{
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
                        }}>
                        Build Product
                    </Button>}
                </Box>

                {/*  Add Item Dialog  */}
                <Dialog open={isAddProductDialogOpen} onClose={handleAddProductDialogClose}>
                    <DialogTitle sx={{ color: 'var(--secondary-color)' }}>Are you sure you want to create this product?</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleAddProductDialogClose} sx={{ color: 'var(--secondary-color)', marginRight: "8px" }}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleBuildProduct}
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
        </AdminNavigation>
    );
}

export default AdminProductBuilder;

const helperCheckComponentsState = (components: Record<ComponentKey, any>): boolean => {
    return Object.values(components).every(component => component !== null);
};