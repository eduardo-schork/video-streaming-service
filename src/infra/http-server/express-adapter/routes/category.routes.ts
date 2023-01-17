import { Router } from 'express';

import ApiRoutes from '@constants/api-routes';
import {
  handleCreateCategory,
  handleFindAllCategories,
  handleFindOneCategory,
} from '../controllers/category.controller';

const categoryRoutes = Router();

categoryRoutes.post(ApiRoutes.CATEGORY, handleCreateCategory);

categoryRoutes.get(ApiRoutes.CATEGORY, handleFindAllCategories);

categoryRoutes.get(`${ApiRoutes.CATEGORY}/:id`, handleFindOneCategory);

// TODO updated route
// categoryRoutes.get("/category/:id");

export default categoryRoutes;
