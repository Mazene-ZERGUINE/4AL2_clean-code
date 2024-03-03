import { Card } from './entities/Card';

export interface CardRepository {
	loadCardById(id: string): Promise<undefined | Card>;

	loadAllCards(): Promise<Card[]>;

	loadAllCardsByTags(tags: string[]): Promise<Card[]>;

	questionExists(question: string): Promise<boolean>;

	save(card: Card): Promise<void>;
}
