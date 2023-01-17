import { Router } from 'express';

import FileSystemPort from '@infra/filesystem/filesystem.port';
import ApiRoutes from '@constants/api-routes';
import {
  handleCreateMovie,
  handleFindAllMovies,
  handleFindAllMoviesByCategory,
  handleFindOneMovie,
  handleFindOneMoviesByCategory,
  handleMovieStreaming,
} from '../controllers/movie.controller';

const movieRoutes = Router();

movieRoutes.post(ApiRoutes.MOVIE, FileSystemPort.uploadOne, handleCreateMovie);

movieRoutes.get(`${ApiRoutes.STREAM}/:id`, handleMovieStreaming);

movieRoutes.get(ApiRoutes.MOVIE, handleFindAllMovies);

movieRoutes.get(`${ApiRoutes.MOVIE}/category`, handleFindAllMoviesByCategory);

movieRoutes.get(
  `${ApiRoutes.MOVIE}/category/:id`,
  handleFindOneMoviesByCategory,
);

movieRoutes.get(`${ApiRoutes.MOVIE}/:id`, handleFindOneMovie);

// TODO updated route
// movieRoutes.get("/movie/:id");

export default movieRoutes;
