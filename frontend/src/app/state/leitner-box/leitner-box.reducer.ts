import { createReducer, on } from '@ngrx/store';
import { Card } from 'src/app/core/models/card.model';
import * as LeitnerBoxActions from './leitner-box.actions';
import { CardPayload } from 'src/app/leitner-box/services/cards.service';

export enum LoadCardsStatus {
  Pending = 'pending',
  Loading = 'loading',
  Error = 'error',
  Success = 'success',
}

export interface LeitnerBoxState {
  cards: Card[];
  status: LoadCardsStatus;
}

export const initialState: LeitnerBoxState = {
  cards: [],
  status: LoadCardsStatus.Pending,
};

export const leitnerBoxReducer = createReducer(
  initialState,
  on(LeitnerBoxActions.addCard, (state, card: CardPayload) => ({
    ...state,
    cards: [...state.cards, card as Card],
  })),
  on(LeitnerBoxActions.addCardSuccess, (state, { card }) => ({
    ...state,
    cards: [...state.cards.filter((c) => c.id !== undefined), card],
  })),
  on(LeitnerBoxActions.loadCards, (state) => ({ ...state, status: LoadCardsStatus.Loading })),
  on(LeitnerBoxActions.loadCardsSuccess, (state, { cards }) => ({
    ...state,
    cards,
    status: LoadCardsStatus.Success,
  })),
);
