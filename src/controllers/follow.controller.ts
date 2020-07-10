import Follow from "../db/models/Follow.model";
import userController from "./user.Controller";

class FollowController {
  public async getYourFollowers(user_id: string) {
    try {
      const followers = await Follow.find({ following: user_id });

      return { success: true, users: followers };
    } catch (e) {
      throw e;
    }
  }
  public async getYourFollowings(user_id: string) {
    try {
      const following = await Follow.find({ follower: user_id });
      return { success: true, users: following };
    } catch (e) {
      throw e;
    }
  }
  public async getFollowers(user_id: string) {
    try {
      const followers = await Follow.find({ following: user_id });
      return { success: true, users: followers };
    } catch (e) {
      throw e;
    }
  }
  public async getFollowings(user_id: string) {
    try {
      const following = await Follow.find({ follower: user_id });

      return { success: true, users: following };
    } catch (e) {
      throw e;
    }
  }
  public async followUser(follower_id: string, following_id: string) {
    try {
      const follower = userController.getUser({ _id: follower_id });
      const following = userController.getUser({ _id: following_id });

      const newFollow = new Follow({ follower, following });
      await newFollow.save();

      return { success: true };
    } catch (e) {
      throw e;
    }
  }
  public async unfollowUser() {
    try {
      return { success: true };
    } catch (e) {
      throw e;
    }
  }
}

export default new FollowController();
