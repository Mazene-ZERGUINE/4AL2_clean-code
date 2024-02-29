import { createReducer, on } from '@ngrx/store';
import { Card } from 'src/app/core/models/card.model';
import { CardCategory } from 'src/app/core/models/types/category.enum';
import * as LeitnerBoxActions from './leitner-box.actions';
import { v4 as uuidv4 } from 'uuid';

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
      {
        id: uuidv4(),
        question,
        answer,
        tag,
        category: CardCategory.FIRST,
        publishedAt: Date.now().toString(),
      },
    ],
  })),
  on(LeitnerBoxActions.loadCards, (state) => ({ ...state, status: LoadCardsStatus.Loading })),
  on(LeitnerBoxActions.loadCardsSuccess, (state, { cards }) => ({
    ...state,
    cards,
    status: LoadCardsStatus.Success,
  })),
);
