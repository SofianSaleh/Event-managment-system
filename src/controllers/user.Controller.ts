import User from "../db/models/User.model";
import { validate } from "../validations/index.validation";
import { regCredsValidation } from "../validations/regster.validation";
import { sendMail } from "../services/email.service";
import {
  hashPassword,
  generateValidationCode,
} from "../services/crypt.service";

class UserController {
  public async getUser(anything: any) {
    try {
      const user = await User.findOne(anything);

      return user;
    } catch (e) {
      throw e;
    }
  }

  public async getAll() {
    try {
      const users = await User.find();
      return users;
    } catch (e) {
      throw e;
    }
  }

  public async updateUser(updateObj: any, id: string) {
    try {
      // ! Extract to new function
      if (updateObj.email) {
        const isEmail = await this.getUser({ email: updateObj.email });
        if (!!isEmail) {
          return {
            success: false,
            user: null,
            errors: [{ path: `Email`, msg: `Email Already Exists` }],
          };
        }
        // ! if email doesn't exist make the user unverified and send email to the new email
      }
      if (updateObj.username) {
        const isUsername = await this.getUser({ username: updateObj.username });
        if (!!isUsername)
          return {
            success: false,
            user: null,
            errors: [{ path: `Username`, msg: `Username Already Exists` }],
          };
      }

      const updated = await User.findByIdAndUpdate(id, updateObj);
      console.log(updated);

      return {
        success: true,
        user: updated,
      };
    } catch (e) {
      throw e;
    }
  }

  public async register(userInfo: any) {
    try {
      // * Validating the input
      let regSchemaVal = await validate(regCredsValidation, userInfo);
      if (Array.isArray(regSchemaVal))
        return { success: false, user: null, errors: regSchemaVal };

      // * Checking if the username or email already exists

      const isEmail = await this.getUser({ email: userInfo.email });
      if (!!isEmail)
        return {
          success: false,
          user: null,
          errors: [{ path: `Email`, msg: `Email Already Exists` }],
        };

      const isUsername = await this.getUser({ username: userInfo.username });
      if (!!isUsername)
        return {
          success: false,
          user: null,
          errors: [{ path: `Username`, msg: `Username Already Exists` }],
        };

      // * Hash the password
      let hashedPassword = await hashPassword(userInfo.password);
      userInfo.password = hashedPassword;
      userInfo.code = generateValidationCode();

      // * Save the user to the DB
      const newUser = new User(userInfo);
      await newUser.save();

      // * Send verification email to the user
      const { success } = await sendMail({
        email: newUser.email,
        username: newUser.username,
        code: newUser.code,
      });

      if (!success) return { success: false, user: null, errors: null };

      return { success: true, user: newUser, errors: null };
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }

  public async incrementCount(id: string) {
    try {
      const incrementedUser = await User.findByIdAndUpdate(id, {
        $inc: { count: 1 },
      });
      console.log(incrementedUser);
      return incrementedUser;
    } catch (e) {
      throw e;
    }
  }

  public async verifyUser(user_id: string, code: string) {
    try {
      const user = (await this.getUser({ _id: user_id })) as any;

      if (!user)
        return {
          success: false,
          user: null,
          errors: [{ path: "User", msg: `User doesn't exist` }],
        };

      if (user.code !== code)
        return {
          success: false,
          user: null,
          errors: [{ path: `Code`, msg: `Code doesn't match` }],
        };

      if (user.is_verified)
        return {
          success: false,
          user: null,
          errors: [{ path: `User`, msg: `User already verified` }],
        };

      user.is_verified = true;
      await user.save();

      return { success: true, user: user, errors: null };
    } catch (e) {
      throw e;
    }
  }
}

export default new UserController();
