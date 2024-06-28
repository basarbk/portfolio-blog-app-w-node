import { sendSignUpEmail } from "../email/index.js";
import ValidationException from "../error/ValidationException.js";
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
  try {
    await User.create(user);
    await sendSignUpEmail(user.email, user.registrationToken);
  } catch (error) {
    if (error?.name === "SequelizeUniqueConstraintError") {
      throw new ValidationException({ email: "E-mail is in use" });
    }
  }
}

export async function findByEmail(email) {
  return await User.findOne({ where: { email } });
}
