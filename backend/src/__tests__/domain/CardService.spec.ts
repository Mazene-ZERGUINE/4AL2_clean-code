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
			save: fn(),
		};

		cardService = new CardServiceImpl(cardRepositoryMock);
	});

	it('should create a card and be returned', async () => {
		// Arrange
		const question = '1 + 1 = ?';
		const answer = '2';
		const tag = 'Maths';
		const cardUserData = CardUserData.of(question, answer, tag);
		const createCardRequest = new CreateCardRequest(cardUserData);

		// Act
		const card = await cardService.create(createCardRequest);

		// Assert
		expect(cardRepositoryMock.save).toBeCalled();
		expect(card.question).toEqual(question);
		expect(card.answer).toEqual(answer);
		expect(card.tag).toEqual(tag);
		expect(card.category).toEqual(Category.FIRST);
	});

	it('should load all cards by tags', async () => {
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

	// TODO/FIXME
	xit("should call the repository's 'loadAllCards()' when getting cards by date", () => {
		const tag = 'tag';
		cardRepositoryMock.loadAllCards.mockReturnValue(
			Promise.resolve([
				new Card(new CardId(randomUUID()), 'question 1', 'answer 1', tag, Category.FIRST),
				new Card(new CardId(randomUUID()), 'question 2', 'answer 2', tag, Category.SECOND),
			]),
		);

		// Act
		cardService.getAllByDate(new Date());

		// Assert
		expect(cardRepositoryMock.loadAllCards).toHaveBeenCalled();
	});

	// TODO/FIXME
	xit("should call the repository's 'loadCardById()' when answering a card", () => {
		// Arrange
		const cardId = randomUUID();

		// Act
		cardService.getById(cardId);

		// Assert
		expect(cardRepositoryMock.loadCardById).toHaveBeenCalledWith(cardId);
	});

	describe('Card upgrade functionality', () => {
		const categories = Object.values(Category);

		categories.forEach((currentCategory, index) => {
			if (currentCategory === Category.DONE) {
				return;
			}

			const nextCategory = categories[index + 1] ?? Category.DONE;

			it(`should upgrade a card with category ${currentCategory} to ${nextCategory} when answering a question correctly`, async () => {
				// Arrange
				const card = new Card(new CardId(randomUUID()), 'q', 'a', 't', currentCategory);
				cardRepositoryMock.loadCardById.mockResolvedValue(card);

				// Act
				await cardService.upgradeCard(card);

				// Assert
				expect(cardRepositoryMock.save).toHaveBeenCalledWith(
					expect.objectContaining({ category: nextCategory }),
				);

				jest.clearAllMocks();
			});
		});
	});

	describe('Card downgrading functionality', () => {
		Object.values(Category).forEach((currentCategory) => {
			if (currentCategory === Category.DONE) {
				return;
			}

			it(`should downgrade a card from ${currentCategory} to FIRST, regardless of its initial category`, async () => {
				// Arrange
				const card = new Card(new CardId(randomUUID()), 'q', 'a', 't', currentCategory);
				cardRepositoryMock.loadCardById.mockResolvedValue(card);

				// Act
				await cardService.downgradeCard(card);

				// Assert
				expect(cardRepositoryMock.save).toHaveBeenCalledWith(
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
