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
          type: String,
          required: true,
        },
        user_id: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    location: { type: [Number], index: { type: "2dsphere", sparse: true } },
    date: {
      type: Date,
    },
  },
  { timestamps: { createdAt: true } }
);

export interface EventProps extends Document {
  title: string;
  description: string;
  comments: [
    {
      comment: string;
      user_id: string;
    }
  ];
  location: [string];
  date: Date;
}

export default model<EventProps>("Event", EventSchema);

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
