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

  public async register({ userInfo }: any) {
    try {
      console.log("user ifo ", userInfo.password);
      const hashedPassword = await hashPassword(userInfo.password);
      console.log(hashedPassword);
      const code = generateValidationCode();
      console.log(code);
      userInfo.code = code;
      userInfo.password = hashedPassword;

      console.log(userInfo);

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
