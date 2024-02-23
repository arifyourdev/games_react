import React from 'react'
import useTennisFetch from '../apis/tennisApi';
import { Link } from 'react-router-dom';

const TennisMatch = ({tab,ipdf,ipdfTab,toggleTab,isOpen}) => {
    const { tennisData, tennisId, tennisMatches, uniqueTennis, tennisToday, tenissLoad, tomTennisData, tomTennisUnique } = useTennisFetch();

    return (
        <div>
            <div className={tab === 3 ? 'd-block' : 'd-none'}>
                <div className="in-play-date-filter">
                    <div className={ipdf === 1 ? "ipdf-btn ipdf-active" : "ipdf-btn"} onClick={() => ipdfTab(1)}>In Play</div>
                    <div className={ipdf === 2 ? "ipdf-btn ipdf-active" : "ipdf-btn"} onClick={() => ipdfTab(2)}>All</div>
                    <div className={ipdf === 3 ? "ipdf-btn ipdf-active" : "ipdf-btn"} onClick={() => ipdfTab(3)}>Today</div>
                    <div className={ipdf === 4 ? "ipdf-btn ipdf-active" : "ipdf-btn"} onClick={() => ipdfTab(4)}>Tommorrow</div>
                </div>
                {tenissLoad ? <div style={{ color: "#000" }}>Loading...</div> : ""}

                <div className={ipdf === 1 ? "inplay-matches active-content" : "inplay-matches"}>
                    {tennisData.map((item,i) => (
                        <Link to={`/match-details/${item.sportid}/${item.eventid}`} key={i}>
                            <div className="mg-item">
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
                        <div className="matches-grid" key={index}>
                            <div className="mg-header" onClick={() => toggleTab(index)}>
                                <div className="left">
                                    <div className="nmbr">{tennisMatches[seriesName]?.count || 0}</div>
                                    <div className="title">{seriesName}</div>
                                </div>
                                <div className={isOpen[index] ? "right mg-active" : "right"} />
                            </div>
                            <div className={isOpen[index] ? "mg-items mg-grid-expand" : "mg-items"}>
                                {tennisMatches[seriesName]?.matches.map((item,i) => (
                                    <Link to={`/match-details/${item.sportid}/${item.eventid}`} key={i}>
                                        <div className="mg-item">
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
                    {uniqueTennis !== 0 ? (<>
                        {uniqueTennis.map((seriesName2, index) =>
                            <div className="matches-grid" key={index}>
                                <div className="mg-header" onClick={() => toggleTab(index)}>
                                    <div className="left">
                                        <div className="nmbr">{tennisToday[seriesName2]?.count || 0}</div>
                                        <div className="title">{seriesName2}</div>
                                    </div>
                                    <div className={isOpen[index] ? "right mg-active" : "right"} />
                                </div>
                                <div className={isOpen[index] ? "mg-items mg-grid-expand" : "mg-items"}>
                                    {tennisToday[seriesName2]?.match.map((item,i) => (
                                        <Link to={`/match-details/${item.sportid}/${item.eventid}`} key={i}>
                                            <div className="mg-item">
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
                    </>) : (<><div className="no-data" style={{ textAlign: "center" }}>No Data</div></>)}
                </div>
                {/* Tommorrow*/}
                <div className={ipdf === 4 ? "inplay-matches active-content" : "inplay-matches"}>
                    {tomTennisUnique !== 0 ? (<>
                        {tomTennisUnique.map((seriesName3, index) =>
                            <div className="matches-grid" key={index}>
                                <div className="mg-header" onClick={() => toggleTab(index)}>
                                    <div className="left">
                                        <div className="nmbr">{tomTennisData[seriesName3]?.count || 0}</div>
                                        <div className="title">{seriesName3}</div>
                                    </div>
                                    <div className={isOpen[index] ? "right mg-active" : "right"} />
                                </div>
                                <div className={isOpen[index] ? "mg-items mg-grid-expand" : "mg-items"}>
                                    {tomTennisData[seriesName3]?.match.map((item,i) => (
                                        <Link to={`/match-details/${item.sportid}/${item.eventid}`} key={i}>
                                            <div className="mg-item">
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
                    </>) : (<><div className="no-data" style={{ textAlign: "center" }}>No Data</div></>)}
                </div>
            </div>
        </div>
    )
}

export default TennisMatch