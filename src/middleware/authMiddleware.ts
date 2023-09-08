
// import { Request, Response, NextFunction } from 'express';

// const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.status(401).json({ message: 'Unauthorized' });
// };

// export default isAuthenticated;

import { Request, Response, NextFunction } from 'express';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        req.session.userId = req.user._id; // Attach user ID to the session
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
};

export default isAuthenticated;
