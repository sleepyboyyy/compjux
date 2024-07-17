import React, {FormEvent, useState} from 'react';
import {FormControl, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import './GpuForm.css'

function GpuForm() {
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [cudaCores, setCudaCores] = useState('');
    const [apiSupport, setApiSupport] = useState('');
    const [displayOptions, setDisplayOptions] = useState('');
    // core clock speed -> ccs
    const [ccsBase, setCCSBase] = useState('');
    const [ccsBoosted, setCCSBoosted] = useState('');
    // memory -> m
    const [mType, setMType] = useState('');
    const [mSize, setMSize] = useState('');
    const [mInterface, setMInterface] = useState('');
    // cooling solution -> cs
    const [csType, setCSType] = useState('');
    const [csAdditionalFeatures, setCSAdditionalFeatures] = useState('');
    //  power connectors -> pwc
    // pwc native
    const [pwcNativePinInterface, setPWCNativePinInterface] = useState('');
    const [pwcNativePinNumber, setPWCNativePinNumber] = useState('');
    const [pwcNativePinType, setPWCNativePinType] = useState('');
    // pwc adapter
    const [pwcAdapterPinInterface, setPWCAdapterPinInterface] = useState('');
    const [pwcAdapterPinNumber, setPWCAdapterPinNumber] = useState('');
    const [pwcAdapterPinType, setPWCAdapterPinType] = useState('');
    // dimensions -> d
    const [dLength, setDLength] = useState('');
    const [dWidth, setDWidth] = useState('');
    const [dHeight, setDHeight] = useState('');
    const [dSlotRequirement, setDSlotRequirement] = useState('');
    // interface -> itf
    const [itfType, setITFType] = useState('');
    const [itfVersion, setITFVersion] = useState('');
    const [itfConfiguration, setITFConfiguration] = useState('');

    // handlers
    // submitHandler
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const schema = {
            price,
            quantity,
            cudaCores,
            apiSupport,
            display_outputs: displayOptions,
            core_clock_speed: {
                base: ccsBase,
                boost: ccsBoosted
            },
            memory: {
                type: mType,
                size: mSize,
                interface: mInterface
            },
            cooling_solution: {
                type: csType,
                additional_features: csAdditionalFeatures
            },
            power_connectors: {
                native: {
                    pin_interface: pwcNativePinInterface,
                    pin_number: pwcNativePinNumber,
                    pin_type: pwcNativePinType
                },
                adapter: {
                    pin_interface: pwcAdapterPinInterface,
                    pin_number: pwcAdapterPinNumber,
                    pin_type: pwcAdapterPinType
                },
            },
            dimensions: {
                length: dLength,
                width: dWidth,
                height: dHeight,
                slot_requirement: dSlotRequirement,
            },
            interface: {
                type: itfType,
                version: itfVersion,
                configuration: itfConfiguration,
            }
        }

        console.log(schema);
    }

    return (
        <form onSubmit={handleSubmit}>
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
                        onChange={(e) => setCudaCores(e.target.value)}
                        id="outlined-required"
                        label="Cuda Cores"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setApiSupport(e.target.value)}
                        id="outlined-required"
                        label="API support"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setDisplayOptions(e.target.value)}
                        id="outlined-required"
                        label="Display options"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Core clock speed</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCCSBase(e.target.value)}
                        id="outlined-required"
                        label="Base"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCCSBoosted(e.target.value)}
                        id="outlined-required"
                        label="Boosted"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Memory</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setMType(e.target.value)}
                        id="outlined-required"
                        label="Type"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setMSize(e.target.value)}
                        id="outlined-required"
                        label="Size"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setMInterface(e.target.value)}
                        id="outlined-required"
                        label="Interface"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Cooling solution</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCSType(e.target.value)}
                        id="outlined-required"
                        label="type"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        onChange={(e) => setCSAdditionalFeatures(e.target.value)}
                        id="outlined-required"
                        label="Additional features"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Power connectors</p>
            <span className="pwcSubClass">Native</span>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setPWCNativePinInterface(e.target.value)}
                        id="outlined-required"
                        label="Pin Interface"
                        defaultValue=""
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setPWCNativePinNumber(e.target.value)}
                        id="outlined-required"
                        label="Pin Number"
                        defaultValue=""
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setPWCNativePinType(e.target.value)}
                        id="outlined-required"
                        label="Pin Type"
                        defaultValue=""
                    />
                </FormControl>
            </div>
            <span className="pwcSubClass">Adapter</span>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        onChange={(e) => setPWCAdapterPinInterface(e.target.value)}
                        id="outlined-required"
                        label="Pin Interface"
                        defaultValue=""
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        onChange={(e) => setPWCAdapterPinNumber(e.target.value)}
                        id="outlined-required"
                        label="Pin Number"
                        defaultValue=""
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        onChange={(e) => setPWCAdapterPinType(e.target.value)}
                        id="outlined-required"
                        label="Pin Type"
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

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setDSlotRequirement(e.target.value)}
                        id="outlined-required"
                        label="Slot requirement"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Interface</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setITFType(e.target.value)}
                        id="outlined-required"
                        label="Type"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setITFVersion(e.target.value)}
                        id="outlined-required"
                        label="Version"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setITFConfiguration(e.target.value)}
                        id="outlined-required"
                        label="Configuration"
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

export default GpuForm;