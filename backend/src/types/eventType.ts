export interface WeatherEvent {
    city: string;
    timestamp: string;
    temperature: number;
}

export interface Candle {
    open: number;
    high: number;
    low: number;
    close: number;
}

export interface CityCandles {
    [hour: string]: Candle;
}

export interface AllCandles {
    [city: string]: CityCandles;
}