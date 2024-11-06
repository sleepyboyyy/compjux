import React, {FormEvent, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useFirestore} from "../../../hooks/useFirestore";

interface RamData {
    brand: "Corsair",
    model: string,
    price: number,
    quantity: number,
    memory_type: string,
    voltage: string,
    form_factor: string,
    module_pins: string,
    heat_spreader: boolean,
    xmp_support: boolean,
    ecc: boolean,
    capacity: {
        single_module: string,
        total_capacity: string,
    },
    speed: {
        base: string,
        max: string,
    },
    timing: {
        CAS_latency: string,
        tRCD: string,
        tRP: string,
        tRAS: string,
    },
    rgb_lighting: {
        enabled: boolean,
        type: string,
        software_control: string,
    }
}

function RamForm() {
    const [model, setModel] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [memoryType, setMemoryType] = useState('');
    const [voltage, setVoltage] = useState('');
    const [formFactor, setFormFactor] = useState('');
    const [modulePins, setModulePins] = useState('');
    const [heatSpreader, setHeatSpreader] = useState(false);
    const [xmpSupport, setXmpSupport] = useState(false);
    const [ecc, setECC] = useState(false);
    // capacity -> c
    const [cSingleModule, setCSingleModule] = useState('');
    const [cTotalCapacity, setCTotalCapacity] = useState('');
    // speed -> s
    const [sBase, setSBase] = useState('');
    const [sMax, setSMax] = useState('');
    // timing -> tmg
    const [tmgCASLatency, setTmgCASLatency] = useState('');
    const [tmgTRCD, setTmgTRCD] = useState('');
    const [tmgTRP, setTmgTRP] = useState('');
    const [tmgTRAS, setTmgTRAS] = useState('');
    // rgb
    const [rgbEnabled, setRgbEnabled] = useState(false);
    const [rgbType, setRgbType] = useState('');
    const [rgbSoftwareControl, setRgbSoftwareControl] = useState('');

    // hooks
    const { addDocument } = useFirestore("ram");

    // handlers
    // handleSubmit
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const schema: RamData = {
            brand: "Corsair",
            model,
            price,
            quantity,
            memory_type: memoryType,
            voltage,
            form_factor: formFactor,
            module_pins: modulePins,
            heat_spreader: heatSpreader,
            xmp_support: xmpSupport,
            ecc,
            capacity: {
                single_module: cSingleModule,
                total_capacity: cTotalCapacity,
            },
            speed: {
                base: sBase,
                max: sMax,
            },
            timing: {
                CAS_latency: tmgCASLatency,
                tRCD: tmgTRCD,
                tRP: tmgTRP,
                tRAS: tmgTRAS,
            },
            rgb_lighting: {
                enabled: rgbEnabled,
                type: rgbType,
                software_control: rgbSoftwareControl,
            }
        }

        await addDocument(schema);
        console.log(schema);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setModel(e.target.value)}
                        id="outlined-required"
                        label="Model"
                        defaultValue=""
                    />
                </FormControl>
            </div>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                        id="outlined-required"
                        label="Price"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        id="outlined-required"
                        label="Quantity"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setMemoryType(e.target.value)}
                        id="outlined-required"
                        label="Memory Type"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setVoltage(e.target.value)}
                        id="outlined-required"
                        label="Voltage"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setFormFactor(e.target.value)}
                        id="outlined-required"
                        label="Form Factor"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setModulePins(e.target.value)}
                        id="outlined-required"
                        label="Module Pins"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <InputLabel id="heat-spreader-label">Heat Spreader *</InputLabel>
                    <Select
                        labelId="heat-spreader-label"
                        id="heat-spreader-select"
                        value={heatSpreader} // assuming heatSpreader is a state variable
                        onChange={(e) => setHeatSpreader(e.target.value === 'true')}
                        label="Heat Spreader"
                        required
                    >
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">False</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="xmp-support-label">XMP Support *</InputLabel>
                    <Select
                        labelId="xmp-support-label"
                        id="xmp-support-select"
                        value={xmpSupport} // assuming heatSpreader is a state variable
                        onChange={(e) => setXmpSupport(e.target.value === 'true')}
                        label="XMP Support"
                        required
                    >
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">False</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="ecc-label">ECC *</InputLabel>
                    <Select
                        labelId="ecc-label"
                        id="ecc-select"
                        value={ecc} // assuming heatSpreader is a state variable
                        onChange={(e) => setECC(e.target.value === 'true')}
                        label="ECC"
                        required
                    >
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">False</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <p>Capacity</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCSingleModule(e.target.value)}
                        id="outlined-required"
                        label="Single Module"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCTotalCapacity(e.target.value)}
                        id="outlined-required"
                        label="Total Capacity"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Timing</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setTmgCASLatency(e.target.value)}
                        id="outlined-required"
                        label="CAS Latency"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setTmgTRAS(e.target.value)}
                        id="outlined-required"
                        label="tRas"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setTmgTRCD(e.target.value)}
                        id="outlined-required"
                        label="tRCD"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setTmgTRP(e.target.value)}
                        id="outlined-required"
                        label="tRP"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Speed</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setSBase(e.target.value)}
                        id="outlined-required"
                        label="Base"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setSMax(e.target.value)}
                        id="outlined-required"
                        label="Max"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p className="mb-3">RGB Lighting</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <InputLabel id="rgb-enabled-label">Enabled *</InputLabel>
                    <Select
                        labelId="rgb-enabled-label"
                        id="rgb-enabled-select"
                        value={rgbEnabled} // assuming heatSpreader is a state variable
                        onChange={(e) => setRgbEnabled(e.target.value === 'true')}
                        label="Enabled"
                        required
                    >
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">False</MenuItem>
                    </Select>
                </FormControl>
            </div>

            {rgbEnabled && <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setRgbType(e.target.value)}
                        id="outlined-required"
                        label="Type"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setRgbSoftwareControl(e.target.value)}
                        id="outlined-required"
                        label="Software Control"
                        defaultValue=""
                    />
                </FormControl>
            </div>}

            <div className="as_addItem_textField_flexContainer">
                <Button
                    variant="outlined"
                    type="submit"
                    sx={{height: '56px'}}
                >
                    SUBMIT
                </Button>
            </div>
        </form>
    );
}

export default RamForm;