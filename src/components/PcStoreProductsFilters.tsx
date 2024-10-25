import React, {useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox, Divider,
    FormControlLabel,
    FormGroup,
    Typography
} from "@mui/material";
import Slider from '@mui/material/Slider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function PcStoreProductsFilters() {
    const [selectedOptions, setSelectedOptions] = useState({
        I9: false,
        I7: false,
        I5: false,
        RTX4090: false,
        RTX3080Ti: false,
        RTX3070: false,
    });

    const [sliderValue, setSliderValue] = useState<number>(0);

    // checkbox handler
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setSelectedOptions((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const selectedValues= Object.entries(selectedOptions)
        .filter(([key, value]) => value)
        .map(([key]) => key);

    // slider marks
    const marks = [
        {
            value: 0,
            label: '0$',
        },

        {
            value: 750,
            label: '750$'
        },

        {
            value: 1500,
            label: '1500$'
        },

        {
            value: 3000,
            label: '3000$',
        }
    ];

    const sliderAriaValueTextFunc = (value: number) => {
        return `${value}$`;
    }

    // slider handler
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    return (
        <Box
            sx={{
                width: '100%',
                margin: '0 auto',
                border: '1px solid var(--softGray-color)',
                borderRadius: '16px',
                p: '16px'
            }}
        >
            {/* Filter reset */}
            <Box
                display="flex"
                justifyContent="space-between"
                sx={{
                    px: '16px',
                    mb: '16px'
                }}
            >
                <Typography variant="body1">Filter</Typography>
                <Typography
                    variant="body1"
                    sx={{
                        textDecoration: 'underline',
                        color: 'var(--secondary-color)',
                        cursor: 'pointer',
                        '&:hover': {
                            color: 'var(--hardGray-color)'
                        }
                    }}
                >
                    Reset All
                </Typography>
            </Box>

            <Divider sx={{ mb: "16px" }} />

            <Box sx={{mb: '16px'}}>
                <Accordion defaultExpanded >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        Price
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ width: '75%', margin: '0 auto' }}>
                            <Slider
                                aria-label="Custom marks"
                                defaultValue={0}
                                value={sliderValue}
                                onChange={handleSliderChange}
                                getAriaValueText={sliderAriaValueTextFunc}
                                step={100}
                                marks={marks}
                                min={0}
                                max={3000}
                                valueLabelDisplay="auto"
                            />
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Box>

            <Divider sx={{ mb: "16px" }} />

            <Box sx={{mb: '16px'}}>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        Processor
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="I9"
                                        checked={selectedOptions.I9}
                                        onChange={handleCheckboxChange}
                                    />
                                }
                                label="Intel Core I9"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="I7"
                                        checked={selectedOptions.I7}
                                        onChange={handleCheckboxChange}
                                    />
                                }
                                label="Intel Core I7"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="I5"
                                        checked={selectedOptions.I5}
                                        onChange={handleCheckboxChange}
                                    />
                                }
                                label="Intel Core I5"
                            />
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
            </Box>

            <Divider sx={{ mb: "16px" }} />

            <Box sx={{mb: '16px'}}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        Video Card
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="RTX4090"
                                        checked={selectedOptions.RTX4090}
                                        onChange={handleCheckboxChange}
                                    />
                                }
                                label="GeForce RTX 4090"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="RTX3080Ti"
                                        checked={selectedOptions.RTX3080Ti}
                                        onChange={handleCheckboxChange}
                                    />
                                }
                                label="GeForce RTX 3080 Ti"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="RTX3070"
                                        checked={selectedOptions.RTX3070}
                                        onChange={handleCheckboxChange}
                                    />
                                }
                                label="GeForce RTX 3070"
                            />
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
}

export default PcStoreProductsFilters;