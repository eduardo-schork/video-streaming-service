import { NormalizedMovie } from "@shared/models/Movie.model";
import MovieSchema from "@shared/schemas/Movie.schema";
import findOneCategoryUsecase from "@features/category/usecases/find-one-category.usecase";
import { asyncMap } from "src/utils/async-map.util";

type FindAllMoviesUsecaseProps = {
  filter?: {
    key: string;
    value: string;
  } | null;
};

async function findAllMoviesUsecase({ filter }: FindAllMoviesUsecaseProps) {
  let allMovies = [];

  if (filter) {
    allMovies = await MovieSchema.find({ [`${filter.key}`]: filter.value });
  } else {
    allMovies = await MovieSchema.find();
  }

  const normalizedMovies = await asyncMap(allMovies, async (movie) => {
    if (!movie.categories) {
      return movie.toJSON();
    }

    const categoriesObjects = await asyncMap(
      movie?.categories,
      async (item) => {
        const categoryObject = await findOneCategoryUsecase("_id", item);
        return categoryObject?.toJSON();
      }
    );

    return { ...movie.toJSON(), categories: categoriesObjects };
  });

  return normalizedMovies as NormalizedMovie[];
}

export default findAllMoviesUsecase;
