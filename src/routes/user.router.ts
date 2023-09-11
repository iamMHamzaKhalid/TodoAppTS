import { Router } from "express";
import { httpGetUsers, httpPostUsers, httpLogin } from "../controllers/user.controller";

const UserRouter = Router();

UserRouter.get('/users', httpGetUsers);
UserRouter.post('/users', httpPostUsers);
UserRouter.post('/login', httpLogin);

export default UserRouter;