import CategorySchema from "@shared/schemas/Category.schema";

async function findAllCategoriesUsecase() {
  const allCategories = await CategorySchema.find();

  return allCategories;
}

export default findAllCategoriesUsecase;
