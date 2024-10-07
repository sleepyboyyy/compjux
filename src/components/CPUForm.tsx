import './AdminStorageAddItemFormStyles/FormStyles.css'
import React, {FormEvent, useState} from "react";
import {useFirestore} from "../hooks/useFirestore";
import {FormControl, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import * as string_decoder from "node:string_decoder";

interface CpuData {
    brand: "Intel"
    model: string,
    price: number,
    quantity: number,
    socket: string,
    compatibility: string[] | string,
    technologies: string[] | string,
    core_clock_speed: {
        base: string,
        boost: string,
    }
    cores_and_threads: {
        cores: string,
        threads: string,
    }
    cache: {
        l1_cache: string,
        l2_cache: string,
        l3_cache: string,
    }
    memory_support: {
        type: string,
        max_size: string,
        channels: string,
        speed: string,
    }
    integrated_graphics: {
        model: string,
        base_clock_speed: string,
        max_dynamic_frequency: string,
    }
    power: {
        tdp: string,
        max_turbo_power: string,
    }
    dimensions: {
        length: string,
        width: string,
    }
    interface: {
        type: string,
        version: string,
    }
}

function CpuForm() {
    const [model, setModel] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [socket, setSocket] = useState("");
    const [compatibility, setCompatibility] = useState("");
    const [technologies, setTechnologies] = useState("");
    // ccs -> core clock speed
    const [ccsBase, setCCSBase] = useState("");
    const [ccsBoost, setCCSBoost] = useState("");
    // cnt -> cores and threads
    const [cnsCores, setCNSCores] = useState("");
    const [cnsThreads, setCNSThreads] = useState("");
    // cache
    const [l1Cache, setL1Cache] = useState("");
    const [l2Cache, setL2Cache] = useState("");
    const [l3Cache, setL3Cache] = useState("");
    // ms -> memory support
    const [msType, setMSType] = useState("");
    const [msMaxSize, setMSMaxSize] = useState("");
    const [msChannels, setMSChannels] = useState("");
    const [msSpeed, setMSSpeed] = useState("");
    // ig -> integrated graphics
    const [igModel, setIGModel] = useState("");
    const [igBaseClockSpeed, setIGBaseClockSpeed] = useState("");
    const [igMaxDynamicFrequency, setIGMaxDynamicFrequency] = useState("");
    // p -> power
    const [pTDP, setPTDP] = useState("");
    const [pMaxTurboPower, setPMaxTurboPower] = useState("");
    // d -> dimensions
    const [dLength, setDLength] = useState("");
    const [dWidth, setDWidth] = useState("");
    // itf -> interface
    const [itfType, setITFType] = useState("");
    const [itfVersion, setITFVersion] = useState("");

    // hooks
    const { addDocument } = useFirestore("cpu");

    // handlers
    // submitHandler
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const compatibilityArr = compatibility.split(",").map(item => item.trim());
        const technologiesArr = technologies.split(",").map(item => item.trim());

        const schema: CpuData = {
            brand: "Intel",
            model,
            price,
            quantity,
            socket,
            compatibility: compatibilityArr,
            technologies: technologiesArr,
            core_clock_speed: {
                base: ccsBase,
                boost: ccsBoost,
            },
            cores_and_threads: {
                cores: cnsCores,
                threads: cnsThreads,
            },
            cache: {
                l1_cache: l1Cache,
                l2_cache: l2Cache,
                l3_cache: l3Cache,
            },
            memory_support: {
                type: msType,
                max_size: msMaxSize,
                channels: msChannels,
                speed: msSpeed,
            },
            integrated_graphics: {
                model: igModel,
                base_clock_speed: igBaseClockSpeed,
                max_dynamic_frequency: igMaxDynamicFrequency,
            },
            power: {
                tdp: pTDP,
                max_turbo_power: pMaxTurboPower,
            },
            dimensions: {
                length: dLength,
                width: dWidth,
            },
            interface: {
                type: itfType,
                version: itfVersion,
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
                        onChange={(e) => setSocket(e.target.value)}
                        id="outlined-required"
                        label="Socket"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCompatibility(e.target.value)}
                        id="outlined-required"
                        label="Compatibility"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setTechnologies(e.target.value)}
                        id="outlined-required"
                        label="Technologies"
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
                        onChange={(e) => setCCSBoost(e.target.value)}
                        id="outlined-required"
                        label="Boosted"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Cores and Threads</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCNSCores(e.target.value)}
                        id="Cores"
                        label="Type"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCNSThreads(e.target.value)}
                        id="outlined-required"
                        label="Threads"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Cache</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setL1Cache(e.target.value)}
                        id="outlined-required"
                        label="L1 Cache"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        onChange={(e) => setL2Cache(e.target.value)}
                        id="outlined-required"
                        label="L2 Cache"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        onChange={(e) => setL3Cache(e.target.value)}
                        id="outlined-required"
                        label="L3 Cache"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Memory Support</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setMSType(e.target.value)}
                        id="outlined-required"
                        label="Type"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setMSMaxSize(e.target.value)}
                        id="outlined-required"
                        label="Max Size"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setMSChannels(e.target.value)}
                        id="outlined-required"
                        label="Channels"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setMSSpeed(e.target.value)}
                        id="outlined-required"
                        label="Speed"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Integrated Graphics</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setIGModel(e.target.value)}
                        id="outlined-required"
                        label="Model"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setIGBaseClockSpeed(e.target.value)}
                        id="outlined-required"
                        label="Base Clock Speed"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setIGMaxDynamicFrequency(e.target.value)}
                        id="outlined-required"
                        label="Max Dynamic Frequency"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Power</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setPTDP(e.target.value)}
                        id="outlined-required"
                        label="TDP"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setPMaxTurboPower(e.target.value)}
                        id="outlined-required"
                        label="Max Turbo Power"
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

export default CpuForm;