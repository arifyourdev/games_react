import React, { useEffect, useRef, useState } from 'react';
import FM from '../../helper/dateUtils';
import { useAuth } from '../../context/auth';
import PlaceBet from '../PlaceBet';
import BetPopup from '../BetPopup';
import axios from 'axios';
import useBalanceExpo from '../../apis/fetchBalanceExpo';

const BookMaker = ({ info, infoHandler, eventData, bookMData,matchBook, eventId, sportId, sourceId, getMatchBook }) => {
 
    return (
        <div className="book-maker">
            <div className={info ? "bm-info" : "bm-info bi-hide"}>
                <div className="dt">Min / Max</div>
                <div className="dv">{FM.FormatBalance(eventData.bookMin)}/{FM.FormatBalance(eventData.bookMax)}</div>
            </div>
            <div className="o-sec-title">
                <div className="left">
                    <span className="t1">Book Maker</span>
                    <span className="t2">Zero Commission</span>
                </div>
                <div className="right" onClick={infoHandler} />
            </div>
            <div className="o-sec-head">
                <div className="left" />
                <div className="right">
                    <div className="btn">Back</div>
                    <div className="btn">Lay</div>
                </div>
            </div>
            {bookMData?.data?.length ? (
                  <>
                    {bookMData.Type == "Diamond" ? (
                        // bookMData?.data[0]?.bm1[0].mname == "Bookmaker" && (
                         bookMData.data[0]?.bm1.map((bm, i) => {
                            return (
                                <BookMakerList
                                    key={i}
                                    name={bm.mname === "Bookmaker" ? bm.nat : ""}
                                    matchName={eventData.matchname}
                                    bookValue={matchBook[`bmPnl${i + 1}`]}
                                    getMatchBook={getMatchBook}
                                    b1price={bm.b1}
                                    l1price={bm.l1}
                                    status={bm.s == "ACTIVE" ? true : false}
                                    sid={bm.sid}
                                    eventId={eventId}
                                    sportId={sportId}
                                    sourceId={sourceId}
                                    min={eventData.bookMin}
                                    max={eventData.bookMax}
                                />
                            );
                        }) 
                        // )
                    ) : bookMData.Type == "Sky" ? (<>
                        {
                            bookMData.data[0].bookMakerSelection.selections.map((bm, i) => {
                                return (
                                    <BookMakerList
                                        key={i}
                                        name={bm.runnerName}
                                        matchName={eventData.matchname}
                                        bookValue={matchBook[`bmPnl${i + 1}`]}
                                        getMatchBook={getMatchBook}
                                        b1price={FM.FormatBalance(JSON.parse(bm.backOddsInfo)[0] ?? "")}
                                        l1price={FM.FormatBalance(JSON.parse(bm.layOddsInfo)[0] ?? "")}
                                        status={bm.status == 1 ? true : false}
                                        eventId={eventId}
                                        sportId={sportId}
                                        sourceId={sourceId}
                                        min={eventData.bookMin}
                                        max={eventData.bookMax}
                                    />
                                )
                            })
                        }
                    </>): bookMData.Type === "World" ? (
                       bookMData.data[0]?.mname == "Bookmaker" && (
                        bookMData?.data[0]?.section.map((wd, i) => {
                               return (
                                   <BookMakerList
                                       key={i}
                                       name={wd.nat}
                                       matchName={eventData.matchname}
                                       bookValue={matchBook[`bmPnl${i + 1}`]}
                                       getMatchBook={getMatchBook}
                                       b1price={wd.b1}
                                       l1price={wd.l1}
                                       status={wd.gstatus == "ACTIVE" ? true : false}
                                       sid={wd.sid}
                                       eventId={eventId}
                                       sportId={sportId}
                                       sourceId={sourceId}
                                       min={eventData.bookMin}
                                       max={eventData.bookMax}
                                   />
                               );
                           }) )
                    ) :
                    (<></>)}
                </>
            ) :
                (
                    <>
                        <BookMakerList key={1} name={eventData.team1} />
                        <BookMakerList key={2} name={eventData.team2} />
                        {eventData.team3 && (
                            <BookMakerList key={3} name={eventData.team3} />
                        )}
                    </>
                )}
        </div>
    )
}

export default BookMaker

