import { CategoryModel } from '@shared/models/Category.model';
import { MovieModel, NormalizedMovie } from '@shared/models/Movie.model';

export type CreateMovieInput = Omit<
  MovieModel,
  'updatedAt' | 'updatedBy' | 'deletedAt' | 'deletedBy' | '_id'
>;

export type MoviesByCategory = CategoryModel & {
  movies: NormalizedMovie[];
};
