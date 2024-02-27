import {CardRepository} from "./CardRepository";
import {Card} from "./entities/Card";

export class CardService {
	private readonly _cardRepository: CardRepository;

	constructor(cardRepository: CardRepository) {
		this._cardRepository = cardRepository;
	}

	 getAll():Card[] {
		return this._cardRepository.loadAllCards();
	}
}
