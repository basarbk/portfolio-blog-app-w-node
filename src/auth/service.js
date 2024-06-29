import generateUniqueValue from "../shared/utils/generateUniqueValue.js";
import { validateToken } from "../user/service.js";
import Token from "./Token.js";
import { AuthUser } from "./dto/auth-user.dto.js";

export async function handleAuth(auth) {
  const user = await validateToken(auth.token);

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
