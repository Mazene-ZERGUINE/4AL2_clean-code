import { UUID } from 'crypto';

export class CardId {
	constructor(private readonly _id: UUID) {}

	static of(id: UUID) {
		return new CardId(id);
	}
}
