import { createReducer, on } from '@ngrx/store';
import { Card } from 'src/app/core/models/card.model';
import { CardCategory } from 'src/app/core/models/types/category.enum';
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
  on(LeitnerBoxActions.addCard, (state, { question, answer, tag }) => ({
    ...state,
    cards: [
      ...state.cards,
      { id: Date.now().toString(), question, answer, tag, category: CardCategory.FIRST },
    ],
  })),
  on(LeitnerBoxActions.loadCards, (state) => ({ ...state, status: LoadCardsStatus.Loading })),
  on(LeitnerBoxActions.loadCardsSuccess, (state, { cards }) => ({
    ...state,
    cards,
    status: LoadCardsStatus.Success,
  })),
);
