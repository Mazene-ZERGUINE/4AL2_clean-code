import { Card } from './entities/Card';

export interface CardRepository {
	save(card: Card): void;

	loadAllCards(): Card[];
	loadAllCardsByTags(tags: string[]): Card[];
}
