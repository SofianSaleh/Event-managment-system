import User from "../db/models/User.model";
import { responseFormatter } from "../helpers/errorHandler.helper";
import { validate } from "../validations/index.validation";
import { regCredsValidation } from "../validations/regster.validation";

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

  public async register(userInfo: any) {
    try {
      let regSchemaVal = await validate(regCredsValidation, userInfo);
      console.log(regSchemaVal);
      return { success: true };
    } catch (e) {
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

      if (!user) return responseFormatter(false, `User doesn't exist`, null);

      if (user.code !== code)
        return responseFormatter(false, `Code doesn't match`, null);

      if (user.is_verified)
        return responseFormatter(false, `User already verified`, null);

      user.is_verified;
      await user.save();

      return responseFormatter(true, `User was successfully verified`, {
        user,
      });
    } catch (e) {
      throw e;
    }
  }
}

export default new UserController();
