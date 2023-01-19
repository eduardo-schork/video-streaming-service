import MovieSchema from '@shared/schemas/Movie.schema';
import findOneCategoryUsecase from '@features/category/usecases/find-one-category.usecase';
import asyncMap from '@utils/async-map.util';
import { NormalizedMovie } from '@shared/models/Movie.model';
import EntityNotFoundError from '@shared/errors/entity-not-found.error';

async function findOneMovieUsecase(
  key: string,
  value: string,
): Promise<NormalizedMovie> {
  const movie = await MovieSchema.findOne({ [`${key}`]: value });

  if (movie == null) throw new EntityNotFoundError();

  if (movie.categories == null) {
    return movie.toJSON() as NormalizedMovie;
  }

  const categoriesObjects = await asyncMap(movie?.categories, async item => {
    const categoryObject = await findOneCategoryUsecase('_id', item);
    return categoryObject?.toJSON();
  });

  return {
    ...movie.toJSON(),
    categories: categoriesObjects,
  } as NormalizedMovie;
}

export default findOneMovieUsecase;
