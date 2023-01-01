import { CreateMovieInput } from "@usecases/movie/types";
import { Request, Response } from "express";

import createMovieUsecase from "@usecases/movie/create-movie.usecase";
import findAllMoviesUsecase from "@usecases/movie/find-all-movies.usecase";
import findOneMovieUsecase from "@usecases/movie/find-one-movie.usecase";
import loadMovieUsecase from "@usecases/movie/load-movie.usecase";

async function handleFindOneMovie(req: Request, res: Response) {
  const idToSearch = req.params.uid;

  if (!idToSearch) {
    return res.status(400);
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
    return res.status(404);
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
    res.status(400).send("Requires a target movie id");
  }

  if (!reqRange) {
    res.status(400).send("Requires Range header");
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
