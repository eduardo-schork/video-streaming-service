/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */

import createMovieUsecase from '@features/movie/usecases/create-movie.usecase';

// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import createCategoryUsecase from '@features/category/usecases/create-category.usecase';
import findAllCategoriesUsecase from '@features/category/usecases/find-all-categories.usecase';
import { MovieModel } from '@shared/models/Movie.model';
import createCommentUsecase from '@features/comment/create-comment.usecase';
import { CommentModel } from '@shared/models/Comment.model';
import DatabasePort from '../../database.port';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const defaultData = () => {
  return {
    createdAt: new Date().getTime(),
    createdBy: 'root',
  };
};

async function generateComments(movie: MovieModel) {
  const numberOfComments = Math.floor(Math.random() * 10) + 1;

  for (let index = 0; index < numberOfComments; index++) {
    const comment = (await createCommentUsecase({
      movieId: movie._id,
      text: faker.random.words(5),
      ...defaultData(),
    })) as CommentModel;

    const numberOfSubcomments = Math.floor(Math.random() * 3) + 1;

    for (let index = 0; index < numberOfSubcomments; index++) {
      const subComment = (await createCommentUsecase({
        movieId: movie._id,
        parentId: comment._id,
        text: faker.random.words(5),
        ...defaultData(),
      })) as CommentModel;

      const shouldAddNewSubcomment =
        (Math.floor(Math.random() * 4) + 1) % 2 === 0;

      if (shouldAddNewSubcomment) {
        await createCommentUsecase({
          movieId: movie._id,
          parentId: subComment._id,
          text: faker.random.words(5),
          ...defaultData(),
        });
      }
    }
  }
}

async function execute() {
  try {
    await DatabasePort.connectToDatabase();

    for (let index = 0; index < 15; index++) {
      await createCategoryUsecase({
        title: faker.random.word(),
        ...defaultData(),
      });
    }

    console.log('SEED CATEGORIES DONE');

    const categories = await findAllCategoriesUsecase();

    if (!categories) return null;

    for (let index = 0; index < 100; index++) {
      const categoryIndex = Math.floor(Math.random() * 15);

      const sortedCategory = categories[categoryIndex];

      const newMovie = (await createMovieUsecase({
        url: 'test-video.mp4',
        title: faker.random.words(),
        description: faker.random.words(5),
        categories: [sortedCategory.id],
        ...defaultData(),
      })) as MovieModel;

      await generateComments(newMovie);
    }

    console.log('SEED COMMENTS DONE');
    console.log('SEED MOVIES DONE');
    console.log('Seed database finished');
    process.exit(0);
  } catch (error) {
    console.log({ error });
  }
}

execute();
