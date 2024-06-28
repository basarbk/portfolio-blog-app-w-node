import { findByEmail } from "../service.js";

export default async function (email) {
  const userInDB = await findByEmail(email);
  if (userInDB) {
    throw new Error("Email in use");
  }
}
