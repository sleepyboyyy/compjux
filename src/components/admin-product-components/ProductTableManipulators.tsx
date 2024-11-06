import {
    Box,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Divider, FormControlLabel,
    Grid,
    InputAdornment, Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import {Search, Sort} from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, {useState} from "react";

interface ProductTableManipulatorsProps {
    handleAddItem: () => void;
    onSortChange: (sortOption: string | null, direction: "asc" | "desc") => void;
    onSearchChange: (query: string) => void;
}

function ProductTableManipulators({ onSortChange, handleAddItem, onSearchChange }:ProductTableManipulatorsProps) {
    const [openDialog, setOpenDialog] = useState(false);
    const [sortOption, setSortOption] = useState<string | null>('none');
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">('asc');
    const [searchQuery, setSearchQuery] = useState("");

    // Sort handlers
    const handleSortCancel = () => {
        setOpenDialog(false);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value); // Update local search state
        onSearchChange(event.target.value); // Notify parent of the search query
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

                {/* Build Product Button */}
                <Button
                    variant="contained"
                    size="medium"
                    startIcon={<AddCircleIcon />}
                    onClick={handleAddItem}
                    sx={{ backgroundColor: '#25A933' }}
                >
                    Build a Product
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
                                        value="total_price"
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
}

export default ProductTableManipulators;