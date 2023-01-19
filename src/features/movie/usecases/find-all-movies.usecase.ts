import { NormalizedMovie } from '@shared/models/Movie.model';
import MovieSchema from '@shared/schemas/Movie.schema';
import findOneCategoryUsecase from '@features/category/usecases/find-one-category.usecase';
import asyncMap from '@utils/async-map.util';
import { FilterItem } from '@utils/filter/filter.util';

async function findAllMoviesUsecase(
  filter?: FilterItem,
): Promise<NormalizedMovie[]> {
  let allMovies = [];

  if (filter != null) {
    allMovies = await MovieSchema.find({ [`${filter.key}`]: filter.value });
  } else {
    allMovies = await MovieSchema.find();
  }

  const normalizedMovies = await asyncMap(allMovies, async movie => {
    if (movie.categories == null) {
      return movie.toJSON();
    }

    const categoriesObjects = await asyncMap(movie?.categories, async item => {
      const categoryObject = await findOneCategoryUsecase('_id', item);
      return categoryObject?.toJSON();
    });

    return { ...movie.toJSON(), categories: categoriesObjects };
  });

  return normalizedMovies as NormalizedMovie[];
}

export default findAllMoviesUsecase;
