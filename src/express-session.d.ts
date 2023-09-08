// express-session.d.ts
declare module 'express-session' {
    interface SessionData {
        userId?: string; // Add this line
    }
}
