
import { Request, Response } from 'express';
import { getTodos, postTodo, updateTodo, deleteTodo } from '../database/database';

const httpGetTodo = async (req: Request, res: Response) => {
    return res.status(200).json(await getTodos());
}
const httpPostTodo = async (req: Request, res: Response) => {
    const todo = req.body;
    const userId = req.session.userId; // Access user ID from the session

    if (!userId || !todo.name || !todo.description) {
        return res.status(400).json({
            error: "Bad Request! Missing name or description"
        });
    }
    else {
        const result = await postTodo(todo);
        if (result) {
            res.status(200).json({
                response: "Todo Posted "
            })
        }
        else {
            res.status(400).json({
                response: "Not Posted due to unexpected error"
            })
        }
    }

}
const httpDeleteTodo = async (req: Request, res: Response) => {
    const deleteId: number = Number(req.params.id);
    if (!deleteId) {
        return res.status(400).json({
            error: "Bad Request! Missing id"
        });
    } else {
        const deleted = await deleteTodo(deleteId);
        if (deleted) {

            res.status(200).json({
                response: "Todo deleted"
            });

        }
        else {
            res.status(400).json({
                response: "Not Deleted"
            });
        }
    }
}
const httpUpdateTodo = async (req: Request, res: Response) => {

}
export { httpGetTodo, httpPostTodo, httpDeleteTodo, httpUpdateTodo }