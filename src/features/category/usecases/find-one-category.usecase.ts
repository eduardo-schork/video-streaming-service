import CategorySchema from "@core/schemas/Category.schema";

async function findOneCategoryUsecase(id: String) {
  const category = await CategorySchema.findOne({ _id: id });

  return category;
}

export default findOneCategoryUsecase;
