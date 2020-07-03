import User from "../db/models/User.model";
import { UserInput } from "../interfaces/User.interface";
import {
  hashPassword,
  generateValidationCode,
} from "../services/crypt.service";

class UserController {
  public async getUser(userinfo: any) {
    try {
      const user = await User.findOne(userinfo);
      return user;
    } catch (e) {
      throw e;
    }
  }

  public async register(userInfo: UserInput) {
    try {
      const hashedPassword = await hashPassword(userInfo.password);
      const code = generateValidationCode();
      userInfo.code = code;
      userInfo.password = hashedPassword;

      const newUser = new User(userInfo);
      await newUser.save();
      console.log(newUser);
      return newUser;
    } catch (e) {
      throw e;
    }
  }
}

export default new UserController();
