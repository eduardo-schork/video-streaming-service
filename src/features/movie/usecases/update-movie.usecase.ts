import MovieSchema from "@shared/schemas/Movie.schema";

import { MovieModel } from "@shared/models/Movie.model";

async function updateMovieUsecase(movieId: string, newMovieInfo: MovieModel) {
  await MovieSchema.findByIdAndUpdate(movieId, newMovieInfo);

  const updatedMovie = await MovieSchema.findById(movieId);

  return updatedMovie;
}

export default updateMovieUsecase;
