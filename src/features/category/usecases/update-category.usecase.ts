import { CategoryModel } from '@shared/models/Category.model';
import CategorySchema from '@shared/schemas/Category.schema';

async function updateCategoryUsecase(
  categoryId: string,
  newCategoryInfo: CategoryModel,
) {
  await CategorySchema.findByIdAndUpdate(categoryId, newCategoryInfo);

  const updatedCategory = await CategorySchema.findById(categoryId);

  return updatedCategory;
}

export default updateCategoryUsecase;
