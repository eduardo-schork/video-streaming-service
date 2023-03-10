import { BaseModel } from './Base.model';

export interface CategoryModel extends BaseModel {
  title: string;
}

export type NormalizedCategory = CategoryModel;
