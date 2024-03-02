import { Card } from './entities/Card';
import { CreateCardRequest } from '../../presentation/cards/response-request/CreateCard/CreateCardRequest';

export interface CardService {
	create({ question, tag, answer }: CreateCardRequest): Promise<Card>;

	getAll(): Promise<Card[]>;

	getAllByDate(date: Date): Promise<Card[]>;

	getAllByTags(tags: string[]): Promise<Card[]>;

	getById(cardId: string): Promise<Card | undefined>;

	upgradeCard(card: Card): Promise<void>;

	downgradeCard(card: Card): Promise<void>;
}
