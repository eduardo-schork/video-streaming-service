import MovieModel from "@core/models/Movie.model";

export interface FileToolingPortInterface {
  takeMovieSnapshots(movie: MovieModel): Promise<string[]>;
}
