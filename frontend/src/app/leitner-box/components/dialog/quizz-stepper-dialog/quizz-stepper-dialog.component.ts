import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Card } from 'src/app/core/models/card.model';
import { answerCard } from 'src/app/state/leitner-box/leitner-box.actions';

export enum CustomStepperOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

@Component({
  selector: 'app-quizz-stepper-dialog',
  templateUrl: './quizz-stepper-dialog.component.html',
  styleUrls: ['./quizz-stepper-dialog.component.scss'],
})
export class QuizzStepperDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<QuizzStepperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { cards: Card[] },
    private breakpointObserver: BreakpointObserver,
    private store: Store,
  ) {}

  private validationMessageSource = new BehaviorSubject<string>('');
  validationMessage$ = this.validationMessageSource.asObservable();

  readonly hasAnswered = new BehaviorSubject<boolean>(false);

  readonly isCorrectAnswer = new BehaviorSubject<boolean>(false);

  readonly answerFormGroup = new FormGroup({
    answer: new FormControl<string | null>(null, Validators.required),
  });

  readonly cardsToStudy = this.dialogData.cards;

  readonly stepperOrientation$: Observable<StepperOrientation> = this.breakpointObserver
    .observe([Breakpoints.Medium])
    .pipe(
      map((breakpoint) =>
        breakpoint.matches
          ? CustomStepperOrientation.Vertical
          : CustomStepperOrientation.Horizontal,
      ),
    );

  handleIsCorrectAnswer(cardId: string, cardAnswer: string): void {
    const userAnswer = this.answerFormGroup.value.answer?.trim().toLowerCase();
    const isValidAnswer = userAnswer === cardAnswer.trim().toLowerCase();

    this.store.dispatch(answerCard({ cardId, isValid: isValidAnswer }));
    this.validationMessageSource.next(
      isValidAnswer ? 'Bonne réponse!' : `Mauvaise réponse! La bonne réponse était : ${cardAnswer}`,
    );

    this.answerFormGroup.disable();
    this.hasAnswered.next(true);
    this.isCorrectAnswer.next(isValidAnswer);
  }

  clearPreviousAnswer(): void {
    this.validationMessageSource.next('');
    this.answerFormGroup.reset();
    this.answerFormGroup.enable();
    this.hasAnswered.next(false);
    this.isCorrectAnswer.next(false);
  }

  forceValidation(cardId: string): void {
    this.store.dispatch(answerCard({ cardId, isValid: true }));
    this.clearPreviousAnswer();
  }
}
