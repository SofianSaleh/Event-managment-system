import { Schema, model, Document } from "mongoose";

const RatingSchema: Schema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
  },
  { timestamps: { createdAt: true } }
);

interface RatingProps extends Document {
  user_id: string;
  event_id: string;
  rating: Number;
}

const Rating = model<RatingProps>("Rating", RatingSchema);
export default Rating;
