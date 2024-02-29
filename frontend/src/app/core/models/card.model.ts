import { CardCategory } from './types/category.enum';

export interface Card {
  id: string;
  category: CardCategory;
  question: string;
  answer: string;
  tag: string;

  //only for frontend
  publishedAt?: string;
}
