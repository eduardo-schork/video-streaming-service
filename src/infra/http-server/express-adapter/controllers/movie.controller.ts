import { Request, Response } from "express";

import { CreateMovieInput } from "@features/movie/usecases/types";

import loadMovieUsecase from "@features/movie/usecases/load-movie.usecase";
import createMovieUsecase from "@features/movie/usecases/create-movie.usecase";
import findOneMovieUsecase from "@features/movie/usecases/find-one-movie.usecase";
import findAllMoviesUsecase from "@features/movie/usecases/find-all-movies.usecase";
import MissingMovieIdError from "@features/movie/errors/missing-movie-id.error";
import MissingMovieFileError from "@features/movie/errors/missing-movie-file.error";
import MissingRangeHeaderError from "@features/movie/errors/missing-range-header.error";

async function handleFindOneMovie(req: Request, res: Response) {
  const idToSearch = req.params.uid;

  if (!idToSearch) {
    throw new MissingMovieIdError();
  }

  const moviesList = await findOneMovieUsecase(idToSearch);

  res.status(200).send(moviesList);
}

async function handleFindAllMovies(req: Request, res: Response) {
  const moviesList = await findAllMoviesUsecase();

  res.status(200).send(moviesList);
}

async function handleCreateMovie(req: Request, res: Response) {
  const reqFilename = req.file?.filename;
  const reqBody = req.body as CreateMovieInput;

  if (!reqFilename) {
    throw new MissingMovieFileError();
  }

  const body: CreateMovieInput = {
    ...reqBody,
    url: reqFilename,
  };

  const movie = await createMovieUsecase(body);

  res.status(201).send(movie);
}

async function handleMovieStreaming(req: Request, res: Response) {
  const reqRange = req.headers.range;
  const reqMovieId = req.params.uid;

  if (!reqMovieId) {
    throw new MissingMovieIdError();
  }

  if (!reqRange) {
    throw new MissingRangeHeaderError();
  }

  const { contentLength, videoStream, startBytes, endBytes, videoSize } =
    await loadMovieUsecase({ range: reqRange, movieId: reqMovieId });

  const headers = {
    "Content-Range": `bytes ${startBytes}-${endBytes}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);
  videoStream.pipe(res);
}

export {
  handleCreateMovie,
  handleMovieStreaming,
  handleFindAllMovies,
  handleFindOneMovie,
};
