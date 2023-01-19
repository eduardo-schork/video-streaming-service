/* eslint-disable eqeqeq */
import asyncMap from '@utils/async-map.util';
import { NormalizedMovie } from '@shared/models/Movie.model';
import findAllMoviesUsecase from '../usecases/find-all-movies.usecase';
import { MoviesByCategory } from '../types';

// TODO review and refactor this code
async function findAllMoviesGroupedUsecase(): Promise<MoviesByCategory[]> {
  const allMovies = await findAllMoviesUsecase();

  let moviesGroupedByCategory: MoviesByCategory[] = [];

  await asyncMap(allMovies, async (movie: NormalizedMovie) => {
    if (movie.categories == null) return;
    const movieMainCategory = movie.categories[0];

    const hasMovieGroupedWithSameCategory = moviesGroupedByCategory.some(
      movieGrouped => movieGrouped._id == movieMainCategory._id,
    );

    if (hasMovieGroupedWithSameCategory) {
      moviesGroupedByCategory = moviesGroupedByCategory.map(movieGrouped => {
        if (movieGrouped._id == movieMainCategory._id) {
          if (movieGrouped.movies.length < 10) {
            return {
              ...movieGrouped,
              movies: [...movieGrouped.movies, movie],
            };
          }
        }
        return movieGrouped;
      });
    } else {
      const newGroupedCategory = {
        ...movieMainCategory,
        movies: [movie],
      };

      moviesGroupedByCategory.push(newGroupedCategory);
    }
  });

  return moviesGroupedByCategory;
}

export default findAllMoviesGroupedUsecase;
