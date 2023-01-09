import MovieSchema from "@core/schemas/Movie.schema";
import findOneCategoryUsecase from "@features/category/usecases/find-one-category.usecase";
import { MoviesByCategory } from "./types";

async function findOneMoviesByCategory(id: string) {
  const categoryObject = await findOneCategoryUsecase(id);

  const filteredMovies = await MovieSchema.find({ "categories._id": id });

  const returnData = {
    ...categoryObject?.toJSON(),
    movies: filteredMovies,
  } as MoviesByCategory;

  return returnData;
}

export default findOneMoviesByCategory;
