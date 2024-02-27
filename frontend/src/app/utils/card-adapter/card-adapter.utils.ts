import { Card } from 'src/app/core/models/card.model';

export const getCardsByTagsMap = (tags: string[], cards: Card[]): Map<string, Card[]> => {
  const cardByTagMap = new Map<string, Card[]>();

  tags.forEach((tag) => {
    const filteredCards = cards.filter((card) => card.tag.toLowerCase() === tag.toLowerCase());

    if (filteredCards.length > 0) {
      cardByTagMap.set(tag, filteredCards);
    }
  });

  return cardByTagMap;
};
