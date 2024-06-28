import { sendSignUpEmail } from "../email/index.js";
import generateUniqueValue from "../shared/utils/generateUniqueValue.js";
import User from "./User.js";

export async function save(body) {
  const name = body.email.split("@")[0];
  let handle = name;
  const userInDB = await User.findOne({ where: { handle } });
  if (userInDB) {
    handle += "-" + generateUniqueValue(true);
  }

  const user = {
    email: body.email,
    name,
    handle,
    registrationToken: generateUniqueValue(),
  };
  await User.create(user);
  await sendSignUpEmail(user.email, user.registrationToken);
}
