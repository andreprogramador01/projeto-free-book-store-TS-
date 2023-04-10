import { Router } from "express";
import bookRoutes from "./bookRoutes";
import userRoutes from "./userRoutes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/books", bookRoutes);

export default routes;
