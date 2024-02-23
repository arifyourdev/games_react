import React, { useEffect, useState } from 'react';
import '../style.css';
import Header from '../componenst/Header';
import Footer from '../componenst/Footer';
import { Link } from 'react-router-dom';
import Marque from '../componenst/Marque';
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0); // Start from the first image
    const images = [
        '/assets/promo_banner_3-f701d5d2.png',
        '/assets/promo_banner_1-915db989.png',
        '/assets/promo_banner_2-3ce9577f.png',
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const initialTransform = -((100 / images.length) * currentIndex) - 77; // Adjust the -77% here
    const sliderTransform = `translate3d(${initialTransform}%, 0px, 0px)`;

    useEffect(() => {
        const intervalId = setInterval(nextSlide, 5000); // Slide to the next image every 5 seconds
        return () => {
            clearInterval(intervalId);
        };
    }, [currentIndex]);

    const [hometab, setHomeTab] = useState(1);
    const hoemTabHandler = (index) => {
        setHomeTab(index)
    }

    return (
        <div>
            <div className="app" id="App">
                <Header />
                <div className="home">
                    <div className="promo-block">
                        <div className="carousel-root">
                            <div className="carousel carousel-slider" style={{ width: "100%" }}>
                                <ul className="control-dots">
                                    {images.map((_, index) => (
                                        <li key={index} className={`dot ${index === currentIndex ? 'selected' : ''}`} value={index} role="button"
                                            tabIndex={0}
                                            aria-label={`slide item ${index + 1}`}
                                        />
                                    ))}
                                </ul>
                                <button type="button" className="control-arrow control-prev" onClick={prevSlide} />
                                <div className="slider-wrapper axis-horizontal">
                                    <ul className="slider animated"
                                        style={{ transform: sliderTransform, transitionDuration: '350ms' }} >
                                        {images.map((imageUrl, index) => (
                                            <li key={index} className={`slide ${index === currentIndex ? 'selected' : ''}`} style={{ minWidth: '85%' }} >
                                                <div>
                                                    <img src={imageUrl} alt={`Slide ${index + 1}`} />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                 <button type="button" className="control-arrow control-next" onClick={nextSlide} />
                            </div>
                        </div>
                    </div>
                    <div className="navBar">
                        <BiSolidLeftArrow/>
                        <div className={hometab === 1 ? "nb-item act" : "nb-item "} onClick={() => hoemTabHandler(1)}>
                            <div className="icon casino" />
                            <div className="title active">Casino</div>
                        </div>
                        <div className={hometab === 2 ? "nb-item act" : "nb-item "} onClick={() => hoemTabHandler(2)}>
                            <div className="icon soccer" />
                            <div className="title active">Sports</div>

                        </div>
                        <div className={hometab === 3 ? "nb-item act" : "nb-item "} onClick={() => hoemTabHandler(3)}>
                            <div className="icon cricket" />
                            <div className="title active">Cricket</div>
                        </div>
                        <div className={hometab === 4 ? "nb-item act" : "nb-item "} onClick={() => hoemTabHandler(4)}>
                            <div className="icon slot" />
                            <div className="title active">Slot</div>
                        </div>
                        <div className={hometab === 5 ? "nb-item act" : "nb-item "} onClick={() => hoemTabHandler(5)}>
                            <div className="icon fishing" />
                            <div className="title active">Fishing</div>
                        </div>
                         <BiSolidRightArrow/>
                    </div>
                    <Marque />
                    <div className={hometab === 1 ? 'd-block' : 'd-none'}>
                        <div className="casino-games">
                            <div className="games-grid">
                                <div className="grid-header">
                                    <div className="title">
                                        <div className="line" />
                                        <span>Casino Provider</span>
                                    </div>
                                    <div className="btn">All Providers</div>
                                </div>
                                <div className="grid">
                                    <div className="icon ae-sexy" />
                                    <div className="icon king-maker" />
                                    <div className="icon jili-gaming" />
                                    <div className="icon evolution" />
                                    <div className="icon ludo" />
                                    <div className="icon ezugi" />
                                </div>
                            </div>
                        </div>
                    </div>

                     <div className={hometab === 2 ? 'd-block' : 'd-none'}>
                        <div className="navGrid">
                            <div className="ng-header">
                                <div className="title">
                                    <div className="line" />
                                    <span>Sports</span>
                                </div>
                            </div>
                            <div className="navGrid-cont">
                                <Link to={"/inplay"}>
                                <div className="ng-item">
                                    <div className="icon inPlay" />
                                    <div className="title">In Play</div>
                                </div>
                                </Link>
                                <div className="ng-item">
                                    <div className="icon virtual" />
                                    <div className="title">Virtual</div>
                                </div>
                                <div className="ng-item">
                                    <div className="icon sports-book" />
                                    <div className="title">Sports Book</div>
                                </div>
                                <div className="ng-item">
                                    <div className="icon cup-winner" />
                                    <div className="title">Cup Winner</div>
                                </div>
                                <div className="ng-item">
                                    <div className="icon kabaddi" />
                                    <div className="title">Kabaddi</div>
                                </div>
                                <div className="ng-item">
                                    <div className="icon grey-hound" />
                                    <div className="title">Grey Hound</div>
                                </div>
                                <div className="ng-item">
                                    <div className="icon horse-racing" />
                                    <div className="title">Horse Racing</div>
                                </div>
                                <div className="ng-item">
                                    <div className="icon contest" />
                                    <div className="title">Contest</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={hometab === 4 ? 'd-block' : 'd-none'}>
                        <div className="casino-games">
                            <div className="games-grid">
                                <div className="grid-header">
                                    <div className="title">
                                        <div className="line" />
                                        <span>Slots</span>
                                    </div>
                                    <div className="btn">All Slots</div>
                                </div>
                                <div className="grid new-grid">
                                     <div className='w-100'><img src='assets/dummy/provider_JK.png'/></div>
                                     <div className='w-100'><img src='assets/dummy/provider_JDB.png'/></div>
                                     <div className='w-100'><img src='assets/dummy/provider_HBRD.png'/></div>
                                     <div className='w-100'><img src='assets/dummy/provider_JK.png'/></div>
                                     <div className='w-100'><img src='assets/dummy/provider_JDB.png'/></div>
                                     <div className='w-100'><img src='assets/dummy/provider_HBRD.png'/></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ae-sexy-games d-none">
                        <div className="games-grid">
                            <div className="grid-header">
                                <div className="title">
                                    <div className="line" />
                                    <span>AE Sexy</span>
                                </div>
                                <div className="btn">All Providers</div>
                            </div>
                            <div className="grid">
                                <div className="icon baccarat" />
                                <div className="icon dice" />
                                <div className="icon dragon" />
                                <div className="icon roulette" />
                            </div>
                        </div>
                    </div>
                    <div className="jili-games d-none">
                        <div className="games-grid">
                            <div className="grid-header">
                                <div className="title">
                                    <div className="line" />
                                    <span>Jili Games</span>
                                </div>
                                <div className="btn">All Providers</div>
                            </div>
                            <div className="grid">
                                <div className="icon fishing" />
                                <div className="icon table" />
                                <div className="icon slot" />
                                <div className="icon rummy" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="payment">
                    <div className="header-one">
                        <div className="line" />
                        <div className="title">Payment Method</div>
                    </div>
                    <div className="payment-icons">
                        <div className="icon upi" />
                        <div className="icon rupee_bank" />
                        <div className="icon bank_deposit" />
                        <div className="icon paytm" />
                        <div className="icon usdt" />
                    </div>
                    <div className="header-two">
                        <div className="line" />
                        <div className="title">Gaming Licensed</div>
                    </div>
                    <div className="gaming-icon" />
                </div>
                <div className="footer">
                    <div className="logo" />
                    <div className="copyright-text">
                        © 2023 Betexch Copyrights. All Rights Reserved
                    </div>
                </div>

                <Footer />

            </div>

        </div>
    )
}

export default Home