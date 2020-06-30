import User from "../db/models/User.model";

class UserController {
  public async getUser(userinfo: any) {
    try {
      const user = await User.findOne(userinfo);
      return user;
    } catch (e) {
      throw e;
    }
  }
}

export default new UserController();
