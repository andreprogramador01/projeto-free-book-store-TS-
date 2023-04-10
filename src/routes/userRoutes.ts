import { Router } from "express";
import userControllers from "../controllers/userControllers";
import {validateSchema} from "../middlewares/schemaValidationMiddleware";
import { userSchemma } from "../schemas/User";

const userRoutes = Router();

userRoutes.post('/signup',/* validateSchema(userSchemma) ,*/ userControllers.create)
userRoutes.post("/signin", userControllers.signin)

export default userRoutes;
