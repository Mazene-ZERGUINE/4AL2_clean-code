export class CardUserData {
	private readonly _question: string;
	private readonly _answer: string;
	private readonly _tag: string;

	private constructor(question: string, answer: string, tag: string) {
		this._question = question;
		this._answer = answer;
		this._tag = tag;
	}

	static of(question: unknown, answer: unknown, tag: unknown) {
		if (!this.isString(question)) {
			throw new Error('Invalid question type');
		}
		const trimmedQuestion = question.trim();
		if (!trimmedQuestion) {
			throw new Error('No question provided');
		}

		if (!this.isString(answer)) {
			throw new Error('Invalid answer type');
		}
		const trimmedAnswer = answer.trim();
		if (!trimmedAnswer) {
			throw new Error('No answer provided');
		}

		if (!this.isValidTag(tag)) {
			throw new Error('Invalid tag type');
		}
		const trimmedTag: string = tag ? tag.trim() || 'No tag' : 'No tag';

		return new CardUserData(trimmedQuestion, trimmedAnswer, trimmedTag);
	}

	private static isString(value: unknown): value is string {
		return typeof value === 'string';
	}

	private static isNullOrUndefined(value: unknown): value is null | undefined {
		return value === null || value === undefined;
	}

	private static isValidTag(tag: unknown): tag is null | undefined | string {
		return this.isNullOrUndefined(tag) || this.isString(tag);
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
