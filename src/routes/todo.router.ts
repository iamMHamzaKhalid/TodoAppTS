import { Router } from "express";
import { httpGetTodo, httpPostTodo, httpDeleteTodo, httpUpdateTodo } from "../controllers/todo.controller";

const TodoRouter = Router();


TodoRouter.get('/', httpGetTodo);
TodoRouter.post('/', httpPostTodo);
TodoRouter.delete('/:id', httpDeleteTodo);
TodoRouter.put('/:id', httpUpdateTodo);

export default TodoRouter;