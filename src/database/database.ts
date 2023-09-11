import crypto from 'crypto';
import TodoDatabase, { ITodo } from '../models/todo.model';
import UserDatabase from '../models/user.model'
import Session from '../models/session.model'
import mongoose from 'mongoose';

const getUsers = async () => {
    try {
        return await UserDatabase.find({}, { __v: 0 })
    } catch (error) {
        console.error(`${error} Could Get Users!`)
    }

}

const createOrRetrieveSession = async (userId: mongoose.Types.ObjectId): Promise<{ token: string, message: string }> => {
    // Check if a session token already exists for the user
    let session = await Session.findOne({ userId });

    if (session) {
        return { token: session.token, message: "Token exists User already Loged In" };
    } else {
        // If no session exists, generate a new session token
        const token = crypto.randomBytes(64).toString('hex');

        // Store the token in the Session model
        session = new Session({ token, userId });
        await session.save();

        return { token: session.token, message: "Token created & User LogedIn" };
    }
};

const validateUserCredentials = async (username: string, password: string): Promise<mongoose.Types.ObjectId | null> => {
    const user = await UserDatabase.findOne({ username, password });
    return user ? user._id : null;
};



const postUser = async (user: any): Promise<boolean> => {
    try {
        await UserDatabase.updateOne(
            {
                username: user.username,
            },
            {
                username: user.username,
                password: user.password,
            },
            { upsert: true })
        return true

    } catch (error) {
        console.error(`${error} Could not save user!`)
        return false;
    }

}

// TODO CRUDS

// const getTodos = async () => {
//     try {
//         await TodoDatabase.find({}, { __v: 0, _id: 0 })
//     } catch (error) {
//         console.error(`${error} Could Get Todos!`)
//     }

// }



// Get all todos
const getTodos = async (userId: mongoose.Types.ObjectId) => {
    try {
        const todos = await TodoDatabase.find({ userId }, { __v: 0 });
        return todos;
    } catch (error) {
        console.error(`Could not get todos: ${error}`);
        throw error;
    }
};

// Create a new todo
const postTodo = async (todo: ITodo, userId: mongoose.Types.ObjectId) => {
    try {
        const newTodo = new TodoDatabase({
            ...todo,
            userId,
            status: true, // Set the initial status
            createdDate: new Date(), // Set the created date
            updateDate: new Date(), // Set the initial update date
        });
        await newTodo.save();
        return newTodo;
    } catch (error) {
        console.error(`Could not create todo: ${error}`);
        throw error;
    }
};

// Update a todo by ID
const updateTodo = async (id: string, updatedTodo: ITodo) => {
    try {
        const updated = await TodoDatabase.findByIdAndUpdate(
            id,
            {
                ...updatedTodo,
                updateDate: new Date(),
            },
            { new: true });
        if (!updated) {
            throw new Error('Todo not found');
        }
        return updated;
    } catch (error) {
        console.error(`Could not update todo: ${error}`);
        throw error;
    }
};

// Delete a todo by ID
const deleteTodo = async (id: string) => {
    try {
        const deleted = await TodoDatabase.findByIdAndDelete(id);
        if (!deleted) {
            throw new Error('Todo not found');

        }
        return deleted;
    } catch (error) {
        console.error(`Could not delete todo: ${error}`);
        throw error;
    }
};





export { getUsers, postUser, createOrRetrieveSession, validateUserCredentials, getTodos, postTodo, updateTodo, deleteTodo }
