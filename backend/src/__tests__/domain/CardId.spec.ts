import { randomUUID } from 'crypto';
import { CardId } from '../../domain/card/entities/CardId';

describe('CardId', () => {
	it('constructs correctly and returns the value', () => {
		const uuid = randomUUID();
		const cardId = new CardId(uuid);

		expect(cardId.value).toBe(uuid);
	});

	it('creates an instance using the static `of` method', () => {
		const uuid = randomUUID();
		const cardId = CardId.of(uuid);

		expect(cardId.value).toBe(uuid);
	});

	it('compares two `CardId` instances for equality', () => {
		const uuid = randomUUID();
		const cardId1 = new CardId(uuid);
		const cardId2 = new CardId(uuid);
		const cardId3 = CardId.of(randomUUID());

		expect(cardId1.equals(cardId2)).toBeTruthy();
		expect(cardId1.equals(cardId3)).toBeFalsy();
	});
});
