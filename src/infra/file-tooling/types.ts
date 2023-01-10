import MovieModel from "@shared/models/Movie.model";

export interface FileToolingPortInterface {
  takeMovieSnapshots(movie: MovieModel): Promise<string[]>;
}
