import MovieSchema from "@shared/schemas/Movie.schema";
import findOneCategoryUsecase from "@features/category/usecases/find-one-category.usecase";
import { asyncMap } from "src/utils/async-map.util";

async function findOneMovieUsecase(key: string, value: string) {
  const movie = await MovieSchema.findOne({ [`${key}`]: value });

  if (!movie) return;

  if (!movie.categories) {
    return movie.toJSON();
  }

  const categoriesObjects = await asyncMap(movie?.categories, async (item) => {
    const categoryObject = await findOneCategoryUsecase("_id", item);
    return categoryObject?.toJSON();
  });

  return { ...movie.toJSON(), categories: categoriesObjects };
}

export default findOneMovieUsecase;
