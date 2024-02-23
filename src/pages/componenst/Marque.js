import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'

const Marque = () => {
    const [auth,setAuth] = useAuth();
    const [message , setMessage] = useState([])
    const fetchMessage = async () =>{
        try{
          const response = await axios.post(`/getMessageData`)
          setMessage(response.data)
        }catch(e){
            console.log(`Error in Fetch Message ${e}`)
        }
    }
   useEffect(()=>{
    fetchMessage()
   },[]) 
  return (
    <div>
       <div className="news">
            <div className="icon-cont">
                <div className="icon" />
            </div>
            <div className="news-items-cont">
                <div className="news-scroller">
            {auth.user ? (<> 
                   <span className="news-item">
                       {message.title}:{message.message}
                    </span>
                    </>):(<>
                    <span className="news-item">
                        Request: Please Login to see the messages
                    </span>
                    </>)}        
                     
                </div>
            </div>
        </div>
    </div>
  )
}

export default Marque