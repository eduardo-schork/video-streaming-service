import { Request, Response } from 'express';

import MissingParameterError from '@shared/errors/missing-parameter.error';
import createCommentUsecase from '@features/comment/create-comment.usecase';
import findOneCommentUsecase from '@features/comment/find-one-comment.usecase';
import findAllCommentsUsecase from '@features/comment/find-all-comments.usecase';
import findAllCommentsByMovieUsecase from '@features/comment/find-all-comments-by-movie.usecase';

async function handleFindOneComment(req: Request, res: Response) {
  const idToSearch = req.params.id;

  if (!idToSearch) {
    throw new MissingParameterError(['id']);
  }

  const category = await findOneCommentUsecase('_id', idToSearch);

  res.status(200).send(category);
}

async function handleFindAllCommentsByMovie(req: Request, res: Response) {
  const idToSearch = req.params.id;

  if (!idToSearch) {
    throw new MissingParameterError(['id']);
  }

  const category = await findAllCommentsByMovieUsecase(idToSearch);

  res.status(200).send(category);
}

async function handleCreateComment(req: Request, res: Response) {
  const reqBody = req.body;

  const newComment = await createCommentUsecase(reqBody);

  res.status(201).send(newComment);
}

async function handleFindAllComments(req: Request, res: Response) {
  const categoriesList = await findAllCommentsUsecase({ filter: null });

  res.status(200).send(categoriesList);
}

export {
  handleCreateComment,
  handleFindOneComment,
  handleFindAllComments,
  handleFindAllCommentsByMovie,
};
