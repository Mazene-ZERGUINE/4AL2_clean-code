import { createAction, props } from '@ngrx/store';
import { Card } from 'src/app/core/models/card.model';

export const loadCards = createAction('[Dashboard] Load Cards');

export const loadCardsSuccess = createAction(
  '[Dashboard] Load cards success',
  props<{ cards: Card[] }>(),
);

export const addCard = createAction(
  '[Dashboard] Add Card',
  props<{ question: string; answer: string; tag: string }>(),
);
