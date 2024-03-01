import { createReducer, on } from '@ngrx/store';
import { Card } from 'src/app/core/models/card.model';
import * as LeitnerBoxActions from './leitner-box.actions';

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
  on(LeitnerBoxActions.addCard, (state, { newCard }) => ({
    ...state,
    cards: [...state.cards, newCard as Card],
  })),
  on(LeitnerBoxActions.loadCards, (state) => ({ ...state, status: LoadCardsStatus.Loading })),
  on(LeitnerBoxActions.loadDailyCards, (state) => ({ ...state, status: LoadCardsStatus.Loading })),
  on(LeitnerBoxActions.loadCardsSuccess, (state, { cards }) => ({
    ...state,
    cards,
    status: LoadCardsStatus.Success,
  })),
);
