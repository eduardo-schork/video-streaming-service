import CategorySchema from '@shared/schemas/Category.schema';
import { CreateCategoryInput } from './types';

async function createCategoryUsecase(categoryInfo: CreateCategoryInput) {
  const newCategory = new CategorySchema({
    title: categoryInfo.title,

    createdAt: new Date().getTime(),
    // TODO get current user to assign into createdBy
    createdBy: 'root',
  });

  await newCategory.save();

  return newCategory;
}

export default createCategoryUsecase;
