import React from 'react'

const InlplayNav = ({count,tab,tabHandler}) => {
    return (
        <div>
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
        </div>
    )
}

export default InlplayNav