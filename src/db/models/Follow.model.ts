import { Schema, model, Document } from "mongoose";

const FollowSchema: Schema = new Schema(
  {
    follower: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    following: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: { createdAt: true } }
);

export interface FollowProps extends Document {
  follwer: string;
  following: string;
}

export default model<FollowProps>("Follow", FollowSchema);
