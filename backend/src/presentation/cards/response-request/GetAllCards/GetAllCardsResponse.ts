import { Card } from '../../../../domain/card/entities/Card';

export class GetAllCardsResponse {
	private readonly _cards: Card[];

	constructor(cards: Card[]) {
		this._cards = cards;
	}

	get cards() {
		return this._cards;
	}
}
