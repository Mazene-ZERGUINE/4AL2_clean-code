export class CardUserData {
	private readonly _question: string;
	private readonly _answer: string;
	private readonly _tag: string;

	private constructor(question: string, answer: string, tag: string) {
		this._question = question;
		this._answer = answer;
		this._tag = tag;
	}

	static of(question: string, answer: string, tag: string) {
		if (!question) {
			throw new Error('No question provided');
		}
		if (!answer) {
			throw new Error('No answer provided');
		}

		return new CardUserData(question, answer, tag);
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
