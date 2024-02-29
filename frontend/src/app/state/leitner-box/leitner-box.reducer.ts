import { createReducer, on } from '@ngrx/store';
import { Card } from 'src/app/core/models/card.model';
import { CardCategory } from 'src/app/core/models/types/category.enum';
import * as LeitnerBoxActions from './leitner-box.actions';
<<<<<<< HEAD
=======
import { v4 as uuidv4 } from 'uuid';
>>>>>>> f5a8d35 (adding quizz stepper, button for adding list, and improving forms)

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
<<<<<<< HEAD
      { id: Date.now().toString(), question, answer, tag, category: CardCategory.FIRST },
=======
      {
        id: uuidv4(),
        question,
        answer,
        tag,
        category: CardCategory.FIRST,
        publishedAt: Date.now().toString(),
      },
>>>>>>> f5a8d35 (adding quizz stepper, button for adding list, and improving forms)
    ],
  })),
  on(LeitnerBoxActions.loadCards, (state) => ({ ...state, status: LoadCardsStatus.Loading })),
  on(LeitnerBoxActions.loadCardsSuccess, (state, { cards }) => ({
    ...state,
    cards,
    status: LoadCardsStatus.Success,
  })),
);
