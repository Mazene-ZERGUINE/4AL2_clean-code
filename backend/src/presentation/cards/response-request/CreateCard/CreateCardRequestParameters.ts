export class CreateCardRequestParameters {
	private readonly _question: string;
	private readonly _answer: string;
	private readonly _tag: string;

	constructor(question: string, answer: string, tag: string) {
		this._question = question;
		this._answer = answer;
		this._tag = tag;
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
}
