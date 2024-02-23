import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth';
 
const Footer = () => {
  const [auth] = useAuth();
  const location = useLocation();
  const isLinkActive = (path) =>{
    return location.pathname === path;
  }
  return (
         <div>
             <div className="footer-navbar">
                    <div className="item">
                       <Link to="/inplay"> 
                            <div className="item-i">
                                <img  src={`${isLinkActive('/inplay') ? '/assets/in-play-active-3ad0ff7e.svg':'/assets/in-play-b091edb5.svg'}`} alt="vector" className="fnb-img" />
                                <span className={`titles ${isLinkActive('/inplay') ? 'active' : ''}`}>IN PLAY</span>
                          </div>
                        </Link>
                    </div>
                    <div className="item">
                     <Link to="/sports"> 
                        <div className="item-i">
                            <img src={`${isLinkActive('/sports') ? '/assets/sports-active-40cee2fd.svg' : '/assets/sports-3fcdca37.svg'}`} alt="vector"  className="fnb-img"/>
                            <span className={`titles ${isLinkActive('/sports') ? 'active' :'' }`}>SPORTS</span>
                        </div>
                      </Link>
                    </div>
                    <Link to="/" className='d-none'> 
                     <div className="item">
                         <img src={`${isLinkActive('/') ? '/assets/home-active-c1518a11.svg' : '/assets/home-e5572456.svg'}`} alt="vector" className="fnb-img h-img" />
                    </div>
                    </Link>
                   
                    <div className="item">
                        <Link to={auth.user ? "/multi-markets" : "/"}>
                            <div className="item-i">
                                <img src={`${isLinkActive('/multi-markets') ? '/assets/mm-active-b422a484.svg' : '/assets/mm-932a4437.svg'}`} alt="vector" className="fnb-img" />
                                <span className={`titles ${isLinkActive('/multi-markets') ? 'active' : ''}`}>MULTI M</span>
                            </div>
                        </Link>
                    </div>

                    <div className="item">
                       <Link to={auth.user ? "/account" : "/login"}>
                         <div className="item-i">
                            <img src={`${isLinkActive('/account') ? '/assets/accounts-active-eb7d9269.svg' : '/assets/accounts-0b5b1232.svg'}`} alt="vector" className="fnb-img" />
                            <span className={`titles ${isLinkActive('/account') ? 'active' : ''}`}>ACCOUNTS</span>
                        </div>
                       </Link>
                    </div>
                </div>
    </div>
  )
}

export default Footer