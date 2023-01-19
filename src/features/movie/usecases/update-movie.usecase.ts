import MovieSchema from '@shared/schemas/Movie.schema';

import { MovieModel, NormalizedMovie } from '@shared/models/Movie.model';

async function updateMovieUsecase(
  movieId: string,
  newMovieInfo: MovieModel,
): Promise<NormalizedMovie> {
  await MovieSchema.findByIdAndUpdate(movieId, newMovieInfo);

  const updatedMovie = await MovieSchema.findById(movieId);

  return updatedMovie?.toJSON() as NormalizedMovie;
}

export default updateMovieUsecase;
