import React, {FormEvent, useState} from 'react';
import {FormControl, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import '../AdminStorage_addItem_FormStyles/FormStyles.css'
import {useFirestore} from "../../../../hooks/useFirestore";

export interface GpuData {
    price: string,
    quantity: string,
    cudaCores: string,
    api_support: string[] | string,
    brand: string,
    model: string,
    display_outputs: string[] | string,
    core_clock_speed: {
        base: string,
        boost: string
    },
    memory: {
        type: string,
        size: string,
        interface: string,
    },
    cooling_solution: {
        type: string,
        additional_features: string[] | string,
    },
    power_connectors: {
        native: {
            pin_interface: string,
            pin_number: string,
            pin_type: string,
        },
        adapter: {
            pin_interface: string,
            pin_number: string,
            pin_type: string
        },
    },
    dimensions: {
        length: string,
        width: string,
        height: string,
        slot_requirement: string,
    },
    interface: {
        type: string,
        version: string,
        configuration: string,
    }
}

function GpuForm() {
    const [model, setModel] = useState('');
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

    // hooks
    const { addDocument } = useFirestore('gpu');

    // handlers
    // submitHandler
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const apiSupportArr = apiSupport.split(",").map(item => item.trim());
        const displayOptionsArr = displayOptions.split(",").map(item => item.trim());
        const csAdditionalFeaturesArr = csAdditionalFeatures.split(",").map(item => item.trim());

        const schema: GpuData = {
            price,
            quantity,
            cudaCores,
            api_support: apiSupportArr,
            brand: "Nvidia",
            model,
            display_outputs: displayOptionsArr,
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
                additional_features: csAdditionalFeaturesArr,
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
            <p className="pwcSubClass">Native</p>
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
            <p className="pwcSubClass">Adapter</p>
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