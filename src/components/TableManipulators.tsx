import React, {useState} from 'react';
import {
    Box,
    Button,
    TextField,
    MenuItem,
    Select,
    InputAdornment,
    SelectChangeEvent,
    DialogActions,
    DialogContent, Dialog, RadioGroup, DialogTitle, FormControlLabel, Radio, Grid, Divider
} from '@mui/material';
import { Search, Sort } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface ChildProps {
    handleAddItem: () => void;
    onCollectionChange: (collection: string) => void;
    onSortChange: (sortOption: string | null, direction: "asc" | "desc") => void;
    onSearchChange: (query: string) => void;
}

const TableManipulators: React.FC<ChildProps> = ({ handleAddItem, onCollectionChange, onSortChange, onSearchChange }) => {
    const [selectedCollection, setSelectedCollection] = useState('gpu');
    const [openDialog, setOpenDialog] = useState(false);
    const [sortOption, setSortOption] = useState<string | null>('none');
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">('asc');
    const [searchQuery, setSearchQuery] = useState("");

    // handlers
    // handle change
    const handleChange = (event: SelectChangeEvent) => {
        const newCollection = event.target.value as string;
        setSelectedCollection(newCollection); // Update local state
        onCollectionChange(newCollection);    // Notify parent component
    };

    const handleSortCancel = () => {
        setOpenDialog(false);
    };

    const handleSortConfirm = () => {
        setOpenDialog(false); // Close dialog
        onSortChange(sortOption === 'none' ? null : sortOption, sortDirection); // Pass the selected option to the parent
    };

    const handleSortOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSortOption(event.target.value); // Update local sort state
    };

    const handleSortDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value === "asc" ? setSortDirection("asc") : setSortDirection("desc")
    };

    const handleSortButtonClick = () => {
        setOpenDialog(true); // Open sort dialog
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value); // Update local search state
        onSearchChange(event.target.value); // Notify parent of the search query
    };

    return (
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
            {/* Dropdown for Item Type */}
            <Select
                displayEmpty
                value={selectedCollection}
                onChange={handleChange}
                sx={{ minWidth: 250 }}
                size="small"
            >
                <MenuItem value="" disabled>
                    Select a collection
                </MenuItem>
                <MenuItem value="gpu">GPU Collection</MenuItem>
                <MenuItem value="cpu">CPU Collection</MenuItem>
                <MenuItem value="motherboard">Motherboard Collection</MenuItem>
                <MenuItem value="ram">RAM Collection</MenuItem>
                <MenuItem value="psu">PSU Collection</MenuItem>
                <MenuItem value="case">Case Collection</MenuItem>
                <MenuItem value="storage">Storage Collection</MenuItem>
                <MenuItem value="cooling_system">Cooling System Collection</MenuItem>
            </Select>

            {/* Search Bar */}
            <TextField
                size="small"
                variant="outlined"
                placeholder="Search anything..."
                value={searchQuery}
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

                {/* Add Item Button */}
                <Button
                    variant="contained"
                    size="medium"
                    startIcon={<AddCircleIcon />}
                    onClick={handleAddItem}
                    sx={{ backgroundColor: '#25A933' }}
                >
                    Add Item
                </Button>
            </Box>

            {/* Sort Dialog */}
            <Dialog open={openDialog} onClose={handleSortCancel}>
                <DialogTitle sx={{ color: 'var(--secondary-color)' }}>Sort Options</DialogTitle>
                <DialogContent sx={{ px: 3 }}>
                    {/* Sort Type Section */}
                    <Box mb={2}>
                        <Box sx={{ color: 'var(--secondary-color)', mb: 1 }}>Sort Type</Box>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <RadioGroup row value={sortOption} onChange={handleSortOptionChange}>
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
                                <RadioGroup row value={sortDirection} onChange={handleSortDirectionChange}>
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
                    <Button onClick={handleSortCancel} sx={{ color: 'var(--secondary-color)', marginRight: "8px" }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSortConfirm}
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
    );
};

export default TableManipulators;
