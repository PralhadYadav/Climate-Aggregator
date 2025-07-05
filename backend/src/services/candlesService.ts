import {Request, Response, NextFunction} from 'express';
import { ApiError } from '../utils/apiError';
import { AllCandles, WeatherEvent } from '../types/eventType';
import { getHourKey } from '../utils/time';

const candles: AllCandles = {};

export const addEvent = ({ city, timestamp, temperature }: WeatherEvent): void => {
    const hourKey = getHourKey(timestamp);
    if (!candles[city]) candles[city] = {};
    if (!candles[city][hourKey]) {
        candles[city][hourKey] = {
            open: temperature,
            high: temperature,
            low: temperature,
            close: temperature,
        };
    } else {
        const candle = candles[city][hourKey];
        candle.high = Math.max(candle.high, temperature);
        candle.low = Math.min(candle.low, temperature);
        candle.close = temperature;
    }
};

export const getCityCandlesData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const city = req.query.city as string;
        if (!city) {
            throw new ApiError('Missing city parameter', 400);
        }
        const data = candles[city]
            ? Object.entries(candles[city]).map(([hour, values]) => ({ hour, ...values }))
            : [];

        res.json(data);
    } catch (error) {
        console.log(error)
        next(error) 
    }
}