import { IMovie } from "@core/models/Movie.model";

export interface FileToolingPortInterface {
  takeMovieSnapshots(movie: IMovie): Promise<string[]>;
}
