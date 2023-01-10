import fs from "fs";

import uploadsPath from "src/utils/paths/uploads.path";

import findOneMovieUsecase from "./find-one-movie.usecase";
import LoadFileError from "@shared/errors/load-file.error";

async function loadMovieUsecase({
  range,
  movieId,
}: {
  range?: string;
  movieId: string;
}) {
  try {
    const movieObject = await findOneMovieUsecase("_id", movieId);
    const movieUrl = movieObject?.url;

    const CHUNK_SIZE = 10 ** 6; // 1MB

    const videoPath = uploadsPath + `/${movieUrl}`;
    const videoSize = fs.statSync(videoPath).size;

    const startBytes = Number(range?.replace(/\D/g, ""));
    const endBytes = Math.min(startBytes + CHUNK_SIZE, videoSize - 1);

    const contentLength = endBytes - startBytes + 1;

    const videoStream = fs.createReadStream(videoPath, {
      start: startBytes,
      end: endBytes,
    });

    return { contentLength, videoStream, startBytes, endBytes, videoSize };
  } catch (error) {
    throw new LoadFileError([error]);
  }
}

export default loadMovieUsecase;
