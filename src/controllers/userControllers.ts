import { NextFunction,Response,Request } from "express";
import userServices from "../services/userServices";


interface User{
  name:String,
  email: String,
  password:String
}
async function create(req:Request, res:Response, next:NextFunction) {
  const { name, email, password } = req.body;
  try {
    await userServices.create({ name, email, password });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function signin(req:Request, res:Response, next:NextFunction) {
  const { email, password } = req.body;
  try {
    const token = await userServices.signin({ email, password });
    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

export default {
  create,
  signin,
};
