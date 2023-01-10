import { CommentModel } from "@shared/models/Comment.model";

export type CreateCommentInput = Omit<
  CommentModel,
  "updatedAt" | "updatedBy" | "deletedAt" | "deletedBy" | "_id"
>;
