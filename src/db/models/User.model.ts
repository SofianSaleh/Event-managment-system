import { Schema, model, Document } from "mongoose";

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
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },

    count: {
      type: Number,
      default: 0,
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

interface UserProps extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  code: string;
  count: number;
}

const User = model<UserProps>("User", UserSchema);
export default User;
// comments: [
//   {
//     body: { type: String, required: true },
//     date: { type: Date, required: true },
//   },
// ],
