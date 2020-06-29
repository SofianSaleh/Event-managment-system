import { Schema, model, Document } from "mongoose";

const EventSchema: Schema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },

    comments: [
      {
        comment: {
          type: string,
          required,
        },
      },
    ],
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
//     date: {
