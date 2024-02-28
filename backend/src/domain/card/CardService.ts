import { CardRepository } from './CardRepository';
import { Card } from './entities/Card';

export class CardService {
	private readonly _cardRepository: CardRepository;

	constructor(cardRepository: CardRepository) {
		this._cardRepository = cardRepository;
	}

	// create(card:Card):void {
	//
	// 	this._cardRepository.save(card);
	// }

	getAll(): Card[] {
		return this._cardRepository.loadAllCards();
	}
}
