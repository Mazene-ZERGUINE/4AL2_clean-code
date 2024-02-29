import { Card } from 'src/app/core/models/card.model';

export const getCardsByTagsMap = (tags: string[], cards: Card[]): Map<string, Card[]> => {
  const cardByTagMap = new Map<string, Card[]>();

  tags.forEach((tag) => {
    const filteredCards = cards
      .filter((card) => card.tag.toLowerCase() === tag.toLowerCase())
      .sort((a, b) => {
        const dateA = a.publishedAt ? parseInt(a.publishedAt) : 0;
        const dateB = b.publishedAt ? parseInt(b.publishedAt) : 0;
        return dateB - dateA;
      });

    if (filteredCards.length > 0) {
      cardByTagMap.set(toFirstCharString(tag), filteredCards);
    }
  });

  return cardByTagMap;
};

export const toFirstCharString = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
