import { Router } from "express";

import {
  handleCreateMovie,
  handleFindAllMovies,
  handleFindOneMovie,
  handleMovieStreaming,
} from "../controllers/movie.controller";

import FileSystemPort from "@infra/filesystem/filesystem.port";

const movieRoutes = Router();

movieRoutes.post("/movie", FileSystemPort.uploadOne, handleCreateMovie);

movieRoutes.get("/stream/:uid", handleMovieStreaming);

movieRoutes.get("/movie", handleFindAllMovies);

movieRoutes.get("/movie/:uid", handleFindOneMovie);

export default movieRoutes;
