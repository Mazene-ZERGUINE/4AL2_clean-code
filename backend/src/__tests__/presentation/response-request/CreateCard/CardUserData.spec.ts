import { CardUserData } from '../../../../presentation/cards/response-request/CreateCard/CardUserData';

describe('CardUserData', () => {
	const defaultQuestion = 'What is the capital of France?';
	const defaultAnswer = 'Paris';
	const defaultTag = 'Geography';
	const noTag = 'No tag';

	describe('Successful creation', () => {
		it.each([
			[defaultQuestion, defaultAnswer, defaultTag, defaultTag],
			[defaultQuestion, defaultAnswer, `   ${defaultTag}   `, defaultTag],
			[defaultQuestion, defaultAnswer, null, noTag],
			[defaultQuestion, defaultAnswer, undefined, noTag],
			[defaultQuestion, defaultAnswer, '', noTag],
			[defaultQuestion, defaultAnswer, '   ', noTag],
		])(
			'creates an instance correctly for question="%s", answer="%s", tag="%s"',
			(question, answer, tag, expectedTag) => {
				const cardUserData = CardUserData.of(question, answer, tag);
				expect(cardUserData.question).toBe(question);
				expect(cardUserData.answer).toBe(answer);
				expect(cardUserData.tag).toBe(expectedTag);
			},
		);
	});

	describe('Validation errors', () => {
		it.each([
			['Invalid question type', 123, defaultAnswer, defaultTag],
			['Invalid answer type', defaultQuestion, 456, defaultTag],
			['Invalid tag type', defaultQuestion, defaultAnswer, 789],
			['No question provided', '', defaultAnswer, defaultTag],
			['No answer provided', defaultQuestion, '', defaultTag],
			['No question provided', '   ', defaultAnswer, defaultTag],
			['No answer provided', defaultQuestion, '   ', defaultTag],
		])('throws "%s" error', (expectedError, question, answer, tag) => {
			expect(() => CardUserData.of(question, answer, tag)).toThrow(expectedError);
		});
	});
});
