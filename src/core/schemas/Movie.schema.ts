import { Schema, model } from "mongoose";
import MovieModel from "../models/Movie.model";

import { generateUuid } from "@utils/uuid";

const movieSchema = new Schema<MovieModel>({
  _id: { type: String, default: () => generateUuid() },
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  categories: [Object],
  snapshots: [String],
  createdAt: { type: Number, required: true },
  createdBy: { type: String, required: true },
  updatedAt: Number,
  updatedBy: String,
  deletedAt: Number,
  deletedBy: String,
});

const MovieSchema = model<MovieModel>("Movie", movieSchema);

export default MovieSchema;
