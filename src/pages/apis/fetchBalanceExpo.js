import axios from "axios";
import { useEffect, useState } from "react";

const useBalanceExpo = () =>{
    const [balaceExpo,setBalanceExpo] = useState([])
    const fetchBalanceExpo = async () =>{
     try{
        const response = await axios.post('/getUserBalanceExpo');
        if (response.status == 200) {
            setBalanceExpo({
             balance: response.data.balance ?? 0,
             expo:response.data.expo ?? 0,
            })
        }
      }catch(error){
      console.log(`Error in Fetching Data ${error}`)
     }
   }
 
    useEffect(() =>{  fetchBalanceExpo();},[])

    return {balaceExpo,setBalanceExpo}
}

export default useBalanceExpo;