import { createAction, props } from '@ngrx/store';
import { Card } from 'src/app/core/models/card.model';
import { CardPayload } from 'src/app/leitner-box/services/cards.service';

export const loadCards = createAction('[Dashboard] Load Cards');

export const loadDailyCards = createAction('[Dashboard] Load Daily Cards');

export const loadCardsSuccess = createAction(
  '[Dashboard] Load cards success',
  props<{ cards: Card[] }>(),
);

export const addCard = createAction('[Dashboard] Add Card', props<{ newCard: CardPayload }>());

export const addCardSuccess = createAction('[Dashboard] Add Card Success', props<{ card: Card }>());

export const answerCard = createAction(
  '[Dashboard] answer card',
  props<{ cardId: string; isValid: boolean }>(),
);
