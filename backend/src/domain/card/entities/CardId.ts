import { UUID } from 'crypto';

export class CardId {
	private readonly _id: UUID;

	constructor(_id: UUID) {
		this._id = _id;
	}

	static of(id: UUID) {
		return new CardId(id);
	}

	get id(): UUID {
		return this._id;
	}
}
