import MovieSchema from "@core/schemas/Movie.schema";

import { IMovie } from "@core/models/Movie.model";

async function updateMovieUsecase(movieId: string, newMovieInfo: IMovie) {
  await MovieSchema.findByIdAndUpdate(movieId, newMovieInfo);

  const updatedMovie = await MovieSchema.findById(movieId);

  return updatedMovie;
}

export default updateMovieUsecase;
