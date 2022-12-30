import { Schema, model } from "mongoose";
import { IMovie } from "../models/Movie.model";

import { generateUuid } from "@utils/uuid";

const movieSchema = new Schema<IMovie>({
  _id: { type: String, default: () => generateUuid() },
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  createdAt: { type: Number, required: true },
  createdBy: { type: String, required: true },
  updatedAt: Number,
  updatedBy: String,
  deletedAt: Number,
  deletedBy: String,
});

const MovieSchema = model<IMovie>("Movie", movieSchema);

export default MovieSchema;
