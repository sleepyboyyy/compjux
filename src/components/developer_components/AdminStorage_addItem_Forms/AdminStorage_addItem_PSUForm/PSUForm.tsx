import React, {FormEvent, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useFirestore} from "../../../../hooks/useFirestore";

interface PsuData {
    brand: "Corsair",
    model: string,
    price: number,
    quantity: number,
    form_factor: string,
    power_output: string,
    efficiency_rating: string,
    modular: boolean,
    weight: string,
    warranty: boolean,
    cooling: {
        fan_size: string,
        fan_type: string,
        fan_rpm: string
    },
    connectors: {
        motherboard: {
            type: string,
            quantity: string
        },
        cpu: {
            type: string,
            quantity: string
        },
        pci_e: {
            type: string,
            quantity: string
        },
        sata: {
            type: string,
            quantity: string
        },
        molex: {
            type: string,
            quantity: string
        }
    },
    protections: string | string[],
    dimensions: {
        length: string,
        width: string,
        height: string
    },
}

function PsuForm() {
    const [model, setModel] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [formFactor, setFormFactor] = useState('');
    const [powerOutput, setPowerOutput] = useState('');
    const [efficiencyRating, setEfficiencyRating] = useState('');
    const [modular, setModular] = useState(false);
    const [weight, setWeight] = useState('');
    const [warranty, setWarranty] = useState(false);
    // cooling -> clng
    const [clngFanSize, setClngFanSize] = useState('');
    const [clngFanType, setClngFanType] = useState('');
    const [clngFanRpm, setClngFanRpm] = useState('');
    // connectors -> c
    // motherboard -> cMb
    const [cMbType, setCMbType] = useState('');
    const [cMbQuantity, setCMbQuantity] = useState('');
    // cpu -> cCpu
    const [cCpuType, setCCpuType] = useState('');
    const [cCpuQuantity, setCCpuQuantity] = useState('');
    // pci_e -> cPciE
    const [cPciEType, setCPciEType] = useState('');
    const [cPciEQuantity, setCPciEQuantity] = useState('');
    // sata -> cSata
    const [cSataType, setCSataType] = useState('');
    const [cSataQuantity, setCSataQuantity] = useState('');
    // molex -> cMolex
    const [cMolexType, setCMolexType] = useState('');
    const [cMolexQuantity, setCMolexQuantity] = useState('');
    // protections
    const [protections, setProtections] = useState('');
    // dimensions -> d
    const [dLength, setDLength] = useState('');
    const [dWidth, setDWidth] = useState('');
    const [dHeight, setDHeight] = useState('');

    // hooks
    const { addDocument } = useFirestore("psu");

    // handlers
    // handleSubmit
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const protectionsArr = protections.split(",").map(item => item.trim());

        const schema: PsuData = {
            brand: "Corsair",
            model,
            price,
            quantity,
            form_factor: formFactor,
            power_output: powerOutput,
            efficiency_rating: efficiencyRating,
            modular,
            weight,
            warranty,
            cooling: {
                fan_size: clngFanSize,
                fan_type: clngFanType,
                fan_rpm: clngFanRpm
            },
            connectors: {
                motherboard: {
                    type: cMbType,
                    quantity: cMbQuantity
                },
                cpu: {
                    type: cCpuType,
                    quantity: cCpuQuantity
                },
                pci_e: {
                    type: cPciEType,
                    quantity: cPciEQuantity
                },
                sata: {
                    type: cSataType,
                    quantity: cSataQuantity
                },
                molex: {
                    type: cMolexType,
                    quantity: cMolexQuantity
                }
            },
            protections: protectionsArr,
            dimensions: {
                length: dLength,
                width: dWidth,
                height: dHeight
            },
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
                        onChange={(e) => setPowerOutput(e.target.value)}
                        id="outlined-required"
                        label="Power Output"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setEfficiencyRating(e.target.value)}
                        id="outlined-required"
                        label="Efficiency Rating"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <InputLabel id="modular-label">Modular *</InputLabel>
                    <Select
                        labelId="modular-label"
                        id="modular-select"
                        value={modular} // assuming heatSpreader is a state variable
                        onChange={(e) => setModular(e.target.value === 'true')}
                        label="Modular"
                        required
                    >
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">False</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setWeight(e.target.value)}
                        id="outlined-required"
                        label="Weight"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setProtections(e.target.value)}
                        id="outlined-required"
                        label="Protections"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <InputLabel id="warranty-label">Warranty *</InputLabel>
                    <Select
                        labelId="warranty-label"
                        id="warranty-select"
                        value={warranty} // assuming heatSpreader is a state variable
                        onChange={(e) => setWarranty(e.target.value === 'true')}
                        label="Warranty"
                        required
                    >
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">False</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <p>Cooling</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setClngFanType(e.target.value)}
                        id="outlined-required"
                        label="Fan Type"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setClngFanSize(e.target.value)}
                        id="outlined-required"
                        label="Fan Size"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setClngFanRpm(e.target.value)}
                        id="outlined-required"
                        label="Fan RPM"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Connectors</p>
            <p>Motherboard</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCMbType(e.target.value)}
                        id="outlined-required"
                        label="Type"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCMbQuantity(e.target.value)}
                        id="outlined-required"
                        label="Quantity"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Cpu</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCCpuType(e.target.value)}
                        id="outlined-required"
                        label="Type"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCCpuQuantity(e.target.value)}
                        id="outlined-required"
                        label="Quantity"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Pci_e</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCPciEType(e.target.value)}
                        id="outlined-required"
                        label="Type"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCPciEQuantity(e.target.value)}
                        id="outlined-required"
                        label="Quantity"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Sata</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCSataType(e.target.value)}
                        id="outlined-required"
                        label="Type"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCSataQuantity(e.target.value)}
                        id="outlined-required"
                        label="Quantity"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Molex</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCMolexType(e.target.value)}
                        id="outlined-required"
                        label="Type"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCMolexQuantity(e.target.value)}
                        id="outlined-required"
                        label="Quantity"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Dimensions</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setDWidth(e.target.value)}
                        id="outlined-required"
                        label="Width"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setDHeight(e.target.value)}
                        id="outlined-required"
                        label="Height"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setDLength(e.target.value)}
                        id="outlined-required"
                        label="Length"
                        defaultValue=""
                    />
                </FormControl>
            </div>

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

export default PsuForm;