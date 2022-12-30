import { IBaseModel } from "./Base.model";

export interface IMovie extends IBaseModel {
  url: string;
  title: string;
  description?: string;
}