function BookMakerList({ name, b1price, l1price, matchName,bookValue, getMatchBook, status, sid, eventId, sportId, sourceId, min, max }) {

    const [auth] = useAuth()
    const [placeBet, setPlaceBet] = useState({
        show: false,
        value: null,
        selection: "",
        isBack: false,
        showLoading: false,
    });
    const [betPopUp, setBetPopUp] = useState({
        show: false,
        odds: 0,
        selection: "",
        isBack: false,
        stake: "",
        msg: "",
        cl: "",
    });
    const betRunner = useRef(null);
    const betPlacing = useRef(false);
    const triggerCloseBetPopUpTimer = useRef(null);

    function checkRange(val) {
        return min <= val && val <= max;
    }

    function closeBetPopup() {
        setBetPopUp({
            show: false,
            odds: 0,
            selection: "",
            isBack: false,
            stake: "",
            msg: "",
            cl: "",
        });
    }
    
    async function placeTheBet(stake) {
        setPlaceBet((auth) => ({ ...auth, showLoading: true }));

        if (triggerCloseBetPopUpTimer.current)
            clearTimeout(triggerCloseBetPopUpTimer.current);

         if (betPlacing.current) return;

        if (stake && checkRange(stake)) {
            console.log("proceed with place bet: ", stake)
            const data = {
                isBack: betRunner.current == "back-price",
                odds: placeBet.value,
                selectionId: sid,
                selectionName: name,
                stake: stake,
                matchName: matchName ?? "",
                eventId: eventId,
                sourceId: sourceId,
                sourceBetType: "BooKMaker",
                sportId: sportId,
            };
            betPlacing.current = true;
            try {
                const response = await axios.post(`/placeMatchOddsBet`, data);
                console.log(response.data)
                setBetPopUp({
                    show: true,
                    odds: placeBet.value,
                    selection: placeBet.selection,
                    isBack: placeBet.isBack,
                    stake: `PBU ${stake}`,
                    msg: response.data.message,
                    cl: response.status == 200 ? "bet-popup-success" : "",
                });
                if (response.status == 200) {
                    closePlaceBet();
                    getMatchBook(eventId);
                    UpdateUserBalances();
                }
                setPlaceBet((auth) => ({ ...auth, showLoading: false }));
                betPlacing.current = false;
                triggerCloseBetPopUp();
            } catch (e) {
                console.log(e);
                setPlaceBet((auth) => ({ ...auth, showLoading: false }));
                triggerCloseBetPopUp();
            }
        } else {
            setBetPopUp({
                show: true,
                odds: placeBet.value,
                selection: placeBet.selection,
                isBack: placeBet.isBack,
                stake: `PBU ${stake}`,
                msg: stake ? `Place Bet on Stake between ${min} - ${max}` : null,
                cl: "",
            });
            setPlaceBet((auth) => ({ ...auth, showLoading: false }));
            triggerCloseBetPopUp();
        }
     }

     function triggerCloseBetPopUp() {
        triggerCloseBetPopUpTimer.current = setTimeout(() => {
          closeBetPopup();
        }, 3000);
      }
 
    function closePlaceBet() {
        setPlaceBet({ show: false, value: null });
        betRunner.current = null;
    }
     
    const onClickPlaceBet = (e) => {
        e.preventDefault();
        betRunner.current = e.target.dataset.name;
        if (betRunner.current === "back-price") {
            setPlaceBet({
                show: true,
                value: b1price,
                selection: e.target.dataset.selection,
                isBack: true,
                showLoading: false,
            });
        }
        if (betRunner.current === "lay-price") {
            setPlaceBet({
                show: true,
                value: l1price,
                selection: e.target.dataset.selection,
                isBack: false,
                showLoading: false,
            });
        }
    }
    const {balaceExpo ,setBalanceExpo} = useBalanceExpo(); 
    function UpdateUserBalances(){
        setBalanceExpo({
            balance: balaceExpo.balance ?? 0,
            expo:balaceExpo.expo ?? 0,
           })
    }
    useEffect(() => {
        if (betRunner.current) {
            if (betRunner.current == "back-price") {
                setPlaceBet((state) => ({
                    ...state,
                    value:b1price,
                }));
            }
            if (betRunner.current == "lay-price") {
                setPlaceBet((state) => ({
                    ...state,
                    value:l1price,
                }));
            }
        }
    }, []);
    return (
        <>
        <div className="mo-item">
            <div className="left">
                <div className="lo">{name}</div>
                {bookValue != null && (
                        <div className={bookValue >= 0 ? "lt" : "lt lt-loss"}>
                            {FM.FormatBalance(bookValue) ?? 0}
                        </div>
                    )}
            </div>
            <div className="right">
                <div className="sec">
                    <div className={betRunner.current === "back-price" ? "btn-b sec-btn-sel-back" : "btn-b"} data-name={"back-price"} data-selection={name} onClick={onClickPlaceBet}>
                        <div className="price" data-name="back-price" data-selection={name}>
                            {status ? b1price ?? "" : ""}
                        </div>
                    </div>
                    <div className={betRunner.current === "lay-price" ? "btn-l sec-btn-sel-lay" : "btn-l"} data-name={"lay-price"} data-selection={name} onClick={onClickPlaceBet}>
                        <div className="price" data-name="lay-price" data-selection={name} >
                            {status ? l1price ?? "" : ""}
                        </div>
                    </div>
                </div>
                {!status && (
                    <div className="mo-btn-dis-over-lay">
                        <span>Suspended</span>
                    </div>
                )}
            </div>
        </div>
        {placeBet.show && (
                <PlaceBet
                    bookValue={placeBet.value}
                    showLoading={placeBet.showLoading}
                    stakes={auth?.user?.stake}
                    placeBet={placeTheBet}
                    min={min}
                    max={max}
                    close={closePlaceBet}
                />
            )}
            {betPopUp.show && (
                <BetPopup
                    isBack={betPopUp.isBack}
                    selection={betPopUp.selection}
                    stake={betPopUp.stake}
                    odds={betPopUp.odds}
                    cl={betPopUp.cl}
                    close={closeBetPopup}
                    msg={betPopUp.msg}
                />
            )}
        </>
    )
}