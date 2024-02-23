import React from 'react'
import FancyGrid from './FancyGrid'

const Fancy = ({fancyTab, fancyTabHandler,fancyData,eventData,fancyBook, sportId, eventId, sourceId }) => {

    
    return (
        <div className="md-fancy">
            <div className="fancy-nav">
                <div className={fancyTab === 1 ? "mdf-btn mdf-active" : "mdf-btn"} onClick={() => fancyTabHandler(1)}>
                    <div className="cont">
                        <img width={20} height={20}
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARSSURBVHgBrVZpaBx1FP/NsTOTTXazidk0zdVcRqmtRkWQNtCGVD9IQYzXBwUh1VZoRRBpBUUqfqhoi36pLR4f4kVFkQoaj5JCMWjBxqSNNm1M1sREcu99786M7z87s90jgV4v/PKfefuOee/93s5yyBeOUGaCJ+imDuZ1rh1y9Jx5RghhgrqaYVnH3s5n7uqWd9evC7SLEq/gGkTTOXgX+dHZKfHEt/t+OUYqX26Css53Hz/StXVqt0sJ5Ke9RklrIsaH1M8+7r28j24DAv3jb3vt6f07H7j8skMOGnXq+vWDgwZXjXCnzVE2N/Gr/xzrc2nb7ZEeuy1MZVLzNIJ5snuX1AyRc+TpLBuXrYUCykV+PJdG23bHHortMBIoTqFDo/QqWbJTM04Orc4deKTpKFodXfR0AiTBhRKhGiJfCokvx0ONb6Gr9gAUwZ3jl4lTeUuySZblKpG1iKOMLLMlHP11VD1Kzi/BE/oNCS2GJ5qPwyU3GJ9G0z7SD+L8yjfYUrMHdtGN76dfRSwdyMYQbapd13WFzzBAR5rKsyDyTmys2Ik/lr9GMDmPhze8A1GwY9T7HYaWvsRy/B/cX92LO8hmYPYItaoBlXJrXgyGZDLJsQo4jfVWu0LziObHiYkX0OLcgu66F3GKgpxd6INDWgeBs8Gf+AhnlON4rOUw2sq34dPxXQillooYJUmSbiyTTsFVPR/xdAxba57Fn94fKfjnhq69fDvuptax68WYBz/8+zbqSztQSyj0Z2AVGC3SjcEgD3XkVCI48Zf3NJJqypyRSOstZW08wXOYDV+gxNuK/K2ZsgQcm3oh3CVtCCQX4Y3PZXXsQVgjrfsUJZ6NjMFtvxWrxaAWITNkZDhs8Nk8ORqPqqu0memsjlXS5LgXlUpz1jahxmHj5CJ/NTPSKzPQzDlYpy8+D1kkvlObLN3wUj9GVwbQ03IQ97h7aAHtqFI2wJeYK/K3SGO0yFiOgm382/c7FN6BFsd9xtIxXTgVxKmZD3By8hBRWUG5tB71ZZsw5h0s8jcrMGiaXfXcb2d/Yhnnl37Gg4178V9kHJ7AsEk+FdOhi6SbwFPth4xnHF76KW9RM2KwSGcJdM2klfWBJf3Tx1Ch1OP5TR+if+ooxv1naQ4xrC9tw476Xai2N6Pv0n6sUDvXEnPRMlMvlFDSj76xV6iK59BZ9yS6G3qpNZnhe4Ij+GLkDaM6TddXDc5YJBoESqtRim9fzSiSCuGk5z0MzHxC1G0kdnHUvgWDBOSItUTTBNaiGEsQjfgxiVpsXsuYaEbfScsGrlZ887aLdAQYi8ILQ9H3Y4lS3CxR6a0Wm0t+RZd+9kbTgxdmPGje2OB0Y7MsxXEjwoLPjop9pw9MHqTbqGDq4/ER75lEXWsoli6v5mVbNethKi1fNdQUHwks2y/NDMZeH3zTc5hiGi+Hwtc7S1hBcBJKkFlEy05H/s+YQkkS2JD8yPnZ8j9t49ImnTuvggAAAABJRU5ErkJggg=="
                        />
                        <div className="title">Fancy Bet</div>
                        <img
                            width={20}
                            height={20}
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFVSURBVHgBrVSLdYMwDBQsUG9Qb9CMwAh0AhihnaBskHaCJhOkG4ROkHSC0AnIBu6pkR/Gkcn33rtnkIV8soSI7ozslINzboaFuQe7LMu2dCkQxIBvYO+OsQM/QUvnKIRjgWUFGrAFf0CvyoKVrB34CsVfNKGsFBWsrJzwq0WpEwGqkxWnXZhOkDpzHvl7u9ECLuTEKgrGWIMbeW6UjBot4L+6yLYJbfG72Piw3r/nYuS2sOAyOucb/BAfTou5j3y4aEZiHEmvSQHfnRta6CXaq8Nvc7EbmoavOLfJe8KnDwP6PptRGl0imJX1d2SVlNbKB/5KysTeqJh5sMeXXyQ+fAQflGC1KGy1k0zQqDba49ZYRTb1R4iDFm4YABUlIFfgqz7KSBsO7DCnYQAsZWVw0Z7Agg79+IxCtXQKks7CDQMgBCtrnPb/0vkD1tKhV7dXDdhb8AdbzI/vM537OwAAAABJRU5ErkJggg=="
                        />
                    </div>
                    <div className="wedge" />
                </div>
                <div className={fancyTab === 2 ? "mdf-btn mdf-active" : "mdf-btn"} onClick={() => fancyTabHandler(2)}>
                    <div className="cont">
                        <div className="title">Premium Cricket</div>
                    </div>
                    <div className="wedge" />
                </div>
            </div>
            <div className={fancyTab === 1 ? 'd-block' : 'd-none'}>
                 <FancyGrid
                    fancyData={fancyData}
                    fancyBook={fancyBook}
                    matchName ={eventData.matchname}
                    min={eventData.fancyMin}
                    max={eventData.fancyMax}
                    sportId={sportId}
                    eventId={eventId}
                    sourceId={sourceId}
                />
             </div>
            <div className={fancyTab === 2 ? 'd-block' : 'd-none'}>
                <div className="premium-cricket">premium cricket</div>
            </div>
        </div>
    )
}

export default Fancy