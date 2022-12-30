import { IMovie } from "@core/models/Movie.model";

export type CreateMovieInput = Omit<
  IMovie,
  "updatedAt" | "updatedBy" | "deletedAt" | "deletedBy" | "_id"
>;
