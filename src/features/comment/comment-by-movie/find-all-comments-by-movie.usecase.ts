import { NormalizedComment } from '@shared/models/Comment.model';
import findAllCommentsUsecase from '../find-all-comments.usecase';

async function findAllCommentsByMovieUsecase(
  movieId: string,
): Promise<NormalizedComment[]> {
  const commentsByMovie = await findAllCommentsUsecase({
    filter: [{ key: 'movieId', value: movieId }],
  });

  const groupedSubComments: NormalizedComment[] = [];

  const movieMainComments = commentsByMovie.filter(
    comment => comment.parentId == null,
  );

  const movieSubComments = commentsByMovie.filter(
    comment => comment.parentId != null,
  );

  movieSubComments.map(comment => {
    const hasSomeGroupedCommentWithSameParentId = groupedSubComments.some(
      groupedComment => groupedComment._id === comment._id,
    );

    if (!hasSomeGroupedCommentWithSameParentId) {
      groupedSubComments.push({
        ...comment,
        subComments: movieSubComments.filter(
          filterComment => filterComment.parentId === comment._id,
        ),
      });
    }
  });

  const groupedMovieComments = movieMainComments.map(comment => {
    return {
      ...comment,
      subComments: groupedSubComments.filter(
        groupedComment => groupedComment.parentId === comment._id,
      ),
    };
  });

  return groupedMovieComments;
}

export default findAllCommentsByMovieUsecase;
