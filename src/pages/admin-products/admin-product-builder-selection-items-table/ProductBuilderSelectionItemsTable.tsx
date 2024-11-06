import React, {useMemo, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useCollection} from "../../../hooks/useCollection";
import AdminNavigation from "../../../components/admin-navigation-components/AdminNavigation";
import {
    Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, Grid, IconButton, InputAdornment,
    Paper,
    Radio, RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Typography
} from "@mui/material";
import AdminTablePagination from "../../../components/misc-components/AdminTablePagination";
import Button from "@mui/material/Button";
import {Search, Sort} from "@mui/icons-material";
import {usePCComponentsContext} from "../../../context/PCComponentsContext";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

type ComponentProperties = {
    [key: string]: string[];
};

const componentProperties: ComponentProperties = {
    gpu: ['brand', 'model', 'core_clock_speed.boost', 'core_clock_speed.base', 'memory.type', 'memory.size', 'price', 'quantity'],
    cpu: ['brand', 'model', 'core_clock_speed.boost', 'core_clock_speed.base', 'cores_and_threads.cores', 'cores_and_threads.threads', 'memory_support.type', 'memory_support.speed', 'price', 'quantity'],
    case: ['brand', 'model', 'form_factor', 'price', 'quantity'],
    cooling_system: ['brand', 'model', 'fan_size', 'noise_level', 'rgb_lighting', 'rpm_range', 'type', 'price', 'quantity'],
    motherboard: ['brand', 'model', 'chipset', 'form_factor', 'memory.type', 'memory.slots', 'memory.max_size', 'memory.max_speed', 'price', 'quantity'],
    psu: ['brand', 'model', 'efficiency_rating', 'form_factor', 'power_output', 'price', 'quantity'],
    ram: ['brand', 'model', 'form_factor', 'memory_type', 'voltage', 'capacity.total_capacity', 'price', 'quantity'],
    storage: ['brand', 'model', 'form_factor', 'capacity', 'endurance', 'power_consumption.idle', 'read_speed', 'write_speed', 'type', 'price', 'quantity']
    // Add properties for other components...
};

