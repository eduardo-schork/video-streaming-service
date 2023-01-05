import CategoryModel from "@core/models/Category.model";

export type CreateCategoryInput = Omit<
  CategoryModel,
  "updatedAt" | "updatedBy" | "deletedAt" | "deletedBy" | "_id"
>;
