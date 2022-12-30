import MovieSchema from "@core/schemas/Movie.schema";

async function findOneMovieUsecase(id: String) {
  const movie = await MovieSchema.findOne({ _id: id });

  return movie;
}

export default findOneMovieUsecase;
