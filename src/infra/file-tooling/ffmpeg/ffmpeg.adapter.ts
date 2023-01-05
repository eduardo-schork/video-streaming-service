// TODO try to use "fluent-ffmpeg" lib
import ffmpeg from "ffmpeg";

import MovieModel from "@core/models/Movie.model";

import { generateUuid } from "@utils/uuid";
import uploadsPath from "@utils/paths/uploads.path";
import snapshotsPath from "@utils/paths/snapshots.path";
import { FileToolingPortInterface } from "../types";

class FfmpegAdapter implements FileToolingPortInterface {
  async takeMovieSnapshots(movie: MovieModel) {
    const moviePath = uploadsPath + "/" + movie.url;
    const snapshotsStoragePath = snapshotsPath + "/" + movie._id;

    const loadedVideo = await new ffmpeg(moviePath);

    const extractFrameConfig = {
      number: 4,
      every_n_frames: 60,
      keep_pixel_aspect_ratio: true,
      keep_aspect_ratio: true,
      file_name: generateUuid(),
    };

    const generatedSnapshotsPaths = await loadedVideo.fnExtractFrameToJPG(
      snapshotsStoragePath,
      extractFrameConfig
    );

    const normalizedPaths = generatedSnapshotsPaths.map((path) =>
      path.substring(path.lastIndexOf("/") + 1)
    );

    return normalizedPaths;
  }
}

export default new FfmpegAdapter();
