
import { Request, Response } from 'express';
import { getTodos, postTodo, updateTodo, deleteTodo } from '../database/database';
// import isAuthenticated from '../middleware/authMiddleware';
const httpGetTodo = async (req: Request, res: Response) => {
    return res.status(200).json(await getTodos());
}
const httpPostTodo = async (req: Request, res: Response,) => {
    const todo = req.body;
    // const userId = req.session.userId; // Access user ID from the session

    if (!todo.userId || !todo.name || !todo.description) {
        return res.status(400).json({
            error: "Bad Request! Missing name or description"
        });
    }
    else {
        const result = await postTodo(todo);
        if (result) {
            res.status(200).json({
                response: "Todo Posted by user successfully",
                user: todo.userId
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
    const deleteId: string = req.params.id;
    if (!deleteId) {
        return res.status(400).json({
            error: "Bad Request! Missing id"
        });
    } else {
        const deleted = await deleteTodo(deleteId);
        if (deleted) {

            res.status(200).json({
                response: "Todo deleted",
                deletedId: deleted.id,
                name: deleted.name,
                description: deleted.description,
                detetedTime: new Date().toLocaleString()
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
    const updateId: string = req.params.id;
    const updatedTodo = req.body;

    if (!updatedTodo.name || !updatedTodo.description) {
        return res.status(400).json({
            error: "Bad Request! Missing name or description"
        });
    }
    else {
        if (!updateId) {
            return res.status(400).json({
                error: "Bad Request! Missing id"
            });
        } else {
            const updated = await updateTodo(updateId, updatedTodo);
            if (updated) {

                res.status(200).json({
                    response: "Todo Updated successfully",
                    updateId: updated.id,
                    name: updated.name,
                    description: updated.description,
                    updatedTime: updated.updatedAt.toLocaleString()
                });

            }
            else {
                res.status(400).json({
                    response: "Not Deleted"
                });
            }
        }
    }

}
export { httpGetTodo, httpPostTodo, httpDeleteTodo, httpUpdateTodo }