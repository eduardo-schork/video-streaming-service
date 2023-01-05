import CategorySchema from "@core/schemas/Category.schema";

async function findAllCategoriesUsecase() {
  const allCategories = await CategorySchema.find();

  return allCategories;
}

export default findAllCategoriesUsecase;
