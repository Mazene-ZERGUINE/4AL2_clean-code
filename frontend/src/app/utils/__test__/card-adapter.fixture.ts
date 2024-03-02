import { Card } from 'src/app/core/models/card.model';
import { CardCategory } from 'src/app/core/models/types/category.enum';

export const cardsFixture: Card[] = [
  {
    id: '1',
    question: 'What is A?',
    answer: 'A is A',
    tag: 'easy',
    category: CardCategory.FIRST,
  },
  {
    id: '2',
    question: 'What is B?',
    answer: 'B is B',
    tag: 'medium',
    category: CardCategory.SECOND,
  },
  {
    id: '3',
    question: 'What is A again?',
    answer: 'A is A',
    tag: 'easy',
    category: CardCategory.THIRD,
  },
];
