import { CardUserData } from './CardUserData';

export class CreateCardRequest {
	private readonly _question: string;
	private readonly _answer: string;
	private readonly _tag: string;

	constructor({ question, tag, answer }: CardUserData) {
		this._question = question;
		this._answer = answer;
		this._tag = tag;
	}

	get question(): string {
		return this._question;
	}

	get tag(): string {
		return this._tag;
	}

	get answer(): string {
		return this._answer;
	}
}
