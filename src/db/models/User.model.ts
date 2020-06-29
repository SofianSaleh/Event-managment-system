import { Schema, Model, model, Document } from "mongoose";

const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },

    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    gender: {
      type: Schema.Types.String,
      required: true,
      enum: ["male", "female"],
    },

    code: {
      type: String,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: true } }
);

export interface UserProps extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  code: string;
}

export default model<UserProps>("User", UserSchema);
// comments: [
//   {
//     body: { type: String, required: true },
//     date: { type: Date, required: true },
//   },
// ],
