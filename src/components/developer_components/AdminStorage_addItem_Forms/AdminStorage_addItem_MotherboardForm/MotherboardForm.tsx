import '../AdminStorage_addItem_FormStyles/FormStyles.css'
import React, {FormEvent, useState} from "react";
import {useFirestore} from "../../../../hooks/useFirestore";
import {FormControl, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {AddCard} from "@mui/icons-material";

interface MotherboardData {
    brand: "ASUS",
    model: string,
    price: number,
    quantity: number,
    chipset: string,
    socket: string,
    form_factor: string,
    memory: {
        type: string,
        max_size: string,
        slots: string,
        max_speed: string,
    },
    expansion_slots: {
        pci_express: [
            {
                slot_type: string,
                version: string,
                number: string,
            },

            {
                slot_type: string,
                version: string,
                number: string,
            }
        ],

        m_2_slots: string
    },
    storage: {
        sata_ports: string,
        raid_support: string,
    },
    usb_ports: any,
    network: {
        ethernet: string,
        wifi: string,
        bluetooth: string,
    },
    audio: {
        codec: string,
        s_pdif_out: string,
    },
    bios: {
        type: string,
        features: string[] | string,
    },
    dimensions: {
        length: string,
        width: string,
    },
    power_connectors: {
        atx_power_connector: string,
        cpu_power_connector: string,
    }
}

function MotherboardForm() {
    const [model, setModel] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [chipset, setChipset] = useState("");
    const [socket, setSocket] = useState("");
    const [formFactor , setFormFactor] = useState("");
    const [usbPorts , setUsbPorts] = useState("");
    // m -> memory
    const [mType, setMType] = useState("");
    const [mMaxSize, setMMaxSize] = useState("");
    const [mSlots, setMSlots] = useState("");
    const [mMaxSpeed, setMMaxSpeed] = useState("");
    // es -> expansion slots
    const [esM2Slots , setESM2Slots] = useState("");
    // pce -> pci_express
    const [esPCESlotTypeOne, setESPCESlotTypeOne] = useState("");
    const [esPCEVersionOne, setESPCEVersionOne] = useState("");
    const [esPCENumberOne, setESPCENumberOne] = useState("");

    const [esPCESlotTypeTwo , setESPCESlotTypeTwo] = useState("");
    const [esPCEVersionTwo , setESPCEVersionTwo ] = useState("");
    const [esPCENumberTwo , setESPCENumberTwo ] = useState("");
    // st -> storage
    const [stSataPorts , setSTSataPorts] = useState("");
    const [stRaidSupport , setSTRaidSupport] = useState("");
    // n -> network
    const [nEthernet , setNEthernet] = useState("");
    const [nWifi , setNWifi] = useState("");
    const [nBluetooth , setNBluetooth] = useState("");
    // ad -> audio
    const [adCodec , setADCodec] = useState("");
    const [adSPdifOut , setADSPdifOut] = useState("");
    // bios
    const [biosType , setBiosType] = useState("");
    const [biosFeatures , setBiosFeatures] = useState("");
    // d -> dimensions
    const [dLength , setDLength] = useState("");
    const [dWidth , setDWidth] = useState("");
    // pc -> power connectors
    const [pcAtxPowerConnector , setPCAtxPowerConnector] = useState("");
    const [pcCpuPowerConnector , setPCCpuPowerConnector] = useState("");

    // hooks
    const { addDocument } = useFirestore('motherboard');

    // handlers
    // submitHandler
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const usbPortsArr = usbPorts.split(",").map(item => {
            const [type, value] = item.split(":");
            return { [type]: value }
        });

        const  biosFeaturesArr = biosFeatures.split(",").map(item => item.trim());

        const schema: MotherboardData = {
            brand: "ASUS",
            model,
            price,
            quantity,
            chipset,
            socket,
            form_factor: formFactor,
            memory: {
                type: mType,
                max_size: mMaxSize,
                slots: mSlots,
                max_speed: mMaxSpeed,
            },
            expansion_slots: {
                pci_express: [
                    {
                        slot_type: esPCESlotTypeOne,
                        version: esPCEVersionOne,
                        number: esPCENumberOne,
                    },

                    {
                        slot_type: esPCESlotTypeTwo,
                        version: esPCEVersionTwo,
                        number: esPCENumberTwo,
                    }
                ],

                m_2_slots: esM2Slots
            },
            storage: {
                sata_ports: stSataPorts,
                raid_support: stRaidSupport,
            },
            usb_ports: usbPortsArr,
            network: {
                ethernet: nEthernet,
                wifi: nWifi,
                bluetooth: nBluetooth,
            },
            audio: {
                codec: adCodec,
                s_pdif_out: adSPdifOut,
            },
            bios: {
                type: biosType,
                features: biosFeaturesArr,
            },
            dimensions: {
                length: dLength,
                width: dWidth,
            },
            power_connectors: {
                atx_power_connector: pcAtxPowerConnector,
                cpu_power_connector: pcCpuPowerConnector,
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
                        onChange={(e) => setChipset(e.target.value)}
                        id="outlined-required"
                        label="Chipset"
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
                        onChange={(e) => setUsbPorts(e.target.value)}
                        id="outlined-required"
                        label="Usb Ports (type:value)"
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
                        onChange={(e) => setMMaxSize(e.target.value)}
                        id="outlined-required"
                        label="Max Size"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setMSlots(e.target.value)}
                        id="outlined-required"
                        label="Slots"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setMMaxSpeed(e.target.value)}
                        id="outlined-required"
                        label="Max Speed"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Expansion slots</p>
            <p className="pwcSubClass">PCI express</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setESPCESlotTypeOne(e.target.value)}
                        id="outlined-required"
                        label="Slot type"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setESPCEVersionOne(e.target.value)}
                        id="outlined-required"
                        label="Version"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setESPCENumberOne(e.target.value)}
                        id="outlined-required"
                        label="Number"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <br/>

            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        onChange={(e) => setESPCESlotTypeTwo(e.target.value)}
                        id="outlined-required"
                        label="Slot type"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        onChange={(e) => setESPCEVersionTwo(e.target.value)}
                        id="outlined-required"
                        label="Version"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        onChange={(e) => setESPCENumberTwo(e.target.value)}
                        id="outlined-required"
                        label="Number"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p className="pwcSubClass">M2 slots</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        onChange={(e) => setESM2Slots(e.target.value)}
                        id="outlined-required"
                        label="m2 slots"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Storage</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setSTSataPorts(e.target.value)}
                        id="outlined-required"
                        label="Sata ports"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setSTRaidSupport(e.target.value)}
                        id="outlined-required"
                        label="Raid support"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Network</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setNEthernet(e.target.value)}
                        id="outlined-required"
                        label="Ethernet"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setNWifi(e.target.value)}
                        id="outlined-required"
                        label="Wifi"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setNBluetooth(e.target.value)}
                        id="outlined-required"
                        label="Bluetooth"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Audio</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setADCodec(e.target.value)}
                        id="outlined-required"
                        label="Codec"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setADSPdifOut(e.target.value)}
                        id="outlined-required"
                        label="s pdif out"
                        defaultValue=""
                    />
                </FormControl>
            </div>

            <p>Bios</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setBiosType(e.target.value)}
                        id="outlined-required"
                        label="Type"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setBiosFeatures(e.target.value)}
                        id="outlined-required"
                        label="Features"
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

            <p>Power Connectors</p>
            <div className="as_addItem_textField_flexContainer">
                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setPCAtxPowerConnector(e.target.value)}
                        id="outlined-required"
                        label="Atx power connector"
                        defaultValue=""
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        onChange={(e) => setPCCpuPowerConnector(e.target.value)}
                        id="outlined-required"
                        label="Cpu power connector"
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

export default MotherboardForm;