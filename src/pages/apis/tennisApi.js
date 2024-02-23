import { useState, useEffect } from 'react';
import axios from "axios";
import { getFormattedCurrentDate,getFormattedTomorrowDate } from '../helper/dateUtils';
const formattedDateTime = getFormattedCurrentDate();
const tommorowDate = getFormattedTomorrowDate();

const useTennisFetch = () =>{
    const [tennisData, setTennisData] = useState([]);
    const [tennisId, setTennisId] = useState([]);
    const [tennisMatches, setSoccerMatches] = useState({});
    const [uniqueTennis, setUniqueTennis] = useState([]);
    const [tennisToday, setTennisToday] = useState({});
    const [tomTennisData,setTomTennisData] = useState({});
    const [tomTennisUnique,setTomTennisUnique] = useState([])
    const [tenissLoad, setTennisLoad] = useState(true);
    
    const fetchTennis = async () => {
        try {
            const response = await axios.post(`/getGamesList`, { sportId: '2'});
            setTennisData(response.data);
            const sportIdData = response.data;
            const uniqueSeriesNames = [...new Set(sportIdData.map(item => item.seriesname))];
            setTennisId(uniqueSeriesNames)
            setTennisLoad(false);

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
            setUniqueTennis(uniqueNames);
            const filteredData2 = {};
            for (const seriesName2 of uniqueNames) {
                const filteredItemss = sportIdData.filter(item => item.seriesname === seriesName2 && item.month === formattedDateTime);
                filteredData2[seriesName2] = {
                    count: filteredItemss.length,
                    match: filteredItemss
                };
            }
            setTennisToday(filteredData2)

        //Tomorrow Filter
        const tomGames = sportIdData.filter(item => item.month === tommorowDate);
        const tomSeries = tomGames.map(item => item.seriesname);
        const tomUnique = [...new Set(tomSeries)];
        setTomTennisUnique(tomUnique);
        const filteredData3 = {};
        for (const seriesName4 of tomUnique) {
            const filteredItemss = sportIdData.filter(item => item.seriesname === seriesName4 && item.month === tommorowDate);
            filteredData3[seriesName4] = {
                count: filteredItemss.length,
                match: filteredItemss
            };
         }
         setTomTennisData(filteredData3)

        } catch (error) {
            console.log(`Eroor in Fetching Api ${error}`)
        }
    }
    useEffect(() => {
        fetchTennis();
      }, []);
      
      return {tennisData, tennisId, tennisMatches, uniqueTennis, tennisToday, tenissLoad,tomTennisData,tomTennisUnique};
}

 
export default useTennisFetch;