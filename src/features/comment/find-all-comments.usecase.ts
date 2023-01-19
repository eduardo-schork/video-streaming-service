import { CommentModel } from '@shared/models/Comment.model';
import CommentSchema from '@shared/schemas/Comment.schema';

import { FilterProps, buildFilterObject } from '@utils/filter/filter.util';

async function findAllCommentsUsecase({
  filter,
}: FilterProps): Promise<CommentModel[]> {
  let allComments = [];

  if (filter != null) {
    const filterObject = buildFilterObject({ filter });

    allComments = await CommentSchema.find(filterObject as CommentModel);
  } else {
    allComments = await CommentSchema.find();
  }

  return allComments?.map(comment => comment.toJSON());
}

export default findAllCommentsUsecase;
