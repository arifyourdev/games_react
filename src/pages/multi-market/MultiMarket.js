import React, { useEffect, useState } from 'react'
import Header from '../componenst/Header'
import Footer from '../componenst/Footer'
import axios from 'axios';
const MultiMarket = () => {
    const [multi, setMulti] = useState([]);
    const [load, setLoad] = useState(true)
    const multiMarketShow = async () => {
        try {
            const response = await axios.post("/getUserWiseMultiMarket");
            setMulti(response.data);
            setLoad(false);
        } catch (e) {
            console.log(`Error in Fetch Api ${e}`)
        }
    }
    useEffect(() => {
        multiMarketShow()
    }, [])

    return (
        <div>
            <div id="root">
                <div className="app" id="App">
                    <Header />
                    <div className="multi-market">

            {multi?.length !== 0 ? (<>  
                    {load ? <div style={{ color: "red" }}>Loading...</div> : ""}
                        {multi?.map((data) => (
                             <div className="market-item" key={data.id}>
                                <div className="sport-h">
                                    <span>Cricket</span>
                                    <span className="icon-cont">
                                        <img className="icon" />
                                        <span>In Play</span>
                                    </span>
                                </div>
                                <div className="mn-h">
                                    <img className="pin-icon" data-mid={32274276} />
                                    <div className="mn">{data.matchName}</div>
                                    <img className="ar-icon" data-mid={32274276} data-sid={4} />
                                    <img className="reload-icon" />
                                </div>
                                <div className="o-sec-head">
                                    <div className="left">
                                        <div className="graph-icon" />
                                        <div className="cont">
                                            <div className="l1">Matched</div>
                                            <div className="l2">0</div>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="btn">Back</div>
                                        <div className="btn">Lay</div>
                                    </div>
                                </div>
                                <div className="mo-item">
                                    <div className="left">{data.selectionIdName.split(",")[0]}</div>
                                    <div className="right">
                                        <div className="sec">
                                            <div className="sec-btn-cont">
                                                <div className="btn-b" data-name="back-price">
                                                    <div className="price" data-name="back-price">
                                                        --
                                                    </div>
                                                    <div className="vol" data-name="back-price">
                                                        --
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sec-btn-cont">
                                                <div className="btn-l" data-name="lay-price">
                                                    <div className="price" data-name="lay-price">
                                                        --
                                                    </div>
                                                    <div className="vol" data-name="lay-price">
                                                        --
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mo-item">
                                    <div className="left">{data.selectionIdName.split(",")[1]}</div>
                                    <div className="right">
                                        <div className="sec">
                                            <div className="sec-btn-cont">
                                                <div className="btn-b" data-name="back-price">
                                                    <div className="price" data-name="back-price">
                                                        --
                                                    </div>
                                                    <div className="vol" data-name="back-price">
                                                        --
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sec-btn-cont">
                                                <div className="btn-l" data-name="lay-price">
                                                    <div className="price" data-name="lay-price">
                                                        --
                                                    </div>
                                                    <div className="vol" data-name="lay-price">
                                                        --
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                       </>  ) : (<>
                        <div className="mm-nd">
                            <div className="title">There are currently no followed multi markets.</div>
                            <div className="sub-title">Please add some markets from events.</div>
                        </div>
                       </>)}   
                       


                    </div>

                    <div className="multi-market d-none">
                        <div className="mm-nd">
                            <div className="title">
                                There are currently no followed multi markets.
                            </div>
                            <div className="sub-title">Please add some markets from events.</div>
                        </div>
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

        </div>
    )
}

export default MultiMarket