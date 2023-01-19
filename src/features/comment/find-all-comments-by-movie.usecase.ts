import { NormalizedComment } from '@shared/models/Comment.model';
import findAllCommentsUsecase from './find-all-comments.usecase';

async function findAllCommentsByMovieUsecase(
  movieId: string,
): Promise<NormalizedComment[]> {
  const commentsByMovie = await findAllCommentsUsecase({
    filter: [
      { key: 'movieId', value: movieId },
      // { key: 'parentId', value: undefined },
    ],
  });

  return commentsByMovie;
}

export default findAllCommentsByMovieUsecase;
