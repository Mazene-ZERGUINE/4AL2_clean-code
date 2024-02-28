import { Card } from './entities/Card';
import { CreateCardRequest } from '../../presentation/cards/response-request/CreateCard/CreateCardRequest';

export interface CardService {
	getAll(): Card[];

	getAllByTags(tags: string[]): Card[];

	create({question, tag, answer}: CreateCardRequest): Card;

	getCardsByDate(date: Date): Card[] ;


}
