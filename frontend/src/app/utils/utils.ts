import { Card } from '../core/models/card.model';
import { CardKeyType } from '../shared/variables/enum';

export const getDistinctValuesFromCardArray = (cards: Card[], key: CardKeyType): string[] => {
  const distintValuesArray = new Set(cards.map((card) => card[key]));

  return [...distintValuesArray];
};

export const getCardsByCardKeyMap = (
  keys: string[],
  cards: Card[],
  keyType: CardKeyType,
): Map<string, Card[]> => {
  const cardMap = new Map<string, Card[]>();

  keys.forEach((key) => {
    const filteredCards = cards.filter((card) => card[keyType].toLowerCase() === key.toLowerCase());

    if (filteredCards.length > 0) {
      cardMap.set(key, filteredCards);
    }
  });

  return cardMap;
};
