// styles
import './HomeStyles/Home.css'
import Slider from 'react-slick';
import {Box, Typography, Button, IconButton} from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

// images
import slide_image1 from '../assets/banner-images/slide_image1.jpg'
import slide_image2 from '../assets/banner-images/slide_image2.jpg'
import slide_image3 from '../assets/banner-images/slide_image3.jpg'
import slide_image4 from '../assets/banner-images/slide_image4.jpg'
import {useRef} from "react";
import {useNavigate} from "react-router-dom";

function HomeHeroImageComponent() {
    const arrowRef = useRef<null | any>(null);
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        draggable: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 768,
                draggable: true
            }
        ]
    };

    const slides = [
        { img: slide_image1, title: 'Compjux Series', description: 'Powerful gaming PCs with cutting-edge components, sleek design, and unmatched performance—built to elevate your gaming experience.' },
        { img: slide_image2, title: 'Signature pOWer Series', description: 'High-performance gaming PCs designed for enthusiasts—delivering exceptional power, style, and reliability for the ultimate gaming experience.' },
        { img: slide_image3, title: 'AVG', description: 'Gaming PCs crafted for balance, offering reliable performance and great value for gamers seeking an all-round experience.' },
        { img: slide_image4, title: 'Special AVtar Rotation', description: 'High-performance gaming PCs designed for versatility, delivering exceptional power and speed for all your gaming needs.' },
    ];

    return (
        <Box className="slider-container" sx={{ width: '100%', margin: '0 auto', height: '788px', position: 'relative' }}>
            <Slider ref={arrowRef} {...settings}>
                {slides.map((slide, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: '100%',
                            height: '788px',
                            position: 'relative',
                            backgroundImage: `url(${slide.img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            '&::before' : {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                            }
                        }}
                    >
                        {/* Content Box */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '10%',
                                transform: 'translateY(-50%)',
                                padding: '24px',
                                width: {xs: '300px', sm: '420px'},
                            }}
                        >
                            <Typography variant="h3" sx={{ marginBottom: '16px', fontWeight: 'bold', color: 'var(--primary-color)', fontSize: '32px' }}>
                                {slide.title}
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '32px', color: 'var(--softGray-color)'}}>
                                {slide.description}
                            </Typography>
                            <Button onClick={() => navigate('pc-store')} variant="contained" sx={{ backgroundColor: 'var(--primary-color)', '&:hover': {backgroundColor: 'var(--softGray-color)', color: 'var(--primary-color)'} }}>
                                Shop Now
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Slider>

            <IconButton
                onClick={() => arrowRef.current.slickNext()}
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: {xs: 'none', sm: 'block'}
                }}
            >
                <ChevronRightRoundedIcon sx={{ fontSize: '64px', color: 'var(--softWhite-color)' }} />
            </IconButton>

            <IconButton
                onClick={() => arrowRef.current.slickPrev()}
                sx={{
                    position: 'absolute',
                    left: 0, top: '50%',
                    transform: 'translateY(-50%)',
                    display: {xs: 'none', sm: 'block'}
                }}
            >
                <ChevronLeftRoundedIcon sx={{ fontSize: '64px', color: 'var(--softWhite-color)' }} />
            </IconButton>
        </Box>
    );
}

export default HomeHeroImageComponent;