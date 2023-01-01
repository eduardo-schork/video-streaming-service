import MovieSchema from "@core/schemas/Movie.schema";

import { CreateMovieInput } from "./types";

async function createMovieUsecase(movieInfo: CreateMovieInput) {
  const newMovie = new MovieSchema({
    url: movieInfo.url,
    title: movieInfo.title,
    description: movieInfo.description,
    createdAt: new Date().getTime(),

    // TODO get current user to assign into createBy
    createdBy: "root",
  });

  await newMovie.save();

  return newMovie;
}

export default createMovieUsecase;
