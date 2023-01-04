import { IMovie } from "@core/models/Movie.model";

export interface IFileToolingPort {
  takeMovieSnapshots(movie: IMovie): string[];
}
