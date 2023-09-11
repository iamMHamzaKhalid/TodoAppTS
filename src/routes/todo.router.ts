import { Router } from "express";
import { httpGetTodo, httpPostTodo, httpDeleteTodo, httpUpdateTodo } from "../controllers/todo.controller";
import sessionMiddleware from '../middleware/sessionmiddleware';

const TodoRouter = Router();


TodoRouter.use(sessionMiddleware);  // Apply


TodoRouter.get('/', httpGetTodo);
TodoRouter.post('/', httpPostTodo);
TodoRouter.delete('/:id', httpDeleteTodo);
TodoRouter.put('/:id', httpUpdateTodo);

export default TodoRouter;