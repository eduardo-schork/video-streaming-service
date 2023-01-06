import DatabasePort from "../../database.port";
import createMovieUsecase from "@features/movie/usecases/create-movie.usecase";

import { faker } from "@faker-js/faker";
import createCategoryUsecase from "@features/category/usecases/create-category.usecase";
import findAllCategoriesUsecase from "@features/category/usecases/find-all-categories.usecase";

require("dotenv").config();

async function execute() {
  try {
    await DatabasePort.connectToDatabase();

    for (let index = 0; index < 15; index++) {
      await createCategoryUsecase({
        title: faker.random.word(),
        createdAt: new Date().getTime(),
        createdBy: "root",
      });
    }

    const categories = await findAllCategoriesUsecase();

    if (!categories) return null;

    for (let index = 0; index < 100; index++) {
      const categoryIndex = Math.floor(Math.random() * 15);

      await createMovieUsecase({
        url: "test-video.mp4",
        title: faker.random.words(),
        description: faker.random.words(5),
        categories: [categories[categoryIndex]],
        createdAt: new Date().getTime(),
        createdBy: "root",
      });
    }

    console.log("Seed database finished");
  } catch (error) {
    console.log({ error });
  }
}

execute();
