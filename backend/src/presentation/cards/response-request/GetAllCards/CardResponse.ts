import { Card } from '../../../../domain/card/entities/Card';
import { Category } from '../../../../domain/card/entities/Category';

export class CardResponse {
	private readonly id: string;
	private readonly question: string;
	private readonly answer: string;
	private readonly tag: string;
	private readonly category: Category;

	constructor({ cardId, question, answer, tag, category }: Card) {
		this.id = cardId.id;
		this.question = question;
		this.answer = answer;
		this.tag = tag;
		this.category = category;
	}
}
