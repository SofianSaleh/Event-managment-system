import Comment from "../db/models/Comment.model";
import userController from "./user.Controller";
import eventController from "./event.controller";

class CommentController {
  public async addComment(eventId: string, comment: string, userId: string) {
    try {
      const user = (await userController.getUser({ _id: userId })) as any;
      const { success, errors, event } = await eventController.getEvent(
        eventId
      );

      if (!success) return { success, errors };

      const newComment = new Comment({ comment, user });
      await newComment.save();

      event?.comments.push(newComment);
      await event?.save();

      return { success: true, event };
    } catch (e) {
      throw e;
    }
  }
  public async removeComment(
    comment_id: string,
    event_id: string,
    user_id: string
  ) {
    try {
      const { success, errors, event } = await eventController.getEvent(
        event_id
      );
      if (!success) return { success, errors };

      const user = await userController.getUser({ _id: user_id });
      if (!user)
        return {
          success: false,
          errors: [
            {
              path: "remove comment",
              msg: `user eith the id: ${user_id} doesn't exist`,
            },
          ],
        };

      // event?.comments.filter(comment => comment.id !== comment_id);
      // const deletedComment = await Comment.findByIdAndDelete(comment_id);

      console.log(comment_id, event?.comments);
      return { success: true, event };
    } catch (e) {
      throw e;
    }
  }
}

export default new CommentController();
