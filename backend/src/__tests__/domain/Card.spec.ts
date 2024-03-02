import { randomUUID } from 'crypto';

import { Category } from '../../domain/card/entities/Category';
import { CardId } from '../../domain/card/entities/CardId';
import { Card } from '../../domain/card/entities/Card';

describe('Card', () => {
	let cardId: CardId;
	let question: string;
	let answer: string;
	let tag: string;
	let category: Category;
	let card: Card;

	beforeEach(() => {
		cardId = new CardId(randomUUID());
		question = '1 + 1 = ?';
		answer = '2';
		tag = 'Maths';
		category = Category.FIRST;
		card = new Card(cardId, question, answer, tag, category);
	});

	it('should create a card with provided values', () => {
		const card = new Card(cardId, question, answer, tag, category);

		expect(card.cardId).toBe(cardId);
		expect(card.question).toEqual(question);
		expect(card.answer).toEqual(answer);
		expect(card.tag).toEqual(tag);
		expect(card.category).toEqual(category);
	});

	it('allows setting a valid category', () => {
		expect(() => {
			card.category = Category.SECOND;
		}).not.toThrow();

		expect(card.category).toEqual(Category.SECOND);
	});

	it('throws an error if setting an empty category', () => {
		const errorMessage = 'Category cannot be empty!';

		expect(() => {
			card.category = '       ' as unknown as Category;
		}).toThrow(errorMessage);

		expect(() => {
			card.category = null as unknown as Category;
		}).toThrow(errorMessage);

		expect(() => {
			card.category = null as unknown as Category;
		}).toThrow(errorMessage);
	});
});
