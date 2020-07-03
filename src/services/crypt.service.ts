import { compare, hash, genSalt } from "bcryptjs";
import { v4 } from "uuid";

export const hashPassword = async (password: string): Promise<string> => {
  try {
    console.log(password);
    let salt: string = await genSalt(10);
    let hashedPassword: string = await hash(password, salt);
    console.log(hashedPassword);
    return hashedPassword;
  } catch (e) {
    throw e;
  }
};

export const verifyPassword = async (
  hashedPassword: string,
  passwordEntered: string
): Promise<boolean> => {
  try {
    return await compare(passwordEntered, hashedPassword);
  } catch (e) {
    throw e.message;
  }
};

export const generateValidationCode = () => {
  try {
    return v4();
  } catch (e) {
    throw e.message;
  }
};
