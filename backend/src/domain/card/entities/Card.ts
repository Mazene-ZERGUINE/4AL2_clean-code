import { UUID } from 'crypto';
import { Category } from './Category';

export class Card {
	private readonly _id: UUID;
	private readonly _question: string;
	private readonly _answer: string;
	private readonly _tag;
	private _category;

	constructor(id: UUID, question: string, answer: string, tag: string, category = Category.FIRST) {
		this._id = id;
		this._question = question;
		this._answer = answer;
		this._category = category;
		this._tag = tag;
	}

	get id(): UUID {
		return this._id;
	}

	get question(): string {
		return this._question;
	}

	get answer(): string {
		return this._answer;
	}

	get tag() {
		return this._tag;
	}

	get category() {
		return this._category;
	}

	set category(value) {
		this._category = value;
	}
}
