import { Router } from 'express';
import { getCityCandlesData } from '../services/candlesService';

export const candleRouter = Router();

// here we can add authentication middleware if needed
// candleRouter.use(authMiddleware);
candleRouter.get('/', getCityCandlesData);