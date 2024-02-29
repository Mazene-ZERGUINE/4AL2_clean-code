import { Card } from '../core/models/card.model';
import { CardKeyType } from '../shared/variables/enum';

export const getDistinctValuesFromCardArray = (cards: Card[], key: CardKeyType): string[] => {
  const distintValuesArray = new Set(cards.map((card) => card[key].toLowerCase()));

  return [...distintValuesArray];
};
