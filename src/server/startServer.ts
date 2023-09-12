import express, { Express } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';

import registerRoutes from '../routes';


dotenv.config();


const SERVER_PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 6000;
const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

mongoose.connection.once('open', () => {
    console.log('MongoDB Connection ready!');
});
mongoose.connection.on('error', (err) => {
    console.error('MongoDB Connection error:' + err);
});
// console.log(MONGODB_URI, SERVER_PORT);
const startServer = async () => {
    try {
        if (MONGODB_URI) {
            await mongoose.connect(MONGODB_URI);

        } else {
            console.error('MONGODB_URI is undefined. Check your environment variables.');
        }

        const app: Express = express();

        // app.use(morgan('combined'));
        app.use(morgan('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));

        registerRoutes(app);

        app.listen(SERVER_PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${SERVER_PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
};

export default startServer;
