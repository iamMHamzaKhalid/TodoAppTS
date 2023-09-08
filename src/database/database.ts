import TodoDatabase, { ITodo } from '../models/todo.model';
import UserDatabase from '../models/user.model'

const getUsers = async () => {
    try {
        await UserDatabase.find({}, { __v: 0, _id: 0 })
    } catch (error) {
        console.error(`${error} Could Get Users!`)
    }

}
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
const getTodos = async () => {
    try {
        const todos = await TodoDatabase.find({}, { __v: 0, _id: 0 });
        return todos;
    } catch (error) {
        console.error(`Could not get todos: ${error}`);
        throw error;
    }
};

// Create a new todo
const postTodo = async (todo: ITodo) => {
    try {
        const newTodo = new TodoDatabase({
            ...todo,
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
const deleteTodo = async (id: number): Promise<boolean> => {
    try {
        const deleted = await TodoDatabase.findByIdAndDelete(id);
        if (!deleted) {
            throw new Error('Todo not found');
            return false
        }
        return true;
    } catch (error) {
        console.error(`Could not delete todo: ${error}`);
        throw error;
    }
};





export { getUsers, postUser, getTodos, postTodo, updateTodo, deleteTodo }
