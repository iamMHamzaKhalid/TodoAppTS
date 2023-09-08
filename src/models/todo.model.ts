// {
//     name: {
//       type: String,
//       required: true,
//     },

//     description: {
//       type: String,
//       required: true,
//     },

//     status: {
//       type: Boolean,
//       required: true,
//     },
//   },
//   { timestamps: true }
// )
import mongoose, { Schema, Document } from 'mongoose';

const TodoSchema: Schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

interface ITodo extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    description: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export { ITodo }

export default mongoose.model<ITodo>('Todo', TodoSchema);