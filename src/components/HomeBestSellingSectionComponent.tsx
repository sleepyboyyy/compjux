import React from 'react';
import {Box, Typography} from "@mui/material";
import pcImage1 from '../assets/productImages/1.webp';
import pcImage2 from '../assets/productImages/2.webp';
import pcImage3 from '../assets/productImages/3.webp';
import pcImage4 from '../assets/productImages/4.webp';
import pcImage5 from '../assets/productImages/5.webp';
import HomeBestSellingSingleCard from "./HomeBestSellingSingleCard";
import Slider from 'react-slick'

function HomeBestSellingSectionComponent() {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '24',
        variableWidth: true,
    }

    return (
        <Box sx={{mb: '32px'}}>
            <Box sx={{ my: 4 }}>
                <Typography variant="h2" sx={{ textAlign: 'center', color: 'var(--secondary-color)' }}>
                    Best Selling Gaming PC
                </Typography>
            </Box>

            <Box
                sx={{ width: {xs:'95%', lg: '80%'}, position: 'relative', margin: '0 auto' }}
            >
                {/*  Card logic here  */}
                <Slider {...settings}>
                    <HomeBestSellingSingleCard productId="HYuFO0YvARjRajYfHY0Q" productImage={pcImage1} />
                    <HomeBestSellingSingleCard productId="qDZOJ5Xy2sJZqbtK050a" productImage={pcImage2} />
                    <HomeBestSellingSingleCard productId="hl9AdjAIzirs8D0cTQ2d" productImage={pcImage3} />
                    <HomeBestSellingSingleCard productId="iVueiu6ayKhrygcnhd2J" productImage={pcImage4} />
                    <HomeBestSellingSingleCard productId="XI5FFHDnYZg8m0ZmtZzY" productImage={pcImage5} />
                </Slider>
            </Box>
        </Box>
    );
}

export default HomeBestSellingSectionComponent;