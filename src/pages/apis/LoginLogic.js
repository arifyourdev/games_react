import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

function useLoginLogic() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [capcha, setCapcha] = useState('');
    const [error, setError] = useState('');
    const [auth, setAuth] = useAuth();
    const location = useLocation();

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleCapchaChange = (event) => {
        setCapcha(event.target.value);
    };

    const [captchaText, setCaptchaText] = useState(generateCaptchaText());
    function generateCaptchaText() {
        const characters = '123456789';
        let captcha = '';
        for (let i = 0; i < 4; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return captcha;
    }
    const navigate = useNavigate();

    async function loginHandler(e) {
        e.preventDefault();
        if (userName === "") { setError("User ID Cannot be Empty"); return; }
        if (password === "") { setError("Password cannot be Empty"); return; }
        if (capcha === "") { setError("Capcha cannot be Empty"); return; }
        if (capcha !== captchaText) { setError("Incorrect Captcha"); return; }

          try {
            const response = await axios.post(`/validateLogin`, { userId: userName, pass: password });
            if(response.status === 200){
              setAuth({ ...auth, user:response.data, token:response.data.pass })
            //   Cookies.set("token",response.data.password)
              sessionStorage.setItem('user-session',JSON.stringify(response.data));
              navigate(location.state || "/")
            }else{
                setError(response.data.message);
                return;
             }
          } catch (error) {
             setError("Error In Code");
          }
    }

    return {
        userName,
        password,
        capcha,
        error,
        auth,
        handleUserNameChange,
        handlePasswordChange,
        handleCapchaChange,
        captchaText,
        loginHandler
    };
}

export default useLoginLogic;
