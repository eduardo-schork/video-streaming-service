import CategorySchema from "@shared/schemas/Category.schema";

async function findOneCategoryUsecase(key: string, value: string) {
  const category = await CategorySchema.findOne({ [`${key}`]: value });

  return category;
}

export default findOneCategoryUsecase;
