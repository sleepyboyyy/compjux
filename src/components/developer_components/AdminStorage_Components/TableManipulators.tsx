import React, {useState} from 'react';
import {Box, Button, TextField, MenuItem, Select, InputAdornment, SelectChangeEvent} from '@mui/material';
import { Search, FilterList, Sort } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface ChildProps {
    handleAddItem: () => void;
    onCollectionChange: (collection: string) => void;
}

const TableManipulators: React.FC<ChildProps> = ({ handleAddItem, onCollectionChange }) => {
    const [selectedCollection, setSelectedCollection] = useState('gpu');

    // handlers
    // handle change
    const handleChange = (event: SelectChangeEvent) => {
        const newCollection = event.target.value as string;
        setSelectedCollection(newCollection); // Update local state
        onCollectionChange(newCollection);    // Notify parent component
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-around"
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
                {/* Filter Button */}
                <Button
                    variant="contained"
                    size="medium"
                    startIcon={<FilterList />}
                    sx={{ backgroundColor: 'var(--secondary-color)' }}
                >
                    Filter by
                </Button>

                {/* Sort Button */}
                <Button
                    variant="contained"
                    size="medium"
                    startIcon={<Sort />}
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
        </Box>
    );
};

export default TableManipulators;
