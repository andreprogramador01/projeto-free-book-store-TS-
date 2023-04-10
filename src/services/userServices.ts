import bcrypt from "bcrypt";
import userRepositories from "../repositories/userRepositories";
import { v4 as uuidV4 } from "uuid";
import errors from "../errors/index";

interface User{
  name:string,
  email: String,
  password:string
}
async function create({ name, email, password }:User) {
  const { rowCount } = await userRepositories.findByEmail(email);
  if (rowCount) throw errors.duplicatedEmailError(email);

  const hashPassword = await bcrypt.hash(password, 10);
  await userRepositories.create({ name, email, password: hashPassword });
}
interface UserSignIn{
  email: String,
  password:String

}
async function signin({ email, password }:UserSignIn) {
  const {
    rowCount,
    rows: [user],
  } = await userRepositories.findByEmail(email);
  if (!rowCount) throw errors.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password.toString(), user.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  const token = uuidV4();
  await userRepositories.createSession({ token, userId: user.id });

  return token;
}

export default {
  create,
  signin,
};
