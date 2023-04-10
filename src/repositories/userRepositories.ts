import connectionDb from "../config/database";

async function findByEmail(email: String) {
  return await connectionDb.query(
    `    
    SELECT * FROM users WHERE email=$1
  `,
    [email]
  );
}

interface User {
  name: string,
  email: String,
  password: string
}
async function create({ name, email, password }: User) {
  await connectionDb.query(
    `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
    `,
    [name, email, password]
  );
}
interface Session {
  token: String,
  userId: Number
}
async function createSession({ token, userId }: Session) {
  await connectionDb.query(
    `
        INSERT INTO sessions (token, "userId")
        VALUES ($1, $2)
    `,
    [token, userId]
  );
}

async function findSessionByToken(token: String) {
  return await connectionDb.query(
    `
        SELECT * FROM sessions WHERE token = $1
    `,
    [token]
  );
}

async function findById(id: Number) {
  return await connectionDb.query(
    `    
    SELECT * FROM users WHERE id=$1
  `,
    [id]
  );
}

export default {
  findByEmail,
  create,
  createSession,
  findById,
  findSessionByToken,
};
