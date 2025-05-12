import { Schema } from "mongoose";

export const CommentsSchema = new Schema(
  {
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    eventId: { type: Schema.ObjectId, required: true, ref: 'TowerEvent' },
    body: { type: String, required: true, ref: 'Comment' }
  },
  {
    timestamps: true,
    ToJSON: { virtuals: true, versionKey: false },
  }
)

CommentsSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true,
})