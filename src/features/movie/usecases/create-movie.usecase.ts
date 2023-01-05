import MovieSchema from "@core/schemas/Movie.schema";

import { CreateMovieInput } from "./types";
import updateMovieUsecase from "./update-movie.usecase";

import FileToolingPort from "@infra/file-tooling/file-tooling.port";
import MovieModel from "@core/models/Movie.model";

async function _takeMovieSnapshotsAndUpdate(newMovie: MovieModel) {
  const snapshotsPaths = await FileToolingPort.takeMovieSnapshots(newMovie);

  const movieWithSnapshots = await updateMovieUsecase(newMovie._id, {
    _id: newMovie._id,
    url: newMovie.url,
    title: newMovie.title,
    snapshots: snapshotsPaths,
    createdAt: newMovie.createdAt,
    createdBy: newMovie.createdBy,
  });

  return movieWithSnapshots;
}

async function createMovieUsecase(movieInfo: CreateMovieInput) {
  const newMovie = new MovieSchema({
    url: movieInfo.url,
    title: movieInfo.title,
    description: movieInfo.description,
    createdAt: new Date().getTime(),
    categories: movieInfo.categories,

    // TODO get current user to assign into createdBy
    createdBy: "root",
  });

  await newMovie.save();

  const movieWithSnapshots = await _takeMovieSnapshotsAndUpdate(newMovie);

  return movieWithSnapshots;
}

export default createMovieUsecase;
