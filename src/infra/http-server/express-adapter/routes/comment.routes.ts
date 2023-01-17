import { Router } from 'express';

import ApiRoutes from '@constants/api-routes';
import {
  handleCreateComment,
  handleFindAllComments,
  handleFindAllCommentsByMovie,
  handleFindOneComment,
} from '../controllers/comment.controller';

const commentRoutes = Router();

commentRoutes.post(ApiRoutes.COMMENT, handleCreateComment);

commentRoutes.get(`${ApiRoutes.COMMENT}/:id`, handleFindOneComment);

commentRoutes.get(
  `${ApiRoutes.COMMENT}/movie/:id`,
  handleFindAllCommentsByMovie,
);

commentRoutes.get(ApiRoutes.COMMENT, handleFindAllComments);

export default commentRoutes;
