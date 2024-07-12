import jwt from "jsonwebtoken";
import "dotenv/config";

export default async function decrpitartoken(token) {
  let payloadOriginal = null;
  try {
    payloadOriginal = jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    console.error(error);
  }
  return payloadOriginal;
}

