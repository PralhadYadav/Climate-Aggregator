import WebSocket from 'ws';
import { WeatherEvent } from '../types/eventType';
import { addEvent } from '../services/candlesService';

const connectToStream = () => {
    const ws = new WebSocket('ws://localhost:8765');

    ws.on('open', () => console.log('Connected to weather stream'));

    ws.on('message', (data: WebSocket.RawData) => {
        try {
            const event: WeatherEvent = JSON.parse(data.toString());
            addEvent(event);
        } catch (err) {
            console.error('Parsing error:', err);
        }
    });

    ws.on('close', () => {
        console.log('🔌 Disconnected. Reconnecting...');
        setTimeout(connectToStream, 1000);
    });
};

export default connectToStream;