import { CreateCardRequest } from '../../presentation/cards/response-request/CreateCard/CreateCardRequest';
import { Card } from './entities/Card';

export interface CardRepository {
	save(card: CreateCardRequest): Card;
	loadAllCards(): Card[];
}
