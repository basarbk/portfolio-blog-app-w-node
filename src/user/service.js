import sequelize from "../db/index.js";
import { sendSignUpEmail } from "../email/index.js";
import EmailException from "../error/EmailException.js";
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
  const transaction = await sequelize.transaction();
  try {
    await User.create(user, { transaction });
    await sendSignUpEmail(user.email, user.registrationToken);
    await transaction.commit();
  } catch (error) {
    if (error?.name === "SequelizeUniqueConstraintError") {
      throw new ValidationException({ email: "E-mail is in use" });
    }
    await transaction.rollback();
    throw new EmailException();
  }
}

export async function findByEmail(email) {
  return await User.findOne({ where: { email } });
}
