import React from 'react';
import {Box} from "@mui/material";
import HomeHeroImageComponent from "../../components/home-components/HomeHeroImageComponent";
import HomeBestSellingSectionComponent from "../../components/home-components/HomeBestSellingSectionComponent";
import HomeFillerSectionComponent from "../../components/home-components/HomeFillerSectionComponent";
import HomeWhatWeOfferSection from "../../components/home-components/HomeWhatWeOfferSection";
import HomeWhyBuyFromUsSection from "../../components/home-components/HomeWhyBuyFromUsSection";
import FooterSection from "../../components/home-components/FooterSection";
import CopyrightSection from "../../components/home-components/CopyrightSection";

import fillerImage1 from '../../assets/productImages/6.png'
import fillerImage2 from '../../assets/productImages/5.png'

function Home() {
    const fillerSectionDisplayData1 = {
        title: "ASSEMBLED AND SUPPORTED",
        description: "By buying a Compjux PC, you get access to a fast and powerful PC that will last you a long time!",
        buttonValue: "Learn More",
    }
    const fillerSectionDisplayData2 = {
        title: "Revolutionize the Game With Compjux and Intel",
        description: "After 5 years of disrupting the processor industry with a series of firsts, Intel processors continue to shock and awe with Compjux systems.",
        buttonValue: "Learn More",
    }

    return (
        <Box sx={{width: '100%'}}>
            <HomeHeroImageComponent />
            <HomeBestSellingSectionComponent />
            <HomeFillerSectionComponent imagePath={fillerImage1} isReversed={true} displayData={fillerSectionDisplayData1} bgColor="var(--primary-color)" />
            <HomeFillerSectionComponent imagePath={fillerImage2} isReversed={false} displayData={fillerSectionDisplayData2} bgColor="var(--secondary-color)" />
            <HomeWhatWeOfferSection />
            <HomeWhyBuyFromUsSection />
            <FooterSection />
            <CopyrightSection />
        </Box>
    );
}

export default Home;