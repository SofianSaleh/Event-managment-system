import { Schema, model, Document } from "mongoose";
import { UserProps } from "./User.model";

const CommentSchema: Schema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: { createdAt: true } }
).index({ comment: "text" });

export interface CommentProps extends Document {
  comment: string;
  user: UserProps;
}

const Comment = model<CommentProps>("Comment", CommentSchema);
export default Comment;
