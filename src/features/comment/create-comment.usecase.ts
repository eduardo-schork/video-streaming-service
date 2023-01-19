import CommentSchema from '@shared/schemas/Comment.schema';
import { NormalizedComment } from '@shared/models/Comment.model';
import { CreateCommentInput } from './types';

async function createCommentUsecase(
  createCommentInput: CreateCommentInput,
): Promise<NormalizedComment> {
  const newComment = new CommentSchema({
    text: createCommentInput?.text,
    parentId: createCommentInput?.parentId,
    movieId: createCommentInput?.movieId,

    createdAt: new Date().getTime(),
    // TODO get current user to assign into createdBy
    createdBy: 'root',
  });

  await newComment.save();

  return newComment.toJSON() as NormalizedComment;
}

export default createCommentUsecase;
