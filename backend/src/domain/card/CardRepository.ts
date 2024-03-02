import { Card } from './entities/Card';

export interface CardRepository {
	save(card: Card): void;

	loadCardById(id: string): Card[];
	loadAllCards(): Card[];
	loadAllCardsByTags(tags: string[]): Card[];
}
