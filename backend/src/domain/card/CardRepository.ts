import { Card } from './entities/Card';

export interface CardRepository {
	save(card: Card): Promise<void>;

	loadCardById(id: string): Promise<undefined | Card>;
	loadAllCards(): Promise<Card[]>;
	loadAllCardsByTags(tags: string[]): Promise<Card[]>;
}
