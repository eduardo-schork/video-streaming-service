import { Schema, model } from "mongoose";

import { generateUuid } from "src/utils/uuid";
import { CommentModel } from "@shared/models/Comment.model";

const commentSchema = new Schema<CommentModel>({
  _id: { type: String, default: () => generateUuid() },
  text: { type: String, required: true },
  parentId: String,
  movieId: { type: String, required: true },
  createdAt: { type: Number, required: true },
  createdBy: { type: String, required: true },
  updatedAt: Number,
  updatedBy: String,
  deletedAt: Number,
  deletedBy: String,
});

const CommentSchema = model<CommentModel>("comment", commentSchema);

export default CommentSchema;
