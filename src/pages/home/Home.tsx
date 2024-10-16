// styles
import './Home.css'

// images
import slide_image1 from '../../assets/banner-images/slide_image1.jpg'
import slide_image2 from '../../assets/banner-images/slide_image2.jpg'
import slide_image3 from '../../assets/banner-images/slide_image3.jpg'
import slide_image4 from '../../assets/banner-images/slide_image4.jpg'

// hooks
import React from 'react';
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <div className="carousel-container">
                <Carousel>
                    <Carousel.Item>
                        <div className="carousel-item active">
                            <img src={slide_image1} className="d-block w-100 carousel-img" alt="..."/>
                        </div>

                        <div className="slider-caption">
                            <h2 className="mb-3">Tracer VIII Series</h2>
                            <p>Lightweight gaming laptops featuring next generation cooling, ultrafast performance hardware.</p>
                            <Link to="/">Shop now</Link>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="carousel-item active">
                            <img src={slide_image2} className="d-block w-100 carousel-img" alt="..."/>
                        </div>

                        <div className="slider-caption">
                            <h2 className="mb-3">AMD Advantage Desktops</h2>
                            <p>Whether you are gaming, streaming, or creating, AMD Advantage™ Desktops are purposefully engineered to be the most exceptional PCs on the market.</p>
                            <Link to="/">Shop now</Link>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="carousel-item active">
                            <img src={slide_image3} className="d-block w-100 carousel-img" alt="..."/>
                        </div>
                        <div className="slider-caption">
                            <h2 className="mb-3">March Ryzen 9</h2>
                            <p>Windows 11 Home / AMD Ryzen™ 7 7800X3D Processor / AMD Radeon™ <span>RX 7900 GRE</span> 16GB Video / 32GB (16GBx2) DDR5 / 6000MHz Memory / 1TB WD Blue SN580 M.2 PCle SSD</p>
                            <span className="slider-price mb-3 d-block">$1825</span>
                            <Link to="/">Shop now</Link>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="carousel-item active">
                            <img src={slide_image4} className="d-block w-100 carousel-img" alt="..." />
                        </div>

                        <div className="slider-caption">
                            <h2 className="mb-3">Greatness Starts Here</h2>
                            <p>Get an incredible Cyberpunk experience on an AMD Ryzen <span>8000G</span> Series processor without a graphics card.</p>
                            <Link to="/">Learn more</Link>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>

        </>
    );
}

export default Home;