function ProductBuilderSelectionItemsTable() {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    // Sort state
    const [sortType, setSortType] = useState<string>('none');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [isSortDialogOpen, setSortDialogOpen] = useState(false);
    // Add item dialog state
    const [isAddItemDialogOpen, setAddItemDialogOpen] = useState(false);

    const { componentType } = useParams<{ componentType: string }>();
    const { onUpdateComponent } = usePCComponentsContext();
    const navigate = useNavigate();

    // Use the custom hook to fetch data
    const { documents, error } = useCollection(componentType!, null, "asc");
    const itemsPerPage = 7;
    const properties = componentProperties[componentType!] || [];

    // Filter and sort documents based on search term and sort options
    const filteredAndSortedDocuments = useMemo(() => {
        if (!documents) return [];

        // Filter documents based on search term
        const filtered = documents.filter((item: any) => {
            return searchObject(item, searchTerm);
        });

        // Sort documents based on sortType and sortDirection
        if (sortType !== 'none') {
            filtered.sort((a: any, b: any) => {
                let valueA = a;
                let valueB = b;

                const keys = sortType.split('.');
                keys.forEach((key) => {
                    valueA = valueA ? valueA[key] : '';
                    valueB = valueB ? valueB[key] : '';
                });

                if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
                if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [documents, searchTerm, sortType, sortDirection, properties]);

    // Handler for search change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    // Handler for page change
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    // Handler for selecting an item
    const handleSelectItem = (item: any) => {
        setSelectedItem(item);
    };

    // Paginated documents
    const totalPages = documents ? Math.ceil(filteredAndSortedDocuments.length / itemsPerPage) : 1;
    const paginatedDocuments = filteredAndSortedDocuments.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    // Handlers for sort dialog
    const handleSortButtonClick = () => {
        setSortDialogOpen(true);
    };

    const handleSortDialogClose = () => {
        setSortDialogOpen(false);
    };

    const handleSortConfirm = () => {
        setSortDialogOpen(false);
    };

    // Handlers for add item dialog
    const handleAddItemDialogOpen = () => {
        setAddItemDialogOpen(true);
    }

    const handleAddItemDialogClose = () => {
        setAddItemDialogOpen(false);
    }

    const handleAddItemDialogConfirm = () => {
        if (componentType && selectedItem) {
            onUpdateComponent(componentType as any, selectedItem);
            navigate('/admin-products/product-builder');
        }
        setAddItemDialogOpen(false);
    }

    return (
        <AdminNavigation page="PRODUCTS">
            <Box sx={{ width: '80%', margin: '64px auto', position: 'relative' }}>
                <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '32px' }}>
                    Select {componentType?.toUpperCase()}
                </Typography>

                {error && (
                    <Typography color="error" sx={{ textAlign: 'center', marginBottom: '16px' }}>
                        {error}
                    </Typography>
                )}

                {selectedItem && (
                    <Box sx={{ margin: '0 auto 32px auto', padding: '16px', border: '1px solid #ccc', borderRadius: '8px', width: '95%', boxShadow: 3 }}>
                        <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                            Selected Component
                        </Typography>
                        <Typography>
                            <strong>Brand:</strong> {selectedItem.brand}
                        </Typography>
                        <Typography>
                            <strong>Model:</strong> {selectedItem.model}
                        </Typography>
                        <Typography>
                            <strong>Price:</strong> {selectedItem.price}$
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: '16px', backgroundColor: 'var(--primary-color)' }}
                            onClick={handleAddItemDialogOpen}
                        >
                            Add Item
                        </Button>
                    </Box>
                )}

                <IconButton
                    onClick={() => navigate('/admin-products/product-builder')}
                    sx={{
                        position: 'absolute',
                        right: 5,
                        top: 5,
                        color: 'var(--primary-color)',
                    }}
                >
                    <ArrowBackRoundedIcon sx={{ fontSize: 35 }} />
                </IconButton>

                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                        width: '95%',
                        padding: '20px',
                        borderTopLeftRadius: '8px', borderTopRightRadius: '8px',
                        borderBottom: '2px solid #D2D2D2',
                        boxShadow: 3,
                        margin: "0 auto",
                        backgroundColor: 'var(--softWhite-color)'
                    }}
                >
                    {/* Search Bar */}
                    <TextField
                        size="small"
                        variant="outlined"
                        placeholder="Search anything..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        sx={{ minWidth: 300 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Box display="flex" gap={2}>
                        {/* Sort Button */}
                        <Button
                            variant="contained"
                            size="medium"
                            startIcon={<Sort />}
                            onClick={handleSortButtonClick}
                            sx={{ backgroundColor: 'var(--secondary-color)' }}
                        >
                            Sort
                        </Button>
                    </Box>
                </Box>

                <TableContainer component={Paper} sx={{ width: '95%', margin: '0 auto', borderRadius: 0 }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#DEE0E1' }}>
                            <TableRow>
                                <TableCell align="center" sx={{ padding: '24px 0' }}>Select</TableCell>
                                {properties.map((property) => (
                                    <TableCell key={property} align='center'>
                                        {property.split('.').pop()?.replace('_', ' ')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedDocuments.map((item: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell align="center">
                                        <Radio
                                            checked={selectedItem?.id === item.id}
                                            onChange={() => handleSelectItem(item)}
                                        />
                                    </TableCell>
                                    {properties.map((property) => {
                                        const keys = property.split('.');
                                        let value = item;
                                        keys.forEach((key) => {
                                            value = value ? value[key] : '-';
                                        });

                                        return (
                                            <TableCell key={property} align="center">
                                                {typeof value === 'object' ? JSON.stringify(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <AdminTablePagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

                {/*  DIALOGS  */}
                {/*  Add Item Dialog  */}
                <Dialog open={isAddItemDialogOpen} onClose={handleAddItemDialogClose}>
                    <DialogTitle sx={{ color: 'var(--secondary-color)' }}>Are you sure you want to add <strong>{selectedItem && selectedItem.brand} {selectedItem && selectedItem.model}</strong> as an Item?</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleAddItemDialogClose} sx={{ color: 'var(--secondary-color)', marginRight: "8px" }}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddItemDialogConfirm}
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

                {/* Sort Dialog */}
                <Dialog open={isSortDialogOpen} onClose={handleSortDialogClose}>
                    <DialogTitle sx={{ color: 'var(--secondary-color)' }}>Sort Options</DialogTitle>
                    <DialogContent sx={{ px: 3 }}>
                        {/* Sort Type Section */}
                        <Box mb={2}>
                            <Box sx={{ color: 'var(--secondary-color)', mb: 1 }}>Sort Type</Box>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <RadioGroup row value={sortType} onChange={(e) => setSortType(e.target.value)}>
                                        <FormControlLabel
                                            value="none"
                                            control={<Radio sx={{ color: 'var(--primary-color)', '&.Mui-checked': { color: 'var(--primary-color)' } }} />}
                                            label="None"
                                            sx={{ color: 'var(--secondary-color)' }}
                                        />
                                        <FormControlLabel
                                            value="price"
                                            control={<Radio sx={{ color: 'var(--primary-color)', '&.Mui-checked': { color: 'var(--primary-color)' } }} />}
                                            label="Price"
                                            sx={{ color: 'var(--secondary-color)' }}
                                        />
                                        <FormControlLabel
                                            value="quantity"
                                            control={<Radio sx={{ color: 'var(--primary-color)', '&.Mui-checked': { color: 'var(--primary-color)' } }} />}
                                            label="Quantity"
                                            sx={{ color: 'var(--secondary-color)' }}
                                        />
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Divider */}
                        <Divider sx={{ width: '35%', mx: 'auto', mb: 2, backgroundColor: "var(--secondary-color)" }} />

                        {/* Sort Direction Section */}
                        <Box>
                            <Box sx={{ color: 'var(--secondary-color)', mb: 1 }}>Sort Direction</Box>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <RadioGroup row value={sortDirection} onChange={(e) => setSortDirection(e.target.value as 'asc' | 'desc')}>
                                        <FormControlLabel
                                            value="asc"
                                            control={<Radio sx={{ color: 'var(--primary-color)', '&.Mui-checked': { color: 'var(--primary-color)' } }} />}
                                            label="Ascending"
                                            sx={{ color: 'var(--secondary-color)' }}
                                        />
                                        <FormControlLabel
                                            value="desc"
                                            control={<Radio sx={{ color: 'var(--primary-color)', '&.Mui-checked': { color: 'var(--primary-color)' } }} />}
                                            label="Descending"
                                            sx={{ color: 'var(--secondary-color)' }}
                                        />
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSortDialogClose} sx={{ color: 'var(--secondary-color)', marginRight: "8px" }}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSortConfirm}
                            sx={{
                                backgroundColor: '#25A933',
                                color: 'var(--softWhite-color)',
                                '&:hover': { opacity: 0.7, backgroundColor: "#25A933" },
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

// Helper function to search for a term in an object, including nested properties
const searchObject = (obj: any, searchTerm: string): boolean => {
    // Loop through each key in the object
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            // If the value is an object, call searchObject recursively
            if (typeof value === 'object' && value !== null) {
                if (searchObject(value, searchTerm)) {
                    return true;
                }
            } else if (typeof value === 'string' || typeof value === 'number') {
                // Check if the value contains the search term (case-insensitive)
                if (value.toString().toLowerCase().includes(searchTerm)) {
                    return true;
                }
            }
        }
    }
    return false;
};

export default ProductBuilderSelectionItemsTable;