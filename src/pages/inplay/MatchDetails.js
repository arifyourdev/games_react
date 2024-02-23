import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../componenst/Header'
import { useParams } from 'react-router-dom';
import Footer from '../componenst/Footer';
import useTabFunctions from '../helper/tabFunctions';
import LiveScore from './LiveScore';
import { useSocket } from '../socket/SocketData';
import Fancy from './fancy/Fancy';
import BookMaker from './bookmaker/BookMaker';
import Odd from './odds/Odd';

const MatchDetails = () => {
    const { info, infoHandler, fancyTab, fancyTabHandler } = useTabFunctions();
    const { sportId, eventId } = useParams();
    
    // Socket Connection
    const { oddsData, fancyData, bookMData } = useSocket(eventId);

    const [eventData, setEventData] = useState([]);
    const getEventDataOnLoad = async () => {
        try {
            const response = await axios.post(`/getEventDataOnLoad`, { eventid: eventId })
            if (response.status === 200) {
                setEventData(response.data);
            }
            setEventData(response.data)
        } catch (e) {
            console.log(`error ${e}`)
        }
    }
    const getEventData = async () => {
        try {
            const response = await axios.post(`/getEventData`, { eventid: eventId });
            if (response.status === 200) {
                setEventData(response.data);
            }
            setEventData(response.data)
        } catch (e) {
            console.log(`error ${e}`)
        }
    }
    const [matchBook, setMatchBook] = useState([])
    const getUserMatchBook = async () => {
        try {
            const response = await axios.post(`/getUserMatchBookData`, { eventid: eventId, type: "Match odds" });
            setMatchBook(response.data)
        } catch (e) {
            console.log(`Error in fething getUserMatchBookData ${e}`)
        }
    }
    const [fancyBook,setFancyBook] = useState([])
    const getUserFancyBook = async() =>{
        try{
        const response = await axios.post(`/getUserFancyBookData`,{eventid:eventId});
        setFancyBook(response.data)
        }catch(e){
            console.log(`Error in api ${e}`)
        }
    } 
    useEffect(() => {
        getEventDataOnLoad(); getEventData(); getUserMatchBook(); getUserFancyBook();
    }, []);
    return (
        <div>
            <div className="app" id="App">
                <Header />
                <div className="match-details">
                    <LiveScore
                        scoreurl={`https://score.365cric.com/#/score1/${eventId}`}
                        tvurl={eventData.tvurl}
                        eventId={eventId}
                    />
                    <Odd
                        oddsData={oddsData}
                        eventData={eventData}
                        matchBook={matchBook}
                        getMatchBook={getUserMatchBook}
                        sportId={sportId}
                        eventId={eventId}
                        sourceId={eventId}
                    />

                    <BookMaker
                        info={info}
                        infoHandler={infoHandler}
                        bookMData={bookMData}
                        eventData={eventData}
                        matchBook={matchBook}
                        getMatchBook={getUserMatchBook}
                        sportId={sportId}
                        eventId={eventId}
                        sourceId={eventId}
                    />
                    <Fancy
                        fancyTab={fancyTab}
                        fancyTabHandler={fancyTabHandler}
                        fancyData={fancyData}
                        eventData={eventData}
                        sportId={sportId}
                        eventId={eventId}
                        sourceId={eventId}
                        fancyBook ={fancyBook}
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

export default MatchDetails