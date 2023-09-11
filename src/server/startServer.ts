import express, { Express } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongo';

import passportConfig from '../middleware/passport-config';
import registerRoutes from '../routes';
import { logs } from '../middleware/logs';
// import { isAuthenticated } from '../middleware/authMiddleware'

dotenv.config();
// const MongoStore = connectMongo(session);

const SERVER_PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 6000;
const MONGODB_URI: string | undefined = process.env.MONGODB_URI;
logs();
// console.log(MONGODB_URI, SERVER_PORT);
const startServer = async () => {
    try {
        if (MONGODB_URI) {
            await mongoose.connect(MONGODB_URI);

        } else {
            console.error('MONGODB_URI is undefined. Check your environment variables.');
        }

        const app: Express = express();
        // Initialize Passport and session middleware
        // passportConfig(passport);
        // app.use(session({
        //     secret: 'your-secret-key', // Change this to a strong and secure secret
        //     resave: false,
        //     saveUninitialized: false,
        //     store: new MongoStore({ mongooseConnection: mongoose.connection }),
        // }));

        // app.use(passport.initialize());
        // app.use(passport.session());
        // app.use(isAuthenticated);
        // app.use(morgan('combined'));
        app.use(morgan('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(express.static('public'));
        registerRoutes(app);

        app.listen(SERVER_PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${SERVER_PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
};

export default startServer;
