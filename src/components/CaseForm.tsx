import React, {FormEvent, useState} from "react";
import Button from "@mui/material/Button";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useFirestore} from "../hooks/useFirestore";

interface CaseData {
    brand: "NZXT";
    model: string;
    price: number,
    quantity: number,
    form_factor: string;
    motherboard_support: string[];
    dimensions: {
        height: string;
        width: string;
        depth: string;
    };
    weight: string;
    gpu_clearance: {
        max_length: string;
    };
    cpu_cooler_clearance: {
        max_height: string;
    };
    psu_clearance: {
        max_length: string;
    };
    expansion_slots: string;
    drive_bays: {
        "3_5_inch": string;
        "2_5_inch": string;
    };
    cooling_support: {
        fan_mounts: {
            front: string[];
            top: string[];
            rear: string[];
        };
        radiator_support: {
            front: string;
            top: string;
            rear: string;
        };
    };
    pre_installed_fans: {
        front: string;
        top: string;
        rear: string;
    };
    front_io_ports: {
        usb_ports: {
            type: string;
            quantity: string
        };
        audio_jack: boolean;
        mic_jack: boolean;
    };
    psu_shroud: boolean;
    tempered_glass: boolean;
    rgb_support: boolean;
}

function CaseForm() {
    const [model, setModel] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [formFactor, setFormFactor] = useState('');
    const [motherboardSupport, setMotherboardSupport] = useState('');
    const [weight, setWeight] = useState('');
    const [expansionSlots, setExpansionSlots] = useState('');
    const [psuShroud, setPsuShroud] = useState(false);
    const [temperedGlass, setTemperedGlass] = useState(false);
    const [rgbSupport, setRgbSupport] = useState(false);
    // gpu_clearence -> gpuC
    const [gpuCMaxLength, setGpuCMaxLength] = useState('');
    // cpu_cooler_clearence -> cpuC
    const [cpuCMaxHeight, setCPUCMaxHeight] = useState('');
    // psu_clearence -> psuC
    const [psuCMaxLength, setPsuCMaxLength] = useState('');
    // drive_bays -> db
    const [db3_5, setDb3_5] = useState('');
    const [db2_5, setDb2_5] = useState('');
    // cooling_support -> cs
    // fan_mounts -> csFm
    const [csFmFront, setCsFmFront] = useState('');
    const [csFmTop, setCsFmTop] = useState('');
    const [csFmRear, setCsFmRear] = useState('');
    // radiator_support -> csRs
    const [csRsFront, setCsRsFront] = useState('');
    const [csRsTop, setCsRsTop] = useState('');
    const [csRsRear, setCsRsRear] = useState('');
    // pre_installed_fans -> pif
    const [pifFront, setPifFront] = useState('');
    const [pifTop, setPifTop] = useState('');
    const [pifRear, setPifRear] = useState('');
    // front_io_ports -> fip
    // usb_ports -> fipUsb
    const [fipUsbType, setFipUsbType] = useState('');
    const [fipUsbQuantity, setFipUsbQuantity] = useState('');
    // audio_jack -> fipAj
    const [fipAj, setFipAj] = useState(false);
    // mic_jack -> fipMj
    const [fipMj, setFipMj] = useState(false);
    // dimensions -> d
    const [dWidth, setDWidth] = useState('');
    const [dHeight, setDHeight] = useState('');
    const [dDepth, setDDepth] = useState('');

    // hooks
    const { addDocument } = useFirestore("case");

    // handlers
    // handleSubmit
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const motherboardSupportArr = motherboardSupport.split(",").map(item => item.trim());
        const csFmFrontArr = csFmFront.split(",").map(item => item.trim());
        const csFmTopArr = csFmTop.split(",").map(item => item.trim());
        const csFmRearArr = csFmRear.split(",").map(item => item.trim());

        const schema: CaseData = {
            brand: "NZXT",
            model,
            price,
            quantity,
            form_factor: formFactor,
            motherboard_support: motherboardSupportArr,
            dimensions: {
                height: dHeight,
                width: dWidth,
                depth: dDepth,
            },
            weight,
            gpu_clearance: {
                max_length: gpuCMaxLength,
            },
            cpu_cooler_clearance: {
                max_height: cpuCMaxHeight,
            },
            psu_clearance: {
                max_length: psuCMaxLength,
            },
            expansion_slots: expansionSlots,
            drive_bays: {
                "3_5_inch": db3_5,
                "2_5_inch": db2_5,
            },
            cooling_support: {
                fan_mounts: {
                    front: csFmFrontArr,
                    top: csFmTopArr,
                    rear: csFmRearArr,
                },
                radiator_support: {
                    front: csRsFront,
                    top: csRsTop,
                    rear: csRsRear,
                },
            },
            pre_installed_fans: {
                front: pifFront,
                top: pifTop,
                rear: pifRear,
            },
            front_io_ports: {
                usb_ports: {
                    type: fipUsbType,
                    quantity: fipUsbQuantity
                },
                audio_jack: fipAj,
                mic_jack: fipMj,
            },
            psu_shroud: psuShroud,
            tempered_glass: temperedGlass,
            rgb_support: rgbSupport,
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
                        onChange={(e) => setMotherboardSupport(e.target.value)}
                        id="outlined-required"
                        label="Motherboard Support"
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
                        onChange={(e) => setExpansionSlots(e.target.value)}
                        id="outlined-required"
                        label="Expansion Slots"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <InputLabel id="psu-shroud-label">PSU Shroud *</InputLabel>
                    <Select
                        labelId="psu-shroud-label"
                        id="psu-shroud-select"
                        value={psuShroud} // assuming heatSpreader is a state variable
                        onChange={(e) => setPsuShroud(e.target.value === 'true')}
                        label="PSU Shroud"
                        required
                    >
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">False</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <InputLabel id="tempered-glass-label">Tempered Glass *</InputLabel>
                    <Select
                        labelId="tempered-glass-label"
                        id="tempered-glass-select"
                        value={temperedGlass} // assuming heatSpreader is a state variable
                        onChange={(e) => setTemperedGlass(e.target.value === 'true')}
                        label="Tempered Glass"
                        required
                    >
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">False</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <InputLabel id="rgb-support-label">RGB Support *</InputLabel>
                    <Select
                        labelId="rgb-support-label"
                        id="rgb-support-select"
                        value={rgbSupport} // assuming heatSpreader is a state variable
                        onChange={(e) => setRgbSupport(e.target.value === 'true')}
                        label="Rgb Support"
                        required
                    >
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">False</MenuItem>
                    </Select>
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
                        onChange={(e) => setDDepth(e.target.value)}
                        id="outlined-required"
                        label="Depth"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>GPU Clearence</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setGpuCMaxLength(e.target.value)}
                        id="outlined-required"
                        label="Max Length"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>CPU Cooler Clearence</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCPUCMaxHeight(e.target.value)}
                        id="outlined-required"
                        label="Max Height"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>PSU Clearence</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setPsuCMaxLength(e.target.value)}
                        id="outlined-required"
                        label="Max Length"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Drive Bays</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setDb3_5(e.target.value)}
                        id="outlined-required"
                        label="3 5 inch"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setDb2_5(e.target.value)}
                        id="outlined-required"
                        label="2 5 inch"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Cooling Support</p>
            <p>Fan Mounts</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCsFmFront(e.target.value)}
                        id="outlined-required"
                        label="Front"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCsFmTop(e.target.value)}
                        id="outlined-required"
                        label="Top"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCsFmRear(e.target.value)}
                        id="outlined-required"
                        label="Rear"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Radiator Support</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCsRsFront(e.target.value)}
                        id="outlined-required"
                        label="Front"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCsRsTop(e.target.value)}
                        id="outlined-required"
                        label="Top"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setCsRsRear(e.target.value)}
                        id="outlined-required"
                        label="Rear"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Pre Installed Fans</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setPifFront(e.target.value)}
                        id="outlined-required"
                        label="Front"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setPifTop(e.target.value)}
                        id="outlined-required"
                        label="Top"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setPifRear(e.target.value)}
                        id="outlined-required"
                        label="Rear"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Front io Ports</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setFipUsbType(e.target.value)}
                        id="outlined-required"
                        label="USB Type"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setFipUsbQuantity(e.target.value)}
                        id="outlined-required"
                        label="USB Quantity"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <InputLabel id="audio-jack-label">Audio Jack *</InputLabel>
                    <Select
                        labelId="audio-jack-label"
                        id="audio-jack-select"
                        value={fipAj} // assuming heatSpreader is a state variable
                        onChange={(e) => setFipAj(e.target.value === 'true')}
                        label="Audio Jack"
                        required
                    >
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">False</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="mic-jack-label">Microphone Jack *</InputLabel>
                    <Select
                        labelId="mic-jack-label"
                        id="mic-jack-select"
                        value={fipMj} // assuming heatSpreader is a state variable
                        onChange={(e) => setFipMj(e.target.value === 'true')}
                        label="Microphone Jack"
                        required
                    >
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">False</MenuItem>
                    </Select>
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

export default CaseForm;