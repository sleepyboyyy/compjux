import './adminStorage_addItem.css'
import AdminNavigation from "../../components/developer_components/AdminNavigation/AdminNavigation";
import {Box, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent,} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import {useState} from "react";
import GpuForm from "../../components/developer_components/AdminStorage_addItem_Forms/AdminStorage_addItem_GPUForm/GpuForm";
import CPUForm
    from "../../components/developer_components/AdminStorage_addItem_Forms/AdminStorage_adItem_CPUForm/CPUForm";
import MotherboardForm
    from "../../components/developer_components/AdminStorage_addItem_Forms/AdminStorage_addItem_MotherboardForm/MotherboardForm";
import RamForm
    from "../../components/developer_components/AdminStorage_addItem_Forms/AdminStorage_addItem_RAMForm/RAMForm";
import PSUForm
    from "../../components/developer_components/AdminStorage_addItem_Forms/AdminStorage_addItem_PSUForm/PSUForm";
import CaseForm
    from "../../components/developer_components/AdminStorage_addItem_Forms/AdminStorage_addItem_CaseForm/CaseForm";
import StorageForm
    from "../../components/developer_components/AdminStorage_addItem_Forms/AdminStorage_addItem_StorageForm/StorageForm";
import CoolingSystemForm
    from "../../components/developer_components/AdminStorage_addItem_Forms/AdminStorage_addItem_CoolingSystemForm/CoolingSystemForm";
import {Navigate, useNavigate} from "react-router-dom";

function AdminStorageAddItem() {
    const [selectedCollection, setSelectedCollection] = useState('');
    const navigate = useNavigate();

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
                    <div className="as_addItem_header">
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
                                        <MenuItem value="ram">RAM Collection</MenuItem>
                                        <MenuItem value="psu">PSU Collection</MenuItem>
                                        <MenuItem value="case">Case Collection</MenuItem>
                                        <MenuItem value="storage">Storage Collection</MenuItem>
                                        <MenuItem value="cooling_system">Cooling System Collection</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>

                        <IconButton
                            onClick={() => navigate('/admin_storage')}
                            sx={{
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                color: 'var(--primary-color)',
                            }}
                        >
                            <ArrowBackRoundedIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                    </div>

                    <div className="as_addItem_inputFormContainer">
                        <Box sx={{ textAlign: 'center', color: 'var(--secondary-color)', mb: 4 }}>
                            <h2 style={{textTransform: 'uppercase'}}>{selectedCollection}</h2>
                        </Box>

                        { selectedCollection === "gpu" && <GpuForm />}
                        { selectedCollection === "cpu" && <CPUForm />}
                        { selectedCollection === "motherboard" && <MotherboardForm />}
                        { selectedCollection === "ram" && <RamForm />}
                        { selectedCollection === "psu" && <PSUForm />}
                        { selectedCollection === "case" && <CaseForm />}
                        { selectedCollection === "storage" && <StorageForm />}
                        { selectedCollection === "cooling_system" && <CoolingSystemForm />}
                    </div>
                </div>
            </>
        </AdminNavigation>
    );
}

export default AdminStorageAddItem;