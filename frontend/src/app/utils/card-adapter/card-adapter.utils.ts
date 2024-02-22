import { Card } from 'src/app/core/models/card.model';
import { getCardsByCardKeyMap } from '../utils';
import { CardKey } from 'src/app/shared/variables/enum';

export const getCardsByTagsMap = (tags: string[], cards: Card[]): Map<string, Card[]> => {
  return getCardsByCardKeyMap(tags, cards, CardKey.Tag);
};

export const getCardsByCategoriesMap = (
  categories: string[],
  cards: Card[],
): Map<string, Card[]> => {
  return getCardsByCardKeyMap(categories, cards, CardKey.Category);
};
