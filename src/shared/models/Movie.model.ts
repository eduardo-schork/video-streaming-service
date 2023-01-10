import { BaseModel } from "./Base.model";
import { CategoryModel } from "./Category.model";

export interface MovieModel extends BaseModel {
  url: string;
  title: string;
  description?: string;
  snapshots?: string[];
  categories?: string[];
}

export interface NormalizedMovie extends BaseModel {
  url: string;
  title: string;
  description?: string;
  snapshots?: string[];
  categories?: CategoryModel[];
}
