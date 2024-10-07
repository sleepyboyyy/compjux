import React, {FormEvent, useState} from "react";
import {FormControl, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useFirestore} from "../hooks/useFirestore";

interface StorageData {
    brand: "Samsung";
    model: string;
    price: number,
    quantity: number,
    type: string;
    capacity: string;
    form_factor: string;
    interface: {
        type: string;
        version: string;
    };
    read_speed: string;
    write_speed: string;
    endurance: string;
    power_consumption: {
        idle: string;
        active: string;
    };
    dimensions: {
        length: string;
        width: string;
        height: string;
    };
    weight: string;
    operating_temperature: {
        min: string;
        max: string;
    };
    mtbf: string;
    warranty: string;
}

function StorageForm() {
    const [model, setModel] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [formFactor, setFormFactor] = useState('');
    const [type, setType] = useState('');
    const [capacity, setCapacity] = useState('');
    const [readSpeed, setReadSpeed] = useState('');
    const [writeSpeed, setWriteSpeed] = useState('');
    const [endurance, setEndurance] = useState('');
    const [weight, setWeight] = useState('');
    const [mtbf, setMtbf] = useState('');
    const [warranty, setWarranty] = useState('');
    // interface -> i
    const [iType, setIType] = useState('');
    const [iVersion, setIVersion] = useState('');
    // power_consumption -> pwc
    const [pwcIdle, setPwcIdle] = useState('');
    const [pwcActive, setPwcActive] = useState('');
    // dimensions -> d
    const [dLength, setDLength] = useState('');
    const [dWidth, setDWidth] = useState('');
    const [dHeight, setDHeight] = useState('');
    // operating_temperature -> ot
    const [otMin, setOtMin] = useState('');
    const [otMax, setOtMax] = useState('');

    // hooks
    const { addDocument } = useFirestore("storage");

    // handlers
    // handleSubmit
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const schema: StorageData = {
            brand: "Samsung",
            model,
            price,
            quantity,
            type,
            capacity,
            form_factor: formFactor,
            interface: {
                type: iType,
                version: iVersion,
            },
            read_speed: readSpeed,
            write_speed: writeSpeed,
            endurance,
            power_consumption: {
                idle: pwcIdle,
                active: pwcActive,
            },
            dimensions: {
                length: dLength,
                width: dWidth,
                height: dHeight,
            },
            weight,
            operating_temperature: {
                min: otMin,
                max: otMax,
            },
            mtbf,
            warranty,
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
                        onChange={(e) => setCapacity(e.target.value)}
                        id="outlined-required"
                        label="Capacity"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setReadSpeed(e.target.value)}
                        id="outlined-required"
                        label="Read Speed"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setWriteSpeed(e.target.value)}
                        id="outlined-required"
                        label="Write Speed"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setEndurance(e.target.value)}
                        id="outlined-required"
                        label="Endurance"
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
                    <TextField
                        required
                        onChange={(e) => setMtbf(e.target.value)}
                        id="outlined-required"
                        label="Mean Time Between Failures"
                        defaultValue=""
                    />
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

            <p>Interface</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setIType(e.target.value)}
                        id="outlined-required"
                        label="Type"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setIVersion(e.target.value)}
                        id="outlined-required"
                        label="Version"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Power Consumption</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setPwcActive(e.target.value)}
                        id="outlined-required"
                        label="Active"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setPwcIdle(e.target.value)}
                        id="outlined-required"
                        label="Idle"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Dimensions</p>
            <div className="as_addItem_textField_flexContainer">
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
                        onChange={(e) => setDWidth(e.target.value)}
                        id="outlined-required"
                        label="Width"
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

            <p>Operating Temperature</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setOtMax(e.target.value)}
                        id="outlined-required"
                        label="Max"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setOtMin(e.target.value)}
                        id="outlined-required"
                        label="Min"
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

export default StorageForm;