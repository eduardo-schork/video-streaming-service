import { BaseModel } from "./Base.model";
import CategoryModel from "./Category.model";

interface MovieModel extends BaseModel {
  url: string;
  title: string;
  description?: string;
  categories?: CategoryModel[];
  snapshots?: string[];
}

export default MovieModel;
