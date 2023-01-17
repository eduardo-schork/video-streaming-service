import { NormalizedComment } from '@shared/models/Comment.model';
import CommentSchema from '@shared/schemas/Comment.schema';

async function findOneCommentUsecase(key: string, value: string) {
  const comment = await CommentSchema.findOne({ [`${key}`]: value });

  if (comment?.parentId) {
    const parentComment = (await findOneCommentUsecase(
      '_id',
      comment.parentId,
    )) as NormalizedComment;

    return {
      ...comment.toJSON(),
      parent: parentComment,
    } as NormalizedComment;
  }

  return comment?.toJSON() as NormalizedComment;
}

export default findOneCommentUsecase;
