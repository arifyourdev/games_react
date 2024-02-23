import { useState, useEffect } from 'react';
import axios from "axios";
import { getFormattedCurrentDate, getFormattedTomorrowDate } from '../helper/dateUtils';
const formattedDateTime = getFormattedCurrentDate();
const tommorowDate = getFormattedTomorrowDate();

export const fetchGameCounts = async () => {
    try {
        const response = await axios.post("/getGamesCount");
        return response.data;
    } catch (error) {
        console.log(`Error in Fetching Game Counts API: ${error}`);
        return {};
    }
};

// Cricket Api
const useCricketMatch = () =>{
    const [data, setData] = useState([]);
    const [sportId, setSportId] = useState([]);
    const [seriesData, setSeriesData] = useState({});
    const [uniqueSeriesNames, setUniqueSeriesNames] = useState([]);
    const [todaydata, setTodayData] = useState({})
    const [tomData,setTomData] = useState({});
    const [tomUnique,setTomUnique] = useState([])
    const [load, setLoad] = useState(true)
    const fetchMatchApis = async () => {
        try {
            const response = await axios.post(`/getGamesList`, { sportId: '4' });
            setData(response.data)
            const sportIdData = response.data;
            const uniqueSeriesNames = [...new Set(sportIdData.map(item => item.seriesname))];
            setSportId(uniqueSeriesNames)
            setLoad(false);

            const filteredData = {};
            for (const seriesName of uniqueSeriesNames) {
                const filteredItems = sportIdData.filter(item => item.seriesname === seriesName);
                filteredData[seriesName] = {
                    count: filteredItems.length,
                    matches: filteredItems
                };
            }
            setSeriesData(filteredData);

            // Today Filter
            const todayGames = sportIdData.filter(item => item.month === formattedDateTime);
            const seriesNames = todayGames.map(item => item.seriesname);
            const uniqueNames = [...new Set(seriesNames)];
            setUniqueSeriesNames(uniqueNames)
            const filteredData2 = {};
            for (const seriesName2 of uniqueNames) {
                const filteredItems = sportIdData.filter(item => item.seriesname === seriesName2 && item.month === formattedDateTime);
                filteredData2[seriesName2] = {
                    count: filteredItems.length,
                    match: filteredItems
                };
            }
            setTodayData(filteredData2)
            
        // Tomorrow Filter
        const tomGames = sportIdData.filter(item => item.month === tommorowDate)
        const tomSeries = tomGames.map(item => item.seriesname);
        const tomUnique = [...new Set(tomSeries)];
        setTomUnique(tomUnique);
        const filteredData3 = {};
        for (const seriesName3 of tomUnique) {
            const filteredItemss = sportIdData.filter(item => item.seriesname === seriesName3 && item.month === tommorowDate);
            filteredData3[seriesName3] = {
                count: filteredItemss.length,
                match: filteredItemss
            };
        }
        setTomData(filteredData3)

        } catch (error) {
            console.log(`Eroor in Fetching Api ${error}`)
        }
    }
    useEffect(() => {
        fetchMatchApis();
      }, []);
      
      return { data,  sportId, seriesData, uniqueSeriesNames, todaydata, load,tomUnique,tomData,};
}

 
export default useCricketMatch;

