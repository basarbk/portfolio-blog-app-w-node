import sequelize from "../db/index.js";
import { sendLoginEmail, sendSignUpEmail } from "../email/index.js";
import EmailException from "../error/EmailException.js";
import ValidationException from "../error/ValidationException.js";
import NotFoundException from "../error/NotFoundException.js";
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

export async function validateToken(token) {
  const user = await User.findOne({ where: { registrationToken: token } });
  if (!user) {
    throw new ValidationException();
  }
  user.registrationToken = null;
  await user.save();
  return user;
}

export async function generateLoginToken(email) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundException();
  }
  user.loginToken = generateUniqueValue();
  const transaction = await sequelize.transaction();
  try {
    await user.save({ transaction });
    await sendLoginEmail(email, user.loginToken);
    await transaction.commit();
  } catch {
    await transaction.rollback();
    throw new EmailException();
  }
}
