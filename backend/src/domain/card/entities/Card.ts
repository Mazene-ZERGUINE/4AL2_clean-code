import { Category } from './Category';
import { CardId } from './CardId';

export class Card {
	private readonly _cardId: CardId;
	private readonly _question: string;
	private readonly _answer: string;
	private readonly _tag: string;
	private _category: Category;

	constructor(cardId: CardId, question: string, answer: string, tag: string, category: Category) {
		this._cardId = cardId;
		this._question = question;
		this._answer = answer;
		this._category = category;
		this._tag = tag;
	}

	get cardId(): CardId {
		return this._cardId;
	}

	get question(): string {
		return this._question;
	}

	get answer(): string {
		return this._answer;
	}

	get tag(): string {
		return this._tag;
	}

	get category(): Category {
		return this._category;
	}

	set category(value: Category) {
		if (this.isInvalidCategory(value)) {
			throw new Error('Category cannot be empty!');
		}

		this._category = value;
	}

	private isInvalidCategory(category: Category): boolean {
		return category == null || (typeof category == 'string' && !category.trim());
	}
}
