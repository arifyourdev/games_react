import React from 'react'
import Header from '../componenst/Header'
import Footer from '../componenst/Footer'
import { Link } from 'react-router-dom'
import useBalanceExpo from '../apis/fetchBalanceExpo';
 

const Account = () => {
    const {balaceExpo} = useBalanceExpo(); 
    return (
        <div>
            <div id="root">
                <div className="app" id="App">
                   <Header/>
                    <div className="account">
                        <div className="ac-profile">
                            <div className="left">
                                <img className="profile-avtar" />
                                <div className="profile-name">David William</div>
                            </div>
                           <Link to="/account/myprofile"> <div className="right" /></Link>
                        </div>
                        <div className="ac-nav-btns">
                            <button className="btn deposite">Deposite</button>
                            <button className="btn withdraw">Withdraw</button>
                        </div>
                        <div className="ac-item ac-item-bal">
                            <div className="left">
                                <div className="icon balance" />
                                Balance Overview
                            </div>
                            <div className="ac-cur">
                            {balaceExpo.balance}<span>PBU</span>
                            </div>
                            <div className="right" />
                        </div>
                        <div className="ac-item">
                            <div className="left">
                                <div className="icon ac-s-icon" />
                                Account Statement
                            </div>
                            <div className="right" />
                        </div>
                        <div className="ac-item">
                            <div className="left">
                                <div className="icon my-bets" />
                                My Bets
                            </div>
                            <div className="right" />
                        </div>
                        <div className="ac-item">
                            <div className="left">
                                <div className="icon a-logs" />
                                Activity Log
                            </div>
                            <div className="right" />
                        </div>
                        <div className="ac-item">
                            <div className="left">
                                <div className="icon rs" />
                                Reset Password
                            </div>
                            <div className="right" />
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
                     <Footer/>
                </div>
            </div>

        </div>
    )
}

export default Account