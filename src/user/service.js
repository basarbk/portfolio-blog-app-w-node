import User from "./User.js";

export async function save(body) {
  const name = body.email.split("@")[0];
  const user = {
    email: body.email,
    name,
    handle: name,
  };
  await User.create(user);
}
