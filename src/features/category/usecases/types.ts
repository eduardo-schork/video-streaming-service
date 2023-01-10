import { CategoryModel } from "@shared/models/Category.model";

export type CreateCategoryInput = Omit<
  CategoryModel,
  "updatedAt" | "updatedBy" | "deletedAt" | "deletedBy" | "_id"
>;
