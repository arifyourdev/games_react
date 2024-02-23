import React, { useRef, useState } from 'react'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

const PlaceBet = ({ bookValue, close, min, max, placeBet, showLoading, stakes }) => {

    const [betValue, setBetValue] = useState(0);

    const betValueRef = useRef(null);
    const inputValueRef = useRef("");
    const [auth] = useAuth();
    const navigate = useNavigate();
 
    const handlePlaceBet = () => {
        console.log(betValue)
        if (auth.user) {
            if (!showLoading) {
                placeBet(betValue);
            } else {
                console.log("Bet Placing In Progress");
            }
        } else {
            navigate("/login")
        }
     };

    const setStakes = (e) => {
        const value = e.target.dataset.val;
        setBetValue(value);
        betValueRef.current.innerText = value;
        inputValueRef.current = value;
    };


    const onNumberKeyPress = (event) => {
        const e = event.target.dataset.val;
        if (e === "x") {
            if (inputValueRef.current?.length && inputValueRef.current.length < 1) {
                inputValueRef.current = "";
            }
            let newValue = inputValueRef.current?.substring(-1, inputValueRef.current?.length - 1);
            inputValueRef.current = newValue ?? "";
        }
        else if (inputValueRef.current === undefined || inputValueRef.current === null) {
            inputValueRef.current = e;
        } else {
            if (inputValueRef.current[0] == 0) {
                inputValueRef.current = "";
            }
            inputValueRef.current += e;
        }
        betValueRef.current.innerText = inputValueRef.current;
        setBetValue(inputValueRef.current);
    };

    return (

        <div className="place-bet">
            <div className="bet-val">
                <div className="b-val">
                    <div className="t-val" />
                    <div className="val" style={{width:"87%"}}>{bookValue}</div>
                </div>
                <div className="u-input-val">
                    <div className="t-val">Min Bet: {min}</div>
                    <div className="val">
                        <button className="inc-btn">-</button>
                        <div ref={betValueRef} className="custom-input"></div>
                        <button className="inc-btn">+</button>
                    </div>
                </div>
            </div>

            <div className="user-stakes">
                {stakes?.selectedStakes?.map((val, i) => {
                    return (
                        <div key={i} className="stake-btn" data-val={stakes[`stake${val}`]} onClick={setStakes} >
                            {stakes[`stake${val}`]}
                        </div>
                    );
                })}
            </div>
            <div className="key-board">
                <div className="btns-div">
                    <button data-val={1} className="btns-values" onClick={onNumberKeyPress}>
                        1
                    </button>
                    <button data-val={2} className="btns-values" onClick={onNumberKeyPress}>
                        2
                    </button>
                    <button data-val={3} className="btns-values" onClick={onNumberKeyPress}>
                        3
                    </button>
                    <button data-val={4} className="btns-values" onClick={onNumberKeyPress}>
                        4
                    </button>
                    <button data-val={5} className="btns-values" onClick={onNumberKeyPress}>
                        5
                    </button>
                    <button data-val={6} className="btns-values" onClick={onNumberKeyPress}>
                        6
                    </button>
                    <button data-val={7} className="btns-values" onClick={onNumberKeyPress}>
                        7
                    </button>
                    <button data-val={8} className="btns-values" onClick={onNumberKeyPress}>
                        8
                    </button>
                    <button data-val={9} className="btns-values" onClick={onNumberKeyPress}>
                        9
                    </button>
                    <button data-val={0} className="btns-values" onClick={onNumberKeyPress}>
                        0
                    </button>
                    <button data-val="00" className="btns-values" onClick={onNumberKeyPress}>
                        00
                    </button>
                    <button data-val="." className="btns-values dot" onClick={onNumberKeyPress}>
                        .
                    </button>
                </div>
                <button data-val="x" className="btn-cross" onClick={onNumberKeyPress}>
                    x
                </button>
            </div>
            <div className="btn-panel">
                <div className="btn-panel-b" style={{ background: "#ff0000" }} onClick={(e) => { e.preventDefault(); close(); }}>Cancel</div>
                <div className="btn-panel-b" onClick={handlePlaceBet}>Place Bet</div>
            </div>
        </div>


    )
}

export default PlaceBet