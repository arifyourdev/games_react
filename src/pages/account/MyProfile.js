import React from 'react'
import Header from '../componenst/Header'
import Footer from '../componenst/Footer'
import { Link } from 'react-router-dom'

const MyProfile = () => {
    return (
        <div>
            <div id="root">
                <div className="app" id="App">
                    <Header />
                    <div className="ac-my-profile">
                        <div className="sec_mp">
                            <div className="acmp-header main-header">
                                <Link to="/account"><div className="back-icon" /></Link>
                                <div className="title">My Profile</div>
                                <div className="wedge-line" />
                                <div className="wedge" />
                            </div>
                            <div className="item">
                                <span>First Name</span>
                                <span className="value">David</span>
                            </div>
                            <div className="item">
                                <span>Last Name</span>
                                <span className="value">William</span>
                            </div>
                            <div className="item">
                                <span>Birth Day</span>
                                <span className="value">05-07-2023</span>
                            </div>
                            <div className="item">
                                <span>Email</span>
                                <span className="value">something@domain.com</span>
                            </div>
                            <div className="item">
                                <span>Password</span>
                                <span className="value">******</span>
                            </div>
                        </div>
                        <div className="sec_mp">
                            <div className="acmp-header">
                                <div className="title">Contact Details</div>
                                <div className="wedge-line" />
                                <div className="wedge" />
                            </div>
                            <div className="item">
                                <span>Mobile Number</span>
                                <span className="value">9999999999</span>
                            </div>
                        </div>
                        <div className="sec_mp sec_mp_alt">
                            <div className="acmp-header">
                                <div className="title">Settings</div>
                                <div className="wedge-line" />
                                <div className="wedge" />
                            </div>
                            <div className="item">
                                <span>Currency</span>
                                <span className="value">PBU</span>
                            </div>
                            <div className="item">
                                <span>Odds Format</span>
                                <span className="value">Decimal</span>
                            </div>
                        </div>
                        <div className="sec_mp">
                            <div className="acmp-header">
                                <div className="title">Commission</div>
                                <div className="wedge-line" />
                                <div className="wedge" />
                            </div>
                            <div className="item">
                                <span>Comm Charged</span>
                                <span className="value">2%</span>
                            </div>
                        </div>
                        <div className="sec_mp sec_mp_alt">
                            <div className="acmp-header">
                                <div className="title">Address</div>
                                <div className="wedge-line" />
                                <div className="wedge" />
                            </div>
                            <div className="item">
                                <span>Address</span>
                                <span className="value">------</span>
                            </div>
                            <div className="item">
                                <span>Town/City</span>
                                <span className="value">Delhi</span>
                            </div>
                            <div className="item">
                                <span>Coountry</span>
                                <span className="value">India</span>
                            </div>
                            <div className="item">
                                <span>State</span>
                                <span className="value">Delhi</span>
                            </div>
                            <div className="item">
                                <span>Postcode</span>
                                <span className="value">110098</span>
                            </div>
                            <div className="item">
                                <span>Time Zone</span>
                                <span className="value">Asia/Kolkata +5.30</span>
                            </div>
                        </div>
                        <div className="ac-contact">
                            <div className="header-one">
                                <div className="line" />
                                <div className="title">Contact Us</div>
                            </div>
                            <div className="icons">
                                <div className="cont">
                                    <img className="whatsapp" />
                                    <div className="title">Whatsapp</div>
                                </div>
                                <div className="cont">
                                    <img className="telegram" />
                                    <div className="title">Telegram</div>
                                </div>
                                <div className="cont">
                                    <img className="email" />
                                    <div className="title">Email</div>
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
        </div>
    )
}

export default MyProfile