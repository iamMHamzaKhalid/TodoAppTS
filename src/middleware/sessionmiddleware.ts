import express from 'express';
import Session from '../models/session.model';
import mongoose from 'mongoose';

declare module 'express-serve-static-core' {
    interface Request {
        userId?: mongoose.Types.ObjectId;
    }
}

const sessionMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers.token as string;

    if (!token) {
        return res.status(401).json({ error: 'No session token provided in headers' });
    }

    const session = await Session.findOne({ token });

    if (!session) {
        return res.status(401).json({ error: 'Invalid session token' });
    }

    // Attach the userId to the request object
    req.userId = session.userId;

    next();
};

export default sessionMiddleware;
