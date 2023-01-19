import { Request, Response } from 'express';

import { CreateMovieInput } from '@features/movie/types';

import loadMovieUsecase from '@features/movie/usecases/load-movie.usecase';
import createMovieUsecase from '@features/movie/usecases/create-movie.usecase';
import findOneMovieUsecase from '@features/movie/usecases/find-one-movie.usecase';
import findAllMoviesUsecase from '@features/movie/usecases/find-all-movies.usecase';

import MissingRangeHeaderError from '@shared/errors/missing-range-header.error';
import MissingParameterError from '@shared/errors/missing-parameter.error';
import MissingFileOnBodyError from '@shared/errors/missing-file-on-body.error';
import findAllMoviesGroupedUsecase from '@features/movie/movies-by-category/find-all-movies-by-category.usecase';
import findOneMoviesByCategory from '@features/movie/movies-by-category/find-one-movies-by-category.usecase';

async function handleFindOneMoviesByCategory(req: Request, res: Response) {
  const idToSearch = req.params.id;

  if (!idToSearch) {
    throw new MissingParameterError(['id']);
  }

  const moviesListGrouped = await findOneMoviesByCategory(idToSearch);

  res.status(200).send(moviesListGrouped);
}

async function handleFindAllMoviesByCategory(req: Request, res: Response) {
  const moviesListGrouped = await findAllMoviesGroupedUsecase();

  res.status(200).send(moviesListGrouped);
}

async function handleFindOneMovie(req: Request, res: Response) {
  const idToSearch = req.params.id;

  if (!idToSearch) {
    throw new MissingParameterError(['id']);
  }

  // TODO transfrom to enum based on model: "id"
  const moviesList = await findOneMovieUsecase('_id', idToSearch);

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
    throw new MissingFileOnBodyError();
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
  const reqMovieId = req.params.id;

  if (!reqMovieId) {
    throw new MissingParameterError(['id']);
  }

  if (!reqRange) {
    throw new MissingRangeHeaderError();
  }

  const { contentLength, videoStream, startBytes, endBytes, videoSize } =
    await loadMovieUsecase({ range: reqRange, movieId: reqMovieId });

  const headers = {
    'Content-Range': `bytes ${startBytes}-${endBytes}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4',
  };

  res.writeHead(206, headers);
  videoStream.pipe(res);
}

export {
  handleCreateMovie,
  handleMovieStreaming,
  handleFindAllMovies,
  handleFindOneMovie,
  handleFindAllMoviesByCategory,
  handleFindOneMoviesByCategory,
};
