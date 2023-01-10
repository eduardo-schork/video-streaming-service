import { asyncMap } from "src/utils/async-map.util";
import { NormalizedMovie } from "@shared/models/Movie.model";
import findAllMoviesUsecase from "../usecases/find-all-movies.usecase";
import { MoviesByCategory } from "../types";

// TODO review this code
async function findAllMoviesGroupedUsecase() {
  const allMovies = await findAllMoviesUsecase({
    filter: null,
  });

  let moviesGroupedByCategory: MoviesByCategory[] = [];

  await asyncMap(allMovies, async (movie: NormalizedMovie) => {
    if (!movie.categories) return;
    const movieMainCategory = movie.categories[0];

    const hasMovieGroupedWithSameCategory = moviesGroupedByCategory.some(
      (movieGrouped) => movieGrouped._id == movieMainCategory._id
    );
    0;
    if (hasMovieGroupedWithSameCategory) {
      moviesGroupedByCategory = moviesGroupedByCategory.map((movieGrouped) => {
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
