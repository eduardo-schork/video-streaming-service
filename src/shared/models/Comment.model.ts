import { BaseModel } from './Base.model';

export interface CommentModel extends BaseModel {
  text: string;
  movieId: string;
  parentId?: string;
}

export type NormalizedComment = CommentModel & {
  parent?: NormalizedComment;
  subComments?: NormalizedComment[];
};
