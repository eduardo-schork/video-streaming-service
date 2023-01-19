import findOneCategoryUsecase from '@features/category/usecases/find-one-category.usecase';
import { MoviesByCategory } from '../types';
import findAllMoviesUsecase from '../usecases/find-all-movies.usecase';

// TODO optimize this usecase with new queries
async function findOneMoviesByCategory(id: string) {
  const categoryObject = await findOneCategoryUsecase('_id', id);

  const filteredMovies = await findAllMoviesUsecase({
    key: 'categories',
    value: id,
  });

  const returnData = {
    ...categoryObject?.toJSON(),
    movies: filteredMovies,
  } as MoviesByCategory;

  return returnData;
}

export default findOneMoviesByCategory;
