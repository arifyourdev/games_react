import React from 'react'
import { Link} from 'react-router-dom'
import useLoginLogic from '../apis/LoginLogic';

const Login = () => {

    const {userName,password,capcha,error,handleUserNameChange,handlePasswordChange,handleCapchaChange,captchaText,loginHandler } = useLoginLogic();
  
    return (
        <div>
            <div className="login-popup">
                <div className="login-header">
                    <div className="header">
                        <Link to="/"><div className="back" /></Link>
                        <div className="title">LOGIN</div>
                    </div>
                    <div className="text">Welcome Back To</div>
                    <div className="logo" />
                </div>
                <div className="login-body">
                    <form>
                        <div className="input-cont">
                            <div className="icon text-input" />
                            <input type="text" placeholder="User Name" autoComplete='off' name='username' value={userName} onChange={handleUserNameChange} />
                        </div>
                        <div className="input-cont">
                            <div className="icon key-input" />
                            <input type="password" placeholder="Password" autoComplete='off' name='password' value={password} onChange={handlePasswordChange} />
                        </div>
                        <div className="input-cont captcha">
                            <div className="captcha-ref">
                                <span>{captchaText}</span>
                                <div className="refresh"/>
                            </div>
                            <input type="text" value={capcha} onChange={handleCapchaChange} name="code" placeholder="Captcha" />
                        </div>
                        <div className="login-btn" onClick={loginHandler}>Login Now</div>
                          {error && <div className="error" id="error">{error}</div>}
                    </form>
                </div>
                <div className="footer">
                    <div className="logo" />
                    <div className="copyright-text">
                        © 2023 Betexch Copyrights. All Rights Reserved
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login