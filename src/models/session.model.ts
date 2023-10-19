import mongoose, { Schema, Document } from "mongoose";

const SessionSchema: Schema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600, 
    }
});

interface ISession extends Document {
    token: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
}

export { ISession }
export default mongoose.model<ISession>('Session', SessionSchema);
