import { Router } from "express";
import { httpGetUsers, httpPostUsers } from "../controllers/user.controller";

const UserRouter = Router();

UserRouter.get('/', httpGetUsers);
UserRouter.post('/', httpPostUsers);

export default UserRouter;