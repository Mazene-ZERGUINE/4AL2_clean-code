import { Card } from 'src/app/core/models/card.model';
import { CardKeyType } from 'src/app/shared/variables/enum';

export class CardAdapterUtils {
  static toFirstCharString = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  static getDistinctValuesFromCardArray = (cards: Card[], key: CardKeyType): string[] => {
    const distintValuesArray = new Set(cards.map((card) => card[key].toLowerCase()));

    return [...distintValuesArray];
  };

  static getCardsByTagsMap = (tags: string[], cards: Card[]): Map<string, Card[]> => {
    const cardByTagMap = new Map<string, Card[]>();

    tags.forEach((tag) => {
      const filteredCards = cards.filter((card) => card.tag.toLowerCase() === tag.toLowerCase());

      if (filteredCards.length > 0) {
        cardByTagMap.set(CardAdapterUtils.toFirstCharString(tag), filteredCards);
      }
    });

    return cardByTagMap;
  };
}
