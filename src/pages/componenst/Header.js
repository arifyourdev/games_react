import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom'
import { useAuth } from '../context/auth';
import useTabFunctions from '../helper/tabFunctions';
import useBalanceExpo from '../apis/fetchBalanceExpo';

const Header = () => {
  const {showMenu,sideMenuHandler, setting,setSetting,settingHandler, setShowMenu, handleLogout,selectedBoxes,handleBoxClick} = useTabFunctions();
  const {balaceExpo} = useBalanceExpo(); 

   const[bal ,setBall] = useState(false);
   const onLoadHandler = () =>{
      setBall(true);
      const timeoutId = setTimeout(() => {
        setBall(false);
      }, 500);
      return () => {
        clearTimeout(timeoutId);
      };
  }

  const[auth] = useAuth();
  // Display Stakes
  const obj = auth.user?.stake || {}; 
  const stakes = Object.keys(obj).map(key => obj[key]);
 
  // Edit Stake Handler
  const [stake , setStake] = useState(false)
  const editStakeHandler = () =>{
         setStake(!stake)
  }
  
  return (
    <>
      {!auth.user ? (<>
        <div className="header" style={{ display: "flex" }}>
        <div className="left">
          <div className="menu-icon" onClick={sideMenuHandler} />
        </div>
        <div className="center">
          <Link to="/"><div className="logo" /></Link>
        </div>
        <div className="right">
          <button className="btn login"> <Link to="/login">Login</Link></button>
          <button className="btn reg"><Link to="/register">Register</Link></button>
        </div>
      </div>
      </>):(<>
        <div className="header" style={{ display: "flex" }}>
        <div className="left">
          <div className="menu-icon" onClick={sideMenuHandler} />
        </div>
        <div className="center">
         <Link to="/"><div className="logo" /></Link>
      {!bal ? (
         <div className="user-bal d-none">
           PBU: <span className="pbu">{balaceExpo.balance}</span> Expo:
         <span className="expo">{balaceExpo.expo}</span>
        </div>
       ) :(
         <div className="bal-loading-bar"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
       ) }   
          
        </div>
        <div className="right">
          <div className="user-profile">
            <div className="up-icon bal-reload d-none" onClick={onLoadHandler} />
            <div className="up-icon settings" onClick={settingHandler} />
          </div>
        </div>
        {/* ==Setting== */}
      <div className={setting ? "settings-popup d-block":"settings-popup d-none"}>
        <div className="settings-popup-cont">
          <div className="header">
            <img className="icon" />
            <span className="title">Settings</span>
            <button className="close" onClick={(e) =>setSetting(false)}>X</button>
          </div>
          <div className="set-stakes">
            <div className="ss-title">Stakes</div>
            <div className="def-stakes">
              <span>Default Stakes</span>
              <input className="stake-ip" type="text" defaultValue={0} />
            </div>
            <div className="quick-stakes">
              <span> Quick Stakes</span>
              <div className={stake ? "q-s d-none": "q-s d-block"}>
                <div className="qs-l">
                  <span className={`${selectedBoxes.includes(1) ? '' : 'active'}`} onClick={() => handleBoxClick(1)}>{stakes[0]}</span>
                  <span className={`${selectedBoxes.includes(2) ? '' : 'active'}`} onClick={() => handleBoxClick(2)}>{stakes[1]}</span>
                  <span className={`${selectedBoxes.includes(3) ? '' : 'active'}`} onClick={() => handleBoxClick(3)}>{stakes[2]}</span>
                  <span className={`${selectedBoxes.includes(4) ? '' : 'active'}`} onClick={() => handleBoxClick(4)}>{stakes[3]}</span>
                </div>
                <div className="qs-l">
                  <span className={`${selectedBoxes.includes(5) ? '' : 'active'}`} onClick={() => handleBoxClick(5)}>{stakes[4]}</span>
                  <span className={`${selectedBoxes.includes(6) ? '' : 'active'}`} onClick={() => handleBoxClick(6)}>{stakes[5]}</span>
                  <span className={`${selectedBoxes.includes(7) ? '' : 'active'}`} onClick={() => handleBoxClick(7)}>{stakes[6]}</span>
                  <span className={`${selectedBoxes.includes(8) ? '' : 'active'}`} onClick={() => handleBoxClick(8)}>{stakes[7]}</span>
                </div>
                <div className="edit-stakes" onClick={editStakeHandler}>
              <span>Edit Stakes</span>
              <img
                width={20}
                height={20}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAsUlEQVR4nO3VPQoCMRBA4XcYsbPbwloQC1tLL7GVpVOt3ssj2OsJFCvbyEICIfizRWbCYh6kCuRjEtiF2shrgTtwBhorVAAXrQcwt0ZjvCkBO3/tlMBvGpAMwNvcaDj4mOztor29FhrWu8lFG/00uQnqtHAZgJq8qatoruRvrnfl/6e/0Kwfh9C2BNq3LIH2TS3RWXLwBFgAG+CpOenhy1RrFLtavWPaCbgAnb/22vh7AQEMocoBCJ3cAAAAAElFTkSuQmCC"
              />
            </div>
            </div>

              <div className={stake ? "q-s d-block" : "q-s d-none"}>
                <div className="qs-l">
                  <input className="stake-ipt" type="text" defaultValue={stakes[0]} />
                  <input className="stake-ipt" type="text" defaultValue={stakes[1]} />
                  <input className="stake-ipt" type="text" defaultValue={stakes[2]} />
                  <input className="stake-ipt" type="text" defaultValue={stakes[3]} />
                </div>
                <div className="qs-l">
                  <input className="stake-ipt" type="text" defaultValue={stakes[4]} />
                  <input className="stake-ipt" type="text" defaultValue={stakes[6]} />
                  <input className="stake-ipt" type="text" defaultValue={stakes[6]} />
                  <input className="stake-ipt" type="text" defaultValue={stakes[7]} />
                </div>
                <div className="edit-stakes" onClick={editStakeHandler}><span>Save</span></div>
              </div>
            </div>
           
          </div>
          <div className="toggle-item">
            <div className="title">Odds</div>
            <div className="cont">
              <div className="des">Highlight when odds change</div>
              <div className="t-btn-cont">
                <div className="s-bar" />
              </div>
            </div>
          </div>
          <div className="toggle-item">
            <div className="title">Fancy Bets</div>
            <div className="cont">
              <div className="des">Accept Any Odds</div>
              <div className="t-btn-cont active">
                <div className="s-bar" />
              </div>
            </div>
          </div>
          <div className="toggle-item">
            <div className="title">SportsBook</div>
            <div className="cont">
              <div className="des">Accept Any Odds</div>
              <div className="t-btn-cont active">
                <div className="s-bar" />
              </div>
            </div>
          </div>
          <div className="toggle-item">
            <div className="title">Binary</div>
            <div className="cont">
              <div className="des">Accept Any Price</div>
              <div className="t-btn-cont">
                <div className="s-bar" />
              </div>
            </div>
          </div>
          <div className="set-footer">
            <button className="btn">Cancel</button>
            <button className="btn btn-s">Save</button>
          </div>
        </div>
      </div>
      {/* ==End== */}
      </div>
      </>)
     }
  

      {/* ==Side Menu== */}
      <div className={showMenu ? "menu d-block" : "menu d-none"}>
        <div className="menu-cont">
          <div className="menu-header">
            <div className="logo" />
            <div className="close" onClick={(e) => setShowMenu(false)} />
          </div>
          <div className="menu-items">
            <div className="dropdown">
              <div className="dropbtn">
                <div className="dropbtn-cont">
                  <div className="left">
                    <img className="mi-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAcCAYAAAB/E6/TAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKASURBVHgBrVbNbhMxEB4nKZVAbRcJISEhsYgbF9JjT903oDxB0ydo8wTbPEHCE2QrrkhJD1xJTvTYvADKSiCEiCBBgrb5ad2Zzbh1HG/jrTLSyNlvvvW3nhnbEZDBpJQBDrv82BZCHMEyDQU89KqcWotdMua5zCEcRHwcGug0lnEVEeM7OFSZFlte7SC3DC5GqULvo3dZcO4jOCaZV2dPVuwqEvIE0aL0YLzG3JCfSwuFuB6qBgfgaMTVahjeKYSxIqeiyx2WyYxUyjTSPue5ZatHRrGGnko9GHKgBksynOtQbQEFBFnrkUGsxHMHglexjT2/aZBonxQ1iE6CtsEJcHiD/pgh2jtNg3NKOHD7toygOgW6ms+sWvtak9Mw5mqh13NgtxJMT4GXyvGZvjTQOPT72ODsoe/YJkwTog06MLC/6BsG1gdHK6TgAwuWiPRPwB9LOBj9/vhWrDzxeicQ4IHZzgNU4B5CHfQQc6uuBFph8fz7YftSwqkQ4A0Hn2DtVR02Xrd8jJVy+TWVsmYWoXcwzbWvgNHg8/HZt8q+FIkoDHtRgudXbyjeVe8DTMY/Ks5CWFhKXaRjv75AJFhEmRLTDQ+eEg5zezKtGSzisO3I27XhBXC0lfXAR5/BRn+aMDnrmFTv3kK0OWm8GsY3mMh78PB5CP/jMpz/vD0ipf22dV5ReIH1+Pd1bwZ89KKWiOlCWIu2bQLXGvm5Vb+Cnzuzvy4xbaKgZQrj45T95NwMD9aDGFu7bIrpIhR/tmVPnbMQ2dMtiCYCNrGFj/Ra4PN7wime+rLt9LZwpGoIA1/4J0Sd3qoZ6PLrwt1WnbuauZUXvEucmIQiSGnJJVrzGkSD+tc/0lfIAAAAAElFTkSuQmCC"
                    />
                  </div>
                  <div className="mi-title"><Link to="/">HOME</Link></div>
                </div>
              </div>
            </div>
            <div className="dropdown">
              <div className="dropbtn">
                <div className="dropbtn-cont">
                  <div className="left">
                    <img className="mi-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOXSURBVHgBjVY9aFNRFP5iC8XfpoJIwdo3C9K0ow5tcXRoMunWFME1KaiTkBTUNQEHN9OAk0u6ONjBNJN0sekgOKiJPyBYShLb0mrV6/1Ocl5eXl5SDxxy373nnO+e35sQAIM+NDMzg+npafl1HEeYVK/XUS6Xsbm5ieXlZVkfRSaIrWFTLBaFrSFDyuVyJhwOGwtm5ubmTDabNZVKxdRqNZGjTi97XUA0lMlkRJEGdZ9r7tEojXNdKBTcy/CcF6IubfQFovDGxoZJJpOBt6JhL7hyOp0Wb7mmLm0EyLU9oUA8Hg8E0fNeoWEYU6mUrGmDsj7Pmgu6rLcKYir38lSZIVQwytJmBxCTSOqXzF5hC/KaIJpTj024Se5VfVpd/UC8+aIsmXq0LWeRSES80c35+Xm3MOgFL0Bl3lTD0o8JwMupR26kCKC50RKlABUIoAnVsPQDo0G/57RPO6BReuVPqj9fF0dhnmUd8+egYnYrSVN+4ZgnjyImGo1KoajX/oLRxkdQbhgydr5+37wO82EVZus1TONd1Pw9rJmD7YLZ/54ze1/S5vnTuAAShB55y5pR4t4gAqjRaGBkZETW1hM8TABnTjfPjo8msPspiZ9beVd+agy4sw6srEDmogWE9VDOdD4es+hdQNVq1R2ed2+1QYbOxTEw5HSAkIZPAbdvNNeLi4uwBSX6NqSw0ZH9YzTqB+OeDZ1M7KtT7f0TF1LY+5pGENnwurr5fB42XwIYi8Vk0guQLYYOJYJw33Y2JmMGw5eKwiF75vfG65WSrWgsLS1hdnbWfU4GS6WS3HxtbU2E6C4PFxYW5PvjqzDOno8gNBDGSSeD0GAY5ne9C+jzt+YvQ0Z7BCFxzTeLC2lKNqo2mXfUPEg2q428U01Klem3lx/fb8qzD7Xp0WrgVvvA7WBueoXIY7Z/3q+2DbKPtt84HSA8p5yWMjyD2B1BaDUVvSIHDVb2kYLV386YX41iBwjP1Rv2E1qTRMcRv0OKZkeF9AArcHJyUvLkJXtj3LOlfsVW4eVrRRz+KKG2XcXLdQc7+2GMj4+LruaGhRQKhaSn3CKBZ5aRfO9IF+s85Izk6EkkEhImnTKchz0fPqD9lOsfERqg614FGvSPGWX9k9L3Kfd6xolLooI+H1zru+Wdg/AMT55R/sg/JwiYulSmd6xGMsOiry1l+P0/f7fcYuhFnBps4omJCVnruOLkILPh2eza8L3oH0MkEVxK9C4uAAAAAElFTkSuQmCC"
                    />
                  </div>
                  <span className="mi-title"><Link to="/sports">SPORTS</Link></span>
                </div>
              </div>
            </div>
            <div className="dropdown">
              <div className="dropbtn">
                <div className="dropbtn-cont">
                  <div className="left">
                    <img className="mi-icon"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOXSURBVHgBjVY9aFNRFP5iC8XfpoJIwdo3C9K0ow5tcXRoMunWFME1KaiTkBTUNQEHN9OAk0u6ONjBNJN0sekgOKiJPyBYShLb0mrV6/1Ocl5eXl5SDxxy373nnO+e35sQAIM+NDMzg+npafl1HEeYVK/XUS6Xsbm5ieXlZVkfRSaIrWFTLBaFrSFDyuVyJhwOGwtm5ubmTDabNZVKxdRqNZGjTi97XUA0lMlkRJEGdZ9r7tEojXNdKBTcy/CcF6IubfQFovDGxoZJJpOBt6JhL7hyOp0Wb7mmLm0EyLU9oUA8Hg8E0fNeoWEYU6mUrGmDsj7Pmgu6rLcKYir38lSZIVQwytJmBxCTSOqXzF5hC/KaIJpTj024Se5VfVpd/UC8+aIsmXq0LWeRSES80c35+Xm3MOgFL0Bl3lTD0o8JwMupR26kCKC50RKlABUIoAnVsPQDo0G/57RPO6BReuVPqj9fF0dhnmUd8+egYnYrSVN+4ZgnjyImGo1KoajX/oLRxkdQbhgydr5+37wO82EVZus1TONd1Pw9rJmD7YLZ/54ze1/S5vnTuAAShB55y5pR4t4gAqjRaGBkZETW1hM8TABnTjfPjo8msPspiZ9beVd+agy4sw6srEDmogWE9VDOdD4es+hdQNVq1R2ed2+1QYbOxTEw5HSAkIZPAbdvNNeLi4uwBSX6NqSw0ZH9YzTqB+OeDZ1M7KtT7f0TF1LY+5pGENnwurr5fB42XwIYi8Vk0guQLYYOJYJw33Y2JmMGw5eKwiF75vfG65WSrWgsLS1hdnbWfU4GS6WS3HxtbU2E6C4PFxYW5PvjqzDOno8gNBDGSSeD0GAY5ne9C+jzt+YvQ0Z7BCFxzTeLC2lKNqo2mXfUPEg2q428U01Klem3lx/fb8qzD7Xp0WrgVvvA7WBueoXIY7Z/3q+2DbKPtt84HSA8p5yWMjyD2B1BaDUVvSIHDVb2kYLV386YX41iBwjP1Rv2E1qTRMcRv0OKZkeF9AArcHJyUvLkJXtj3LOlfsVW4eVrRRz+KKG2XcXLdQc7+2GMj4+LruaGhRQKhaSn3CKBZ5aRfO9IF+s85Izk6EkkEhImnTKchz0fPqD9lOsfERqg614FGvSPGWX9k9L3Kfd6xolLooI+H1zru+Wdg/AMT55R/sg/JwiYulSmd6xGMsOiry1l+P0/f7fcYuhFnBps4omJCVnruOLkILPh2eza8L3oH0MkEVxK9C4uAAAAAElFTkSuQmCC"
                    />
                  </div>
                  <span className="mi-title">RESULT</span>
                </div>
              </div>
            </div>
            <div className="dropdown">
              <div className="dropbtn">
                <div className="dropbtn-cont">
                  <div className="left">
                    <img className="mi-icon"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAbCAYAAABvCO8sAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANWSURBVHgBtVZbSJNhGH7+ObNMXQcNRStBCBwEWZB6oQYJlU2oSRTawUEXUuTqyojd5S4mROpVdNUBd6cQQhfOi1ldJATajXbAMtrYhSJtKw95WHs++Nb+/ft103rgZ/u/fd+e93mPn1JWVhZBmujr60NlZSVGR0fR39+PgYGBlM8qJMzNzYXZbE7pAIlaW1vR0dGB8vJyNDU1IRKJoLe3NyVipaenJ2Kz2RAMBpEOTCaTOENiGpEqsRIKhSIWiwV+vx/pgq6dmJiA0+lEcXGxIN2I2EB3pkNGd/IM4fP5hFKC/0GS5uZmQWS32+H1emG1WtWESBMklCTJIInr6urEZyKxEf8RVMqHZCTeFGFjYyPC4XBKexnXkpISQcrPqqqq9AiLClZw6dRXNNSGkZu9hpyyn/j8bVt0fRmBmUzN/vb2dlGrBDOZNasbQyaGy+US/me9na0J45nzOy6eDgoyCfPhaox4R0Rs45GXlycUkZBkUqlBj8ztdovv3DQ4OIi7dywqIomVX+NYnHmKWzevCqUS0XKDLDcaE613sZ6U0OFwiJRnUTPT3nhcKDQ/gDH7iGbv6vx7LAS6Ydp9AJcvVKh+Y6wZR3YxWZMaQsqnKzo7O2NrpkWHULGz9GEy+xBZ/YHlkBfnLcc0vzGOUp0uIbtHfDNgsvAPDVml0MPS3AvsPXhFtUZ1ND6+42gIZZD50DomTmbeCWQVXMPa0jR0CWeeICNqEM/pqSOMyQjpTm6WE2Rt5TgMGVMIT9k0RIpxF7YX2pG155x4l21PqmMexCNp0tAFLS0taGtrE+61nKmB793JpAp3RMmyi25jLvAKloZaDA8Px9Sx7hKhW/hjY2Mxa1+/nYb7USOqD73UlMbvaOz841Z0P8/Hh09qdWzkKRNWVFRo1ory9+O6dQ5HyxdEIhEfv8zjxr0SBGb/dhqpLtkUUhFSETuE3rgKzBpx//G+2LvLlQNFUVRk66kjVDHk5OcA3QqobmhoSNfofzqe5NTnLNSDitDj8WArWC92Egb2u/r6evEyOTkpnlQgb3ry8iXVsfeuByVaaxE2ax5IFzSOtUpF7EhEYqFrCOVFmPMqVVAdRw4V0YXsTl1dXSJ2G13IlM3cvCXoFcZNDtdknSURfwAUuo2QK68RjQAAAABJRU5ErkJggg=="
                    />
                  </div>
                  <span className="mi-title">CASINO</span>
                </div>
              </div>
              <div className="dropdown-content">
                <div className="dropdown-content-btn fc">
                  <img className="mi-icon" src="/assets/evo-casino-ab9ede21.png" />
                  <div className="mi-title">Evo</div>
                </div>
                <div className="dropdown-content-btn">
                  <img className="mi-icon" src="/assets/sexy-casino-c1c6bc22.png" />
                  <div className="mi-title">Sexy</div>
                </div>
                <div className="dropdown-content-btn">
                  <img className="mi-icon" src="/assets/pp-casino-61a23f27.png" />
                  <div className="mi-title">PP</div>
                </div>
                <div className="dropdown-content-btn">
                  <img className="mi-icon"
                    src="data:image/png;base64,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"
                  />
                  <div className="mi-title">Pt</div>
                </div>
                <div className="dropdown-content-btn">
                  <img className="mi-icon" src="/assets/venus-casino-a6936af5.png" />
                  <div className="mi-title">Venus</div>
                </div>
                <div className="dropdown-content-btn">
                  <img className="mi-icon" src="/assets/mg-casino-4906d156.png" />
                  <div className="mi-title">MG</div>
                </div>
              </div>
            </div>
            <div className="dropdown">
              <div className="dropbtn">
                <div className="dropbtn-cont">
                  <div className="left">
                    <img className="mi-icon"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKQSURBVHgBxVa/ixNBFP4S/FUcJjbCFZoEsbAQkr/AjZ1YJOmsTCyFw+QPOEiCVtqc2Agim4CFhdylsbFJwMJKQwobiWywEU+9LBHM4Z2M+2bZdWZ3Zi97d9w9eExm8+Z9b973zewCAFN5s9lkB7Fqtcp0ucmT0JhhGCgWi0gkErG93W4jl8shypI4Jjs+YMuy4FAScmr1QczRiDIvOWEmSAjEy1EagZ9YNLher6NcLoeeVyoV2LaNuLYwcKFQwNa3Ec6f6eHqZeDUuTJ+zVO4v2Lj0XPgy1fEMg7carVCfxAP3W7Xn6dSKVy/soE/0wF2ZsDSJROnP9/BrZvAjWvA6hrw8rV7DIP66HQ6mEwm/Hc6neZjkloVNOfwS/NsNsvbvPt7xOcnzxogVezMBm5RS8CDBnBxGTBNE5lMxgchkYlGeagQMulGcUD4zUOj9+zZ4xqbb5rs+ztwn2922Gxc9eeev90wmNMpf12tVmNOIVL+4XDInI6wELAqmJLZHw2e/OcHtzAag8BUkHhVCiDc8/m8WBhCIGIw/f67bfnJZ2N59557BXmdCoBwd1osFgYJRBUstnV3+//uRaeCPo1MHQhz+GbT6VSkUFuRz/eLNbetBCjuXnQq6OlDQweiolAvKi/4wjLY+I1eVFTQ1g+Lx3nrer2eTlQysE5UXvDd29Giurcii6pUKulEJQOrRBU8GuuvTPZkFez9ugtIXSAaxE7RqNJJo9EIA+tEJfIdLEzXKVrn3IShzokU+sA6UXnBqsJ0BQVBVHxzJwXqRKXbfRQdQZB+vy/xLQHTYtHoKJAgVLuPooOAg6brFDQPtbvX0bEPjw5YVFSHChxHVHF9z69MeherPtjoxT4YDLBf+wf4yf8SaZPtggAAAABJRU5ErkJggg=="
                    />
                  </div>
                  <span className="mi-title">SLOTS</span>
                </div>
              </div>
            </div>
            <div className="dropdown">
              <div className="dropbtn">
                <div className="dropbtn-cont">
                  <div className="left">
                    <img className="mi-icon"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALZSURBVHgBpVY7jBJRFD3sbrJrXIVmszFxdWgsrIitBdBqAZ12QEy0sIBGWyCrJlZAoYWFECutkMLGQmYrO6HWKFC5yWYD+GMVYXzn4TwGZmBmsze5meF97rmfcy8DAMa8RiIRo16vG8eRVqtlhEIhw8kenIx3u10jl8sZgUBg0SWbJpNJCVQulw1N0+wgJzFuVd7jfYJlMpnp3nGMc58OuYExkmq1KsGkTebTi+fMd6VSMdLptIzaISU2JYg8RxAvnhHAGhE9dXPOBFmBBxH5xVo3h89vgYP3wLvnPWz5ShDF9nIda24Hbl4Xeg1YPWyrtZ1zwMp6G/fvRLD/CXj5ZrkNGYmgHURYts0LwtjDNHBqrOO0VsDGVhL+y3X53NhKYH1QwYPM5JwrSKfTIcuQSCRmNu/dAs6eAf50X2PwtYThzyaG3/Yw+t3GYL+EsXj6N4HbN2aNilqhUCgoxyWIoC+i0ah8WqO6emV6kQZHv5o4OqgIIB3G357aY0pN49lsFo1GA/1+H+12ewpC4UIwGJyJaschDQSbF0YjqA3BJumg6bASUpjct/Ke76Tf6Mibjodd2TvWRuU7m1zaNXuAC5w71oNPdzXj8IO7PtnVbPPPCur7vynDFIsyp2advnzcw4vHovibWCrxu4Li65q6m8/noeu62lcgViEYGy0cDsvfF88HJqkdTYvtWw2g/wPo9XqqpvPGl4LMi0gnLm3rsi/YE/3vggDbFTwq6HLPTVw7nuL3+/HsFcGswBPKepGls0tMXghCqOYyRQxH+STNuc/Z5iYLp6jJFEyYrlhDJprMsZ5ZpI7pisfjiMVitnSwsBRrVM1mU0ZMdpodPi+OILxEgFqtpthDMZljXeN7qVSSU4KdvgjIFh7/iqlmOorFokzR/NeJqIm6Y6bSyd7CwjNdLCobjN5yrvl8PqX0msp5RRozXalUapE5OzJnGb33+tHAs8v+8/8BR53Q5e3298QAAAAASUVORK5CYII="
                    />
                  </div>
                  <span className="mi-title">TABLE</span>
                </div>
              </div>
            </div>
            <div className="dropdown">
              <div className="dropbtn">
                <div className="dropbtn-cont">
                  <div className="left">
                    <img className="mi-icon"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAATCAYAAABsmQZ/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKESURBVHgBrVQ9j1JBFD26dn6xpQWCtQ2thQm9DSUd0GEFP8AECq3BWFBCS7NIZbIWgI3ExCVuYscGktUoqwiurrDi7nXO4DweL4/3kOxNLh93Zu6598y5AwCyqYfD4U3P/v+h27cgj7OQwUFFTg5zsrcDefZoHr8w0Gg0av2OP4Ac7EK+vIZMjipCmxyV9f/uy/m6X77LWMMUKMrlMu7fC+NJBrhxfR4/P+1j8ukpLm0FcDVUwM1rgGIAqmNfW4uSRqMhf6Y9Ge6FdVf0H92knA6fy9c3AZn97MhxN6HjpN4zXyAQkHw+vxbFNDvw+H1Ufn9vWL+5dnKYlw+dhJ/IILVaTTqdjrAAL2B2M1X3eD4b6eQEMd3Rv+1HdHw6rEmv19M5E4mEO6jpQt2bK1gymdRrBGOXdCa3A9r97c6CHTbEAmKxmJVvS33kx+Mx0uk0ptMptre30W639WWrjSiVSlpI1WoVH/cf4u6dz5CzMWbHTZz9egc3e/Fq7v1+H4PBQJ+nxeNxtFqthZBYDSvjdy6Xk0KhIKPRaImeoJrD7i5cuzPO9aBtXnllzMlcpNuil85AJBLRNBjjfyfVnMNVwIyvmlOqnxj/Zn4RZFeGfyradO1UIjvhC8S7M2Ack6DHi5TNZnW+pU4NBVw0MYJVKhVLiSzAb7TcPJPJ6Nw25ua802yVLDnBecAonEz4PfbczyKZkyza918hqlGXohRuRhWqBDB7VZFQQgNV32w29TpVHwqFoMCgAPRavV5HKpXSe5xmUbiqalZJc1ZcLBZ1nLNIDXCe2aHfI6OfQedoOJ0FEcAeM1diG4P1ndU5E8LxGtnFZb8zr3Oebn+eVlG7UWIP/ws2Rl9rXtp9/QAAAABJRU5ErkJggg=="
                    />
                  </div>
                  <span className="mi-title">FISHING</span>
                </div>
              </div>
            </div>
            <div className="dropdown">
              <div className="dropbtn">
                <div className="dropbtn-cont">
                  <div className="left">
                    <img className="mi-icon"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAOCAYAAADez2d9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKRSURBVHgBnVQ9b1JhFH4uxTQxKnQ1JkD8AcDoYIDZAbq5CZMjkLjD4GgCow4GiHEwDsDgoiawGJ0EBhfTBmwHE9uED2u02ub1PCe8t/cCU09yct+v8/E855wLAMZqOBw2lUrF9Ho9M51OzWVlMBiYYrFootGo8foPYCm5XA7j8RjyAK1WC8FZFSf7BSy+7uL4k7Om++8dRG46cJx1LZfLSCaTkKTVr1eMHBgJZBKJhKIjqt8/Gqrnf8ZmsffAHH3Emj4uwZc5NZ1OKyr6pD/65VrvCZUHFjK/ZxLAOvx1WFXdFGzvnT8QS0Bf9XpdqWw0GhqQyRNEsFQqod/vK32SFeQQqxLYjuDKjbSu/y367nno2sUb2tEX6ZtMJnpGGnne7Xb1LpBKpXQjWYDreDyO44OO6+T8dIKt7Siu3qrg+u2GfKvu3cF3f7DZbOYGonAfCoXQbDaRzWYFu0g+n1fIlg7WYhNtsy9p83fec/cvnoRNrVbzdSKptLUjfSwLKaQEsEGevQLmP9fPna0wzNlc17wnWtK/s7ODWCym5SBd4hcSFJlMRpESoYrtFn45X9R2u23u35MGeAvtRKKhsnFOxiU95z2bgA1gGaEf2q92KN/wbZAzJRvNglmSe6EGu2+AD5+B509juHvnG06PmphKhi9fDxX5odTr4aOZztFwONTEI5GIr2ZWiFbf2LmyGdpRsFlVq1XV1WxtxnxLJqjeEbLqHa0g+eTEy2NFZ/lld1KIWuZGEbMO3FshikKhoHdUrt36LG3pl/751llmoHSQPhaZSuP5fO7SQypIeadzMRa0YUsLcoxGI6WKdgwiHa53TMBr44MsTrWYVuwfga28iUrayBy5NiwJm4TUs0Tet/8B1Bl/3GLem/sAAAAASUVORK5CYII="
                    />
                  </div>
                  <span className="mi-title">ARCADE</span>
                </div>
              </div>
            </div>
            <div className="dropdown">
              <div className="dropbtn">
                <div className="dropbtn-cont">
                  <div className="left">
                    <img className="mi-icon"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL2SURBVHgB7Va9ixNBFH93CIrVHlgoKNnCVpLKegU7i6QRFJQE/AOSP0DI1lokYGMjSTqrCym00CIpBMGP20qxCGbxCsU7LwlH8NCTcX6Te7uzl/1yDRwH94PHzszbnffm9z5mV4hI0BFilY4YJw4cDwcsy6Jut0vj8ZiEEOqJOdaXAREnrVZLANKoaDabwrZt9RyNRmq9Xq+LpD0SJFrZaDSUkVqtFqqHM0twIlxRqVRCjRcKhcAcbACGYSzXARljRTPPYaBUKgnHcdRTX49jKUkik1CelHq9njefTCbqaZqmSkR93XVdyufzlAWn4pS5XI5kKGhn26Wrlwd056ZL+5/WyL5n0PUrRA+fEH35SiRZoOl0SlkRoAT0cobr2N8bidlmXWy9Jk+GL0k8fmApfbFY/P8cQDYzUHafh474Ne2LP3u+Qz+/tzwHtt8ayjG8i6SFyN6QzQHOegCZjeR6dN8/7a5b8/SzTVv82DDF75kjwgAG/6E054N+v68+RuPhtY11ClCuO8EAQ7vDipDJqQQMtNttpUPFpCjP+QA0Anqd68YV5W+MgGEwwTqK6CP6gWIdYOAUvDZ8segEY/LB8tber4dvjt4AxOXFQh+oVqve+OnzoO7M+WpgvnrapLMXbSXlcplkBZFszyRzSJUmnugT0MUhwADTBiYuXZizgGxHCepgBqC/e9sS0oh3KtwRPEY+6B2VkkKgA3mxszUK1cEBGL91Y26E94HjujN8c6YOgYwbDQYDNQaNa+dMNXbeDejjq4ofnmdE1ySz32YWyQry1tE5O52ON0c35TaeKgS4hOjgkkFFQLiU9EbFiYUTknYx6acHG2AxoRIWQ4D6hQFsCNFr+7ADccIO65VFSX0gLfA+2IranI3rCRnrAJ8QCcOZqxtDp+RuCR03GowRBlxiEFnG3nspjPsOcLwAbKCHADr+PQM4zliHs4fZ4+9TGPcdoIP2mRSKqFPxXZDh12xxoyWcKrWssBdhwO8XgDpOquWs+As9iRRtgOxLigAAAABJRU5ErkJggg=="
                    />
                  </div>
                  <span className="mi-title">LOTTERY</span>
                </div>
              </div>
            </div>
            <div className="dropdown">
              <div className="dropbtn">
                <div className="dropbtn-cont">
                  <div className="left">
                    <img className="mi-icon"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKeSURBVHgBvVa9ixNBFP8ZrARNwOrwg81/kPwHUay0yFqpVVLZJpWVkAg2IpKApUgSKysTEJtDLhEUu2TTWCmbGCGg3CUi4l2h47zZm72dyezXgf7gsezbN+83M+9rAYAllVqtxlarFSN0Oh2Wy+VYmvVIathoNAQJkUnCyWSSljDagJy1Wi3h3HVdZlmW0He7XZ9Q6lKRkePhcMhMCBJJkYQ6wjZwQjIS+GJUKhWs12s4jiPVmE6naLfbmM1m0FGv11Eul/13vmEUCgVhWywWha8gfGYZk2MEXpF+vy98cVJFn9F3SjvRd5MWdBPylEGcjFt4cQu4fQO4dRU4cxpYLIF3Y+DhU+DzEqlgPJnEzWvA25c27twb4uy5ktBd2PL0O8+8Z7VaBU8Go/NsNruhU+qIipXe+YnYp22w/T3v/g92B+zbeyjyc+GtGQwGSmxs2w6rwyOiYHo/vus53JsW2K+vHfE0EZlKAlod+oQmIpLxC2ycRCf6ve8y9014QUtCql2hIxJKd313SYh2x5bQIaIMZJOgMsjI9NTT/fuPjdji1PkGlyb+HMyw/nBJPOMycj6fi6fg4Z3BGMz79fgTkVBsEdO86faEjgiISCfkKc4+bkcT0fdHD2rGBAnJBa8BS8Jms+kv4HXEvjjVUKLnT2y/xQWJSqVSWKYedXzlyIdCxjuv+8x5ZfkkdMV0cgo62fvZdii0YQJv6oreb1dh/ZC69+Ur143fFksH+XwecckhkcF/xD8hC+uVStcfjUbgwQWfR8q1kr7X6xkdkD3vhUrTpQFMMA1bJRko4GGjXh+qMr11UHbyaWCqvc1ipNQNiqkOg3VEXT5oHzHp48d8sA7JuRz7YR0/QpIZEqEkOSaR+neVBPTnRAj+fSXFX421/bUsF6pkAAAAAElFTkSuQmCC"
                    />
                  </div>
                  <span className="mi-title">PROMOTIONS</span>
                </div>
              </div>
            </div>
          </div>
          <div className="menu-footer">
            <div className="mf-btn">
              <div className="mf-btn-top" />
              <div className="mf-btn-cont">
                <div className="mf-btn-icon">
                  <img className="mf-btn-aff" />
                </div>
                <div className="mf-btn-text">Affiliate</div>
              </div>
            </div>
            <div className="mf-btn">
              <div className="mf-btn-top" />
              <div className="mf-btn-cont">
                <div className="mf-btn-icon">
                  <img className="mf-btn-lc" />
                </div>
                <div className="mf-btn-text">24/7 Live Chat</div>
              </div>
            </div>
            <div className="menu-login-sec-cont">
              <div className="menu-login-sec-top" />
{!auth.user ? (<>
              <div className="menu-login-sec">
                <button className="mls-btn login"><Link to="/login">Login</Link></button>
                <button className="mls-btn reg"><Link to="/register">Register</Link></button>
              </div>
           </>):(<>
                <div className="user-logout-cont">
                <div className="user-logout-top"></div>
                  <button className="user-logout" onClick={handleLogout}>Logout</button>
                </div>
             </>)    
}    
            </div>
          </div>
        </div>
      </div>
      {/* ==End== */}

    </>
  )
}

export default Header