import { UUID } from 'crypto';

export class CardId {
	private readonly _value: UUID;

	constructor(_id: UUID) {
		this._value = _id;
	}

	static of(id: UUID) {
		return new CardId(id);
	}

	get value(): UUID {
		return this._value;
	}

	equals(other: CardId): boolean {
		return this._value === other._value;
	}
}
