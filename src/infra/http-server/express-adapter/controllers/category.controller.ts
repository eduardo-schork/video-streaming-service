import { Request, Response } from "express";

import findOneCategoryUsecase from "@features/category/usecases/find-one-category.usecase";
import findAllCategoriesUsecase from "@features/category/usecases/find-all-categories.usecase";
import createCategoryUsecase from "@features/category/usecases/create-category.usecase";

import MissingParameterError from "@core/errors/missing-parameter.error";

async function handleFindOneCategory(req: Request, res: Response) {
  const idToSearch = req.params.id;

  if (!idToSearch) {
    throw new MissingParameterError(["id"]);
  }

  const category = await findOneCategoryUsecase(idToSearch);

  res.status(200).send(category);
}

async function handleFindAllCategories(req: Request, res: Response) {
  const categoriesList = await findAllCategoriesUsecase();

  res.status(200).send(categoriesList);
}

async function handleCreateCategory(req: Request, res: Response) {
  const reqBody = req.body;

  const newCategory = await createCategoryUsecase(reqBody);

  res.status(201).send(newCategory);
}

export { handleCreateCategory, handleFindAllCategories, handleFindOneCategory };
