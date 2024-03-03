import { randomUUID } from 'crypto';
import clearAllMocks = jest.clearAllMocks;
import Mocked = jest.Mocked;
import fn = jest.fn;

import { CardService } from '../../domain/card/CardService';
import { CardRepository } from '../../domain/card/CardRepository';
import { CardServiceImpl } from '../../infrastructure/in-memory/cards/CardServiceImpl';
import { CreateCardRequest } from '../../presentation/cards/response-request/CreateCard/CreateCardRequest';
import { CardUserData } from '../../presentation/cards/response-request/CreateCard/CardUserData';
import { Card } from '../../domain/card/entities/Card';
import { Category } from '../../domain/card/entities/Category';
import { CardId } from '../../domain/card/entities/CardId';

describe('CardServiceImpl', () => {
	let cardService: CardService;
	let cardRepositoryMock: Mocked<CardRepository>;

	beforeEach(() => {
		cardRepositoryMock = {
			loadCardById: fn(),
			loadAllCards: fn(),
			loadAllCardsByTags: fn(),
			cardWithSameQuestionAndTagExist: fn(),
			save: fn(),
			update: fn(),
		};

		cardService = new CardServiceImpl(cardRepositoryMock);
	});

	it('should create a card with a nonexistent question and be returned', async () => {
		// Arrange
		const question = 'question 1';
		const answer = 'answer 1';
		const tag = 'tag';
		const cardUserData = CardUserData.of(question, answer, tag);
		const createCardRequest = new CreateCardRequest(cardUserData);

		// Act
		const card = await cardService.create(createCardRequest);

		// Assert
		expect(cardRepositoryMock.cardWithSameQuestionAndTagExist).toBeCalled();
		expect(cardRepositoryMock.save).toBeCalled();
		expect(card.question).toEqual(question);
		expect(card.answer).toEqual(answer);
		expect(card.tag).toEqual(tag);
		expect(card.category).toEqual(Category.FIRST);
	});

	it('should throw an error when creating a card with an existing question', async () => {
		// Arrange
		const question = 'question 1';
		const answer = 'answer 1';
		const tag = 'tag';
		const cardUserData = CardUserData.of(question, answer, tag);
		const createCardRequest = new CreateCardRequest(cardUserData);
		cardRepositoryMock.cardWithSameQuestionAndTagExist.mockResolvedValue(true);

		// Assert
		await expect(cardService.create(createCardRequest)).rejects.toThrow(
			'Question needs to be unique for the same tag',
		);
		expect(cardRepositoryMock.cardWithSameQuestionAndTagExist).toBeCalled();
		expect(cardRepositoryMock.save).not.toHaveBeenCalled();
	});

	it('should load all cards', async () => {
		// Arrange
		const expectedCards = [
			{
				cardId: new CardId(randomUUID()),
				question: 'question 1',
				answer: 'answer 1',
				tag: 'tag 1',
				category: Category.FIRST,
			},
			{
				cardId: new CardId(randomUUID()),
				question: 'question 2',
				answer: 'answer 2',
				tag: 'tag 2',
				category: Category.SECOND,
			},
		];

		cardRepositoryMock.loadAllCards.mockReturnValue(
			Promise.resolve(
				expectedCards.map(
					(card) => new Card(card.cardId, card.question, card.answer, card.tag, card.category),
				),
			),
		);

		// Act
		const cards = await cardService.getAll();

		// Assert
		expect(cardRepositoryMock.loadAllCards).toHaveBeenCalled();
		expect(cards.length).toEqual(2);

		cards.forEach((card, index) => {
			const expectedCard = expectedCards[index];

			expect(card.cardId.value).toEqual(expectedCard.cardId.value);
			expect(card.question).toEqual(expectedCard.question);
			expect(card.answer).toEqual(expectedCard.answer);
			expect(card.tag).toEqual(expectedCard.tag);
			expect(card.category).toEqual(expectedCard.category);
		});
	});

	it('should load all cards by queried tags', async () => {
		// Arrange
		const queriedTag1 = 'tag 1';
		const queriedTag2 = 'tag 2';
		const randomTag = 'tag 3';
		const queriedTags = [queriedTag1, queriedTag2];
		const expectedCards = [
			{
				cardId: new CardId(randomUUID()),
				question: 'question 1',
				answer: 'answer 1',
				tag: queriedTag1,
				category: Category.FIRST,
			},
			{
				cardId: new CardId(randomUUID()),
				question: 'question 2',
				answer: 'answer 2',
				tag: queriedTag1,
				category: Category.SECOND,
			},
			{
				cardId: new CardId(randomUUID()),
				question: 'question 3',
				answer: 'answer 3',
				tag: queriedTag2,
				category: Category.THIRD,
			},
			{
				cardId: new CardId(randomUUID()),
				question: 'question 4',
				answer: 'answer 4',
				tag: randomTag,
				category: Category.FORTH,
			},
		];

		cardRepositoryMock.loadAllCardsByTags.mockReturnValue(
			Promise.resolve(
				expectedCards
					.map((card) => new Card(card.cardId, card.question, card.answer, card.tag, card.category))
					.filter((card) => queriedTags.includes(card.tag)),
			),
		);

		// Act
		const cards = await cardService.getAllByTags(queriedTags);

		// Assert
		expect(cardRepositoryMock.loadAllCardsByTags).toHaveBeenCalledWith(queriedTags);
		expect(cards.every((card) => queriedTags.includes(card.tag))).toBeTruthy();
	});

	it('should load a card by ID', async () => {
		// Arrange
		const expectedCard = new Card(new CardId(randomUUID()), 'q', 'a', 't', Category.FIRST);
		cardRepositoryMock.loadCardById.mockResolvedValue(expectedCard);

		// Act
		const card = await cardService.getById(expectedCard.cardId.value);

		// Assert
		expect(cardRepositoryMock.loadCardById).toHaveBeenCalledWith(card?.cardId.value);
		expect(card).toBeTruthy();
		expect(card?.cardId.value).toEqual(expectedCard.cardId.value);
		expect(card?.question).toEqual(expectedCard.question);
		expect(card?.answer).toEqual(expectedCard.answer);
		expect(card?.tag).toEqual(expectedCard.tag);
		expect(card?.category).toEqual(expectedCard.category);
	});

	it('should load all cards by date', async () => {
		// Arrange
		const reviewDate = new Date('2024-02-27');
		const loadedCards = [
			new Card(new CardId(randomUUID()), 'question 1', 'answer 1', 'tag', Category.FIRST),
			new Card(new CardId(randomUUID()), 'question 2', 'answer 2', 'tag', Category.SECOND),
			new Card(new CardId(randomUUID()), 'question 3', 'answer 3', 'tag', Category.THIRD),
			new Card(new CardId(randomUUID()), 'question 4', 'answer 4', 'tag', Category.FORTH),
			new Card(new CardId(randomUUID()), 'question 5', 'answer 5', 'tag', Category.FIFTH),
			new Card(new CardId(randomUUID()), 'question 6', 'answer 6', 'tag', Category.SIXTH),
			new Card(new CardId(randomUUID()), 'question 7', 'answer 7', 'tag', Category.SEVENTH),
			new Card(new CardId(randomUUID()), 'question 8', 'answer 8', 'tag', Category.DONE),
		];
		cardRepositoryMock.loadAllCards.mockResolvedValue(loadedCards);

		// Act
		const cards = await cardService.getAllByDate(reviewDate);

		// Assert
		expect(cardRepositoryMock.loadAllCards).toHaveBeenCalled();
		expect(cards.length).toBe(2);
		expect(cards[0].cardId.value).toBe(loadedCards[0].cardId.value);
	});

	describe('Card upgrading', () => {
		const categories = Object.values(Category);

		categories.forEach((currentCategory, index) => {
			if (currentCategory === Category.DONE) {
				return;
			}

			const nextCategory = categories[index + 1] ?? Category.DONE;

			it(`should upgrade a card with category '${currentCategory}' to '${nextCategory}' when answering a question correctly`, async () => {
				// Arrange
				const card = new Card(new CardId(randomUUID()), 'q', 'a', 't', currentCategory);
				cardRepositoryMock.loadCardById.mockResolvedValue(card);

				// Act
				await cardService.upgradeCard(card);

				// Assert
				expect(cardRepositoryMock.update).toHaveBeenCalledWith(
					expect.objectContaining({ category: nextCategory }),
				);

				jest.clearAllMocks();
			});
		});

		it('throws an error when upgrading a card already in the DONE category', async () => {
			// Arrange
			const doneCard = new Card(new CardId(randomUUID()), 'q', 'a', 't', Category.DONE);
			cardRepositoryMock.loadCardById.mockResolvedValue(doneCard);

			// Act & Assert
			await expect(cardService.upgradeCard(doneCard)).rejects.toThrow(
				'Card is already in the highest category',
			);
			expect(cardRepositoryMock.update).not.toHaveBeenCalled();
		});
	});

	describe('Card downgrading', () => {
		const categories = Object.values(Category);

		categories.forEach((currentCategory) => {
			if (currentCategory === Category.DONE) {
				return;
			}

			it(`should downgrade a card with category '${currentCategory}' to 'FIRST', regardless of its initial category`, async () => {
				// Arrange
				const card = new Card(new CardId(randomUUID()), 'q', 'a', 't', currentCategory);
				cardRepositoryMock.loadCardById.mockResolvedValue(card);

				// Act
				await cardService.downgradeCard(card);

				// Assert
				expect(cardRepositoryMock.update).toHaveBeenCalledWith(
					expect.objectContaining({ category: Category.FIRST }),
				);

				clearAllMocks();
			});
		});
	});

	afterEach(() => {
		clearAllMocks();
	});
});
