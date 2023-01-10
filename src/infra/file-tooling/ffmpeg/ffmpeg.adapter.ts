// TODO try to use "fluent-ffmpeg" lib
import ffmpeg from "ffmpeg";

import { MovieModel } from "@shared/models/Movie.model";
import { FileToolingPortInterface } from "../types";

import { generateUuid } from "src/utils/uuid";
import uploadsPath from "src/utils/paths/uploads.path";
import snapshotsPath from "src/utils/paths/snapshots.path";

class FfmpegAdapter implements FileToolingPortInterface {
  async takeMovieSnapshots(movie: MovieModel) {
    debugger;
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
