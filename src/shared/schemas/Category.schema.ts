import { Schema, model } from 'mongoose';

import generateUuid from '@utils/uuid';
import { CategoryModel } from '@shared/models/Category.model';

const categorySchema = new Schema<CategoryModel>({
  _id: { type: String, default: () => generateUuid() },
  title: { type: String, required: true },
  createdAt: { type: Number, required: true },
  createdBy: { type: String, required: true },
  updatedAt: Number,
  updatedBy: String,
  deletedAt: Number,
  deletedBy: String,
});

const CategorySchema = model<CategoryModel>('category', categorySchema);

export default CategorySchema;
