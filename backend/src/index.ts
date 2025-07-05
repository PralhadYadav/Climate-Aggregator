import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ErrorHandler } from './middleware/errorHandler';
import { ApiError } from './utils/apiError';
import { candleRouter } from './controllers/candles';
import connectToStream from './websocket/websocketClient';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());
connectToStream();

app.use('/api/candles', candleRouter)

// handling unknown routes
app.use((req: Request, res:Response, next: NextFunction) => {
    throw new ApiError(`Route ${req.url} not found`, 404)
})

app.use(ErrorHandler)

try {
    app.listen(PORT, ()=> {
        console.log(' Node Server is running on port ', PORT)
    })
} catch (error) {
    console.log(' Error starting server on port ', PORT)
}