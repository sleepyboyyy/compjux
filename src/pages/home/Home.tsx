import React from 'react';
import {Box} from "@mui/material";
import HomeHeroImageComponent from "../../components/HomeHeroImageComponent";
import HomeBestSellingSectionComponent from "../../components/HomeBestSellingSectionComponent";

function Home() {
    return (
        <Box>
            <HomeHeroImageComponent />
            <HomeBestSellingSectionComponent />
        </Box>
    );
}

export default Home;