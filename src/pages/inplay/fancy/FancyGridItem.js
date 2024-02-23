import React, { useRef, useState } from 'react'
import FM from '../../helper/dateUtils'
import { useAuth } from '../../context/auth'
import PlaceBet from '../PlaceBet'
import useBalanceExpo from '../../apis/fetchBalanceExpo'

const FancyGridItem = ({row,name, matchName, fancy, status, min, max, eventId, sportId, sourceId, fancyBook }) => {
     const [show, setShow] = useState(false)
     const showHandler = () =>{
         setShow(!show)
    }
    const [auth] = useAuth();
    const betRunner = useRef(null)
    const [placeBet, setPlaceBet] = useState({
        show: false,
        value: null,
        selection: "",
        isBack: false,
        showLoading: false,
    });

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
                value: fancy.l1,
                selection: e.target.dataset.selection,
                isBack: true,
                showLoading: false,
            });
        }
        if (betRunner.current === "lay-price") {
            setPlaceBet({
                show: true,
                value: fancy.b1,
                selection: e.target.dataset.selection,
                isBack: false,
                showLoading: false,
            });
        }
    }
    
    function placeTheBet(){

    }
     
   return (
    <div>
         <div className={show ? "fg-info" : "fg-info bi-hide" }>
                <div className="dt">Min / Max</div>
                <div className="dv">{FM.FormatBalance(min)}/{FM.FormatBalance(max)}</div>
            </div>
            <div className="fg-item">
                <div className="lo">
                    <div className="ti">{name}</div>
                    <div className="i-icon" onClick={showHandler} />
                </div>
                <div className="lt">
                    <div className="left" />
                    <div className="sec">
                        <div className="btn-b" onClick={onClickPlaceBet}  data-name={"back-price"} data-selection={name}>
                            <div className="price" data-name={"back-price"} data-selection={name}>
                                {fancy?.l1}
                            </div>
                            <div className="vol" data-name={"back-price"} data-selection={name} >
                                {fancy?.ls1}
                            </div>
                        </div>
                        <div className="btn-l" onClick={onClickPlaceBet} data-name={"lay-price"} data-selection={name} >
                            <div className="price" data-name={"lay-price"} data-selection={name} >
                                {fancy?.b1}
                            </div>
                            <div className="vol" data-name={"lay-price"} data-selection={name} >
                                {fancy?.bs1}
                            </div>
                        </div>
                    </div>
                </div>
                {status && (
                 <div className="fg-btn-dis-over-lay">
                    <span>{status}</span>
                 </div>
                )}
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
    </div>
  )
}

export default FancyGridItem