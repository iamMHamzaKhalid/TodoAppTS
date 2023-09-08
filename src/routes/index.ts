import { Express } from "express";
import UserRouter from "./user.router";
import TodoRouter from "./todo.router";

const registerRoutes = (app: Express) => {
    // app.use("/api");
    app.use("/api/users", UserRouter);
    app.use("/api/todos", TodoRouter);

};
export default registerRoutes;
