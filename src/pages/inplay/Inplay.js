import React, { useEffect, useState } from 'react'
import Header from '../componenst/Header'
import Footer from '../componenst/Footer'
import Marque from '../componenst/Marque';
import { fetchGameCounts } from '../apis/cricketApi';
import useTabFunctions from '../helper/tabFunctions';
import InlplayNav from './InlplayNav';
import CricketMatch from './CricketMatch';
import SoccerMatch from './SoccerMatch';
import TennisMatch from './TennisMatch';


const Inplay = () => {
    const { tab, tabHandler, ipdf, ipdfTab, isOpen, toggleTab } = useTabFunctions();
    //Count Api
    const [count, setCount] = useState([]);
    const showCount = async () => {
        try {
            const countData = await fetchGameCounts();
            setCount(countData)
        } catch (error) {
            console.log(`Error in Fetching Game Counts: ${error}`);
        }
    };
    useEffect(() => { showCount() }, [])
  
    return (
        <div>
            <div className="app" id="App">
                <Header />
                <div className="in-play">
                    <Marque />

                    <InlplayNav 
                    count = {count}
                    tab = {tab}
                    tabHandler={tabHandler}
                    isOpen ={isOpen}
                    />

                     <CricketMatch
                     tab ={tab}
                     ipdf ={ipdf}
                     ipdfTab ={ipdfTab}
                     isOpen ={isOpen}
                     toggleTab ={toggleTab}
                      />

                    <SoccerMatch
                      tab ={tab}
                      ipdf ={ipdf}
                      ipdfTab ={ipdfTab}
                      isOpen ={isOpen}
                      toggleTab ={toggleTab}
                     />
                     
                     <TennisMatch
                      tab ={tab}
                      ipdf ={ipdf}
                      ipdfTab ={ipdfTab}
                      isOpen ={isOpen}
                      toggleTab ={toggleTab}
                     />
                     
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

export default Inplay