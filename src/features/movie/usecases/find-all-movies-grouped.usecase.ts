import { MoviesGroupedByCategory } from "./types";

import MovieSchema from "@core/schemas/Movie.schema";

async function findAllMoviesGroupedUsecase() {
  const allMovies = await MovieSchema.find();

  let moviesGroupedByCategory: MoviesGroupedByCategory[] = [];

  allMovies.map((movie) => {
    if (!movie.categories) return;
    const movieMainCategory = movie.categories[0];

    const hasMovieGroupedWithSameCategory = moviesGroupedByCategory.some(
      (movieGrouped) => movieGrouped._id == movieMainCategory._id
    );

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
