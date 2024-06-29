import { validateToken } from "../user/service.js";
import { AuthUser } from "./dto/auth-user.dto.js";

export async function handleAuth(auth) {
  const user = await validateToken(auth.token);
  return {
    user: new AuthUser(user),
    token: "123",
  };
}
