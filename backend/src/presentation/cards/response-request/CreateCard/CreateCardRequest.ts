import { CreateCardRequestArguments } from './CreateCardRequestArguments';

export class CreateCardRequest {
	private readonly _question: string;
	private readonly _tag: string;
	private readonly _answer: string;

	constructor({ question, tag, answer }: CreateCardRequestArguments) {
		this._question = question;
		this._tag = tag;
		this._answer = answer;
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
