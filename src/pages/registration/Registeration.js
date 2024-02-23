import React from 'react'
import { Link } from 'react-router-dom'

const Registeration = () => {
    return (
        <div>
            <div className="signup-popup">
                <div className="signup-popup-cont">
                    <div className="signup-header">
                        <div className="s-header">
                            <div className="back" />
                            <div className="title">REGISTER</div>
                        </div>
                        <div className="text">Welcome To</div>
                        <div className="logo" />
                    </div>
                    <div className="reg-body">
                        <div className="input-cont">
                            <div className="icon text-input" />
                            <input type="text" placeholder="User Name" />
                        </div>
                        <div className="input-cont">
                            <div className="icon key-input" />
                            <input type="password" placeholder="Password" />
                        </div>
                        <div className="input-cont">
                            <div className="icon key-input" />
                            <input type="password" placeholder="Confirm Password" />
                        </div>
                        <div className="input-cont">
                            <div className="icon ref-code-input" />
                            <input type="text" placeholder="Referal Code(optional)" />
                        </div>
                        <div className="input-cont">
                            <div className="icon full-name-input" />
                            <input type="text" placeholder="Full Name" />
                        </div>
                        <div className="input-cont">
                            <div className="icon email-input" />
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="input-cont">
                            <div className="icon sel-cur" />
                            <select className="currency-select">
                                <option>₹ Rupee</option>
                                <option>$ Dollar</option>
                            </select>
                        </div>
                        <div className="input-cont dc-cont">
                            <select className="dc-sel">
                                <option>+91</option>
                                <option>+44</option>
                            </select>
                            <input type="text" placeholder="Mobile Number" />
                        </div>
                        <div className="input-cont captcha">
                            <div className="captcha-ref">
                                <span>6119</span>
                                <div className="refresh" />
                            </div>
                            <input type="text" placeholder="Captcha" />
                        </div>
                        <div className="check-cont">
                            <input type="checkbox" className="check-box" />
                            <span>I'm 18 years old, and agree to "terms and conditions".</span>
                        </div>
                    </div>
                    <div className="signup-btn">Register Now</div>
                    <div className="login-red">
                        Have An Account? <span><Link to="/login" style={{color:"#3d7fe2"}}>LOGIN NOW</Link></span>
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
                </div>
            </div>

        </div>
    )
}

export default Registeration