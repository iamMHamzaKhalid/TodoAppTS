import mongoose, { Schema, Document } from "mongoose"

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

interface IUser extends Document {
    username: string;
    password: string;
}
export { IUser }
export default mongoose.model<IUser>('User', UserSchema);