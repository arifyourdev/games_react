import React, { useEffect, useRef, useState } from 'react'
import PlaceBet from '../PlaceBet';
import axios from 'axios';
import BetPopup from '../BetPopup';
import { useAuth } from '../../context/auth';
import FM from '../../helper/dateUtils';
import useBalanceExpo from '../../apis/fetchBalanceExpo';

export default function Odd({ oddsData, eventData, matchBook, getMatchBook, sportId, eventId, sourceId }) {
    return (
        <div className="match-odds">
            <div className="o-sec-title">
                <span>Match Odds</span>
            </div>
            <div className="o-sec-head">
                <div className="refresh-icon" />
                <div className="wedge" />
                <div className="left">
                    <div className="graph-icon" />
                    <div className="cont">
                        <div className="l1">Matched</div>
                        <div className="l2">{oddsData?.data[0]?.totalMatched ?? 0}</div>
                    </div>
                </div>
                <div className="right">
                    <div className="btn">Back</div>
                    <div className="btn">Lay</div>
                </div>
            </div>
            {oddsData?.matchRunners?.length ? (
                <>
                    {oddsData.Type == "Tiger" ? (
                        oddsData.matchRunners?.map((runner, i) => {
                            return (
                                <MatchRunner
                                    i={i}
                                    key={i}
                                    name={runner.name}
                                    bookValue={matchBook[`pnl${i + 1}`]}
                                    selectionId={oddsData?.data[0]?.runners[i]?.selectionId ?? null}
                                    status={oddsData?.data[0]?.status == "OPEN" ? true : false}
                                    oddsData={oddsData}
                                    eventData={eventData}
                                    matchBook={matchBook}
                                    getMatchBook={getMatchBook}
                                    min={eventData.oddsMin}
                                    max={eventData.oddsMax}
                                    eventId={eventId}
                                    sportId={sportId}
                                    sourceId={sourceId}
                                />
                            );
                        })
                    ) : oddsData.Type == "Diamond" ? (
                        <>
                        </>
                    ) : (<></>)}
                </>
            ) : (
                <>
                    <MatchRunner
                        key={1}
                        name={eventData.team1}
                    />
                    <MatchRunner
                        key={2}
                        name={eventData.team2}
                    />
                    {eventData.team3 && (
                        <MatchRunner
                            key={3}
                            name={eventData.team3}
                        />
                    )}
                </>
            )}
        </div>
    )
}

function MatchRunner({ i, name, oddsData, eventData, bookValue, getMatchBook, sourceId, min, max, eventId, sportId, status, selectionId }) {

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

    const [auth] = useAuth();

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
                selectionId: selectionId,
                selectionName: name,
                stake: stake,
                matchName: eventData?.matchName ?? "",
                eventId: eventId,
                sourceId: sourceId,
                sourceBetType: "Odds",
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
    const onClickPlaceBet = (e) => {
        e.preventDefault();
        betRunner.current = e.target.dataset.name;
        if (betRunner.current === "back-price") {
            setPlaceBet({
                show: true,
                value: oddsData.data[0]?.runners[i]?.ex?.availableToBack[0]?.price || 0,
                selection: e.target.dataset.selection,
                isBack: true,
                showLoading: false,
            });
        }
        if (betRunner.current === "lay-price") {
            setPlaceBet({
                show: true,
                value: oddsData.data[0]?.runners[i]?.ex?.availableToLay[0]?.price || 0,
                selection: e.target.dataset.selection,
                isBack: false,
                showLoading: false,
            });
        }
    }
    function closePlaceBet() {
        setPlaceBet({ show: false, value: null });
        betRunner.current = null;
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
                    value: oddsData.data[0]?.runners[i]?.ex?.availableToBack[0]?.price || 0,
                }));
            }
            if (betRunner.current == "lay-price") {
                setPlaceBet((state) => ({
                    ...state,
                    value: oddsData.data[0]?.runners[i]?.ex?.availableToLay[0]?.price || 0,
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
                            {FM.FormatBalance(bookValue)}
                        </div>
                    )}
                </div>
                <div className="right">
                    <div className="sec">
                        <div className="sec-btn-cont">
                            <div className={betRunner.current === "back-price" ? "btn-b sec-btn-sel-back" : "btn-b"} data-name={"back-price"} data-selection={name}>
                                <div className="price" data-name={"back-price"} data-selection={name} onClick={onClickPlaceBet}>
                                    {oddsData?.data[0]?.runners[i]?.ex?.availableToBack[0]?.price || "--"}
                                </div>
                                <div className="vol" data-name="back-price" data-selection={name}>
                                    {oddsData?.data[0]?.runners[i]?.ex?.availableToBack[0]?.size || "--"}
                                </div>
                            </div>
                            {!status && <div className="mo-btn-dis-over-lay"></div>}
                        </div>
                        <div className="sec-btn-cont">
                            <div className={betRunner.current === "lay-price" ? "btn-l sec-btn-sel-lay" : "btn-l"} data-name="lay-price" data-selection={name}>
                                <div className="price" data-name="lay-price" data-selection={name} onClick={onClickPlaceBet}>
                                    {oddsData?.data[0]?.runners[i]?.ex?.availableToLay[0]?.price || "--"}
                                </div>
                                <div className="vol" data-name="lay-price" data-selection={name}>
                                    {oddsData?.data[0]?.runners[i]?.ex?.availableToLay[0]?.size || "--"}
                                </div>
                            </div>
                            {!status && <div className="mo-btn-dis-over-lay"></div>}
                        </div>
                    </div>
                </div>
            </div>
            {placeBet.show && (
                <PlaceBet
                    bookValue={placeBet.value}
                    placeBet={placeTheBet}
                    showLoading={placeBet.showLoading}
                    stakes={auth?.user?.stake}
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