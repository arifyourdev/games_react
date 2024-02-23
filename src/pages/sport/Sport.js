import React, { useEffect, useState } from 'react'
import Header from '../componenst/Header'
import Footer from '../componenst/Footer'
import Marque from '../componenst/Marque';
import useCricketMatch, { fetchGameCounts } from '../apis/cricketApi';
import useTabFunctions from '../helper/tabFunctions';
import useSoccerFetch from '../apis/soccerApi';
import useTennisFetch from '../apis/tennisApi';
import { Link } from 'react-router-dom';


const Sport = () => {
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

    // Cricket
    const { data, sportId, seriesData, uniqueSeriesNames, todaydata, load, tomData, tomUnique } = useCricketMatch();
    // Soccer 
    const { soccerData, soccerId, soccerMatches, uniqueSoccer, soccerToday, soccerLoad, tomSoccerData, tomSoccerUnique } = useSoccerFetch();
    // Tennis 
    const { tennisData, tennisId, tennisMatches, uniqueTennis, tennisToday, tenissLoad, tomTennisData, tomTennisUnique } = useTennisFetch();
 
    return (
        <div>
            <div className="app" id="App">
                <Header />
                <div className="in-play">
                    <Marque />
                    <div className="in-play-nav-bar">
                        <div className={tab === 1 ? "ipnv-btn ipnv-active" : "ipnv-btn"} onClick={() => tabHandler(1)}>
                            <div className="ipnv-icon cricket">
                                <div className="nmbr">{count['Cricket']}</div>
                            </div>
                            <div className="title">Cricket</div>
                        </div>
                        <div className={tab === 2 ? "ipnv-btn ipnv-active" : "ipnv-btn"} onClick={() => tabHandler(2)}>
                            <div className="ipnv-icon soccer">
                                <div className="nmbr">{count['Soccer']}</div>
                            </div>
                            <div className="title">Soccer</div>
                        </div>
                        <div className={tab === 3 ? "ipnv-btn ipnv-active" : "ipnv-btn"} onClick={() => tabHandler(3)}>
                            <div className="ipnv-icon tennis">
                                <div className="nmbr">{count['Tennis']}</div>
                            </div>
                            <div className="title">Tennis</div>
                        </div>
                        <div className="ipnv-btn">
                            <div className="ipnv-icon e-soccer">
                                <div className="nmbr">59</div>
                            </div>
                            <div className="title">e-Soccer</div>
                        </div>
                    </div>
                    <div className={tab === 1 ? 'd-block' : 'd-none'}>
                        <div className="in-play-date-filter">
                            <div className={ipdf === 1 ? "ipdf-btn ipdf-active" : "ipdf-btn"} onClick={() => ipdfTab(1)}>In Play</div>
                            <div className={ipdf === 2 ? "ipdf-btn ipdf-active" : "ipdf-btn"} onClick={() => ipdfTab(2)}>All</div>
                            <div className={ipdf === 3 ? "ipdf-btn ipdf-active" : "ipdf-btn"} onClick={() => ipdfTab(3)}>Today</div>
                            <div className={ipdf === 4 ? "ipdf-btn ipdf-active" : "ipdf-btn"} onClick={() => ipdfTab(4)}>Tommorrow</div>
                        </div>
                        {load ? <div style={{ color: "#000" }}>Loading...</div> : ""}

                        <div className={ipdf === 1 ? "inplay-matches active-content" : "inplay-matches"}>
                            {data.map((item) => (
                                <Link to={`/match-details/${item.sportid}/${item.eventid}`}>
                                    <div className="mg-item" key={item.id} data-eventid={item.eventid}>
                                        <div className="block-two">
                                            <div className="bt-item mgt-header">
                                                <div className="left">Odds </div>
                                                <div className="right">
                                                    <span>Back</span>
                                                    <span>Lay</span>
                                                </div>
                                            </div>
                                            <div className="bt-item">
                                                <div className="left">{item.selectionnames.split(",")[0]}</div>
                                                <div className="right">
                                                    <span className="back">{item.b1 ? item.b1 : '-:-'}</span>
                                                    <span className="lay">{item.l1 ? item.l1 : '-:-'}</span>
                                                </div>
                                            </div>
                                            <div className="bt-item">
                                                <div className="left">{item.selectionnames.split(",")[1]}</div>
                                                <div className="right">
                                                    <span className="back">{item.b2 ? item.b2 : '-:-'}</span>
                                                    <span className="lay">{item.l2 ? item.l2 : '-:-'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block-one">
                                            <div className="left">
                                                <div className="fav">
                                                    <div className="fav-icon" />
                                                </div>
                                                <div className="event">
                                                    <div className="icons-bar">
                                                        <div className="icon-bar" />
                                                        <div className="icon-in-play" />
                                                    </div>
                                                    <div className="event-name">
                                                        <span className="date">{item.month}</span>
                                                        <span>{item.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="right">0 - 0</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {/* All */}
                        <div className={ipdf === 2 ? "inplay-matches active-content" : "inplay-matches"}>
                            {sportId.map((seriesName, index) => (
                                <div className="matches-grid" key={seriesName}>
                                    <div className="mg-header" onClick={() => toggleTab(index)}>
                                        <div className="left">
                                            <div className="nmbr">{seriesData[seriesName]?.count || 0}</div>
                                            <div className="title">{seriesName}</div>
                                        </div>
                                        <div className={isOpen[index] ? "right mg-active" : "right"} />
                                    </div>
                                    <div className={isOpen[index] ? "mg-items mg-grid-expand" : "mg-items"}>
                                        {seriesData[seriesName]?.matches.map(item => (
                                        <Link to={`/match-details/${item.sportid}/${item.eventid}`}>
                                            <div className="mg-item" key={item.id} data-eventid={item.eventid}>
                                                <div className="block-one">
                                                    <div className="left">
                                                        <div className="fav">
                                                            <div className="fav-icon" />
                                                        </div>
                                                        <div className="event">
                                                            <div className="icons-bar">
                                                                <div className="icon-bar" />
                                                            </div>
                                                            <div className="event-name">
                                                                <span className="date">{item.month}</span>
                                                                <span>{item.time}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="right">0 - 0</div>
                                                </div>
                                                <div className="block-two">
                                                    <div className="bt-item mgt-header">
                                                        <div className="left">Odds </div>
                                                        <div className="right">
                                                            <span>Back</span>
                                                            <span>Lay</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[0]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b1 ? item.b1 : '-:-'}</span>
                                                            <span className="lay">{item.l1 ? item.l1 : '-:-'}</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[1]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b2 ? item.b2 : '-:-'}</span>
                                                            <span className="lay">{item.l2 ? item.b2 : '-:-'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Today */}
                        <div className={ipdf === 3 ? "inplay-matches active-content" : "inplay-matches"}>
                            {uniqueSeriesNames.map((seriesName2, index) =>
                                <div className="matches-grid" key={seriesName2}>
                                    <div className="mg-header" onClick={() => toggleTab(index)}>
                                        <div className="left">
                                            <div className="nmbr">{todaydata[seriesName2]?.count || 0}</div>
                                            <div className="title">{seriesName2}</div>
                                        </div>
                                        <div className={isOpen[index] ? "right mg-active" : "right"} />
                                    </div>
                                    <div className={isOpen[index] ? "mg-items mg-grid-expand" : "mg-items"}>
                                        {todaydata[seriesName2]?.match.map(item => (
                                          <Link to={`/match-details/${item.sportid}/${item.eventid}`}>
                                            <div className="mg-item" key={item.key}>
                                                <div className="block-one">
                                                    <div className="left">
                                                        <div className="fav">
                                                            <div className="fav-icon" />
                                                        </div>
                                                        <div className="event">
                                                            <div className="icons-bar">
                                                                <div className="icon-bar" />
                                                            </div>
                                                            <div className="event-name">
                                                                <span className="date">{item.month}</span>
                                                                <span>15:30</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="right">0 - 0</div>
                                                </div>
                                                <div className="block-two">
                                                    <div className="bt-item mgt-header">
                                                        <div className="left">Odds </div>
                                                        <div className="right">
                                                            <span>Back</span>
                                                            <span>Lay</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[0]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b1 ? item.b1 : '-:-'}</span>
                                                            <span className="lay">{item.l1 ? item.l1 : '-:-'}</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[1]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b2 ? item.b2 : '-:-'}</span>
                                                            <span className="lay">{item.l2 ? item.b2 : '-:-'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Tommorrow*/}
                        <div className={ipdf === 4 ? "inplay-matches active-content" : "inplay-matches"}>
                            {tomUnique.map((seriesName3, index) =>
                                <div className="matches-grid" key={seriesName3}>
                                    <div className="mg-header" onClick={() => toggleTab(index)}>
                                        <div className="left">
                                            <div className="nmbr">{todaydata[seriesName3]?.count || 0}</div>
                                            <div className="title">{seriesName3}</div>
                                        </div>
                                        <div className={isOpen[index] ? "right mg-active" : "right"} />
                                    </div>
                                    <div className={isOpen[index] ? "mg-items mg-grid-expand" : "mg-items"}>
                                        {tomData[seriesName3]?.match.map(item => (
                                            <Link to={`/match-details/${item.sportid}/${item.eventid}`}>
                                            <div className="mg-item" key={item.key}>
                                                <div className="block-one">
                                                    <div className="left">
                                                        <div className="fav">
                                                            <div className="fav-icon" />
                                                        </div>
                                                        <div className="event">
                                                            <div className="icons-bar">
                                                                <div className="icon-bar" />
                                                            </div>
                                                            <div className="event-name">
                                                                <span className="date">{item.month}</span>
                                                                <span>15:30</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="right">0 - 0</div>
                                                </div>
                                                <div className="block-two">
                                                    <div className="bt-item mgt-header">
                                                        <div className="left">Odds </div>
                                                        <div className="right">
                                                            <span>Back</span>
                                                            <span>Lay</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[0]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b1 ? item.b1 : '-:-'}</span>
                                                            <span className="lay">{item.l1 ? item.l1 : '-:-'}</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[1]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b2 ? item.b2 : '-:-'}</span>
                                                            <span className="lay">{item.l2 ? item.b2 : '-:-'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="no-data" style={{ textAlign: "center" }}>No Data</div>
                        </div>
                    </div>

                    {/* Soccer */}
                    <div className={tab === 2 ? 'd-block' : 'd-none'}>
                        <div className="in-play-date-filter">
                            <div className={ipdf === 1 ? "ipdf-btn ipdf-active" : "ipdf-btn"} onClick={() => ipdfTab(1)}>In Play</div>
                            <div className={ipdf === 2 ? "ipdf-btn ipdf-active" : "ipdf-btn"} onClick={() => ipdfTab(2)}>All</div>
                            <div className={ipdf === 3 ? "ipdf-btn ipdf-active" : "ipdf-btn"} onClick={() => ipdfTab(3)}>Today</div>
                            <div className={ipdf === 4 ? "ipdf-btn ipdf-active" : "ipdf-btn"} onClick={() => ipdfTab(4)}>Tommorrow</div>
                        </div>
                        {soccerLoad ? <div style={{ color: "red" }}>Loading...</div> : ""}
                        <div className={ipdf === 1 ? "inplay-matches active-content" : "inplay-matches"}>
                            {soccerData.map((item) => (
                                <Link to={`/match-details/${item.sportid}/${item.eventid}`}>
                                    <div className="mg-item" key={item.id} data-eventid={item.eventid}>
                                        <div className="block-two">
                                            <div className="bt-item mgt-header">
                                                <div className="left">Odds </div>
                                                <div className="right">
                                                    <span>Back</span>
                                                    <span>Lay</span>
                                                </div>
                                            </div>
                                            <div className="bt-item">
                                                <div className="left">{item.selectionnames.split(",")[0]}</div>
                                                <div className="right">
                                                    <span className="back">{item.b1 ? item.b1 : "-:-"}</span>
                                                    <span className="lay">{item.l1 ? item.l1 : "-:-"}</span>
                                                </div>
                                            </div>
                                            <div className="bt-item">
                                                <div className="left">{item.selectionnames.split(",")[1]}</div>
                                                <div className="right">
                                                    <span className="back">{item.b2 ? item.b2 : "-:-"}</span>
                                                    <span className="lay">{item.l2 ? item.l2 : "-:-"}</span>
                                                </div>
                                            </div>
                                            <div className="bt-item">
                                                <div className="left">{item.selectionnames.split(",")[2]}</div>
                                                <div className="right">
                                                    <span className="back">{item.b3 ? item.b3 : "-:-"}</span>
                                                    <span className="lay">{item.l3 ? item.l3 : "-:-"}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block-one">
                                            <div className="left">
                                                <div className="fav">
                                                    <div className="fav-icon" />
                                                </div>
                                                <div className="event">
                                                    <div className="icons-bar">
                                                        <div className="icon-bar" />
                                                        <div className="icon-in-play" />
                                                    </div>
                                                    <div className="event-name">
                                                        <span className="date">{item.month}</span>
                                                        <span>{item.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="right">0 - 0</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {/* All */}
                        <div className={ipdf === 2 ? "inplay-matches active-content" : "inplay-matches"}>
                            {soccerId.map((seriesName, index) => (
                                <div className="matches-grid" key={seriesName}>
                                    <div className="mg-header" onClick={() => toggleTab(index)}>
                                        <div className="left">
                                            <div className="nmbr">{soccerMatches[seriesName]?.count || 0}</div>
                                            <div className="title">{seriesName}</div>
                                        </div>
                                        <div className={isOpen[index] ? "right mg-active" : "right"} />
                                    </div>
                                    <div className={isOpen[index] ? "mg-items mg-grid-expand" : "mg-items"}>
                                        {soccerMatches[seriesName]?.matches.map(item => (
                                          <Link to={`/match-details/${item.sportid}/${item.eventid}`}>
                                            <div className="mg-item" key={item.id} data-eventid={item.eventid}>
                                                <div className="block-one">
                                                    <div className="left">
                                                        <div className="fav">
                                                            <div className="fav-icon" />
                                                        </div>
                                                        <div className="event">
                                                            <div className="icons-bar">
                                                                <div className="icon-bar" />
                                                            </div>
                                                            <div className="event-name">
                                                                <span className="date">{item.month}</span>
                                                                <span>{item.time}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="right">0 - 0</div>
                                                </div>
                                                <div className="block-two">
                                                    <div className="bt-item mgt-header">
                                                        <div className="left">Odds </div>
                                                        <div className="right">
                                                            <span>Back</span>
                                                            <span>Lay</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[0]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b1 ? item.b1 : "-:-"}</span>
                                                            <span className="lay">{item.l1 ? item.l1 : "-:-"}</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[1]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b2 ? item.b2 : "-:-"}</span>
                                                            <span className="lay">{item.l2 ? item.l2 : "-:-"}</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[2]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b3 ? item.b3 : "-:-"}</span>
                                                            <span className="lay">{item.l3 ? item.l3 : "-:-"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                         </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Today */}
                        <div className={ipdf === 3 ? "inplay-matches active-content" : "inplay-matches"}>
                            {uniqueSoccer.map((seriesName2, index) =>
                                <div className="matches-grid" key={seriesName2}>
                                    <div className="mg-header" onClick={() => toggleTab(index)}>
                                        <div className="left">
                                            <div className="nmbr">{soccerToday[seriesName2]?.count || 0}</div>
                                            <div className="title">{seriesName2}</div>
                                        </div>
                                        <div className={isOpen[index] ? "right mg-active" : "right"} />
                                    </div>
                                    <div className={isOpen[index] ? "mg-items mg-grid-expand" : "mg-items"}>
                                        {soccerToday[seriesName2]?.match.map(item => (
                                           <Link to={`/match-details/${item.sportid}/${item.eventid}`}>
                                            <div className="mg-item" key={item.key} data-eventid={item.eventid}>
                                                <div className="block-one">
                                                    <div className="left">
                                                        <div className="fav">
                                                            <div className="fav-icon" />
                                                        </div>
                                                        <div className="event">
                                                            <div className="icons-bar">
                                                                <div className="icon-bar" />
                                                            </div>
                                                            <div className="event-name">
                                                                <span className="date">{item.month}</span>
                                                                <span>15:30</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="right">0 - 0</div>
                                                </div>
                                                <div className="block-two">
                                                    <div className="bt-item mgt-header">
                                                        <div className="left">Odds </div>
                                                        <div className="right">
                                                            <span>Back</span>
                                                            <span>Lay</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[0]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b1 ? item.b1 : "-:-"}</span>
                                                            <span className="lay">{item.l1 ? item.l1 : "-:-"}</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[1]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b2 ? item.b2 : "-:-"}</span>
                                                            <span className="lay">{item.l2 ? item.l2 : "-:-"}</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[2]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b3 ? item.b3 : "-:-"}</span>
                                                            <span className="lay">{item.l3 ? item.l3 : "-:-"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Tommorrow*/}
                        <div className={ipdf === 4 ? "inplay-matches active-content" : "inplay-matches"}>
                            {tomSoccerUnique.map((seriesName3, index) =>
                                <div className="matches-grid" key={seriesName3}>
                                    <div className="mg-header" onClick={() => toggleTab(index)}>
                                        <div className="left">
                                            <div className="nmbr">{tomSoccerData[seriesName3]?.count || 0}</div>
                                            <div className="title">{seriesName3}</div>
                                        </div>
                                        <div className={isOpen[index] ? "right mg-active" : "right"} />
                                    </div>
                                    <div className={isOpen[index] ? "mg-items mg-grid-expand" : "mg-items"}>
                                        {tomSoccerData[seriesName3]?.match.map(item => (
                                           <Link to={`/match-details/${item.sportid}/${item.eventid}`}>
                                            <div className="mg-item" key={item.key} data-eventid={item.eventid}>
                                                <div className="block-one">
                                                    <div className="left">
                                                        <div className="fav">
                                                            <div className="fav-icon" />
                                                        </div>
                                                        <div className="event">
                                                            <div className="icons-bar">
                                                                <div className="icon-bar" />
                                                            </div>
                                                            <div className="event-name">
                                                                <span className="date">{item.month}</span>
                                                                <span>15:30</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="right">0 - 0</div>
                                                </div>
                                                <div className="block-two">
                                                    <div className="bt-item mgt-header">
                                                        <div className="left">Odds </div>
                                                        <div className="right">
                                                            <span>Back</span>
                                                            <span>Lay</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[0]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b1 ? item.b1 : "-:-"}</span>
                                                            <span className="lay">{item.l1 ? item.l1 : "-:-"}</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[1]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b2 ? item.b2 : "-:-"}</span>
                                                            <span className="lay">{item.l2 ? item.l2 : "-:-"}</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[2]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b3 ? item.b3 : "-:-"}</span>
                                                            <span className="lay">{item.l3 ? item.l3 : "-:-"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="no-data" style={{ textAlign: "center" }}>No Data</div>
                        </div>
                    </div>

                    {/* Tennis */}
                    <div className={tab === 3 ? 'd-block' : 'd-none'}>
                        <div className="in-play-date-filter">
                            <div className={ipdf === 1 ? "ipdf-btn ipdf-active" : "ipdf-btn"} onClick={() => ipdfTab(1)}>In Play</div>
                            <div className={ipdf === 2 ? "ipdf-btn ipdf-active" : "ipdf-btn"} onClick={() => ipdfTab(2)}>All</div>
                            <div className={ipdf === 3 ? "ipdf-btn ipdf-active" : "ipdf-btn"} onClick={() => ipdfTab(3)}>Today</div>
                            <div className={ipdf === 4 ? "ipdf-btn ipdf-active" : "ipdf-btn"} onClick={() => ipdfTab(4)}>Tommorrow</div>
                        </div>
                        {tenissLoad ? <div style={{ color: "#000" }}>Loading...</div> : ""}

                        <div className={ipdf === 1 ? "inplay-matches active-content" : "inplay-matches"}>
                            {tennisData.map((item) => (
                                <Link to={`/match-details/${item.sportid}/${item.eventid}`}>
                                    <div className="mg-item" key={item.id} data-eventid={item.eventid}>
                                        <div className="block-two">
                                            <div className="bt-item mgt-header">
                                                <div className="left">Odds </div>
                                                <div className="right">
                                                    <span>Back</span>
                                                    <span>Lay</span>
                                                </div>
                                            </div>
                                            <div className="bt-item">
                                                <div className="left">{item.selectionnames.split(",")[0]}</div>
                                                <div className="right">
                                                    <span className="back">{item.b1}</span>
                                                    <span className="lay">{item.l1}</span>
                                                </div>
                                            </div>
                                            <div className="bt-item">
                                                <div className="left">{item.selectionnames.split(",")[1]}</div>
                                                <div className="right">
                                                    <span className="back">{item.b2}</span>
                                                    <span className="lay">{item.l2}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block-one">
                                            <div className="left">
                                                <div className="fav">
                                                    <div className="fav-icon" />
                                                </div>
                                                <div className="event">
                                                    <div className="icons-bar">
                                                        <div className="icon-bar" />
                                                        <div className="icon-in-play" />
                                                    </div>
                                                    <div className="event-name">
                                                        <span className="date">{item.month}</span>
                                                        <span>{item.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="right">0 - 0</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* All */}
                        <div className={ipdf === 2 ? "inplay-matches active-content" : "inplay-matches"}>
                            {tennisId.map((seriesName, index) => (
                                <div className="matches-grid" key={seriesName}>
                                    <div className="mg-header" onClick={() => toggleTab(index)}>
                                        <div className="left">
                                            <div className="nmbr">{tennisMatches[seriesName]?.count || 0}</div>
                                            <div className="title">{seriesName}</div>
                                        </div>
                                        <div className={isOpen[index] ? "right mg-active" : "right"} />
                                    </div>
                                    <div className={isOpen[index] ? "mg-items mg-grid-expand" : "mg-items"}>
                                        {tennisMatches[seriesName]?.matches.map(item => (
                                           <Link to={`/match-details/${item.sportid}/${item.eventid}`}>
                                            <div className="mg-item" key={item.id} data-eventid={item.eventid}>
                                                <div className="block-one">
                                                    <div className="left">
                                                        <div className="fav">
                                                            <div className="fav-icon" />
                                                        </div>
                                                        <div className="event">
                                                            <div className="icons-bar">
                                                                <div className="icon-bar" />
                                                            </div>
                                                            <div className="event-name">
                                                                <span className="date">{item.month}</span>
                                                                <span>{item.time}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="right">0 - 0</div>
                                                </div>
                                                <div className="block-two">
                                                    <div className="bt-item mgt-header">
                                                        <div className="left">Odds </div>
                                                        <div className="right">
                                                            <span>Back</span>
                                                            <span>Lay</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[0]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b1}</span>
                                                            <span className="lay">{item.l1}</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[1]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b2}</span>
                                                            <span className="lay">{item.l2}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                           </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Today */}
                        <div className={ipdf === 3 ? "inplay-matches active-content" : "inplay-matches"}>
                            {uniqueTennis.map((seriesName2, index) =>
                                <div className="matches-grid" key={seriesName2}>
                                    <div className="mg-header" onClick={() => toggleTab(index)}>
                                        <div className="left">
                                            <div className="nmbr">{tennisToday[seriesName2]?.count || 0}</div>
                                            <div className="title">{seriesName2}</div>
                                        </div>
                                        <div className={isOpen[index] ? "right mg-active" : "right"} />
                                    </div>
                                    <div className={isOpen[index] ? "mg-items mg-grid-expand" : "mg-items"}>
                                        {tennisToday[seriesName2]?.match.map(item => (
                                         <Link to={`/match-details/${item.sportid}/${item.eventid}`}> 
                                            <div className="mg-item" key={item.key} data-eventid={item.eventid}>
                                                <div className="block-one">
                                                    <div className="left">
                                                        <div className="fav">
                                                            <div className="fav-icon" />
                                                        </div>
                                                        <div className="event">
                                                            <div className="icons-bar">
                                                                <div className="icon-bar" />
                                                            </div>
                                                            <div className="event-name">
                                                                <span className="date">{item.month}</span>
                                                                <span>15:30</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="right">0 - 0</div>
                                                </div>
                                                <div className="block-two">
                                                    <div className="bt-item mgt-header">
                                                        <div className="left">Odds </div>
                                                        <div className="right">
                                                            <span>Back</span>
                                                            <span>Lay</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[0]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b1}</span>
                                                            <span className="lay">{item.l1}</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[1]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b2}</span>
                                                            <span className="lay">{item.l2}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Tommorrow*/}
                        <div className={ipdf === 4 ? "inplay-matches active-content" : "inplay-matches"}>
                            {tomTennisUnique.map((seriesName3, index) =>
                                <div className="matches-grid" key={seriesName3}>
                                    <div className="mg-header" onClick={() => toggleTab(index)}>
                                        <div className="left">
                                            <div className="nmbr">{tomTennisData[seriesName3]?.count || 0}</div>
                                            <div className="title">{seriesName3}</div>
                                        </div>
                                        <div className={isOpen[index] ? "right mg-active" : "right"} />
                                    </div>
                                    <div className={isOpen[index] ? "mg-items mg-grid-expand" : "mg-items"}>
                                        {tomTennisData[seriesName3]?.match.map(item => (
                                           <Link to={`/match-details/${item.sportid}/${item.eventid}`}>
                                            <div className="mg-item" key={item.key} data-eventid={item.eventid}>
                                                <div className="block-one">
                                                    <div className="left">
                                                        <div className="fav">
                                                            <div className="fav-icon" />
                                                        </div>
                                                        <div className="event">
                                                            <div className="icons-bar">
                                                                <div className="icon-bar" />
                                                            </div>
                                                            <div className="event-name">
                                                                <span className="date">{item.month}</span>
                                                                <span>15:30</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="right">0 - 0</div>
                                                </div>
                                                <div className="block-two">
                                                    <div className="bt-item mgt-header">
                                                        <div className="left">Odds </div>
                                                        <div className="right">
                                                            <span>Back</span>
                                                            <span>Lay</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[0]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b1 ? item.b1 : "-:-"}</span>
                                                            <span className="lay">{item.l1 ? item.l1 : "-:-"}</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[1]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b2 ? item.b2 : "-:-"}</span>
                                                            <span className="lay">{item.l2 ? item.l2 : "-:-"}</span>
                                                        </div>
                                                    </div>
                                                    <div className="bt-item">
                                                        <div className="left">{item.selectionnames.split(",")[2]}</div>
                                                        <div className="right">
                                                            <span className="back">{item.b3 ? item.b3 : "-:-"}</span>
                                                            <span className="lay">{item.l3 ? item.l3 : "-:-"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="no-data" style={{ textAlign: "center" }}>No Data</div>
                        </div>
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
    )
}

export default Sport