import { sendSignUpEmail } from "../email/index.js";
import User from "./User.js";

export async function save(body) {
  const name = body.email.split("@")[0];
  const user = {
    email: body.email,
    name,
    handle: name,
    registrationToken: crypto.randomUUID(),
  };
  await User.create(user);
  await sendSignUpEmail(user.email, user.registrationToken);
}
