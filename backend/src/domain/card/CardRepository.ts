import { CreateCardRequest } from '../../presentation/cards/response-request/CreateCard/CreateCardRequest';
import { Card } from './entities/Card';

export interface CardRepository {
	createCard(card: CreateCardRequest): Card;
	loadAllCards(): Card[];
}
