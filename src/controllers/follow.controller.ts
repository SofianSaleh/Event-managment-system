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
      if(!follower || !following) return {success: false, errors: [{path: "Follow User", msg: "user doesn't exist"}]}

      const newFollow = new Follow({ follower, following });
      await newFollow.save();

      return { success: true, user: newFollow};
    } catch (e) {
      throw e;
    }
  }
  public async unfollowUser(unFollower_id: string, unFollowing_id: string) {
    try {
       const unFollower = userController.getUser({ _id: unFollower_id });
      const unFollowing = userController.getUser({ _id: unFollowing_id });
      if(!unFollower || !unFollowing) return {success: false, errors: [{path: "Follow User", msg: "user doesn't exist"}]}

      const unfollow = await Follow.findOneAndDelete({follwer: unFollower_id})

      return { success: true, user: unfollow };
    } catch (e) {
      throw e;
    }
  }
}

export default new FollowController();
