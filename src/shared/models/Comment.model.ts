import { BaseModel } from "./Base.model";

export interface CommentModel extends BaseModel {
  text: string;
  movieId: string;
  parentId?: string;
}

export interface NormalizedComment extends BaseModel {
  text: string;
  movieId: string;
  parentId?: string;
  parent?: NormalizedComment;
}
