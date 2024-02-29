import { CardRepository } from '../../../domain/card/CardRepository';
import { Card } from '../../../domain/card/entities/Card';
import { CreateCardRequest } from '../../../presentation/cards/response-request/CreateCard/CreateCardRequest';
import { CardId } from '../../../domain/card/entities/CardId';
import { randomUUID } from 'crypto';
import { CardService } from '../../../domain/card/CardService';

export class CardServiceImpl implements CardService {
	private readonly _cardRepository: CardRepository;

	constructor(cardRepository: CardRepository) {
		this._cardRepository = cardRepository;
	}

	getAll(): Card[] {
		return this._cardRepository.loadAllCards();
	}

	getAllByTags(tags: string[]): Card[] {
		return this._cardRepository.loadAllCardsByTags(tags);
	}

	create({ question, tag, answer }: CreateCardRequest): Card {
		const card = new Card(new CardId(randomUUID()), question, answer, tag);
		this._cardRepository.save(card);

		return card;
	}
}
