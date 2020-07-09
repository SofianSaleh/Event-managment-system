import { Schema, model, Document } from "mongoose";
import { CommentProps } from "./Comment.model";

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
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    location: { type: [Number], index: { type: "2dsphere", sparse: true } },
    date: {
      type: Date,
    },
  },
  { timestamps: { createdAt: true } }
).index({ title: "text", description: "text" });

export interface EventProps extends Document {
  _id: string;
  title: string;
  description: string;
  comments: [CommentProps];
  location: [string];
  date: Date;
}

const Event = model<EventProps>("Event", EventSchema);

export default Event;

// const pointSchema:Schema = new Schema({
//   type: {
//     type: String,
//     enum: ['Point'],
//     required: true
//   },
//   coordinates: {
//     type: [Number],
//     required: true
//   }
// });

// comments: [
//   {
//     body: { type: String, required: true },
//     date: {
