import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import Cookies from 'js-cookie';

const useTabFunctions = () => {
    // Header Logic
    const [showMenu, setShowMenu] = useState(false)
    const sideMenuHandler = () => {
      setShowMenu(true)
    }
    const[setting,setSetting] = useState(false)
    const settingHandler = () =>{
      setSetting(true)
    }
    const[auth,setAuth] = useAuth();
    const navigate = useNavigate()
     // Logout
    const handleLogout = () =>{
      setAuth({
        ...auth,user:null,token:""
      });
      sessionStorage.removeItem('user-session');
      Cookies.remove('token');
      navigate('/')
      setSetting(false)
    }
    // Active Box
    const [selectedBoxes, setSelectedBoxes] = useState([]);
    const handleBoxClick = (boxId) => {
    // Check if the active box is already selected
    if (selectedBoxes.includes(boxId)) {
        setSelectedBoxes(selectedBoxes.filter(id => id !== boxId)); // Remove the box from selected
    } else {
        setSelectedBoxes([...selectedBoxes, boxId]); // Add the box to selected
    }
    };
    const [tab, setTab] = useState(1);
    const tabHandler = (index) => {
        setTab(index);
    };
     const [ipdf, setIpdf] = useState(1);
    const ipdfTab = (index) => {
        setIpdf(index);
    };

    const [isOpen, setIsOpen] = useState({}); // Use an object for separate isOpen states
    const toggleTab = (tabIndex) => { // Pass the tabIndex as an argument
        setIsOpen((prevState) => ({
            ...prevState,
            [tabIndex]: !prevState[tabIndex], // Toggle the specific tabIndex's isOpen state
        }));
    };

// Info tabs
 const [info,setInfo] = useState(false) 
 const infoHandler = () =>{
      setInfo(!info)
 }
 const [fancyTab ,setFancyTab] = useState(1)
 const fancyTabHandler = (index) =>{
    setFancyTab(index)
 } 

    return {showMenu,setShowMenu,sideMenuHandler, setting,setSetting,settingHandler, handleLogout, selectedBoxes,handleBoxClick, tab,tabHandler, ipdf,ipdfTab, isOpen,toggleTab,  info,infoHandler, fancyTab,fancyTabHandler };
};

export default useTabFunctions;
