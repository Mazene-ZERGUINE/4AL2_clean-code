import { CardCategory } from './types/category.enum';

export interface Card {
  id?: string;
  question: string;
  answer: string;
  tag: string;
  category: CardCategory;

  //only for frontend
  publishedAt?: string;
}
