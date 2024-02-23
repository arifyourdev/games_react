import { useState, useEffect } from 'react';
import axios from "axios";
import { getFormattedCurrentDate,getFormattedTomorrowDate } from '../helper/dateUtils';
const formattedDateTime = getFormattedCurrentDate();
const tommorowDate = getFormattedTomorrowDate();

const useSoccerFetch = () =>{
    const [soccerData, setSoccerData] = useState([]);
    const [soccerId, setSoccerId] = useState([]);
    const [soccerMatches, setSoccerMatches] = useState({});
    const [uniqueSoccer, setUniqueSoccer] = useState([]);
    const [soccerToday, setSoccerToday] = useState({})
    const [tomSoccerData,setTomSoccerData] = useState({});
    const [tomSoccerUnique,setTomUnique] = useState([])
    const [soccerLoad, setSoccerLoad] = useState(true)
    const fetchSoccer = async () => {
        try {
            const response = await axios.post(`/getGamesList`, { sportId: '1'});
            setSoccerData(response.data);
            const sportIdData = response.data;
            const uniqueSeriesNames = [...new Set(sportIdData.map(item => item.seriesname))];
            setSoccerId(uniqueSeriesNames)
            setSoccerLoad(false);

            const filteredData = {};
            for (const seriesName of uniqueSeriesNames) {
                const filteredItems = sportIdData.filter(item => item.seriesname === seriesName);
                filteredData[seriesName] = {
                    count: filteredItems.length,
                    matches: filteredItems
                };
            }
            setSoccerMatches(filteredData);

            // Today Filter
            const todayGames = sportIdData.filter(item => item.month === formattedDateTime);
            const seriesNames = todayGames.map(item => item.seriesname);
            const uniqueNames = [...new Set(seriesNames)];
            setUniqueSoccer(uniqueNames);
            const filteredData2 = {};
            for (const seriesName2 of uniqueNames) {
                const filteredItemss = sportIdData.filter(item => item.seriesname === seriesName2 && item.month === formattedDateTime);
                filteredData2[seriesName2] = {
                    count: filteredItemss.length,
                    match: filteredItemss
                };
            }
            setSoccerToday(filteredData2)

         //Tomorrow Filter
        const tomGames = sportIdData.filter(item => item.month === tommorowDate);
        const tomSeries = tomGames.map(item => item.seriesname);
        const tomUnique = [...new Set(tomSeries)];
        setTomUnique(tomUnique);
        const filteredData3 = {};
        for (const seriesName4 of tomUnique) {
            const filteredItemss = sportIdData.filter(item => item.seriesname === seriesName4 && item.month === tommorowDate);
            filteredData3[seriesName4] = {
                count: filteredItemss.length,
                match: filteredItemss
            };
         }
        setTomSoccerData(filteredData3)

        } catch (error) {
            console.log(`Eroor in Fetching Api ${error}`)
        }
    }
    useEffect(() => {
        fetchSoccer();
      }, []);
      
      return { soccerData,  soccerId, soccerMatches, uniqueSoccer, soccerToday, soccerLoad,tomSoccerData,tomSoccerUnique};
}

 
export default useSoccerFetch;