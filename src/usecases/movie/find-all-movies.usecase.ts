import MovieSchema from "@core/schemas/Movie.schema";

async function findAllMoviesUsecase() {
  const allMovies = await MovieSchema.find();

  return allMovies;
}

export default findAllMoviesUsecase;
