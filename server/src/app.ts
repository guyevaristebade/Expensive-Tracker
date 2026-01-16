import express, {Response, Request, NextFunction, Express} from 'express'
import { authenticate } from './common/middlewares/authenticated.js';
import bodyParser from 'body-parser';
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import compression from 'compression'


export const app : Express = express();

const allowedOrigins = process.env.FRONT_END_URL?.split(',')

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: [
        'Content-Type',
        'Authorization',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}


app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())

if (process.env.NODE_ENV === 'production') {
    app.use(
        helmet({
            crossOriginResourcePolicy: { policy: 'cross-origin' },
        })
    );
    app.use(compression())
}


app.get("/heath"  , (req : Request, res : Response) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    })
})

app.get("/user", authenticate, (req : Request, res : Response) =>{
    res.status(200).json({
        user : (req as any).user
    })
})

