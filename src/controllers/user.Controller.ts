import User from "../db/models/User.model";

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
}

export default new UserController();
