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
		if (typeof question !== 'string') {
			throw new Error('Invalid question type');
		}
		const trimmedQuestion = question.trim();
		if (!trimmedQuestion) {
			throw new Error('No question provided');
		}

		if (typeof answer !== 'string') {
			throw new Error('Invalid answer type');
		}
		const trimmedAnswer = answer.trim();
		if (!trimmedAnswer) {
			throw new Error('No answer provided');
		}

		const trimmedTag: string = typeof tag == 'string' && tag.trim() ? tag.trim() : 'No tag';

		return new CardUserData(trimmedQuestion, trimmedAnswer, trimmedTag);
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
