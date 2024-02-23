import React from 'react'
import FancyGridItem from './FancyGridItem'

const FancyGrid = ({ fancyData, matchName, fancyBook, min, max, sportId, eventId, sourceId }) => {
    return (
        <div className="fancy-grid">
            {fancyData && fancyData.data && fancyData.data.length ? (
                <>
                    {fancyData.Type === "Diamond" ? (
                        fancyData.data.map((fancy, i) => {
                            return (
                                <FancyGridItem
                                    key={i}
                                    row={i}
                                    name={fancy.nat}
                                    matchName={matchName}
                                    fancy={{
                                        l1: fancy.l1 ?? 0,
                                        ls1: fancy.ls1 ?? 0,
                                        b1: fancy.b1 ?? 0,
                                        bs1: fancy.bs1 ?? 0,
                                    }}
                                    status={fancy.gstatus}
                                    min={min}
                                    max={max}
                                    eventId={eventId}
                                    sportId={sportId}
                                    sourceId={fancy.sid}
                                    fancyBook={fancyBook}
                                 />
                            )
                        })
                    ) : fancyData.Type == "Sky" ?
                        (
                            fancyData.data.map((fancy, i) => {
                                if (fancy.status !== 18 && fancy.status !== 1 && fancy.status !== 14) {
                                    return (
                                        <FancyGridItem
                                            key={i}
                                            row={i}
                                            name={fancy.marketName}
                                            matchName={matchName}
                                            fancy={{
                                                l1: fancy.runsNo ?? 0,
                                                ls1: fancy.oddsNo ?? 0,
                                                b1: fancy.runsYes ?? 0,
                                                bs1: fancy.oddsYes ?? 0,
                                            }}
                                            status={fancy.status === 6 || fancy.status === 10 ? "Ball Running" : ""}
                                            min={min}
                                            max={max}
                                            eventId={eventId}
                                            sportId={sportId}
                                            sourceId={fancy.sid}
                                            fancyBook={fancyBook}
                                        />
                                    )
                                }
                            })
                        ) : (<></>)
                    }
                </>
            ) : (
                <div className="fancy-grid">
                    <div>Sorry We Have no data</div>
                </div>
            )}
        </div>
    )
}

export default FancyGrid