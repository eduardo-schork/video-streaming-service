import CategoryModel from "@core/models/Category.model";
import MovieModel from "@core/models/Movie.model";

export type CreateMovieInput = Omit<
  MovieModel,
  "updatedAt" | "updatedBy" | "deletedAt" | "deletedBy" | "_id"
>;

export type MoviesByCategory = CategoryModel & {
  movies: MovieModel[];
};
