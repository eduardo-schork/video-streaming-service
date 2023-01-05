import MovieSchema from "@core/schemas/Movie.schema";

import MovieModel from "@core/models/Movie.model";

async function updateMovieUsecase(movieId: string, newMovieInfo: MovieModel) {
  await MovieSchema.findByIdAndUpdate(movieId, newMovieInfo);

  const updatedMovie = await MovieSchema.findById(movieId);

  return updatedMovie;
}

export default updateMovieUsecase;
