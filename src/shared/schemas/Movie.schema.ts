import { Schema, model } from "mongoose";
import { MovieModel } from "../models/Movie.model";

import { generateUuid } from "src/utils/uuid";

const movieSchema = new Schema<MovieModel>({
  _id: { type: String, default: () => generateUuid() },
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  categories: [String],
  snapshots: [String],
  createdAt: { type: Number, required: true },
  createdBy: { type: String, required: true },
  updatedAt: Number,
  updatedBy: String,
  deletedAt: Number,
  deletedBy: String,
});

const MovieSchema = model<MovieModel>("movie", movieSchema);

export default MovieSchema;
