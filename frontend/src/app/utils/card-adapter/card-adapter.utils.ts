import { Card } from 'src/app/core/models/card.model';
import '../string.extensions';

export const getCardsByTagsMap = (tags: string[], cards: Card[]): Map<string, Card[]> => {
  const cardByTagMap = new Map<string, Card[]>();

  tags.forEach((tag) => {
    const filteredCards = cards
      .filter((card) => card.tag.toLowerCase() === tag.toLowerCase())
      .sort((a, b) => {
        const dateA = a.publishedAt ? parseInt(a.publishedAt) : 0;
        const dateB = b.publishedAt ? parseInt(b.publishedAt) : 0;
        return dateB - dateA; // Pour trier par ordre décroissant
      });

    if (filteredCards.length > 0) {
      cardByTagMap.set(tag.toFirstCharString(), filteredCards);
    }
  });

  return cardByTagMap;
};
