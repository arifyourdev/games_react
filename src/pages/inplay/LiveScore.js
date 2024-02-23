import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth';

const LiveScore = ({ scoreurl ,tvurl ,eventId}) => {
    const [livetab, setLiveTab] = useState(1);
    const liveHandler = (livetab) => {
        setLiveTab(livetab);
    }
     const [auth] = useAuth();
     const [multi, setMulti] = useState(() => {
         const storedMulti = sessionStorage.getItem("user-mm");
         return storedMulti ? JSON.parse(storedMulti) : [];
      });
       useEffect(() => {
         sessionStorage.setItem("user-mm", JSON.stringify(multi));
      }, [multi]);

     async function updateUserMMlist() {
           try {
              const response = await axios.post("/getUserWiseMultiMarket");
              if(response.status === 200){
                const userMM = response.data.map((item) => item.matchid);
                sessionStorage.setItem("user-mm",JSON.stringify([...userMM]));
                setMulti([...userMM]);
              }
            } catch (e) {
              console.log(`Error in Fetch Api ${e}`)
          }
      }

    async function setFavourite() {
        try {
          console.log("set favourite: ", eventId);
          const response = await axios.post(`/setMatchAsMultiMarket`,{eventid:eventId});;
           if (response.status === 200) {
              console.log(response.data.message);
              updateUserMMlist()
          } else {
            console.log(response.data)
          }
        } catch (error) {
          console.error("Error: ", error);
        }
      }
       
    return (
        <div>
            {auth.user ? (
                 <div className="live-score">
                 <div className="ls-nav-bar">
                     <div className={livetab === 1 ? "lsnv-btn active" : "lsnv-btn"} onClick={() => liveHandler(1)}>Scoreboard</div>
                     <div className={livetab === 2 ? "lsnv-btn active" : "lsnv-btn"} onClick={() => liveHandler(2)}>Live TV</div>
                 </div>
 
                 <div className={livetab == 1 ? "lsi-cont" : "lsi-cont-bg"}>
                     <iframe
                         className={livetab == 2 ? "ls-iframe ls-tv" : "ls-iframe"}
                         allowFullScreen={true} src={livetab == 1 ? scoreurl : tvurl}
                         title="Score and Live TV window"
                     ></iframe>
                 </div>
 
                 <div className="ls-footer">
                     <div className={multi.includes(eventId) ? "left-btn active" : "left-btn" } onClick={(e) => { e.preventDefault(); setFavourite();}}>
                         <img className="pin" />  Pin
                     </div>
                     <div className="right-btn" >
                         <img className="reload" /> Refresh
                     </div>
                 </div>
             </div>
            ) :(<> </>)}
           
        </div>
    )
}

export default LiveScore