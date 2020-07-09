import { Schema, model, Document } from "mongoose";
import { EventProps } from "./Event.model";
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
);

export interface CommentProps extends Document {
  comment: string;
  user: UserProps;
}

const Comment = model<CommentProps>("Comment", CommentSchema);
export default Comment;
