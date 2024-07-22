import './adminStorage_addItem.css'
import AdminNavigation from "../../components/developer_components/AdminNavigation/AdminNavigation";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,} from '@mui/material';
import {useState} from "react";
import GpuForm from "../../components/developer_components/AdminStorage_addItem_Forms/AdminStorage_addItem_GPUForm/GpuForm";
import CPUForm
    from "../../components/developer_components/AdminStorage_addItem_Forms/AdminStorage_adItem_CPUForm/CPUForm";
import MotherboardForm
    from "../../components/developer_components/AdminStorage_addItem_Forms/AdminStorage_addItem_MotherboardForm/MotherboardForm";

function AdminStorageAddItem() {
    const [selectedCollection, setSelectedCollection] = useState('');

    // handlers
    // changeHandler
    const handleChange = (event: SelectChangeEvent) => {
        setSelectedCollection(event.target.value as string);
    };

    return (
        <AdminNavigation page="STORAGE">
            <>
                {/*as -> admin storage*/}
                <div className="as_addItem_container">
                    <div className="as_addItem_collectionSelector ">
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel
                                    id="demo-simple-select-label"
                                    sx={{
                                        color: 'var(--primary-color)',
                                        '&.Mui-focused': {
                                            color: 'var(--primary-color)',
                                        }
                                    }}
                                >Selected Collection</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedCollection}
                                    label="Selected Collection"
                                    onChange={handleChange}
                                    sx={{
                                        color: 'var(--primary-color)',
                                        '& .MuiSelect-select': {
                                            color: 'var(--primary-color)',
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'var(--primary-color)',
                                            borderWidth: '2px',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'var(--primary-color)',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'var(--primary-color)',
                                        },
                                    }}
                                >
                                    <MenuItem value="gpu">GPU Collection</MenuItem>
                                    <MenuItem value="cpu">CPU Collection</MenuItem>
                                    <MenuItem value="motherboard">Motherboard Collection</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>

                    <div className="as_addItem_inputFormContainer">
                        { selectedCollection === "gpu" && <GpuForm />}
                        { selectedCollection === "cpu" && <CPUForm />}
                        { selectedCollection === "motherboard" && <MotherboardForm />}
                    </div>
                </div>
            </>
        </AdminNavigation>
    );
}

export default AdminStorageAddItem;