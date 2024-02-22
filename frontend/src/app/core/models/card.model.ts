import { CardCategory } from './types/category.enum';

export class Card {
  id!: string;
  category!: CardCategory;
  question!: string;
  answer!: string;
  tag!: string;
}
