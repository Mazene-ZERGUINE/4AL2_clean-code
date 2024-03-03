import { Card } from './entities/Card';

export interface CardRepository {
	loadCardById(id: string): Promise<undefined | Card>;

	loadAllCards(): Promise<Card[]>;

	loadAllCardsByTags(tags: string[]): Promise<Card[]>;

	cardWithSameQuestionAndTagExist(question: Card): Promise<boolean>;

	save(card: Card): Promise<void>;

	update(card: Card): Promise<void>;
}
