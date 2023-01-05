import { Router } from "express";

import {
  handleCreateMovie,
  handleFindAllMovies,
  handleFindOneMovie,
  handleMovieStreaming,
} from "../controllers/movie.controller";

import FileSystemPort from "@infra/filesystem/filesystem.port";
import ApiRoutes from "@constants/api-routes";

const movieRoutes = Router();

movieRoutes.post(ApiRoutes.MOVIE, FileSystemPort.uploadOne, handleCreateMovie);

movieRoutes.get(`${ApiRoutes.STREAM}/:id`, handleMovieStreaming);

movieRoutes.get(ApiRoutes.MOVIE, handleFindAllMovies);

movieRoutes.get(`${ApiRoutes.MOVIE}/:id`, handleFindOneMovie);

// TODO updated route
// movieRoutes.get("/movie/:id");

export default movieRoutes;
