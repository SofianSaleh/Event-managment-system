import User from "../db/models/User.model";

class UserController {
  public async getUser(id: string) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (e) {
      throw e;
    }
  }
}

export default new UserController();
