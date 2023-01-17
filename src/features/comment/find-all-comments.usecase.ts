import CommentSchema from '@shared/schemas/Comment.schema';

import { CommentModel, NormalizedComment } from '@shared/models/Comment.model';

import asyncMap from '@utils/async-map.util';
import { FilterProps, buildFilterObject } from '@utils/filter/filter.util';
import findOneCommentUsecase from './find-one-comment.usecase';

async function findAllCommentsUsecase({ filter }: FilterProps) {
  let allComments = [];

  if (filter != null) {
    const filterObject = buildFilterObject({ filter });

    allComments = await CommentSchema.find(filterObject as CommentModel);
  } else {
    allComments = await CommentSchema.find();
  }

  const normalizedComments = await asyncMap(allComments, async comment => {
    if (!comment.parentId) {
      return comment.toJSON();
    }

    const parentComment = await findOneCommentUsecase('_id', comment.parentId);
    return { ...comment.toJSON(), parent: parentComment };
  });

  return normalizedComments as NormalizedComment[];
}

export default findAllCommentsUsecase;
