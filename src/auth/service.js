import generateUniqueValue from "../shared/utils/generateUniqueValue.js";
import User from "../user/User.js";
import { generateLoginToken, validateToken } from "../user/service.js";
import Token from "./Token.js";
import { AuthUser } from "./dto/auth-user.dto.js";

export async function handleAuth(auth) {
  const user = await validateToken(auth.token, auth.operation);

  const token = generateUniqueValue();
  await Token.create({
    token,
    userId: user.id,
  });

  return {
    user: new AuthUser(user),
    token,
  };
}

export async function logout(token) {
  if (!token) return;
  await Token.destroy({ where: { token } });
}

export async function handleLogin(body) {
  await generateLoginToken(body.email);
}

export async function getUserFromToken(token) {
  const tokenInDB = await Token.findOne({ where: { token }, include: User });
  if (tokenInDB?.User) {
    return tokenInDB.User.toJSON();
  }
  return undefined;
}
