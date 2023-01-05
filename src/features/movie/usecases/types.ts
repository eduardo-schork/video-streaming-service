import MovieModel from "@core/models/Movie.model";

export type CreateMovieInput = Omit<
  MovieModel,
  "updatedAt" | "updatedBy" | "deletedAt" | "deletedBy" | "_id"
>;
