import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export function useSocket(eventId) {
    const [oddsData, setOddsData] = useState(null);
    const [fancyData, setFancyData] = useState(null);
    const [bookMData, setBookMData] = useState(null)

    useEffect(() => {
        const socket = io('https://centre.7wickets.net:4000', {
            transports: ['websocket'],
            secure: true,
            rejectUnauthorized: false,
        });

        socket.on('connect', () => {
            console.log('Connected to server', eventId);
        });

        socket.on(`Event/Auto/${eventId}`, (data) => {
            setOddsData(data);
        });
        socket.on(`Fancy/Auto/${eventId}`, (data) => {
            setFancyData(data)
        })
        socket.on(`BookM/Auto/${eventId}`, (data) => {
            setBookMData(data)
        })

        setTimeout(() => {
            socket.emit(`Event/Auto`, eventId);
            socket.emit(`Fancy/Auto`, eventId);
            socket.emit(`BookM/Auto`, eventId);
        }, 1000);
          
        return () => {
            socket.disconnect();
        };
    }, [eventId]);

    return { oddsData, fancyData, bookMData };
}
