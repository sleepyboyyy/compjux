import React, {FormEvent, useState} from "react";
import {useFirestore} from "../../../../hooks/useFirestore";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";

interface CoolingSystemData {
    brand: "Cooler Master",
    model: string,
    type: string,
    fan_size: string,
    rpm_range: string,
    noise_level: string,
    airflow: string,
    power_connector: string,
    compatibility: {
        socket_support: string[],
        max_tdp: string
    },
    dimensions: {
        length: string,
        width: string,
        height: string
    },
    weight: string,
    rgb_lighting: boolean,
    warranty: string,
    price: string,
    quantity: string
}

function CoolingSystemForm() {
    const [model, setModel] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [type, setType] = useState('');
    const [fanSize, setFanSize] = useState('');
    const [rpmRange, setRpmRange] = useState('');
    const [noiseLevel, setNoiseLevel] = useState('');
    const [airflow, setAirflow] = useState('');
    const [powerConnector, setPowerConnector] = useState('');
    const [weight, setWeight] = useState('');
    const [rgbLighting, setRgbLighting] = useState(false);
    const [warranty, setWarranty] = useState('');
    // compatibility -> cmp
    const [cmpSocketSupport, setCmpSocketSupport] = useState('');
    const [cmpMaxTdp, setCmpMaxTdp] = useState('');
    // dimensions -> d
    const [dLength, setDLength] = useState('');
    const [dWidth, setDWidth] = useState('');
    const [dHeight, setDHeight] = useState('');

    // hooks
    const { addDocument } = useFirestore("cooling_system");

    // handlers
    // handleSubmit
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const socketSupportArr = cmpSocketSupport.split(",").map(item => item.trim());

        const schema: CoolingSystemData = {
            brand: "Cooler Master",
            model,
            type,
            fan_size: fanSize,
            rpm_range: rpmRange,
            noise_level: noiseLevel,
            airflow,
            power_connector: powerConnector,
            compatibility: {
                socket_support: socketSupportArr,
                max_tdp: cmpMaxTdp,
            },
            dimensions: {
                length: dLength,
                width: dWidth,
                height: dHeight,
            },
            weight,
            rgb_lighting: rgbLighting,
            warranty,
            price,
            quantity,
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
                        onChange={(e) => setPrice(e.target.value)}
                        id="outlined-required"
                        label="Price"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setQuantity(e.target.value)}
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
                        onChange={(e) => setType(e.target.value)}
                        id="outlined-required"
                        label="Type"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setFanSize(e.target.value)}
                        id="outlined-required"
                        label="Fan Size"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setRpmRange(e.target.value)}
                        id="outlined-required"
                        label="RPM Range"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setNoiseLevel(e.target.value)}
                        id="outlined-required"
                        label="Noise Level"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setAirflow(e.target.value)}
                        id="outlined-required"
                        label="Airflow"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setPowerConnector(e.target.value)}
                        id="outlined-required"
                        label="Power Connector"
                        defaultValue=""
                    />
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
                    <InputLabel id="rgb-lighting-label">RGB Lighting *</InputLabel>
                    <Select
                        labelId="rgb-lighting-label"
                        id="rgb-lighting-select"
                        value={rgbLighting} // assuming heatSpreader is a state variable
                        onChange={(e) => setRgbLighting(e.target.value === 'true')}
                        label="RGB Lighting"
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
                        onChange={(e) => setWarranty(e.target.value)}
                        id="outlined-required"
                        label="Warranty"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Compatibility</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCmpSocketSupport(e.target.value)}
                        id="outlined-required"
                        label="Socket Support"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCmpMaxTdp(e.target.value)}
                        id="outlined-required"
                        label="Max TDP"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Dimensions</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setDLength(e.target.value)}
                        id="outlined-required"
                        label="Length"
                        defaultValue=""
                    />
                </FormControl>

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

export default CoolingSystemForm;